"use client"

import React, { useState, useEffect, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import {
  IconPlus,
  IconSearch,
  IconFilter,
  IconEdit,
  IconTrash,
  IconArticle,
  IconCheck,
} from "@tabler/icons-react"
import type { BlogCategory } from "@/db/schema"
import {
  getBlogs,
  getCategories,
  deleteBlog,
  toggleBlogDraft,
  type BlogWithCategory,
} from "@/app/actions/blogActions"
import { getStorageImageUrl } from "@/lib/supabaseClient"
import BlogForm from "@/component/admin/BlogForm"
import { ConfirmModal, SuccessModal } from "@/component/admin/AdminModal"

function AdminBlogsContent() {
  const searchParams = useSearchParams()
  const initialAction = searchParams.get("action")

  const [blogs, setBlogs] = useState<BlogWithCategory[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCat, setSelectedCat] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Delete Confirmation Modal State
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Success Popup Modal State
  const [successModal, setSuccessModal] = useState<{
    isOpen: boolean
    title: string
    message: string
  } | null>(null)

  // View state: 'list' | 'new' | 'edit'
  const [viewMode, setViewMode] = useState<"list" | "new" | "edit">(
    initialAction === "new" ? "new" : "list"
  )
  const [editingBlog, setEditingBlog] = useState<BlogWithCategory | null>(null)

  const loadData = async () => {
    try {
      setLoading(true)
      const [blogsData, catsData] = await Promise.all([
        getBlogs({ includeDrafts: true }),
        getCategories(),
      ])
      setBlogs(blogsData)
      setCategories(catsData)
    } catch (err) {
      console.error("Failed to load admin blogs:", err)
      showToast("Failed to load blogs from database")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleToggleDraft = async (blogId: string, currentDraft: boolean) => {
    try {
      const nextDraftState = !currentDraft
      // Optimistic update
      setBlogs((prev) =>
        prev.map((b) => (b.id === blogId ? { ...b, isDraft: nextDraftState } : b))
      )
      const res = await toggleBlogDraft(blogId, nextDraftState)
      if (!res.success) {
        showToast(res.error || "Failed to update status")
        loadData() // Revert on error
      } else {
        showToast(nextDraftState ? "Blog set to Draft" : "Blog Published!")
      }
    } catch {
      showToast("Error updating status")
      loadData()
    }
  }

  const handleRequestDelete = (blogId: string, title: string) => {
    setDeleteTarget({ id: blogId, title })
  }

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return

    try {
      setIsDeleting(true)
      const targetId = deleteTarget.id
      const targetTitle = deleteTarget.title

      const res = await deleteBlog(targetId)
      if (!res.success) {
        showToast(res.error || "Failed to delete blog")
      } else {
        setBlogs((prev) => prev.filter((b) => b.id !== targetId))
        setSuccessModal({
          isOpen: true,
          title: "Blog Deleted Successfully!",
          message: `"${targetTitle}" has been permanently deleted.`,
        })
      }
    } catch {
      showToast("Error deleting blog")
    } finally {
      setIsDeleting(false)
      setDeleteTarget(null)
    }
  }

  const handleOpenEdit = (blog: BlogWithCategory) => {
    setEditingBlog(blog)
    setViewMode("edit")
  }

  const handleOpenCreate = () => {
    setEditingBlog(null)
    setViewMode("new")
  }

  const handleBackToList = () => {
    setEditingBlog(null)
    setViewMode("list")
    loadData()
  }

  // Filtered List
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.authorName.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCat =
        selectedCat === "all" ? true : blog.categoryId === selectedCat

      const matchesStatus =
        selectedStatus === "all"
          ? true
          : selectedStatus === "draft"
          ? blog.isDraft
          : !blog.isDraft

      return matchesSearch && matchesCat && matchesStatus
    })
  }, [blogs, searchQuery, selectedCat, selectedStatus])

  const getCategoryName = (catId: string, blogCatName?: string | null) => {
    if (blogCatName) return blogCatName
    return categories.find((c) => c.id === catId)?.name || "General"
  }

  // If in create or edit mode, display BlogForm directly
  if (viewMode === "new") {
    return (
      <div className="py-2">
        <BlogForm
          categories={categories}
          onCancel={handleBackToList}
          onSaved={handleBackToList}
        />
      </div>
    )
  }

  if (viewMode === "edit" && editingBlog) {
    return (
      <div className="py-2">
        <BlogForm
          initialBlog={editingBlog}
          categories={categories}
          isEdit={true}
          onCancel={handleBackToList}
          onSaved={handleBackToList}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6 font-inter max-w-6xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2 text-sm border border-slate-700 animate-in fade-in duration-200">
          <IconCheck size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header with Title and Create Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-poppins text-slate-900 tracking-tight">
            Blogs Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Create, edit, publish, and manage all articles.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold text-white bg-[#1565C0] hover:bg-[#0D47A1] shadow-sm shadow-blue-500/20 transition-all active:scale-95 w-full sm:w-auto shrink-0 cursor-pointer"
        >
          <IconPlus size={18} />
          <span>Add New Blog</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-gray-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3 overflow-hidden">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md w-full">
          <IconSearch
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by title, author, slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1565C0] focus:bg-white text-slate-800 transition-all font-medium"
          />
        </div>

        {/* Filters - Responsive on mobile without overflow */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold shrink-0">
            <IconFilter size={16} />
            <span>Filter:</span>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
            {/* Category Filter */}
            <select
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              className="w-full sm:w-auto text-xs bg-gray-50 border border-gray-200 rounded-lg px-2.5 sm:px-3 py-2 text-slate-700 font-semibold focus:outline-none focus:border-[#1565C0] truncate"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full sm:w-auto text-xs bg-gray-50 border border-gray-200 rounded-lg px-2.5 sm:px-3 py-2 text-slate-700 font-semibold focus:outline-none focus:border-[#1565C0] truncate"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
            </select>
          </div>
        </div>
      </div>

      {/* Blogs Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-slate-400">
            <div className="w-8 h-8 mx-auto border-3 border-slate-200 border-t-[#1E88E5] rounded-full animate-spin mb-3" />
            <span className="text-xs font-semibold">Fetching articles from Supabase...</span>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="py-16 text-center">
            <IconArticle size={40} className="mx-auto text-slate-300 mb-3" />
            <p className="text-base font-bold text-slate-700 font-poppins">
              No blogs found
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your search criteria or add a new blog article.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-gray-200/80">
                <tr>
                  <th className="px-6 py-4">Article</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Publish Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Article Thumbnail & Title */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-16 rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-gray-200/80">
                          <img
                            src={getStorageImageUrl(blog.mainBannerImage)}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="max-w-xs sm:max-w-sm lg:max-w-md">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(blog)}
                            className="font-bold text-slate-900 hover:text-[#1565C0] transition-colors line-clamp-1 text-sm font-poppins text-left cursor-pointer"
                          >
                            {blog.title}
                          </button>
                          <span className="text-[11px] text-slate-400 font-mono block mt-0.5 truncate">
                            /blog/{blog.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4">
                      <span className="inline-block bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-md">
                        {getCategoryName(blog.categoryId, blog.category?.name)}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-xs text-slate-500 whitespace-nowrap">
                      {blog.publishDate}
                    </td>

                    {/* Status Badge Toggle */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleDraft(blog.id, blog.isDraft)}
                        className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full cursor-pointer transition-transform active:scale-95 ${
                          blog.isDraft
                            ? "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                        }`}
                        title="Click to toggle status"
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            blog.isDraft ? "bg-amber-500" : "bg-emerald-500"
                          }`}
                        />
                        <span>{blog.isDraft ? "Draft" : "Published"}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        {/* Edit */}
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(blog)}
                          className="p-1.5 text-slate-600 hover:text-[#1565C0] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit Blog"
                        >
                          <IconEdit size={16} />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleRequestDelete(blog.id, blog.title)}
                          className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Blog"
                        >
                          <IconTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer info */}
        <div className="p-4 bg-slate-50 border-t border-gray-100 flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing {filteredBlogs.length} of {blogs.length} articles
          </span>
        </div>
      </div>

      {/* Delete Confirmation Popup in Middle */}
      {deleteTarget && (
        <ConfirmModal
          isOpen={!!deleteTarget}
          title="Delete Blog Post?"
          message={`Are you sure you want to delete "${deleteTarget.title}"? This will permanently delete the blog post and remove its banner image from storage. This action cannot be undone.`}
          confirmText="Yes, Delete"
          cancelText="Cancel"
          isDestructive={true}
          isLoading={isDeleting}
          onConfirm={handleConfirmDelete}
          onCancel={() => {
            if (!isDeleting) setDeleteTarget(null)
          }}
        />
      )}

      {/* Success Popup in Middle */}
      {successModal && (
        <SuccessModal
          isOpen={successModal.isOpen}
          title={successModal.title}
          message={successModal.message}
          buttonText="OK, Got it"
          onClose={() => setSuccessModal(null)}
        />
      )}
    </div>
  )
}

export default function AdminBlogsListPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center font-inter text-slate-400">
          <div className="w-8 h-8 mx-auto border-3 border-slate-300 border-t-[#1565C0] rounded-full animate-spin mb-3" />
          <span>Loading blogs...</span>
        </div>
      }
    >
      <AdminBlogsContent />
    </Suspense>
  )
}
