"use client"

import React, { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  IconArrowLeft,
  IconCheck,
  IconPlus,
  IconTrash,
  IconPhoto,
  IconHelpCircle,
  IconFileText,
  IconSeo,
  IconUpload,
} from "@tabler/icons-react"
import BlogContentEditor from "./BlogContentEditor"
import {
  initialCategories,
  initialBlogs,
  initialFaqs,
  Blog,
  BlogCategory,
  BlogFaq,
} from "@/lib/adminBlogData"

interface BlogFormProps {
  initialBlog?: Blog
  isEdit?: boolean
  onCancel?: () => void
  onSaved?: () => void
}

export default function BlogForm({
  initialBlog,
  isEdit = false,
  onCancel,
  onSaved,
}: BlogFormProps) {
  const router = useRouter()

  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Form Fields matching Drizzle 'blogs' schema
  const [title, setTitle] = useState(initialBlog?.title || "")
  const [slug, setSlug] = useState(initialBlog?.slug || "")
  const [categoryId, setCategoryId] = useState(
    initialBlog?.categoryId || initialCategories[0]?.id || ""
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

  // FAQs matching Drizzle 'blog_faqs' schema
  const [faqs, setFaqs] = useState<
    Array<{ id: string; question: string; answer: string; orderIndex: number }>
  >([])

  const [isDraggingOver, setIsDraggingOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Load categories from localStorage
    const storedCats = localStorage.getItem("rone_admin_categories")
    if (storedCats) {
      const parsed = JSON.parse(storedCats)
      setCategories(parsed)
      if (!initialBlog && parsed.length > 0) {
        setCategoryId(parsed[0].id)
      }
    } else {
      setCategories(initialCategories)
      localStorage.setItem("rone_admin_categories", JSON.stringify(initialCategories))
    }

    // Load FAQs for this blog if editing
    if (isEdit && initialBlog) {
      const storedFaqs = localStorage.getItem("rone_admin_faqs")
      if (storedFaqs) {
        const allFaqs: BlogFaq[] = JSON.parse(storedFaqs)
        const currentBlogFaqs = allFaqs
          .filter((f) => f.blogId === initialBlog.id)
          .sort((a, b) => a.orderIndex - b.orderIndex)
        setFaqs(currentBlogFaqs)
      } else {
        const currentBlogFaqs = initialFaqs
          .filter((f) => f.blogId === initialBlog.id)
          .sort((a, b) => a.orderIndex - b.orderIndex)
        setFaqs(currentBlogFaqs)
      }
    }
  }, [initialBlog, isEdit])



  // FAQ Handlers
  const handleAddFaq = () => {
    setFaqs([
      ...faqs,
      {
        id: `faq-${Date.now()}`,
        question: "",
        answer: "",
        orderIndex: faqs.length,
      },
    ])
  }

  const handleUpdateFaq = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    const updated = [...faqs]
    updated[index][field] = value
    setFaqs(updated)
  }

  const handleRemoveFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index))
  }

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  // File Upload Handler (PC Upload)
  const processUploadedFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (PNG, JPG, WEBP, etc.)")
      return
    }
    if (file.size > 15 * 1024 * 1024) {
      alert("File size exceeds 15MB limit.")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      if (result) {
        setMainBannerImage(result)
        showToast(`Image "${file.name}" uploaded successfully!`)
      }
    }
    reader.readAsDataURL(file)
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

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !slug.trim()) {
      alert("Please provide both Title and Slug.")
      return
    }

    const blogId = initialBlog?.id || `blog-${Date.now()}`
    const nowIso = new Date().toISOString()

    const newBlogEntry: Blog = {
      id: blogId,
      title: title.trim(),
      slug: slug.trim(),
      categoryId,
      publishDate,
      mainBannerImage: mainBannerImage.trim(),
      authorName: authorName.trim(),
      metaTitle: metaTitle.trim() || null,
      metaDescription: metaDescription.trim(),
      content: content.trim(),
      isDraft,
      createdAt: initialBlog?.createdAt || nowIso,
      updatedAt: nowIso,
    }

    // Persist Blog to localStorage
    const storedBlogs = localStorage.getItem("rone_admin_blogs")
    let blogsList: Blog[] = storedBlogs ? JSON.parse(storedBlogs) : initialBlogs

    if (isEdit) {
      blogsList = blogsList.map((b) => (b.id === blogId ? newBlogEntry : b))
    } else {
      blogsList = [newBlogEntry, ...blogsList]
    }
    localStorage.setItem("rone_admin_blogs", JSON.stringify(blogsList))

    // Persist FAQs to localStorage
    const storedFaqs = localStorage.getItem("rone_admin_faqs")
    let allFaqsList: BlogFaq[] = storedFaqs ? JSON.parse(storedFaqs) : initialFaqs
    allFaqsList = allFaqsList.filter((f) => f.blogId !== blogId)
    const formattedFaqs: BlogFaq[] = faqs
      .filter((f) => f.question.trim())
      .map((f, i) => ({
        id: f.id || `faq-${Date.now()}-${i}`,
        blogId,
        question: f.question.trim(),
        answer: f.answer.trim(),
        orderIndex: i,
        createdAt: nowIso,
        updatedAt: nowIso,
      }))
    allFaqsList = [...allFaqsList, ...formattedFaqs]
    localStorage.setItem("rone_admin_faqs", JSON.stringify(allFaqsList))

    showToast(isEdit ? "Blog updated successfully!" : "Blog created successfully!")
    setTimeout(() => {
      if (onSaved) {
        onSaved()
      } else {
        router.push("/admin/blogs")
      }
    }, 800)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto font-inter">
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
              className="p-2 text-slate-600 hover:text-slate-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              title="Back to list"
            >
              <IconArrowLeft size={18} />
            </button>
          ) : (
            <Link
              href="/admin/blogs"
              className="p-2 text-slate-600 hover:text-slate-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <IconArrowLeft size={18} />
            </Link>
          )}
          <div>
            <h1 className="text-xl sm:text-2xl font-black font-poppins text-slate-900">
              {isEdit ? "Edit Blog Article" : "Create New Blog Article"}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Draft Toggle Status Pill */}
          <button
            type="button"
            onClick={() => setIsDraft(!isDraft)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer flex items-center gap-1.5 ${
              isDraft
                ? "bg-amber-50 text-amber-700 border-amber-200"
                : "bg-emerald-50 text-emerald-700 border-emerald-200"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                isDraft ? "bg-amber-500" : "bg-emerald-500"
              }`}
            />
            <span>{isDraft ? "Saving as Draft" : "Status: Published"}</span>
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold text-white bg-[#1565C0] hover:bg-blue-600 shadow-md shadow-blue-500/20 transition-all active:scale-95 cursor-pointer"
          >
            <IconCheck size={18} />
            <span>{isEdit ? "Update Blog" : "Save & Publish"}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Form (8 cols) / Right Settings (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form: Main Content & Body (Col 8) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Card: Core Blog Details */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-5">
            <h3 className="text-sm font-bold font-poppins uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <IconFileText size={17} className="text-[#1565C0]" />
              <span>Core Information</span>
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
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. How Industrial Solar Is Used Across Different Industries"
                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1565C0] focus:bg-white text-slate-900 font-medium transition-all"
              />
            </div>

            {/* Slug without Generate Button */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Slug (URL) <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden focus-within:border-[#1565C0] focus-within:bg-white transition-all">
                <span className="px-3 text-xs text-slate-400 bg-gray-100/80 border-r border-gray-200 select-none py-2.5 font-mono">
                  /blog/
                </span>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="how-industrial-solar-powers-industry"
                  className="w-full px-3 py-2.5 text-xs text-slate-800 font-mono bg-transparent focus:outline-none"
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

          {/* Card: Blog FAQs */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold font-poppins uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <IconHelpCircle size={17} className="text-[#1565C0]" />
                  <span>Blog FAQs</span>
                </h3>
              </div>

              <button
                type="button"
                onClick={handleAddFaq}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#1565C0] bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
              >
                <IconPlus size={15} />
                <span>Add FAQ</span>
              </button>
            </div>

            {faqs.length === 0 ? (
              <div className="py-8 text-center bg-gray-50/70 rounded-xl border border-dashed border-gray-200">
                <IconHelpCircle size={28} className="mx-auto text-slate-300 mb-2" />
                <p className="text-xs text-slate-500">
                  No FAQs added for this article yet.
                </p>
                <button
                  type="button"
                  onClick={handleAddFaq}
                  className="mt-2 text-xs font-bold text-[#1565C0] hover:underline"
                >
                  + Add First Question
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={faq.id || index}
                    className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3 relative group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        FAQ #{index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFaq(index)}
                        className="text-red-400 hover:text-red-600 p-1 rounded-md hover:bg-red-50 transition-colors"
                        title="Remove question"
                      >
                        <IconTrash size={15} />
                      </button>
                    </div>

                    <div>
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) =>
                          handleUpdateFaq(index, "question", e.target.value)
                        }
                        placeholder="Question title..."
                        className="w-full px-3 py-2 text-xs font-semibold bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#1565C0] text-slate-800"
                      />
                    </div>

                    <div>
                      <textarea
                        rows={2}
                        value={faq.answer}
                        onChange={(e) =>
                          handleUpdateFaq(index, "answer", e.target.value)
                        }
                        placeholder="Answer details..."
                        className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#1565C0] text-slate-700 leading-relaxed"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar: Publishing Settings & PC Image Upload (Col 4) */}
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
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
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

          {/* Card: Main Banner Image (PC File Upload System) */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold font-poppins uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <IconPhoto size={16} className="text-[#1565C0]" />
              <span>Main Banner Image</span>
            </h3>

            {/* Hidden native file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            {/* Preview Box if image exists */}
            {mainBannerImage ? (
              <div className="space-y-3">
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-100 border border-gray-200 group">
                  <img
                    src={mainBannerImage}
                    alt="Banner preview"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold text-white bg-[#1565C0] hover:bg-blue-600 transition-colors cursor-pointer shadow-xs"
                  >
                    <IconUpload size={14} />
                    <span>Upload from PC</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMainBannerImage("")}
                    className="p-2 text-slate-400 hover:text-red-500 border border-gray-200 hover:border-red-200 rounded-lg transition-colors cursor-pointer"
                    title="Remove Image"
                  >
                    <IconTrash size={16} />
                  </button>
                </div>
              </div>
            ) : (
              /* Drag & Drop Upload Zone */
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
                  or drag and drop your image file here
                </p>
                <span className="inline-block mt-3 px-3 py-1 bg-white border border-gray-200 rounded-md text-[10px] font-semibold text-slate-500">
                  PNG, JPG, WEBP (Max 15MB)
                </span>
              </div>
            )}
          </div>

          {/* SEO Metadata */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold font-poppins uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <IconSeo size={16} className="text-[#1565C0]" />
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
