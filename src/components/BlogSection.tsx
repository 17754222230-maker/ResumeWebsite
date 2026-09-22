"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  Calendar,
  Clock,
  ThumbsUp,
  ExternalLink,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getFeaturedBlogs, getBlogs } from "@/lib/knowledge";
import type { BlogArticle } from "@/lib/knowledge";

function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-");
  return `${year}.${month}.${day}`;
}

export default function BlogSection() {
  const reduce = useReducedMotion();
  const featured = getFeaturedBlogs();
  const localBlogs = getBlogs();
  const localRest = localBlogs.filter((blog) => !blog.featured);
  const [dynamicBlogs, setDynamicBlogs] = useState<BlogArticle[]>([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/blogs")
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(new Error(`HTTP ${response.status}`));
        }
        return response.json();
      })
      .then((data: { articles?: BlogArticle[] }) => {
        if (!cancelled && Array.isArray(data.articles)) {
          setDynamicBlogs(data.articles);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const localIds = new Set(localBlogs.map((blog) => blog.id));
  const mergedList = [
    ...localRest,
    ...dynamicBlogs.filter((blog) => !localIds.has(blog.id)),
  ].sort((a, b) => b.publishDate.localeCompare(a.publishDate));
  const visibleList = expanded ? mergedList : mergedList.slice(0, 4);

  const reveal = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-70px" },
          transition: { duration: 0.58, delay },
        };

  return (
    <section
      id="blogs"
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, rgba(11,24,40,0.92) 0%, rgba(10,21,36,0.96) 55%, #0A1626 100%)",
      }}
    >
      <div className="relative flex min-h-[500px] items-center overflow-hidden sm:min-h-[560px]">
        <Image
          src="/images/sections/writing-journal.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[68%_center]"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(5,14,26,0.97) 0%, rgba(5,14,26,0.82) 42%, rgba(5,14,26,0.26) 76%, rgba(5,14,26,0.14) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,24,40,0.82) 0%, transparent 28%, transparent 68%, #0A1626 100%)",
          }}
        />

        <motion.div
          {...reveal()}
          className="container relative z-10 mx-auto max-w-6xl px-6 py-24"
        >
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3 font-mono text-xs tracking-[0.24em] text-gold-400">
              <span>03</span>
              <span className="text-text-on-dark/50">ENGINEERING NOTES</span>
            </div>
            <h2 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              博客文章
              <br />
              <span className="text-text-on-dark/55">&amp; 工程笔记</span>
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-text-on-dark/78 sm:text-lg">
              记录架构判断、AI 工程实践与真实问题复盘。不是知识点陈列，而是把为什么这样做、代价是什么讲清楚。
            </p>
          </div>
        </motion.div>
      </div>

      <div className="container relative mx-auto max-w-6xl px-6 pb-28">
        {featured.length > 0 && (
          <div className="mb-16 space-y-5">
            {featured.map((article, index) => (
              <FeaturedBlogCard
                key={article.id}
                article={article}
                index={index}
                reduce={Boolean(reduce)}
              />
            ))}
          </div>
        )}

        {mergedList.length > 0 && (
          <motion.div {...reveal()}>
            <div className="mb-5 flex items-end justify-between gap-5">
              <div>
                <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-gold-400">
                  ALL ARTICLES
                </p>
                <h3 className="text-2xl font-semibold text-white sm:text-3xl">
                  最新文章
                </h3>
              </div>
              <span className="font-mono text-sm text-text-on-dark/38">
                {String(mergedList.length).padStart(2, "0")} POSTS
              </span>
            </div>

            <div className="border-b border-white/10">
              {visibleList.map((article, index) => (
                <BlogListRow
                  key={article.id}
                  article={article}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        )}

        {mergedList.length > 4 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setExpanded((value) => !value)}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-gold-400/60 hover:bg-white/[0.10]"
              aria-expanded={expanded}
            >
              {expanded
                ? "收起文章"
                : `展开更多文章（${mergedList.length - 4} 篇）`}
              <ChevronDown
                size={16}
                className={cn(
                  "text-gold-400 transition-transform duration-300",
                  expanded && "rotate-180",
                )}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function FeaturedBlogCard({
  article,
  index,
  reduce,
}: {
  article: BlogArticle;
  index: number;
  reduce: boolean;
}) {
  return (
    <motion.a
      href={article.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={reduce ? undefined : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.58, delay: index * 0.08 }}
      className="group grid overflow-hidden rounded-2xl border border-gold-500/25 bg-deep-blue-900/72 shadow-2xl shadow-black/15 backdrop-blur-xl transition-all hover:border-gold-400/60 md:grid-cols-[13rem_1fr]"
    >
      <div className="flex flex-col justify-between border-b border-white/10 p-6 md:border-b-0 md:border-r md:p-7">
        <div>
          <Badge variant="gold" className="mb-8 text-[10px]">
            FEATURED
          </Badge>
          <p className="font-mono text-3xl font-semibold text-gold-400/80">
            {formatDate(article.publishDate).slice(0, 7)}
          </p>
        </div>
        <div className="mt-8 flex items-center gap-4 text-xs text-text-on-dark/48">
          <span className="flex items-center gap-1.5">
            <Clock size={13} />
            {article.readingTime} min
          </span>
          {typeof article.likeCount === "number" && (
            <span className="flex items-center gap-1.5">
              <ThumbsUp size={13} />
              {article.likeCount}
            </span>
          )}
        </div>
      </div>

      <div className="p-6 md:p-8 lg:p-9">
        <div className="mb-3 text-xs text-text-on-dark/50">
          {article.category ?? "技术实践"}
        </div>
        <h3 className="mb-4 text-2xl font-semibold leading-tight text-white transition-colors group-hover:text-gold-300 sm:text-3xl">
          {article.title}
        </h3>
        <p className="mb-6 max-w-3xl text-sm leading-relaxed text-text-on-dark/72 line-clamp-3">
          {article.summary}
        </p>
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.055] px-2.5 py-1 text-[10px] text-text-on-dark/65"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="flex items-center gap-1.5 text-sm font-medium text-gold-400">
            阅读原文
            <ExternalLink size={14} />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

function BlogListRow({
  article,
  index,
}: {
  article: BlogArticle;
  index: number;
}) {
  return (
    <a
      href={article.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group grid gap-3 border-t border-white/10 py-6 transition-colors hover:bg-white/[0.035] sm:grid-cols-[3rem_8rem_1fr_auto] sm:items-center sm:px-3"
    >
      <span className="font-mono text-sm text-gold-400/55">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="flex items-center gap-1.5 font-mono text-xs text-text-on-dark/42">
        <Calendar size={12} />
        {formatDate(article.publishDate)}
      </span>
      <div className="min-w-0">
        <h4 className="truncate text-base font-medium text-white transition-colors group-hover:text-gold-300">
          {article.title}
        </h4>
        <p className="mt-1 text-xs text-text-on-dark/52 line-clamp-1">
          {article.summary}
        </p>
      </div>
      <div className="flex items-center gap-4 text-xs text-text-on-dark/45">
        <span className="flex items-center gap-1.5">
          <Clock size={12} />
          {article.readingTime} min
        </span>
        <ArrowUpRight
          size={17}
          className="transition-colors group-hover:text-gold-400"
        />
      </div>
    </a>
  );
}
