"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  ThumbsUp,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
  const rest = getBlogs().filter((b) => !b.featured);

  return (
    <section
      id="blogs"
      className="relative py-24 overflow-hidden"
      style={{
        // 明度曲线：承接项目区尾端 #0B1D3A，主体 #0B2147 略深于项目区（视觉权重低于项目），
        // 尾端收回 #0B1D3A 与 Footer（bg-deep-blue-900）同色对接
        background:
          "linear-gradient(180deg, #0B1D3A 0%, #0B2147 25%, #0B2147 75%, #0B1D3A 100%)",
      }}
    >
      {/* 纵深背景层 — 动态光晕（沿用全站 timing 池 12s/16s，仅 x/y transform） */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* 深蓝光晕 — 缓慢漂移 */}
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-deep-blue-500/15 blur-[100px]"
        />
        {/* 金色光晕 — 反向漂移 */}
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gold-500/10 blur-[100px]"
        />
      </div>

      <div className="container relative mx-auto max-w-6xl px-6">
        {/* ===== 标题区 ===== */}
        <motion.div {...fadeUp} className="mb-14 text-center">
          <Badge variant="gold" className="mb-4">
            技术分享
          </Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-wide text-text-white md:text-4xl">
            博客文章
          </h2>
          <div className="mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-gold-500 to-gold-300" />
          <p className="mx-auto mt-4 max-w-xl text-text-on-dark/70">
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

        {/* ===== 列表区（非精选文章；为空时整个容器不渲染） ===== */}
        {rest.length > 0 && (
          <motion.div {...fadeUp} className="mt-6 space-y-3">
            {rest.map((article) => (
              <BlogListRow key={article.id} article={article} />
            ))}
          </motion.div>
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
        className="group block rounded-xl border border-gold-500/40 bg-gradient-to-br from-white/[0.07] to-gold-500/[0.08] p-6 shadow-sm backdrop-blur-md transition-all hover:border-gold-500/60 hover:bg-white/[0.10] hover:shadow-xl hover:shadow-deep-blue-900/40 hover:-translate-y-1 md:p-8"
      >
        {/* 顶部：精选徽标 + 分类 */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Badge variant="gold" className="text-[10px]">
            精选
          </Badge>
          {article.category && (
            <span className="text-xs text-text-on-dark/60">
              {article.category}
            </span>
          )}
        </div>

        {/* 标题 */}
        <h3 className="mb-3 text-xl font-bold text-text-white transition-colors duration-300 group-hover:text-gold-400 md:text-2xl">
          {article.title}
        </h3>

        {/* 摘要 */}
        <p className="mb-5 max-w-3xl text-sm leading-relaxed text-text-on-dark/75 line-clamp-3">
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
          <div className="flex flex-wrap items-center gap-4 text-xs text-text-on-dark/60">
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

/** 列表行：日期 | 标题 | 标签 | 时长 | 外链箭头（移动端退化为堆叠卡） */
function BlogListRow({ article }: { article: BlogArticle }) {
  return (
    <a
      href={article.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur-md transition-all hover:border-gold-500/40 hover:bg-white/[0.10] hover:shadow-xl hover:shadow-deep-blue-900/40 md:flex-row md:items-center md:gap-4 md:px-5"
    >
      <span className="shrink-0 font-mono text-xs text-text-on-dark/60 md:w-24">
        {formatDate(article.publishDate)}
      </span>
      <span className="flex-1 truncate text-sm font-medium text-text-white transition-colors group-hover:text-gold-400">
        {article.title}
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
      <span className="flex shrink-0 items-center gap-1.5 text-xs text-text-on-dark/60">
        <Clock size={12} />
        {article.readingTime} min
      </span>
      <ArrowUpRight
        size={16}
        className="hidden shrink-0 text-text-on-dark/40 transition-colors group-hover:text-gold-400 md:block"
      />
    </a>
  );
}
