import React from "react"
import Link from "next/link"
import type { Metadata } from "next"
import { IconCalendar, IconArrowRight, IconUser, IconFolder } from "@tabler/icons-react"
import { getBlogs } from "@/app/actions/blogActions"
import { getStorageImageUrl } from "@/lib/supabaseClient"

export const revalidate = 60 // Revalidate every minute or on-demand via server actions

export const metadata: Metadata = {
  title: "Latest Blogs & Articles | R-One Power Solar EPC",
  description:
    "Explore latest insights on solar EPC installations, commercial rooftop solutions, PM Surya Ghar subsidies, and clean energy innovations from R-ONE Power.",
  alternates: {
    canonical: "https://www.r1power.com/blog",
  },
}

export default async function BlogPage() {
  const allBlogs = await getBlogs()
  const featuredPost = allBlogs[0] || null
  const morePosts = allBlogs.slice(1)

  return (
    <div className="min-h-screen bg-white pt-24 sm:pt-28 md:pt-32 pb-24 font-inter text-slate-900">
      
      {/* Top Header Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 text-center mb-12 sm:mb-16">
        <span className="inline-block bg-[#E3F2FD] text-[#1E88E5] px-6 py-1.5 rounded-full text-xs font-bold border border-blue-100 uppercase tracking-wider mb-4">
          Knowledge Hub &amp; Insights
        </span>

        <h1 className="text-4xl md:text-5xl font-black text-slate-900 font-poppins tracking-tight mb-4">
          Latest <span className="text-[#1E88E5]">Blogs</span> &amp;{" "}
          <span className="text-[#FDEA00]">Articles</span>
        </h1>

        <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base font-medium leading-relaxed font-inter">
          Discover expert articles on solar EPC solutions, industrial power savings,
          high-efficiency solar module technology, and clean energy updates from R-ONE Power.
        </p>
      </section>

      {/* Featured Article Card */}
      {featuredPost ? (
        <section className="max-w-7xl mx-auto px-6 lg:px-10 mb-16 sm:mb-20">
          <div className="group relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-r from-[#111827] via-[#1F2937] to-[#111827] border border-gray-800 transition-all duration-300">
            {/* Subtle Solar Blue Glow */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-blue-500/15 to-transparent pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 p-6 sm:p-10 lg:p-12 relative z-10">
              
              {/* Left Column: Text & CTA */}
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                
                {/* Badges Row */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="bg-[#1E88E5] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    Featured Article
                  </span>

                  {featuredPost.category && (
                    <span className="bg-slate-800/80 text-blue-200 border border-slate-700 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                      <IconFolder size={13} className="text-[#1E88E5]" />
                      {featuredPost.category.name}
                    </span>
                  )}

                  <span className="text-blue-200 text-xs sm:text-sm font-semibold flex items-center gap-1.5">
                    <IconCalendar size={15} className="text-[#1E88E5]" />
                    {featuredPost.publishDate}
                  </span>
                </div>

                {/* Title */}
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="group-hover:text-blue-300 transition-colors"
                >
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-poppins text-white leading-tight mb-4 tracking-tight">
                    {featuredPost.title}
                  </h2>
                </Link>

                {/* Excerpt */}
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-inter line-clamp-3 font-normal">
                  {featuredPost.metaDescription}
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-6 font-medium">
                  <IconUser size={15} className="text-[#1E88E5]" />
                  <span>By {featuredPost.authorName}</span>
                </div>

                {/* Read Full Article Button */}
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-md text-sm font-bold text-white shadow-md shadow-blue-500/20 bg-[#1E88E5] bg-gradient-to-r from-[#1E88E5] to-[#157DC0] hover:brightness-110 transition-all active:scale-95"
                >
                  <span>Read Full Article</span>
                  <IconArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Right Column: Visual Asset */}
              <div className="lg:col-span-5 flex justify-center items-center">
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="relative w-full max-w-[440px] aspect-[4/3] rounded-xl overflow-hidden shadow-2xl group-hover:scale-105 transition-transform duration-500 border border-white/10 bg-slate-900"
                >
                  <img
                    src={getStorageImageUrl(featuredPost.mainBannerImage)}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                </Link>
              </div>

            </div>
          </div>
        </section>
      ) : (
        <div className="max-w-md mx-auto text-center py-16 px-6">
          <p className="text-lg font-bold text-slate-700">No blog articles published yet.</p>
          <p className="text-sm text-slate-500 mt-1">Please check back soon for our newest updates.</p>
        </div>
      )}

      {/* More Articles Section */}
      {morePosts.length > 0 && (
        <>
          <section className="max-w-7xl mx-auto px-6 lg:px-10 mb-8">
            <div className="flex items-center gap-3">
              <h3 className="text-2xl sm:text-3xl font-extrabold font-poppins text-slate-900 tracking-tight">
                More Articles
              </h3>
              <span className="bg-[#E3F2FD] text-[#1E88E5] border border-blue-200 text-xs font-bold px-2.5 py-0.5 rounded-full">
                {morePosts.length}
              </span>
            </div>
          </section>

          <section className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {morePosts.map((post) => (
                <article
                  key={post.slug}
                  className="group bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Image Container */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block relative h-56 w-full overflow-hidden bg-slate-100"
                    >
                      <img
                        src={getStorageImageUrl(post.mainBannerImage)}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </Link>

                    {/* Content Container */}
                    <div className="p-6 sm:p-8 space-y-3">
                      {/* Meta badges: Category & Date */}
                      <div className="flex items-center justify-between text-xs font-semibold">
                        {post.category && (
                          <span className="bg-[#E3F2FD] text-[#1E88E5] px-2.5 py-0.5 rounded-md text-[11px] font-bold">
                            {post.category.name}
                          </span>
                        )}
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <IconCalendar size={14} className="text-[#1E88E5]" />
                          <span>{post.publishDate}</span>
                        </div>
                      </div>

                      {/* Post Title */}
                      <Link href={`/blog/${post.slug}`}>
                        <h4 className="text-xl font-bold text-slate-900 group-hover:text-[#1E88E5] transition-colors font-poppins leading-snug line-clamp-2">
                          {post.title}
                        </h4>
                      </Link>

                      {/* Post Excerpt */}
                      <p className="text-sm text-slate-500 leading-relaxed font-medium font-inter line-clamp-3">
                        {post.metaDescription}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 sm:px-8 pb-6 pt-3 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">
                      By {post.authorName}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
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
        </>
      )}

    </div>
  )
}
