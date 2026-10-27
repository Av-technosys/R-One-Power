import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://njorbghkubavdpppkrka.supabase.co"
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qb3JiZ2hrdWJhdmRwcHBrcmthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI5ODk2MTksImV4cCI6MjEwODU2NTYxOX0.x_lFSPYLpStiKTKBGkoWfgQaImojG9UcZEJuHvZraAk"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Converts a stored path or URL into a fully-qualified CDN URL.
 * Supports:
 * - "ronepower/blogs/123.png" -> "https://...supabase.co/storage/v1/object/public/ronepower/blogs/123.png"
 * - "/blog/sample.jpg" -> "/blog/sample.jpg" (local static file)
 * - "https://..." -> "https://..." (already absolute)
 */
export function getStorageImageUrl(pathOrUrl?: string | null): string {
  if (!pathOrUrl) return "/blog/featured-solar-industrial.jpg"

  // Already absolute or local public asset or base64
  if (
    pathOrUrl.startsWith("http://") ||
    pathOrUrl.startsWith("https://") ||
    pathOrUrl.startsWith("/") ||
    pathOrUrl.startsWith("data:")
  ) {
    return pathOrUrl
  }

  // Relative storage path like "ronepower/blogs/xxx.png"
  return `${supabaseUrl}/storage/v1/object/public/${pathOrUrl}`
}

/**
 * Upload a blog banner image directly to the Supabase 'ronepower' storage bucket.
 * Returns:
 * - path: "ronepower/blogs/timestamp-random.ext" (clean relative path to save in DB)
 * - url: full public CDN URL (for immediate browser preview)
 */
export async function uploadBlogImage(
  file: File
): Promise<{ path?: string; url?: string; error?: string }> {
  try {
    const MAX_FILE_SIZE = 1 * 1024 * 1024 // 1 MB (1,048,576 bytes)
    if (file.size > MAX_FILE_SIZE) {
      const currentMb = (file.size / (1024 * 1024)).toFixed(2)
      return {
        error: `File size (${currentMb} MB) exceeds the 1 MB limit. Please compress or select an image under 1 MB.`,
      }
    }

    const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg"
    const timestamp = Date.now()
    const randomStr = Math.random().toString(36).substring(2, 8)
    const filePath = `blogs/${timestamp}-${randomStr}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from("ronepower")
      .upload(filePath, file, {
        contentType: file.type || "image/jpeg",
        upsert: true,
      })

    if (uploadError) {
      console.error("Supabase Storage Error:", uploadError)
      return { error: uploadError.message }
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("ronepower").getPublicUrl(filePath)

    // Relative path to store in database (e.g. "ronepower/blogs/1793013200363-mqittf.png")
    const relativePath = `ronepower/${filePath}`

    return { path: relativePath, url: publicUrl }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Failed to upload image"
    console.error("Unexpected upload error:", err)
    return { error: errorMsg }
  }
}

/**
 * Removes an image from the Supabase 'ronepower' storage bucket.
 * Handles:
 * - "ronepower/blogs/123.png"
 * - "blogs/123.png"
 * - "https://...supabase.co/storage/v1/object/public/ronepower/blogs/123.png"
 */
export async function deleteBlogImageFromStorage(
  pathOrUrl?: string | null
): Promise<boolean> {
  if (!pathOrUrl) return false

  // Never delete local public static assets like /blog/photo.jpg
  if (pathOrUrl.startsWith("/") && !pathOrUrl.startsWith("/storage/")) {
    return false
  }

  try {
    let cleanPath = pathOrUrl

    // Extract relative path inside bucket
    const marker = "/storage/v1/object/public/ronepower/"
    if (cleanPath.includes(marker)) {
      cleanPath = cleanPath.split(marker)[1]
    } else if (cleanPath.startsWith("ronepower/")) {
      cleanPath = cleanPath.replace(/^ronepower\//, "")
    }

    // Only delete items in blogs/ folder to avoid accidental bucket deletes
    if (!cleanPath.startsWith("blogs/")) {
      return false
    }

    const { error } = await supabase.storage
      .from("ronepower")
      .remove([cleanPath])

    if (error) {
      console.error("Failed to delete image from Supabase storage:", error)
      return false
    }

    console.log(`Successfully removed old image from Supabase bucket: ${cleanPath}`)
    return true
  } catch (err) {
    console.error("Exception in deleteBlogImageFromStorage:", err)
    return false
  }
}
