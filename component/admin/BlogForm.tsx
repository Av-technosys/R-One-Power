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
  IconChevronDown,
  IconList,
  IconListNumbers,
  IconTable,
  IconLink,
  IconCode,
  IconDroplet,
  IconArrowsVertical,
  IconAlignLeft,
  IconAlignCenter,
  IconAlignRight,
  IconAlignJustified,
} from "@tabler/icons-react"
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

  // Editor states & toolbar dropdowns
  const [isCodeView, setIsCodeView] = useState(false)
  const [activeHeadingMenu, setActiveHeadingMenu] = useState(false)
  const [activeSizeMenu, setActiveSizeMenu] = useState(false)
  const [activeColorMenu, setActiveColorMenu] = useState(false)
  const [activeAlignMenu, setActiveAlignMenu] = useState(false)
  const [isDraggingOver, setIsDraggingOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const editorRef = useRef<HTMLDivElement>(null)

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

  // Word & character counts
  const plainText = content.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ")
  const charCount = plainText.length
  const wordCount = plainText.trim() ? plainText.trim().split(/\s+/).length : 0

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

  // Rich Text Editor Commands
  const execCmd = (command: string, value: string | undefined = undefined) => {
    if (isCodeView) return
    document.execCommand(command, false, value)
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML)
    }
  }

  const applyHeading = (tag: string) => {
    setActiveHeadingMenu(false)
    if (tag === "p") {
      execCmd("formatBlock", "<p>")
    } else {
      execCmd("formatBlock", `<${tag}>`)
    }
  }

  const applyFontSize = (size: string) => {
    setActiveSizeMenu(false)
    execCmd("fontSize", size)
  }

  const applyColor = (color: string) => {
    setActiveColorMenu(false)
    execCmd("foreColor", color)
  }

  const insertLink = () => {
    const url = prompt("Enter hyperlink URL:", "https://")
    if (url) {
      execCmd("createLink", url)
    }
  }

  const insertImage = () => {
    const url = prompt("Enter image URL:", "https://")
    if (url) {
      execCmd("insertImage", url)
    }
  }

  const insertTable = () => {
    const tableHtml = `
      <table style="width:100%; border-collapse: collapse; margin: 16px 0; border: 1px solid #cbd5e1;">
        <thead>
          <tr style="background: #f1f5f9;">
            <th style="border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left;">Header 1</th>
            <th style="border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left;">Header 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #cbd5e1; padding: 8px 12px;">Sample Data 1</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px 12px;">Sample Data 2</td>
          </tr>
        </tbody>
      </table>
    `
    execCmd("insertHTML", tableHtml)
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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold text-white bg-[#1E88E5] hover:bg-blue-600 shadow-md shadow-blue-500/20 transition-all active:scale-95 cursor-pointer"
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
              <IconFileText size={17} className="text-[#1E88E5]" />
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
                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1E88E5] focus:bg-white text-slate-900 font-medium transition-all"
              />
            </div>

            {/* Slug without Generate Button */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Slug (URL) <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden focus-within:border-[#1E88E5] focus-within:bg-white transition-all">
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
                className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1E88E5] focus:bg-white text-slate-900 transition-all"
              />
            </div>
          </div>

          {/* WYSIWYG Rich Text Editor matching Image 2 */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800">
              Main Blog Content
            </label>

            <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-2xs transition-all focus-within:border-gray-400">
              {/* Top Toolbar matching Image 2 */}
              <div className="flex items-center flex-wrap gap-1 px-3 py-2 border-b border-gray-200 bg-[#F9FAFB] text-slate-700 text-xs select-none">
                
                {/* Paragraph Dropdown ¶ ˅ */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveHeadingMenu(!activeHeadingMenu)
                      setActiveSizeMenu(false)
                      setActiveColorMenu(false)
                      setActiveAlignMenu(false)
                    }}
                    className="flex items-center gap-1 px-2 py-1 hover:bg-gray-200 rounded text-slate-700 font-serif"
                    title="Paragraph & Headings"
                  >
                    <span className="text-sm font-bold leading-none">¶</span>
                    <IconChevronDown size={12} className="text-slate-400" />
                  </button>

                  {activeHeadingMenu && (
                    <div className="absolute left-0 top-full mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 text-xs">
                      <button
                        type="button"
                        onClick={() => applyHeading("p")}
                        className="w-full text-left px-3 py-1.5 hover:bg-blue-50 text-slate-700"
                      >
                        Paragraph
                      </button>
                      <button
                        type="button"
                        onClick={() => applyHeading("h1")}
                        className="w-full text-left px-3 py-1.5 hover:bg-blue-50 text-slate-900 font-bold text-base"
                      >
                        Heading 1
                      </button>
                      <button
                        type="button"
                        onClick={() => applyHeading("h2")}
                        className="w-full text-left px-3 py-1.5 hover:bg-blue-50 text-slate-900 font-bold text-sm"
                      >
                        Heading 2
                      </button>
                      <button
                        type="button"
                        onClick={() => applyHeading("h3")}
                        className="w-full text-left px-3 py-1.5 hover:bg-blue-50 text-slate-900 font-semibold text-xs"
                      >
                        Heading 3
                      </button>
                    </div>
                  )}
                </div>

                {/* Font Size Dropdown ↕ ˅ */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSizeMenu(!activeSizeMenu)
                      setActiveHeadingMenu(false)
                      setActiveColorMenu(false)
                      setActiveAlignMenu(false)
                    }}
                    className="flex items-center gap-1 px-2 py-1 hover:bg-gray-200 rounded text-slate-700"
                    title="Font Size"
                  >
                    <IconArrowsVertical size={14} />
                    <IconChevronDown size={12} className="text-slate-400" />
                  </button>

                  {activeSizeMenu && (
                    <div className="absolute left-0 top-full mt-1 w-28 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 text-xs">
                      <button
                        type="button"
                        onClick={() => applyFontSize("2")}
                        className="w-full text-left px-3 py-1.5 hover:bg-blue-50 text-slate-700"
                      >
                        Small
                      </button>
                      <button
                        type="button"
                        onClick={() => applyFontSize("3")}
                        className="w-full text-left px-3 py-1.5 hover:bg-blue-50 text-slate-700"
                      >
                        Normal
                      </button>
                      <button
                        type="button"
                        onClick={() => applyFontSize("4")}
                        className="w-full text-left px-3 py-1.5 hover:bg-blue-50 text-slate-700"
                      >
                        Medium
                      </button>
                      <button
                        type="button"
                        onClick={() => applyFontSize("5")}
                        className="w-full text-left px-3 py-1.5 hover:bg-blue-50 text-slate-700"
                      >
                        Large
                      </button>
                    </div>
                  )}
                </div>

                {/* Text Color Dropdown 💧 ˅ */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveColorMenu(!activeColorMenu)
                      setActiveHeadingMenu(false)
                      setActiveSizeMenu(false)
                      setActiveAlignMenu(false)
                    }}
                    className="flex items-center gap-1 px-2 py-1 hover:bg-gray-200 rounded text-slate-700"
                    title="Text Color"
                  >
                    <IconDroplet size={14} className="text-slate-600" />
                    <IconChevronDown size={12} className="text-slate-400" />
                  </button>

                  {activeColorMenu && (
                    <div className="absolute left-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-20 grid grid-cols-4 gap-1.5">
                      {[
                        { color: "#000000", label: "Black" },
                        { color: "#1E88E5", label: "Blue" },
                        { color: "#10B981", label: "Green" },
                        { color: "#F59E0B", label: "Orange" },
                        { color: "#EF4444", label: "Red" },
                        { color: "#8B5CF6", label: "Purple" },
                        { color: "#64748B", label: "Slate" },
                        { color: "#0B132B", label: "Navy" },
                      ].map((c) => (
                        <button
                          key={c.color}
                          type="button"
                          onClick={() => applyColor(c.color)}
                          className="w-6 h-6 rounded-full border border-gray-300 hover:scale-110 transition-transform"
                          style={{ backgroundColor: c.color }}
                          title={c.label}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="h-4 w-px bg-gray-300 mx-1" />

                {/* Formatting: B I U S */}
                <button
                  type="button"
                  onClick={() => execCmd("bold")}
                  className="px-2 py-1 hover:bg-gray-200 rounded font-bold text-slate-800"
                  title="Bold"
                >
                  B
                </button>
                <button
                  type="button"
                  onClick={() => execCmd("italic")}
                  className="px-2 py-1 hover:bg-gray-200 rounded italic font-serif text-slate-800"
                  title="Italic"
                >
                  I
                </button>
                <button
                  type="button"
                  onClick={() => execCmd("underline")}
                  className="px-2 py-1 hover:bg-gray-200 rounded underline text-slate-800"
                  title="Underline"
                >
                  U
                </button>
                <button
                  type="button"
                  onClick={() => execCmd("strikeThrough")}
                  className="px-2 py-1 hover:bg-gray-200 rounded line-through text-slate-800"
                  title="Strikethrough"
                >
                  S
                </button>

                {/* Align Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveAlignMenu(!activeAlignMenu)
                      setActiveHeadingMenu(false)
                      setActiveSizeMenu(false)
                      setActiveColorMenu(false)
                    }}
                    className="flex items-center gap-1 px-2 py-1 hover:bg-gray-200 rounded text-slate-700"
                    title="Text Alignment"
                  >
                    <IconAlignLeft size={14} />
                    <IconChevronDown size={12} className="text-slate-400" />
                  </button>

                  {activeAlignMenu && (
                    <div className="absolute left-0 top-full mt-1 w-28 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 text-xs">
                      <button
                        type="button"
                        onClick={() => {
                          execCmd("justifyLeft")
                          setActiveAlignMenu(false)
                        }}
                        className="flex items-center gap-2 w-full text-left px-3 py-1.5 hover:bg-blue-50 text-slate-700"
                      >
                        <IconAlignLeft size={14} />
                        <span>Left</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          execCmd("justifyCenter")
                          setActiveAlignMenu(false)
                        }}
                        className="flex items-center gap-2 w-full text-left px-3 py-1.5 hover:bg-blue-50 text-slate-700"
                      >
                        <IconAlignCenter size={14} />
                        <span>Center</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          execCmd("justifyRight")
                          setActiveAlignMenu(false)
                        }}
                        className="flex items-center gap-2 w-full text-left px-3 py-1.5 hover:bg-blue-50 text-slate-700"
                      >
                        <IconAlignRight size={14} />
                        <span>Right</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          execCmd("justifyFull")
                          setActiveAlignMenu(false)
                        }}
                        className="flex items-center gap-2 w-full text-left px-3 py-1.5 hover:bg-blue-50 text-slate-700"
                      >
                        <IconAlignJustified size={14} />
                        <span>Justify</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="h-4 w-px bg-gray-300 mx-1" />

                {/* Lists */}
                <button
                  type="button"
                  onClick={() => execCmd("insertUnorderedList")}
                  className="flex items-center gap-0.5 px-2 py-1 hover:bg-gray-200 rounded text-slate-700"
                  title="Bullet List"
                >
                  <IconList size={15} />
                  <IconChevronDown size={10} className="text-slate-400" />
                </button>
                <button
                  type="button"
                  onClick={() => execCmd("insertOrderedList")}
                  className="flex items-center gap-0.5 px-2 py-1 hover:bg-gray-200 rounded text-slate-700"
                  title="Numbered List"
                >
                  <IconListNumbers size={15} />
                  <IconChevronDown size={10} className="text-slate-400" />
                </button>

                {/* Divider */}
                <div className="h-4 w-px bg-gray-300 mx-1" />

                {/* Table, Link, Image, Code View */}
                <button
                  type="button"
                  onClick={insertTable}
                  className="p-1 hover:bg-gray-200 rounded text-slate-700"
                  title="Insert Table"
                >
                  <IconTable size={15} />
                </button>
                <button
                  type="button"
                  onClick={insertLink}
                  className="p-1 hover:bg-gray-200 rounded text-slate-700"
                  title="Insert Link"
                >
                  <IconLink size={15} />
                </button>
                <button
                  type="button"
                  onClick={insertImage}
                  className="p-1 hover:bg-gray-200 rounded text-slate-700"
                  title="Insert Image URL"
                >
                  <IconPhoto size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsCodeView(!isCodeView)}
                  className={`p-1 rounded transition-colors ${
                    isCodeView ? "bg-blue-100 text-[#1E88E5]" : "hover:bg-gray-200 text-slate-700"
                  }`}
                  title="Toggle HTML Source Code View"
                >
                  <IconCode size={15} />
                </button>
              </div>

              {/* Editable Writing Area with Placeholder */}
              <div className="relative min-h-[340px] bg-white">
                {isCodeView ? (
                  <textarea
                    rows={14}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full h-full p-4 font-mono text-xs text-slate-800 bg-slate-50 focus:outline-none"
                    placeholder="Write your blog content here..."
                  />
                ) : (
                  <div className="relative min-h-[340px]">
                    {(!content || content === "<br>" || content.trim() === "") && (
                      <div className="absolute top-4 left-4 text-sm text-gray-400 pointer-events-none select-none">
                        Write your blog content here...
                      </div>
                    )}
                    <div
                      ref={editorRef}
                      contentEditable
                      suppressContentEditableWarning
                      onInput={(e) => {
                        const html = e.currentTarget.innerHTML
                        setContent(html === "<br>" ? "" : html)
                      }}
                      dangerouslySetInnerHTML={{ __html: content }}
                      className="p-4 min-h-[340px] focus:outline-none text-sm text-slate-800 prose prose-slate max-w-none leading-relaxed"
                    />
                  </div>
                )}
              </div>

              {/* Bottom Info Bar matching Image 2 */}
              <div className="flex items-center justify-between px-3 py-1.5 border-t border-gray-200 bg-[#F9FAFB] text-[11px] text-gray-500 font-medium select-none">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <span className="text-xs">⛶</span>
                </div>
                <div className="flex items-center gap-3 tracking-wider font-mono text-[10px]">
                  <span>CHARS: {charCount}</span>
                  <span>WORDS: {wordCount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card: Blog FAQs */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold font-poppins uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <IconHelpCircle size={17} className="text-[#1E88E5]" />
                  <span>Blog FAQs</span>
                </h3>
              </div>

              <button
                type="button"
                onClick={handleAddFaq}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#1E88E5] bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
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
                  className="mt-2 text-xs font-bold text-[#1E88E5] hover:underline"
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
                        className="w-full px-3 py-2 text-xs font-semibold bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#1E88E5] text-slate-800"
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
                        className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#1E88E5] text-slate-700 leading-relaxed"
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
                className="w-full px-3.5 py-2.5 text-xs font-semibold bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1E88E5] text-slate-800"
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
                className="w-full px-3.5 py-2 text-xs font-semibold bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1E88E5] text-slate-800"
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
              <IconPhoto size={16} className="text-[#1E88E5]" />
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
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold text-white bg-[#1E88E5] hover:bg-blue-600 transition-colors cursor-pointer shadow-xs"
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
                    ? "border-[#1E88E5] bg-blue-50/60"
                    : "border-gray-300 hover:border-[#1E88E5] hover:bg-gray-50"
                }`}
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-blue-50 text-[#1E88E5] flex items-center justify-center mb-3">
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
              <IconSeo size={16} className="text-[#1E88E5]" />
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
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1E88E5] text-slate-900"
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
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1E88E5] text-slate-900 leading-relaxed"
              />
            </div>
          </div>

        </div>

      </div>
    </form>
  )
}
