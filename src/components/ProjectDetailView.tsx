"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Lightbulb, Target, Code2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { glassCard } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/knowledge";
import AiAgentCharacter from "@/components/AiAgentCharacter";

type Cat = "fliggy" | "techpark" | "personal";

/**
 * 分类主题色：飞猪=金 / 科技园=天蓝 / 个人=翡翠绿。
 * 与首页 ProjectCard 的 categoryStyles 同源，延伸到详情页驱动
 * hero 光晕、区块图标、分隔线、指标数字、难点卡强调边与标签 hover。
 */
const THEME: Record<
  Cat,
  {
    label: string;
    badge: "gold" | "sky" | "emerald";
    icon: string;
    glow: string;
    bg: string;
    dot: string;
    divider: string;
    stat: string;
    bullet: string;
    solutionBox: string;
    solutionText: string;
    challengeBorder: string;
    tagHover: string;
    headerHover: string;
  }
> = {
  fliggy: {
    label: "飞猪 · 阿里巴巴",
    badge: "gold",
    icon: "text-gold-400",
    glow: "rgba(255,167,81,0.30)",
    bg: "linear-gradient(180deg, #0A1626 0%, #122A3B 10%, #3A342D 34%, #54432F 58%, #243445 82%, #0A1626 100%)",
    dot: "rgba(255,167,81,0.14)",
    divider: "from-gold-500/40 via-gold-500/15 to-transparent",
    stat: "text-gold-400",
    bullet: "bg-gold-400",
    solutionBox: "bg-gold-500/[0.06]",
    solutionText: "text-gold-400",
    challengeBorder: "border-l-gold-500/50",
    tagHover: "hover:bg-gold-500/15 hover:text-gold-400",
    headerHover: "hover:text-gold-400",
  },
  techpark: {
    label: "科技园 · 企业系统",
    badge: "sky",
    icon: "text-sky-300",
    glow: "rgba(56,189,248,0.24)",
    bg: "linear-gradient(180deg, #0A1626 0%, #0D2A3C 10%, #10475D 36%, #16647A 60%, #173D52 82%, #0A1626 100%)",
    dot: "rgba(56,189,248,0.12)",
    divider: "from-sky-400/40 via-sky-400/15 to-transparent",
    stat: "text-sky-300",
    bullet: "bg-sky-300",
    solutionBox: "bg-sky-400/[0.07]",
    solutionText: "text-sky-300",
    challengeBorder: "border-l-sky-400/50",
    tagHover: "hover:bg-sky-400/15 hover:text-sky-300",
    headerHover: "hover:text-sky-300",
  },
  personal: {
    label: "个人项目",
    badge: "emerald",
    icon: "text-emerald-300",
    glow: "rgba(16,185,129,0.22)",
    bg: "linear-gradient(180deg, #0A1626 0%, #0C2930 10%, #10483F 36%, #176454 60%, #173D3D 82%, #0A1626 100%)",
    dot: "rgba(16,185,129,0.12)",
    divider: "from-emerald-400/40 via-emerald-400/15 to-transparent",
    stat: "text-emerald-300",
    bullet: "bg-emerald-300",
    solutionBox: "bg-emerald-400/[0.07]",
    solutionText: "text-emerald-300",
    challengeBorder: "border-l-emerald-400/50",
    tagHover: "hover:bg-emerald-400/15 hover:text-emerald-300",
    headerHover: "hover:text-emerald-300",
  },
};

