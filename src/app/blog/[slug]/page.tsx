import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  blogPosts,
  getBlogPost,
  getAllSlugs,
  type BlogSection,
} from "@/lib/blog-data";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} — The Kai Blog`,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://thekai.co/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      siteName: "The Kai",
      locale: "tr_TR",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      site: "@callmethekai",
    },
  };
}

function BlogContent({ section }: { section: BlogSection }) {
  switch (section.type) {
    case "h2":
      return (
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F5F5] tracking-[-0.02em] mt-12 mb-4">
          {section.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#E0E0E0] tracking-[-0.01em] mt-8 mb-3">
          {section.text}
        </h3>
      );
    case "p":
      return (
        <p className="text-[#CCCCCC] text-base sm:text-lg leading-relaxed mb-4">
          {section.text}
        </p>
      );
    case "ul":
      return (
        <ul className="space-y-2.5 mb-6 ml-1">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-[#D8FB32] rounded-full mt-2.5 shrink-0" />
              <span className="text-[#CCCCCC] text-base sm:text-lg leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>
      );
    case "cta":
      return (
        <div className="mt-12 mb-4 p-8 bg-gradient-to-br from-[#141414] to-[#1A1A1A] border border-[#1F2937] rounded-[20px] text-center">
          <Link
            href={section.href || "/iletisim"}
            className="inline-flex items-center justify-center px-10 py-4 bg-[#D8FB32] text-[#0A0A0A] font-semibold rounded-[10px] text-base hover:bg-[#B4F030] hover:scale-[1.02] transition-all duration-200 shadow-[0_0_30px_rgba(216,251,50,0.1)]"
          >
            {section.label}
          </Link>
        </div>
      );
    default:
      return null;
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // Find related posts (other posts)
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "The Kai",
      url: "https://thekai.co",
      logo: {
        "@type": "ImageObject",
        url: "https://thekai.co/images/kai-carkli.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://thekai.co/blog/${post.slug}`,
    },
    keywords: post.keywords.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="pt-32 pb-24 lg:pt-40 lg:pb-32 relative overflow-hidden">
        <div className="max-w-[780px] mx-auto px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-[#666666] hover:text-[#999999] transition-colors"
                >
                  Ana Sayfa
                </Link>
              </li>
              <li className="text-[#333333]">/</li>
              <li>
                <Link
                  href="/blog"
                  className="text-[#666666] hover:text-[#999999] transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li className="text-[#333333]">/</li>
              <li className="text-[#999999] truncate max-w-[200px] sm:max-w-none">
                {post.title}
              </li>
            </ol>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <time
                dateTime={post.date}
                className="text-[#666666] text-sm font-medium"
              >
                {new Date(post.date).toLocaleDateString("tr-TR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <span className="w-1 h-1 bg-[#333333] rounded-full" />
              <span className="text-[#666666] text-sm font-medium">
                {post.readingTime} okuma
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F5F5] tracking-[-0.02em] leading-tight mb-5">
              {post.title}
            </h1>

            <p className="text-[#999999] text-lg leading-relaxed">
              {post.description}
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-[#1F2937]">
              <div className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#1F2937] flex items-center justify-center">
                <span className="text-[#D8FB32] text-sm font-bold">K</span>
              </div>
              <div>
                <p className="text-[#E0E0E0] text-sm font-medium">
                  {post.author}
                </p>
                <p className="text-[#666666] text-xs">
                  The Kai — Kurucu
                </p>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="border-t border-[#1F2937] pt-10">
            {post.content.map((section, index) => (
              <BlogContent key={index} section={section} />
            ))}
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-[#1F2937]">
            <div className="flex flex-wrap gap-2">
              {post.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="px-3 py-1.5 bg-[#1A1A1A] border border-[#1F2937] rounded-full text-[#999999] text-xs"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-10 border-t border-[#1F2937]">
              <h3 className="font-serif text-2xl font-bold text-[#F5F5F5] tracking-[-0.02em] mb-8">
                Diğer Yazılar
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group bg-[#141414] border border-[#1F2937] rounded-[16px] p-5 hover:border-[#D8FB32]/20 transition-all duration-300"
                  >
                    <time
                      dateTime={related.date}
                      className="text-[#666666] text-xs font-medium"
                    >
                      {new Date(related.date).toLocaleDateString("tr-TR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                    <h4 className="font-serif text-base font-bold text-[#F5F5F5] tracking-[-0.01em] mt-2 mb-2 group-hover:text-[#D8FB32] transition-colors duration-300 leading-snug line-clamp-2">
                      {related.title}
                    </h4>
                    <span className="text-[#D8FB32] text-xs font-medium">
                      Oku &rarr;
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
