"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  ThumbsUp,
  ExternalLink,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { glassCard } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getFeaturedBlogs, getBlogs } from "@/lib/knowledge";
import type { BlogArticle } from "@/lib/knowledge";

/** 入场动画统一规范（duration 0.6 / y 30 / once + margin -60px） */
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.6 },
};

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${y}.${m}.${d}`;
}

export default function BlogSection() {
  const featured = getFeaturedBlogs();
  const localBlogs = getBlogs();
  const localRest = localBlogs.filter((b) => !b.featured);

  // 动态文章：从 /api/blogs（服务端代理掘金公开接口）拉取，失败静默回退本地数据
  const [dynamicBlogs, setDynamicBlogs] = useState<BlogArticle[]>([]);
  // 列表折叠：默认仅展示 4 篇，其余收进「展开更多」，避免长列表拖长页面
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/blogs")
      .then((res) => {
        if (!res.ok) return Promise.reject(new Error(`HTTP ${res.status}`));
        return res.json();
      })
      .then((data: { articles?: BlogArticle[] }) => {
        if (!cancelled && Array.isArray(data.articles)) {
          setDynamicBlogs(data.articles);
        }
      })
      .catch(() => {
        // 静默降级：仅展示本地硬编码文章
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // 仅追加动态新文章：与本地 id 去重（保持本地精选卡唯一、本地条目优先）
  const localIds = new Set(localBlogs.map((b) => b.id));
  const mergedList = [...localRest, ...dynamicBlogs.filter((b) => !localIds.has(b.id))]
    .sort((a, b) => b.publishDate.localeCompare(a.publishDate));

  const visibleList = expanded ? mergedList : mergedList.slice(0, 4);

  return (
    <section
      id="blogs"
      className="relative py-24 overflow-hidden"
      style={{
        // 半透明夜色蒙版：起点承接项目区尾端 rgba(11,24,40,0.80)，
        // 尾端收敛到 #0A1626（deep-blue-900）实色，与 Footer 背景同色对接
        background:
          "linear-gradient(180deg, rgba(11,24,40,0.80) 0%, rgba(10,21,36,0.86) 50%, #0A1626 100%)",
      }}
    >
      <div className="container relative mx-auto max-w-6xl px-6">
        {/* ===== 标题区 ===== */}
        <motion.div {...fadeUp} className="mb-14">
          <div className="mb-3 flex items-baseline gap-3">
            <span className="font-mono text-xs tracking-[0.25em] text-gold-400">03</span>
            <span className="font-mono text-[10px] tracking-[0.25em] text-text-on-dark/50">WRITING</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-text-white md:text-4xl">
            博客文章
          </h2>
          <p className="max-w-xl text-text-on-dark/80">
            记录架构思考与 AI 实践，沉淀可复用的工程经验
          </p>
        </motion.div>

        {/* ===== 精选大卡 ===== */}
        {featured.length > 0 && (
          <div className="space-y-6">
            {featured.map((article) => (
              <FeaturedBlogCard key={article.id} article={article} />
            ))}
          </div>
        )}

        {/* ===== 列表区（本地非精选 + 掘金动态新文章；为空时整个容器不渲染）
             移动端各卡独立展示（gap-2），md 起才堆叠重叠（P2 移动端可读性） ===== */}
        {mergedList.length > 0 && (
          <motion.div {...fadeUp} className="mt-6 flex flex-col gap-2 md:gap-0">
            {visibleList.map((article) => (
              <BlogStackCard key={article.id} article={article} />
            ))}
          </motion.div>
        )}

        {/* 折叠/展开：文章多于 4 篇时收起剩余，点击展开 */}
        {mergedList.length > 4 && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.07] px-5 py-2.5 text-sm font-medium text-text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400/60 hover:bg-white/[0.10] hover:shadow-lg hover:shadow-deep-blue-900/50 active:scale-[0.98]"
              aria-expanded={expanded}
            >
              {expanded ? "收起文章" : `展开更多文章（${mergedList.length - 4} 篇）`}
              <ChevronDown
                size={16}
                className={cn(
                  "text-gold-400 transition-transform duration-300",
                  expanded && "rotate-180"
                )}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/** 精选大卡：featured 玻璃卡规范，整卡可点击新窗口打开原文 */
function FeaturedBlogCard({ article }: { article: BlogArticle }) {
  return (
    <motion.div {...fadeUp}>
      <a
        href={article.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(glassCard, "group block border-l-2 border-l-gold-400/70 p-6 hover:-translate-y-1 hover:border-l-gold-400 md:p-8")}
      >
        {/* 顶部：精选徽标 + 分类 */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Badge variant="gold" className="text-[10px]">
            精选
          </Badge>
          {article.category && (
            <span className="text-xs text-text-on-dark/70">
              {article.category}
            </span>
          )}
        </div>

        {/* 标题 */}
        <h3 className="mb-3 text-xl font-bold text-text-white transition-colors duration-300 group-hover:text-gold-400 md:text-2xl">
          {article.title}
        </h3>

        {/* 摘要 */}
        <p className="mb-5 max-w-3xl text-sm leading-relaxed text-text-on-dark/80 line-clamp-3">
          {article.summary}
        </p>

        {/* 标签组（调用处覆盖为深色玻璃样式） */}
        <div className="mb-6 flex flex-wrap gap-1.5">
          {article.tags.map((tag) => (
            <Badge
              key={tag}
              variant="skill"
              className="border-white/10 bg-white/[0.08] text-text-on-dark text-[11px]"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* 底部：元信息行 + 阅读原文 CTA */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-xs text-text-on-dark/70">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} />
              {formatDate(article.publishDate)}
            </span>
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

          <span className="inline-flex items-center gap-1.5 rounded-lg border border-gold-500/40 px-4 py-2 text-sm font-medium text-gold-400 transition-all group-hover:border-gold-500 group-hover:bg-gold-500 group-hover:text-deep-blue-900">
            阅读原文
            <ExternalLink size={14} />
          </span>
        </div>
      </a>
    </motion.div>
  );
}

/**
 * 堆叠卡片：md 起每张卡片向上重叠 20px 层叠（节省纵向空间），
 * hover 时浮起展开（translateY(-8px) + z-20 + 强阴影 + 金边），其余卡片保持紧凑。
 * 移动端取消重叠：各卡独立展示，保证小屏可读性（P2）。
 * 内容结构：标题行 + 摘要行 + 元信息行（日期 | 标签 lg 起 | 时长）。
 */
function BlogStackCard({ article }: { article: BlogArticle }) {
  return (
    <a
      href={article.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur-md transition-all duration-300 hover:z-20 hover:-translate-y-2 hover:border-gold-500/40 hover:bg-white/[0.10] hover:shadow-2xl hover:shadow-deep-blue-900/60 md:-mt-5 md:first:mt-0 md:px-5"
    >
      {/* 标题行 */}
      <div className="flex items-center justify-between gap-3">
        <span className="flex-1 truncate text-sm font-medium text-text-white transition-colors group-hover:text-gold-400">
          {article.title}
        </span>
        <ArrowUpRight
          size={16}
          className="hidden shrink-0 text-text-on-dark/40 transition-colors group-hover:text-gold-400 md:block"
        />
      </div>
      {/* 摘要行：单行简介，避免堆叠卡空旷 */}
      <p className="text-xs leading-relaxed text-text-on-dark/70 line-clamp-1">
        {article.summary}
      </p>
      {/* 元信息行 */}
      <div className="flex flex-wrap items-center gap-3 text-xs text-text-on-dark/70">
        <span className="shrink-0 font-mono">
          {formatDate(article.publishDate)}
        </span>
        <span className="hidden shrink-0 gap-1.5 lg:flex">
          {article.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="skill"
              className="border-white/10 bg-white/[0.08] text-text-on-dark text-[10px]"
            >
              {tag}
            </Badge>
          ))}
        </span>
        <span className="flex shrink-0 items-center gap-1.5">
          <Clock size={12} />
          {article.readingTime} min
        </span>
      </div>
    </a>
  );
}
