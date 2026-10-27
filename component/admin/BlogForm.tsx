"use client"

import React, { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  IconArrowLeft,
  IconCheck,
  IconPhoto,
  IconFileText,
  IconSeo,
  IconUpload,
  IconTrash,
} from "@tabler/icons-react"
import { SuccessModal } from "@/component/admin/AdminModal"
import BlogContentEditor from "./BlogContentEditor"
import type { Blog, BlogCategory } from "@/db/schema"
import { createBlog, updateBlog, getCategories } from "@/app/actions/blogActions"
import {
  uploadBlogImage,
  getStorageImageUrl,
  deleteBlogImageFromStorage,
} from "@/lib/supabaseClient"

interface BlogFormProps {
  initialBlog?: Blog | null
  categories?: BlogCategory[]
  isEdit?: boolean
  onCancel?: () => void
  onSaved?: () => void
}

export default function BlogForm({
  initialBlog,
  categories: initialCatList = [],
  isEdit = false,
  onCancel,
  onSaved,
}: BlogFormProps) {
  const router = useRouter()

  const [categories, setCategories] = useState<BlogCategory[]>(initialCatList)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [successModal, setSuccessModal] = useState<{
    isOpen: boolean
    title: string
    message: string
  } | null>(null)

  // Form Fields matching Drizzle 'blogs' schema
  const [title, setTitle] = useState(initialBlog?.title || "")
  const [slug, setSlug] = useState(initialBlog?.slug || "")
  const [categoryId, setCategoryId] = useState(
    initialBlog?.categoryId || initialCatList[0]?.id || ""
  )
  const [publishDate, setPublishDate] = useState(
    initialBlog?.publishDate || new Date().toISOString().split("T")[0]
  )
  const [mainBannerImage, setMainBannerImage] = useState(
    initialBlog?.mainBannerImage || ""
  )
  const [authorName, setAuthorName] = useState(
    initialBlog?.authorName || "R-ONE Power Engineering Team"
  )
  const [metaTitle, setMetaTitle] = useState(initialBlog?.metaTitle || "")
  const [metaDescription, setMetaDescription] = useState(
    initialBlog?.metaDescription || ""
  )
  const [content, setContent] = useState(initialBlog?.content || "")
  const [isDraft, setIsDraft] = useState<boolean>(initialBlog?.isDraft ?? false)

  // File Upload State
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDraggingOver, setIsDraggingOver] = useState(false)

  // Load categories if not provided
  useEffect(() => {
    if (categories.length === 0) {
      getCategories().then((cats) => {
        setCategories(cats)
        if (!categoryId && cats.length > 0) {
          setCategoryId(cats[0].id)
        }
      })
    } else if (!categoryId && categories.length > 0) {
      setCategoryId(categories[0].id)
    }
  }, [categories, categoryId])

  // Synchronize form fields whenever initialBlog changes (for edit mode)
  useEffect(() => {
    if (initialBlog) {
      setTitle(initialBlog.title || "")
      setSlug(initialBlog.slug || "")
      setCategoryId(initialBlog.categoryId || "")
      setPublishDate(initialBlog.publishDate || new Date().toISOString().split("T")[0])
      setMainBannerImage(initialBlog.mainBannerImage || "")
      setAuthorName(initialBlog.authorName || "R-ONE Power Engineering Team")
      setMetaTitle(initialBlog.metaTitle || "")
      setMetaDescription(initialBlog.metaDescription || "")
      setContent(initialBlog.content || "")
      setIsDraft(initialBlog.isDraft ?? false)
    }
  }, [initialBlog])

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Auto-slug generator from title
  const handleGenerateSlug = (val: string) => {
    const generated = val
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "")
    setSlug(generated)
  }

  // Process PC Image File Selection via Supabase Storage
  const processUploadedFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (PNG, JPG, WEBP).")
      return
    }

    const MAX_FILE_SIZE = 1 * 1024 * 1024 // 1 MB
    if (file.size > MAX_FILE_SIZE) {
      const currentMb = (file.size / (1024 * 1024)).toFixed(2)
      alert(`Image size (${currentMb} MB) exceeds the 1 MB limit. Please select an image of 1 MB or smaller.`)
      return
    }

    setIsUploadingImage(true)
    showToast("Uploading to Supabase Storage...")

    try {
      const res = await uploadBlogImage(file)
      if (res.error || !res.path) {
        alert(`Failed to upload to Supabase: ${res.error || "Unknown error"}`)
      } else {
        // Save clean relative path (e.g. "ronepower/blogs/1793013200363-mqittf.png")
        setMainBannerImage(res.path)
        showToast("Image uploaded to Supabase Storage successfully!")
      }
    } catch (err: unknown) {
      console.error("Image upload exception:", err)
      alert("Failed to upload image to Supabase Storage.")
    } finally {
      setIsUploadingImage(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processUploadedFile(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDraggingOver(true)
  }

  const handleDragLeave = () => {
    setIsDraggingOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDraggingOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      processUploadedFile(file)
    }
  }

  // Form Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !slug.trim()) {
      alert("Please provide both Title and Slug.")
      return
    }

    if (!categoryId) {
      alert("Please select a Category.")
      return
    }

    setIsSubmitting(true)

    try {
      const payload = {
        title: title.trim(),
        slug: slug.trim(),
        categoryId,
        publishDate,
        mainBannerImage: mainBannerImage.trim() || "/blog/featured-solar-industrial.jpg",
        authorName: authorName.trim(),
        metaTitle: metaTitle.trim() || null,
        metaDescription: metaDescription.trim(),
        content: content.trim(),
        isDraft,
      }

      if (isEdit && initialBlog?.id) {
        const result = await updateBlog(initialBlog.id, payload)
        if (!result.success) {
          alert(result.error || "Failed to update blog")
          setIsSubmitting(false)
          return
        }
        setIsSubmitting(false)
        setSuccessModal({
          isOpen: true,
          title: "Blog Updated Successfully!",
          message: `"${title.trim()}" has been updated successfully.`,
        })
      } else {
        const result = await createBlog(payload)
        if (!result.success) {
          alert(result.error || "Failed to create blog")
          setIsSubmitting(false)
          return
        }
        setIsSubmitting(false)
        setSuccessModal({
          isOpen: true,
          title: "Blog Created Successfully!",
          message: `"${title.trim()}" has been created and saved successfully.`,
        })
      }
    } catch (err: unknown) {
      console.error("Error saving blog:", err)
      const msg = err instanceof Error ? err.message : "An unexpected error occurred."
      alert(msg)
      setIsSubmitting(false)
    }
  }

  const handleCloseSuccessModal = () => {
    setSuccessModal(null)
    if (onSaved) {
      onSaved()
    } else {
      router.push("/admin/blogs")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-6xl mx-auto font-inter">
      {/* Middle Success Popup */}
      {successModal && (
        <SuccessModal
          isOpen={successModal.isOpen}
          title={successModal.title}
          message={successModal.message}
          buttonText="Go to Blogs List"
          onClose={handleCloseSuccessModal}
        />
      )}

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2 text-sm border border-slate-700 animate-in fade-in duration-200">
          <IconCheck size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200/80">
        <div className="flex items-center gap-3">
          {onCancel ? (
            <button
              type="button"
              onClick={onCancel}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <IconArrowLeft size={20} />
            </button>
          ) : (
            <Link
              href="/admin/blogs"
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <IconArrowLeft size={20} />
            </Link>
          )}

          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-poppins text-slate-900">
              {isEdit ? "Edit Article" : "Create New Article"}
            </h2>
            <p className="text-xs text-slate-500">
              Manage content, author metadata, SEO tags, and publish settings.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="px-4 py-2 text-xs font-bold text-slate-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold text-white bg-[#1565C0] hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <IconCheck size={16} />
                <span>{isEdit ? "Update Article" : "Save Article"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content Area (Col 8) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Card: Article Details */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold font-poppins uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <IconFileText size={16} className="text-[#1565C0]" />
              <span>Article Details</span>
            </h3>

            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                  if (!isEdit && !slug) {
                    handleGenerateSlug(e.target.value)
                  }
                }}
                placeholder="e.g. How Industrial Solar Is Used Across Different Industries"
                className="w-full px-4 py-2.5 text-sm font-semibold bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1565C0] focus:bg-white text-slate-900 transition-all"
              />
            </div>

            {/* Slug */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Slug (URL Path) <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => handleGenerateSlug(title)}
                  className="text-[11px] font-bold text-[#1565C0] hover:underline cursor-pointer"
                >
                  Generate from title
                </button>
              </div>
              <div className="flex items-center rounded-xl bg-gray-50 border border-gray-200 focus-within:border-[#1565C0] focus-within:bg-white overflow-hidden transition-all">
                <span className="px-3.5 text-xs text-slate-400 bg-gray-100/80 border-r border-gray-200 select-none py-2.5 font-mono">
                  /blog/
                </span>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="how-industrial-solar-is-used"
                  className="w-full py-2.5 px-3 text-xs font-mono font-medium text-slate-800 bg-transparent focus:outline-none"
                />
              </div>
            </div>

            {/* Author Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Author Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="R-ONE Power Engineering Team"
                className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1565C0] focus:bg-white text-slate-900 transition-all"
              />
            </div>
          </div>

          {/* Main Blog Content - Jodit Rich Text Editor */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800">
              Main Blog Content
            </label>
            <BlogContentEditor
              value={content}
              onChange={(newContent) => setContent(newContent)}
              placeholder="Write your blog content here..."
            />
          </div>

        </div>

        {/* Right Sidebar (Col 4) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Card: Publishing Settings */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold font-poppins uppercase tracking-wider text-slate-400">
              Publishing Settings
            </h3>

            {/* Category Select */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs font-semibold bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1565C0] text-slate-800"
              >
                {categories.length === 0 ? (
                  <option value="">No categories found</option>
                ) : (
                  categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Publish Date */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Publish Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
                className="w-full px-3.5 py-2 text-xs font-semibold bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1565C0] text-slate-800"
              />
            </div>

            {/* Status Radio */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Publishing Status
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setIsDraft(false)}
                  className={`py-2 px-3 text-xs font-bold rounded-lg border text-center transition-all cursor-pointer ${
                    !isDraft
                      ? "bg-emerald-500 text-white border-emerald-500 shadow-sm"
                      : "bg-gray-50 text-slate-600 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  Published
                </button>
                <button
                  type="button"
                  onClick={() => setIsDraft(true)}
                  className={`py-2 px-3 text-xs font-bold rounded-lg border text-center transition-all cursor-pointer ${
                    isDraft
                      ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                      : "bg-gray-50 text-slate-600 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  Draft
                </button>
              </div>
            </div>
          </div>

          {/* Card: Main Banner Image (Supabase Storage Bucket System) */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold font-poppins uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <IconPhoto size={16} className="text-[#1565C0]" />
                <span>Main Banner Image</span>
              </h3>
           
            </div>

            {/* Hidden native file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            {/* Loading Indicator */}
            {isUploadingImage ? (
              <div className="border-2 border-dashed border-[#1565C0] bg-blue-50/50 rounded-xl p-8 text-center space-y-2">
                <div className="w-7 h-7 mx-auto border-3 border-slate-200 border-t-[#1565C0] rounded-full animate-spin" />
                <p className="text-xs font-bold text-slate-700 font-poppins">
                  Uploading to Supabase Storage...
                </p>
                <p className="text-[11px] text-slate-400">
                  Saving file and generating public CDN link
                </p>
              </div>
            ) : mainBannerImage ? (
              /* Preview Box if image exists */
              <div className="space-y-3">
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-100 border border-gray-200 group">
                  <img
                    src={getStorageImageUrl(mainBannerImage)}
                    alt="Banner preview"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold text-white bg-[#1565C0] hover:bg-blue-700 transition-colors cursor-pointer shadow-xs"
                  >
                    <IconUpload size={14} />
                    <span>Upload New</span>
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      if (mainBannerImage && mainBannerImage.startsWith("ronepower/blogs/")) {
                        await deleteBlogImageFromStorage(mainBannerImage)
                      }
                      setMainBannerImage("")
                      showToast("Image removed from storage")
                    }}
                    className="p-2 text-slate-400 hover:text-red-500 border border-gray-200 hover:border-red-200 rounded-lg transition-colors cursor-pointer"
                    title="Remove Image"
                  >
                    <IconTrash size={16} />
                  </button>
                </div>
              </div>
            ) : (
              /* Drag & Drop Upload Zone (Teammate's rounded UI) */
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                  isDraggingOver
                    ? "border-[#1565C0] bg-blue-50/60"
                    : "border-gray-300 hover:border-[#1565C0] hover:bg-gray-50"
                }`}
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-blue-50 text-[#1565C0] flex items-center justify-center mb-3">
                  <IconUpload size={22} />
                </div>
                <p className="text-xs font-bold text-slate-800">
                  Click to upload from PC
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  PNG, JPG or WEBP (Max 1MB) • Uploads to Bucket
                </p>
              </div>
            )}

            {/* Storage path / URL input fallback */}
            <div className="pt-1">
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Storage Path / URL:
              </label>
              <input
                type="text"
                value={mainBannerImage}
                onChange={(e) => setMainBannerImage(e.target.value)}
                placeholder="ronepower/blogs/... or /blog/solar.jpg"
                className="w-full px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#1565C0] font-mono text-[11px]"
              />
            </div>
          </div>

          {/* Card: SEO Meta Tags (Teammate's layout) */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold font-poppins uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <span>SEO Meta Tags</span>
            </h3>

            {/* Meta Title */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Meta Title
                </label>
                <span className="text-[10px] text-slate-400">
                  {metaTitle.length}/60 chars
                </span>
              </div>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="R-ONE Power Solar EPC India"
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1565C0] text-slate-900"
              />
            </div>

            {/* Meta Description */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Meta Description <span className="text-red-500">*</span>
                </label>
                <span className="text-[10px] text-slate-400">
                  {metaDescription.length}/160 chars
                </span>
              </div>
              <textarea
                rows={3}
                required
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Summary for Google and social previews..."
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1565C0] text-slate-900 leading-relaxed"
              />
            </div>
          </div>

        </div>
      </div>
    </form>
  )
}
