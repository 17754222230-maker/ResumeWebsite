"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  CheckCircle2,
  Lightbulb,
  Target,
  Code2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { glassCard } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/knowledge";
import AiAgentCharacter from "@/components/AiAgentCharacter";

type Cat = "fliggy" | "techpark" | "personal";

type Theme = {
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
  metricBorder: string;
};

const THEME: Record<Cat, Theme> = {
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
    solutionBox: "bg-gold-500/[0.07]",
    solutionText: "text-gold-400",
    challengeBorder: "border-l-gold-500/50",
    tagHover: "hover:bg-gold-500/15 hover:text-gold-400",
    headerHover: "hover:text-gold-400",
    metricBorder: "border-gold-500/20",
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
    metricBorder: "border-sky-400/20",
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
    metricBorder: "border-emerald-400/20",
  },
};

export default function ProjectDetailView({ project }: { project: Project }) {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const theme = THEME[(project.category as Cat) ?? "personal"];
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "13%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const heroContentY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

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
    <div className="relative min-h-screen" style={{ background: theme.bg }}>
      <header className="sticky top-0 z-40 bg-deep-blue-900/60 shadow-[0_10px_30px_rgba(10,22,38,0.18)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-4">
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

      <section
        ref={heroRef}
        className="relative -mt-[57px] flex min-h-[680px] items-end overflow-hidden sm:min-h-[720px] lg:min-h-[780px]"
      >
        {project.thumbnail && (
          <motion.div
            aria-hidden
            className="absolute inset-0"
            style={reduce ? undefined : { y: imageY, scale: imageScale }}
          >
            <Image
              src={project.thumbnail}
              alt=""
              fill
              preload
              sizes="100vw"
              className="object-cover object-[68%_center] sm:object-center"
            />
          </motion.div>
        )}

        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(5,14,26,0.96) 0%, rgba(5,14,26,0.80) 38%, rgba(5,14,26,0.30) 72%, rgba(5,14,26,0.16) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,22,38,0.32) 0%, transparent 38%, rgba(10,22,38,0.20) 66%, #0A1626 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: `radial-gradient(${theme.dot} 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
            maskImage:
              "linear-gradient(90deg, #000 0%, #000 28%, transparent 66%)",
            WebkitMaskImage:
              "linear-gradient(90deg, #000 0%, #000 28%, transparent 66%)",
          }}
        />

        <motion.div
          className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-36 sm:pb-28"
          style={
            reduce
              ? undefined
              : { y: heroContentY, opacity: heroContentOpacity }
          }
        >
          <div className="max-w-3xl">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <Badge variant={theme.badge}>{theme.label}</Badge>
              {project.role && (
                <span className="text-sm text-text-on-dark/75">
                  {project.role}
                </span>
              )}
              {project.period && (
                <span className="font-mono text-xs text-text-on-dark/60">
                  {project.period}
                </span>
              )}
            </div>

            <div className="mb-5 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              {project.logo && (
                <div
                  className={cn(
                    "flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-white/[0.08] p-2 backdrop-blur-md",
                    project.logoWide ? "h-14 w-32" : "h-14 w-14",
                  )}
                >
                  <Image
                    src={project.logo}
                    alt={`${project.title} logo`}
                    width={project.logoWide ? 128 : 56}
                    height={56}
                    className="h-full w-full object-contain"
                  />
                </div>
              )}
              <h1 className="max-w-full text-3xl font-bold leading-tight tracking-tight text-white drop-shadow-xl sm:text-4xl md:text-5xl">
                {project.title}
              </h1>
            </div>

            {project.company && (
              <p className="mb-4 text-sm font-medium text-text-on-dark/70">
                {project.company}
              </p>
            )}
            <p className="max-w-2xl text-base leading-relaxed text-text-on-dark/85 drop-shadow-md sm:text-lg">
              {project.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="skill"
                  className={cn(
                    "border-white/15 bg-deep-blue-900/40 text-xs text-text-on-dark backdrop-blur-md transition-colors",
                    theme.tagHover,
                  )}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mt-10 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-text-on-dark/45">
            <ArrowDown size={14} />
            Scroll to explore
          </div>
        </motion.div>
      </section>

      <nav className="sticky top-[56px] z-30 overflow-x-auto bg-deep-blue-900/75 backdrop-blur-xl">
        <div className="mx-auto flex w-max min-w-full max-w-6xl items-center justify-center gap-7 px-6 py-3 text-xs tracking-wide text-text-on-dark/55 sm:text-sm">
          <a href="#overview" className={cn("transition-colors", theme.headerHover)}>概览</a>
          <a href="#responsibilities" className={cn("transition-colors", theme.headerHover)}>职责</a>
          <a href="#challenges" className={cn("transition-colors", theme.headerHover)}>难点</a>
          <a href="#achievements" className={cn("transition-colors", theme.headerHover)}>成果</a>
          <a href="#stack" className={cn("transition-colors", theme.headerHover)}>技术栈</a>
        </div>
      </nav>

      <main id="overview" className="relative mx-auto max-w-6xl scroll-mt-28 px-6 pb-12">
        {project.metrics && project.metrics.length > 0 && (
          <div className="relative z-20 mb-24 mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-4">
            {project.metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                className={cn(
                  "rounded-2xl border bg-deep-blue-900/72 px-4 py-6 text-center shadow-2xl shadow-black/15 backdrop-blur-xl sm:px-5 sm:py-7",
                  theme.metricBorder,
                )}
                {...reveal(index * 0.07)}
              >
                <div
                  className={cn(
                    "text-2xl font-bold leading-tight tracking-tight sm:text-3xl",
                    theme.stat,
                  )}
                >
                  {metric.value}
                </div>
                <div className="mt-2 text-xs leading-snug text-text-on-dark/65">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div
          className={cn(
            "mb-24 h-px bg-gradient-to-r",
            theme.divider,
          )}
        />

        {project.responsibilities && project.responsibilities.length > 0 && (
          <motion.section
            id="responsibilities"
            className="mb-28 scroll-mt-28"
            {...reveal()}
          >
            <SectionHeader
              icon={Target}
              eyebrow="WHAT I BUILT"
              title="主要职责"
              iconColor={theme.icon}
            />
            <ol className="grid gap-4 md:grid-cols-2">
              {project.responsibilities.map((responsibility, index) => (
                <li
                  key={index}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.055] p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.08] sm:p-6"
                >
                  <span
                    className={cn(
                      "mb-5 block font-mono text-3xl font-semibold tracking-tighter opacity-70",
                      theme.stat,
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed text-text-on-dark/80 sm:text-base">
                    {responsibility}
                  </p>
                </li>
              ))}
            </ol>
          </motion.section>
        )}

        {project.challenges && project.challenges.length > 0 && (
          <motion.section
            id="challenges"
            className="mb-28 scroll-mt-28"
            {...reveal()}
          >
            <SectionHeader
              icon={Lightbulb}
              eyebrow="ENGINEERING CHALLENGES"
              title="难点与解决方案"
              iconColor={theme.icon}
            />
            <div className="space-y-5">
              {project.challenges.map((item, index) => (
                <motion.article
                  key={index}
                  className={cn(
                    glassCard,
                    "grid overflow-hidden border-l-2 md:grid-cols-[0.42fr_0.58fr]",
                    theme.challengeBorder,
                  )}
                  whileHover={reduce ? undefined : { y: -3 }}
                  transition={{ duration: 0.22 }}
                >
                  <div className="border-b border-white/10 p-6 md:border-b-0 md:border-r md:p-7">
                    <div
                      className={cn(
                        "mb-5 font-mono text-4xl font-bold opacity-70",
                        theme.stat,
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-text-on-dark/45">
                      Challenge
                    </h3>
                    <p className="leading-relaxed text-text-on-dark/85">
                      {item.challenge}
                    </p>
                  </div>
                  <div className={cn("p-6 md:p-7", theme.solutionBox)}>
                    <h3
                      className={cn(
                        "mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em]",
                        theme.solutionText,
                      )}
                    >
                      <CheckCircle2 size={16} />
                      Solution
                    </h3>
                    <p className="leading-relaxed text-text-on-dark/80">
                      {item.solution}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>
        )}

        {project.achievements && project.achievements.length > 0 && (
          <motion.section
            id="achievements"
            className="mb-28 scroll-mt-28"
            {...reveal()}
          >
            <SectionHeader
              icon={CheckCircle2}
              eyebrow="MEASURABLE IMPACT"
              title="项目成果"
              iconColor={theme.icon}
            />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {project.achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={cn(
                    glassCard,
                    "relative overflow-hidden p-5 sm:p-6",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "absolute right-4 top-2 font-mono text-5xl font-bold opacity-[0.07]",
                      theme.stat,
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="relative text-sm font-medium leading-relaxed text-text-on-dark">
                    {achievement}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {project.fullTechStack && project.fullTechStack.length > 0 && (
          <motion.section
            id="stack"
            className="mb-12 scroll-mt-28"
            {...reveal()}
          >
            <SectionHeader
              icon={Code2}
              eyebrow="TECHNOLOGY"
              title="技术栈详情"
              iconColor={theme.icon}
            />
            <div className="flex flex-wrap gap-2.5">
              {project.fullTechStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="skill"
                  className={cn(
                    "border-white/10 bg-white/[0.08] px-3 py-1 text-xs text-text-on-dark transition-all",
                    theme.tagHover,
                  )}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </motion.section>
        )}

        <div className="mt-20 flex items-center justify-between pt-8">
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
  eyebrow,
  title,
  iconColor,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  eyebrow: string;
  title: string;
  iconColor: string;
}) {
  return (
    <div className="mb-8">
      <div
        className={cn(
          "mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]",
          iconColor,
        )}
      >
        <Icon size={15} />
        <span>{eyebrow}</span>
      </div>
      <h2 className="text-2xl font-semibold tracking-tight text-text-white sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}
