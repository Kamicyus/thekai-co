"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { blogPosts } from "@/lib/blog-data";

export default function BlogPage() {
  const locale = useLocale();
  const isEn = locale === "en";

  return (
    <section className="pt-32 pb-24 lg:pt-40 lg:pb-32 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#D8FB32]/10 border border-[#D8FB32]/20 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-[#D8FB32] rounded-full" />
            <span className="text-[#D8FB32] text-xs font-medium uppercase tracking-wider">
              Blog
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F5F5F5] tracking-[-0.02em] mb-5">
            Blog
          </h1>
          <p className="text-[#999999] text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            {isEn ? (
              <>
                AI agent systems, music production, Claude Code and digital creativity.
                <br />
                In-depth articles, guides and experiences.
              </>
            ) : (
              <>
                AI ajan sistemleri, müzik prodüksiyon, Claude Code ve dijital yaratıcılık.
                <br />
                Derinlemesine yazılar, rehberler ve deneyimler.
              </>
            )}
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {[...blogPosts].reverse().map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-[#141414] border border-[#1F2937] rounded-[20px] overflow-hidden hover:border-[#D8FB32]/20 transition-all duration-300 flex flex-col"
            >
              {/* Cover Image */}
              {post.coverImage && (
                <div className="relative w-full aspect-[1200/630] overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-60" />
                </div>
              )}

              <div className="p-6 sm:p-8 flex flex-col flex-1">
              {/* Meta */}
              <div className="flex items-center gap-3 mb-4">
                <time
                  dateTime={post.date}
                  className="text-[#666666] text-xs font-medium"
                >
                  {new Date(post.date).toLocaleDateString(isEn ? "en-US" : "tr-TR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <span className="w-1 h-1 bg-[#333333] rounded-full" />
                <span className="text-[#666666] text-xs font-medium">
                  {post.readingTime} {isEn ? "read" : "okuma"}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F5F5] tracking-[-0.02em] mb-3 group-hover:text-[#D8FB32] transition-colors duration-300 leading-snug">
                {post.title}
              </h2>

              {/* Description */}
              <p className="text-[#999999] text-sm leading-relaxed mb-6 flex-1">
                {post.description}
              </p>

              {/* Read More */}
              <div className="flex items-center gap-2 text-[#D8FB32] text-sm font-medium group-hover:gap-3 transition-all duration-300">
                <span>{isEn ? "Read More" : "Devamını Oku"}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