export default function ProjectDetailView({ project }: { project: Project }) {
  const reduce = useReducedMotion();
  const theme = THEME[(project.category as Cat) ?? "personal"];

  const fade = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.5, delay },
        };

  const heroFade = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay },
        };

  return (
    <div
      className="relative min-h-screen"
      style={{ background: theme.bg }}
    >
      {/* 分类色 hero 点阵纹理（向下渐隐，不干扰正文可读性） */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
        style={{
          backgroundImage: `radial-gradient(${theme.dot} 1px, transparent 1px)`,
          backgroundSize: "22px 22px",
          maskImage:
            "linear-gradient(180deg, #000 0%, #000 28%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, #000 0%, #000 28%, transparent 100%)",
        }}
      />
      {/* 分类色 hero 柔光晕 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[440px]"
        style={{
          background: `radial-gradient(62% 60% at 22% 18%, ${theme.glow} 0%, transparent 72%)`,
        }}
      />

      {/* 顶栏 */}
      <header className="sticky top-0 z-30 bg-deep-blue-900/70 shadow-[0_10px_30px_rgba(10,22,38,0.18)] backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center gap-4 px-6 py-4">
          <Link
            href="/#projects"
            className={cn(
              "flex items-center gap-1.5 text-sm text-text-on-dark/70 transition-colors",
              theme.headerHover,
            )}
          >
            <ArrowLeft size={16} />
            <span>返回列表</span>
          </Link>
          <div className="h-3 w-px bg-white/15" />
          <span className="truncate text-sm font-medium text-text-white">
            {project.title}
          </span>
        </div>
      </header>

      {/* 主内容 */}
      <main className="relative mx-auto max-w-4xl px-6 py-12">
        {/* ===== 头部信息 ===== */}
        <motion.section className="mb-10" {...heroFade(0)}>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <Badge variant={theme.badge}>{theme.label}</Badge>
            {project.role && (
              <span className="text-sm text-text-on-dark/70">{project.role}</span>
            )}
            {project.period && (
              <span className="font-mono text-xs text-text-on-dark/60">
                {project.period}
              </span>
            )}
          </div>

          <div className="mb-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
            {project.logo && (
              <div
                className={cn(
                  "flex shrink-0 items-center justify-center overflow-hidden",
                  project.logoWide ? "h-14 w-32" : "h-14 w-14",
                )}
              >
                <img
                  src={project.logo}
                  alt={`${project.title} logo`}
                  className="h-full w-full object-contain"
                />
              </div>
            )}
            <h1 className="text-2xl font-bold text-text-white sm:text-3xl md:text-4xl">
              {project.title}
            </h1>
          </div>

          {project.company && (
            <p className="mb-4 text-sm text-text-on-dark/70">{project.company}</p>
          )}
          <p className="max-w-2xl text-base leading-relaxed text-text-on-dark/80">
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="skill"
                className={cn(
                  "border-white/10 bg-white/[0.08] text-xs text-text-on-dark transition-colors",
                  theme.tagHover,
                )}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </motion.section>

        {/* ===== 关键指标带 ===== */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {project.metrics.map((m, i) => (
              <motion.div
                key={i}
                className={cn(glassCard, "px-4 py-5 text-center")}
                {...heroFade(0.1 + i * 0.08)}
              >
                <div
                  className={cn(
                    "text-xl font-bold leading-tight tracking-tight sm:text-2xl",
                    theme.stat,
                  )}
                >
                  {m.value}
                </div>
                <div className="mt-1.5 text-xs leading-snug text-text-on-dark/70">
                  {m.label}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div
          className={cn(
            "mb-12 h-px bg-gradient-to-r",
            theme.divider,
          )}
        />

        {/* ===== 项目职责 ===== */}
        {project.responsibilities && project.responsibilities.length > 0 && (
          <motion.section className="mb-12" {...fade()}>
            <SectionHeader icon={Target} title="主要职责" iconColor={theme.icon} />
            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {project.responsibilities.map((r, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-text-on-dark/80"
                >
                  <span
                    className={cn(
                      "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                      theme.bullet,
                    )}
                  />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {/* ===== 难点与解决方案 ===== */}
        {project.challenges && project.challenges.length > 0 && (
          <motion.section className="mb-12" {...fade()}>
            <SectionHeader
              icon={Lightbulb}
              title="难点与解决方案"
              iconColor={theme.icon}
            />
            <div className="space-y-6">
              {project.challenges.map((c, i) => (
                <div
                  key={i}
                  className={cn(glassCard, "border-l-2 p-5", theme.challengeBorder)}
                >
                  <div className="mb-3">
                    <h4 className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-text-white">
                      <span
                        className={cn(
                          "flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[11px] font-bold",
                          theme.icon,
                        )}
                      >
                        {i + 1}
                      </span>
                      难点
                    </h4>
                    <p className="text-sm leading-relaxed text-text-on-dark/80">
                      {c.challenge}
                    </p>
                  </div>
                  <div className={cn("rounded-lg p-3", theme.solutionBox)}>
                    <h4
                      className={cn(
                        "mb-1 flex items-center gap-1.5 text-sm font-medium",
                        theme.solutionText,
                      )}
                    >
                      <CheckCircle2 size={14} />
                      解决方案
                    </h4>
                    <p className="text-sm leading-relaxed text-text-on-dark/80">
                      {c.solution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ===== 成果 ===== */}
        {project.achievements && project.achievements.length > 0 && (
          <motion.section className="mb-12" {...fade()}>
            <SectionHeader
              icon={CheckCircle2}
              title="项目成果"
              iconColor={theme.icon}
            />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {project.achievements.map((a, i) => (
                <div key={i} className={cn(glassCard, "p-4")}>
                  <p className="text-sm font-medium text-text-on-dark">{a}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ===== 技术栈详情 ===== */}
        {project.fullTechStack && project.fullTechStack.length > 0 && (
          <motion.section className="mb-12" {...fade()}>
            <SectionHeader
              icon={Code2}
              title="技术栈详情"
              iconColor={theme.icon}
            />
            <div className="flex flex-wrap gap-2">
              {project.fullTechStack.map((t) => (
                <Badge
                  key={t}
                  variant="skill"
                  className={cn(
                    "border-white/10 bg-white/[0.08] text-xs text-text-on-dark transition-all",
                    theme.tagHover,
                  )}
                >
                  {t}
                </Badge>
              ))}
            </div>
          </motion.section>
        )}

        {/* ===== 底部导航 ===== */}
        <div className="mt-16 flex items-center justify-between border-t border-white/10 pt-8">
          <Link
            href="/#projects"
            className={cn(
              "flex items-center gap-2 text-sm text-text-on-dark/80 transition-colors",
              theme.headerHover,
            )}
          >
            <ArrowLeft size={14} />
            <span>返回项目列表</span>
          </Link>
          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center gap-1.5 text-sm text-text-on-dark/80 transition-colors",
                theme.headerHover,
              )}
            >
              <Code2 size={14} />
              <span>查看源码</span>
            </a>
          )}
        </div>
      </main>

      <AiAgentCharacter />
    </div>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  iconColor,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  iconColor: string;
}) {
  return (
    <div className="mb-5 flex items-center gap-2.5">
      <Icon size={18} className={iconColor} />
      <h2 className="text-lg font-semibold tracking-tight text-text-white">
        {title}
      </h2>
    </div>
  );
}
