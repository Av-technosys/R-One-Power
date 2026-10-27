import React from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import {
  IconCalendar,
  IconArrowLeft,
  IconArrowRight,
  IconUser,
  IconFolder,
} from "@tabler/icons-react"
import { getBlogBySlug, getBlogs } from "@/app/actions/blogActions"
import { getStorageImageUrl } from "@/lib/supabaseClient"

interface Props {
  params: Promise<{ slug: string }>
}

export const revalidate = 60

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const post = await getBlogBySlug(resolvedParams.slug)

  if (!post) {
    return {
      title: "Article Not Found | R-One Power",
    }
  }

  const title = post.metaTitle || `${post.title} | R-One Power Solar EPC`
  const description = post.metaDescription

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.r1power.com/blog/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishDate,
      authors: [post.authorName],
      images: [
        {
          url: getStorageImageUrl(post.mainBannerImage),
          alt: post.title,
        },
      ],
    },
  }
}

/**
 * Helper to render rich content: supports HTML from WYSIWYG or markdown
 */
function renderArticleContent(content: string) {
  // If content contains standard HTML tags, render directly as HTML
  const hasHtmlTags = /<[a-z][\s\S]*>/i.test(content)

  if (hasHtmlTags) {
    return (
      <div
        className="article-rich-content max-w-none text-base sm:text-lg leading-relaxed text-slate-700"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    )
  }

  // Otherwise format markdown-like text (headings, lists, paragraphs)
  const paragraphs = content.split(/\n\n+/)

  return (
    <div className="space-y-6 text-base sm:text-lg text-slate-700 leading-relaxed font-inter">
      {paragraphs.map((para, idx) => {
        const trimmed = para.trim()

        if (trimmed.startsWith("### ")) {
          return (
            <h3 key={idx} className="text-xl sm:text-2xl font-bold font-poppins text-slate-900 pt-4">
              {trimmed.replace(/^###\s+/, "")}
            </h3>
          )
        }

        if (trimmed.startsWith("## ")) {
          return (
            <div key={idx} className="border-l-4 border-[#1E88E5] pl-4 sm:pl-5 my-6">
              <h2 className="text-2xl sm:text-3xl font-black font-poppins text-slate-900 tracking-tight leading-tight">
                {trimmed.replace(/^##\s+/, "")}
              </h2>
            </div>
          )
        }

        if (trimmed.startsWith("# ")) {
          return (
            <h1 key={idx} className="text-3xl sm:text-4xl font-black font-poppins text-slate-900 pt-4">
              {trimmed.replace(/^#\s+/, "")}
            </h1>
          )
        }

        // Handle bullet lists
        if (trimmed.includes("\n* ") || trimmed.startsWith("* ")) {
          const items = trimmed.split("\n").filter((l) => l.trim().startsWith("* "))
          return (
            <ul key={idx} className="space-y-2.5 pl-2 my-4">
              {items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#1E88E5] mt-2.5 shrink-0" />
                  <span>{item.replace(/^\*\s+/, "")}</span>
                </li>
              ))}
            </ul>
          )
        }

        return <p key={idx}>{trimmed}</p>
      })}
    </div>
  )
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params
  const post = await getBlogBySlug(resolvedParams.slug)

  if (!post) {
    notFound()
  }

  // Fetch more articles excluding the current post
  const allBlogs = await getBlogs()
  const morePosts = allBlogs.filter((b) => b.slug !== post.slug).slice(0, 3)

  return (
    <article className="min-h-screen bg-white pt-24 sm:pt-28 md:pt-32 pb-24 font-inter text-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* Back to All Articles Button */}
        <div className="mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-gray-200/90 shadow-2xs hover:bg-gray-50 hover:text-[#1E88E5] transition-all duration-200 group"
          >
            <IconArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            <span>Back to All Articles</span>
          </Link>
        </div>

        {/* Hero Banner Card */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl p-6 sm:p-10 lg:p-12 mb-12 sm:mb-16 bg-gradient-to-r from-[#111827] via-[#1F2937] to-[#111827] border border-gray-800 text-white">
          {/* Ambient Blue Glow */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-blue-500/20 to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {post.category && (
                  <span className="bg-[#1E88E5] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                    <IconFolder size={13} />
                    {post.category.name}
                  </span>
                )}

                <span className="text-blue-200 text-xs sm:text-sm font-semibold flex items-center gap-1.5">
                  <IconCalendar size={15} className="text-[#1E88E5]" />
                  <span>Published {post.publishDate}</span>
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-poppins text-white leading-tight mb-4 tracking-tight">
                {post.title}
              </h1>

              {/* Author & Excerpt */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-inter font-normal mb-4">
                {post.metaDescription}
              </p>

              <div className="flex items-center gap-2 text-xs text-blue-200 font-medium">
                <IconUser size={15} className="text-[#1E88E5]" />
                <span>Written by {post.authorName}</span>
              </div>
            </div>

            {/* Right Side Visual Asset */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="relative w-full max-w-[420px] aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900">
                <img
                  src={getStorageImageUrl(post.mainBannerImage)}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Article Body Content Area */}
        <div className="w-full text-slate-700 font-inter space-y-6">
          {renderArticleContent(post.content)}
        </div>

        {/* More Articles Section */}
        {morePosts.length > 0 && (
          <section className="mt-20 pt-14 border-t border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <h3 className="text-2xl sm:text-3xl font-extrabold font-poppins text-slate-900 tracking-tight">
                More Articles
              </h3>
              <span className="bg-[#E3F2FD] text-[#1E88E5] border border-blue-200 text-xs font-bold px-2.5 py-0.5 rounded-full">
                {morePosts.length}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {morePosts.map((relatedPost) => (
                <article
                  key={relatedPost.slug}
                  className="group bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Image */}
                    <Link
                      href={`/blog/${relatedPost.slug}`}
                      className="block relative h-56 w-full overflow-hidden bg-slate-100"
                    >
                      <img
                        src={getStorageImageUrl(relatedPost.mainBannerImage)}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </Link>

                    {/* Content */}
                    <div className="p-6 sm:p-8 space-y-3">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        {relatedPost.category && (
                          <span className="bg-[#E3F2FD] text-[#1E88E5] px-2.5 py-0.5 rounded-md text-[11px] font-bold">
                            {relatedPost.category.name}
                          </span>
                        )}
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <IconCalendar size={14} className="text-[#1E88E5]" />
                          <span>{relatedPost.publishDate}</span>
                        </div>
                      </div>

                      <Link href={`/blog/${relatedPost.slug}`}>
                        <h4 className="text-xl font-bold text-slate-900 group-hover:text-[#1E88E5] transition-colors font-poppins leading-snug line-clamp-2">
                          {relatedPost.title}
                        </h4>
                      </Link>

                      <p className="text-sm text-slate-500 leading-relaxed font-medium font-inter line-clamp-3">
                        {relatedPost.metaDescription}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 sm:px-8 pb-6 pt-3 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">
                      By {relatedPost.authorName}
                    </span>
                    <Link
                      href={`/blog/${relatedPost.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E88E5] hover:text-blue-700 transition-colors group/link"
                    >
                      <span>Read Article</span>
                      <IconArrowRight
                        size={14}
                        className="transition-transform group-hover/link:translate-x-1"
                      />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

      </div>
    </article>
  )
}
