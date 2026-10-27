"use client"

import React from "react"
import { useRouter } from "next/navigation"
import BlogForm from "@/component/admin/BlogForm"

export default function NewBlogPage() {
  const router = useRouter()

  return (
    <div className="py-2">
      <BlogForm
        onCancel={() => router.push("/admin/blogs")}
        onSaved={() => router.push("/admin/blogs")}
      />
    </div>
  )
}
