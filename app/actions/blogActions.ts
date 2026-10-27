"use server"

import { db } from "@/db"
import { blogs, blogCategories, type Blog, type NewBlog, type BlogCategory } from "@/db/schema"
import { eq, desc, and, ilike, or } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import crypto from "crypto"
import { deleteBlogImageFromStorage } from "@/lib/supabaseClient"

function safeRevalidatePath(path: string) {
  try {
    revalidatePath(path)
  } catch {
    // Gracefully ignore when executed outside Next.js request context (e.g. tests/scripts)
  }
}

export type BlogWithCategory = Blog & {
  category?: {
    id: string
    name: string
    slug: string
  } | null
}

/**
 * Fetch all categories
 */
export async function getCategories(): Promise<BlogCategory[]> {
  try {
    return await db.select().from(blogCategories).orderBy(blogCategories.name)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

/**
 * Fetch blogs (with optional filtering for admin vs public)
 */
export async function getBlogs(options?: {
  includeDrafts?: boolean
  categorySlug?: string
  search?: string
}): Promise<BlogWithCategory[]> {
  try {
    const conditions = []

    if (!options?.includeDrafts) {
      conditions.push(eq(blogs.isDraft, false))
    }

    if (options?.categorySlug && options.categorySlug !== "all") {
      conditions.push(eq(blogCategories.slug, options.categorySlug))
    }

    if (options?.search && options.search.trim() !== "") {
      const query = `%${options.search.trim()}%`
      conditions.push(
        or(
          ilike(blogs.title, query),
          ilike(blogs.metaDescription, query),
          ilike(blogs.authorName, query)
        )
      )
    }

    const rows = await db
      .select({
        id: blogs.id,
        title: blogs.title,
        slug: blogs.slug,
        categoryId: blogs.categoryId,
        categoryName: blogCategories.name,
        categorySlug: blogCategories.slug,
        publishDate: blogs.publishDate,
        mainBannerImage: blogs.mainBannerImage,
        authorName: blogs.authorName,
        metaTitle: blogs.metaTitle,
        metaDescription: blogs.metaDescription,
        content: blogs.content,
        isDraft: blogs.isDraft,
        createdAt: blogs.createdAt,
        updatedAt: blogs.updatedAt,
      })
      .from(blogs)
      .leftJoin(blogCategories, eq(blogs.categoryId, blogCategories.id))
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(blogs.publishDate), desc(blogs.createdAt))

    return rows.map((r) => ({
      id: r.id,
      title: r.title,
      slug: r.slug,
      categoryId: r.categoryId,
      publishDate: r.publishDate,
      mainBannerImage: r.mainBannerImage,
      authorName: r.authorName,
      metaTitle: r.metaTitle,
      metaDescription: r.metaDescription,
      content: r.content,
      isDraft: r.isDraft,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
      category: r.categoryName
        ? {
            id: r.categoryId,
            name: r.categoryName,
            slug: r.categorySlug || "",
          }
        : null,
    }))
  } catch (error) {
    console.error("Error fetching blogs:", error)
    return []
  }
}

/**
 * Fetch a single blog by slug (for public view)
 */
export async function getBlogBySlug(
  slug: string,
  options?: { includeDrafts?: boolean }
): Promise<BlogWithCategory | null> {
  try {
    const conditions = [eq(blogs.slug, slug)]
    if (!options?.includeDrafts) {
      conditions.push(eq(blogs.isDraft, false))
    }

    const rows = await db
      .select({
        id: blogs.id,
        title: blogs.title,
        slug: blogs.slug,
        categoryId: blogs.categoryId,
        categoryName: blogCategories.name,
        categorySlug: blogCategories.slug,
        publishDate: blogs.publishDate,
        mainBannerImage: blogs.mainBannerImage,
        authorName: blogs.authorName,
        metaTitle: blogs.metaTitle,
        metaDescription: blogs.metaDescription,
        content: blogs.content,
        isDraft: blogs.isDraft,
        createdAt: blogs.createdAt,
        updatedAt: blogs.updatedAt,
      })
      .from(blogs)
      .leftJoin(blogCategories, eq(blogs.categoryId, blogCategories.id))
      .where(and(...conditions))
      .limit(1)

    if (rows.length === 0) return null

    const r = rows[0]
    return {
      id: r.id,
      title: r.title,
      slug: r.slug,
      categoryId: r.categoryId,
      publishDate: r.publishDate,
      mainBannerImage: r.mainBannerImage,
      authorName: r.authorName,
      metaTitle: r.metaTitle,
      metaDescription: r.metaDescription,
      content: r.content,
      isDraft: r.isDraft,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
      category: r.categoryName
        ? {
            id: r.categoryId,
            name: r.categoryName,
            slug: r.categorySlug || "",
          }
        : null,
    }
  } catch (error) {
    console.error(`Error fetching blog by slug ${slug}:`, error)
    return null
  }
}

/**
 * Fetch a single blog by ID (for admin editing)
 */
export async function getBlogById(id: string): Promise<BlogWithCategory | null> {
  try {
    const rows = await db
      .select({
        id: blogs.id,
        title: blogs.title,
        slug: blogs.slug,
        categoryId: blogs.categoryId,
        categoryName: blogCategories.name,
        categorySlug: blogCategories.slug,
        publishDate: blogs.publishDate,
        mainBannerImage: blogs.mainBannerImage,
        authorName: blogs.authorName,
        metaTitle: blogs.metaTitle,
        metaDescription: blogs.metaDescription,
        content: blogs.content,
        isDraft: blogs.isDraft,
        createdAt: blogs.createdAt,
        updatedAt: blogs.updatedAt,
      })
      .from(blogs)
      .leftJoin(blogCategories, eq(blogs.categoryId, blogCategories.id))
      .where(eq(blogs.id, id))
      .limit(1)

    if (rows.length === 0) return null

    const r = rows[0]
    return {
      id: r.id,
      title: r.title,
      slug: r.slug,
      categoryId: r.categoryId,
      publishDate: r.publishDate,
      mainBannerImage: r.mainBannerImage,
      authorName: r.authorName,
      metaTitle: r.metaTitle,
      metaDescription: r.metaDescription,
      content: r.content,
      isDraft: r.isDraft,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
      category: r.categoryName
        ? {
            id: r.categoryId,
            name: r.categoryName,
            slug: r.categorySlug || "",
          }
        : null,
    }
  } catch (error) {
    console.error(`Error fetching blog by id ${id}:`, error)
    return null
  }
}

/**
 * Create a new blog
 */
export async function createBlog(
  data: Omit<NewBlog, "id" | "createdAt" | "updatedAt"> & { id?: string }
): Promise<{ success: boolean; data?: Blog; error?: string }> {
  try {
    const id = data.id || `blog-${crypto.randomUUID()}`

    const newPost = {
      ...data,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const [inserted] = await db.insert(blogs).values(newPost).returning()

    safeRevalidatePath("/blog")
    safeRevalidatePath("/admin/blogs")
    if (inserted?.slug) {
      safeRevalidatePath(`/blog/${inserted.slug}`)
    }

    return { success: true, data: inserted }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create blog"
    console.error("Error creating blog:", error)
    return {
      success: false,
      error: message,
    }
  }
}

/**
 * Update an existing blog
 */
export async function updateBlog(
  id: string,
  data: Partial<Omit<NewBlog, "id" | "createdAt" | "updatedAt">>
): Promise<{ success: boolean; data?: Blog; error?: string }> {
  try {
    // If the image is being changed, remove the previous image from Supabase storage
    if (data.mainBannerImage) {
      const [existing] = await db
        .select({ mainBannerImage: blogs.mainBannerImage })
        .from(blogs)
        .where(eq(blogs.id, id))
        .limit(1)

      if (
        existing?.mainBannerImage &&
        existing.mainBannerImage !== data.mainBannerImage
      ) {
        await deleteBlogImageFromStorage(existing.mainBannerImage)
      }
    }

    const [updated] = await db
      .update(blogs)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(blogs.id, id))
      .returning()

    if (!updated) {
      return { success: false, error: "Blog post not found" }
    }

    safeRevalidatePath("/blog")
    safeRevalidatePath("/admin/blogs")
    if (updated.slug) {
      safeRevalidatePath(`/blog/${updated.slug}`)
    }

    return { success: true, data: updated }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update blog"
    console.error(`Error updating blog ${id}:`, error)
    return {
      success: false,
      error: message,
    }
  }
}

/**
 * Delete a blog
 */
export async function deleteBlog(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Fetch and remove associated image from Supabase storage
    const [existing] = await db
      .select({ mainBannerImage: blogs.mainBannerImage })
      .from(blogs)
      .where(eq(blogs.id, id))
      .limit(1)

    if (existing?.mainBannerImage) {
      await deleteBlogImageFromStorage(existing.mainBannerImage)
    }

    const [deleted] = await db
      .delete(blogs)
      .where(eq(blogs.id, id))
      .returning()

    safeRevalidatePath("/blog")
    safeRevalidatePath("/admin/blogs")
    if (deleted?.slug) {
      safeRevalidatePath(`/blog/${deleted.slug}`)
    }

    return { success: true }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete blog"
    console.error(`Error deleting blog ${id}:`, error)
    return {
      success: false,
      error: message,
    }
  }
}

/**
 * Toggle draft status
 */
export async function toggleBlogDraft(
  id: string,
  isDraft: boolean
): Promise<{ success: boolean; error?: string }> {
  try {
    const [updated] = await db
      .update(blogs)
      .set({
        isDraft,
        updatedAt: new Date(),
      })
      .where(eq(blogs.id, id))
      .returning()

    safeRevalidatePath("/blog")
    safeRevalidatePath("/admin/blogs")
    if (updated?.slug) {
      safeRevalidatePath(`/blog/${updated.slug}`)
    }

    return { success: true }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to toggle status"
    console.error(`Error toggling draft status for ${id}:`, error)
    return {
      success: false,
      error: message,
    }
  }
}

