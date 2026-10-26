import React from "react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import {
  IconCalendar,
  IconArrowLeft,
  IconArrowRight,
} from "@tabler/icons-react"
import {
  blogPosts,
  getPostBySlug,
  getMorePosts,
} from "@/lib/blogData"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const post = getPostBySlug(resolvedParams.slug)

  if (!post) {
    return {
      title: "Article Not Found | R-One Power",
    }
  }

  return {
    title: `${post.title} | R-One Power Solar EPC`,
    description: post.excerpt,
    alternates: {
      canonical: `https://www.r1power.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: [
        {
          url: post.image,
          alt: post.title,
        },
      ],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params
  const post = getPostBySlug(resolvedParams.slug)

  if (!post) {
    notFound()
  }

  const morePosts = getMorePosts(post.slug).slice(0, 3)

  return (
    <article className="min-h-screen bg-white pt-24 sm:pt-28 md:pt-32 pb-24 font-inter text-slate-900">
      
      {/* Main Container - Matching Home Page Max-Width & Padding */}
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

        {/* Hero Banner Card - Matching Home Page Dark Slate Palette */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl p-6 sm:p-10 lg:p-12 mb-12 sm:mb-16 bg-gradient-to-r from-[#111827] via-[#1F2937] to-[#111827] border border-gray-800 text-white">
          {/* Ambient Blue Glow */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-blue-500/20 to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-[#1E88E5] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  Solar Insights
                </span>

                <span className="text-blue-200 text-xs sm:text-sm font-semibold flex items-center gap-1.5">
                  <IconCalendar size={15} className="text-[#1E88E5]" />
                  <span>Published {post.formattedDate}</span>
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-poppins text-white leading-tight mb-4 tracking-tight">
                {post.title}
              </h1>

              {/* Subtitle / Excerpt */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-inter font-normal">
                {post.excerpt}
              </p>
            </div>

            {/* Right Side Visual Asset */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="relative w-full max-w-[420px] aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border border-white/10">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 420px"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Article Body Content Area - Plain & Full Width (NOT wrapped in a card/container) */}
        <div className="w-full text-slate-700 font-inter space-y-6">
          
          {/* Introductory Paragraphs */}
          <div className="space-y-5 text-base sm:text-lg text-slate-700 leading-relaxed sm:leading-8 font-inter">
            {post.introParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Section Heading with Blue Accent Left Bar - Matching Home Theme */}
          <div className="border-l-4 border-[#1E88E5] pl-4 sm:pl-5 my-8 sm:my-10">
            <h2 className="text-2xl sm:text-3xl font-black font-poppins text-slate-900 tracking-tight leading-tight">
              {post.mainSectionTitle}
            </h2>
          </div>

          {/* Detailed Numbered Sections */}
          <div className="space-y-8 sm:space-y-10">
            {post.sections.map((section, idx) => (
              <section key={idx} className="space-y-3.5">
                <h3 className="text-xl sm:text-2xl font-bold font-poppins text-slate-900">
                  {section.title}
                </h3>
                <div className="text-slate-600 text-base sm:text-lg leading-relaxed sm:leading-8 space-y-3 font-inter whitespace-pre-line">
                  {section.content}
                </div>

                {section.bulletPoints && section.bulletPoints.length > 0 && (
                  <ul className="mt-4 space-y-2.5 pl-1">
                    {section.bulletPoints.map((bp, bIdx) => (
                      <li
                        key={bIdx}
                        className="flex items-start gap-3 text-base text-slate-700 font-medium"
                      >
                        <span className="h-2 w-2 rounded-full bg-[#1E88E5] mt-2.5 shrink-0" />
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

        </div>

        {/* More Articles Section at the bottom - Exact Match with Blog Listing Page */}
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
                    {/* Top Image Container */}
                    <Link
                      href={`/blog/${relatedPost.slug}`}
                      className="block relative h-56 w-full overflow-hidden bg-slate-100"
                    >
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </Link>

                    {/* Bottom Content Container */}
                    <div className="p-6 sm:p-8 space-y-3">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1E88E5]">
                        <IconCalendar size={15} />
                        <span>{relatedPost.formattedDate}</span>
                      </div>

                      <Link href={`/blog/${relatedPost.slug}`}>
                        <h4 className="text-xl font-bold text-slate-900 group-hover:text-[#1E88E5] transition-colors font-poppins leading-snug line-clamp-2">
                          {relatedPost.title}
                        </h4>
                      </Link>

                      <p className="text-sm text-slate-500 leading-relaxed font-medium font-inter line-clamp-3">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer: Read Article Link */}
                  <div className="px-6 sm:px-8 pb-6 pt-3 border-t border-gray-50">
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
