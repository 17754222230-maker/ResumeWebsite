"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Code2, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  glassCard,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface ProjectCardData {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  /** 项目 logo 图标（public/logos/ 下的 SVG 或 PNG） */
  logo?: string;
  /** logo 为横向宽幅（如带字横幅），渲染时用宽容器 */
  logoWide?: boolean;
  /** 项目归属分类：fliggy 飞猪工作项目 / techpark 科技园工作项目 / personal 个人独立项目 */
  category?: "fliggy" | "techpark" | "personal";
  role?: string;
  highlights?: string[];
  links?: {
    demo?: string;
    github?: string;
  };
}

/**
 * 类别视觉信号（方案 A：微色边框 + 徽章色阶）——
 * 金=飞猪核心项目（主题主色）、蓝=科技园项目（夜幕冷色面）、白=个人独立项目（中性无企业色）
 * 阴影深度随层级递减：fliggy /50 > techpark /35 > personal /25
 */
const categoryStyles = {
  fliggy: {
    card: "border-gold-500/30 hover:border-gold-500/60 hover:shadow-deep-blue-900/50",
    badge: "gold",
  },
  techpark: {
    card: "border-sky-400/25 hover:border-sky-400/50 hover:shadow-deep-blue-900/35",
    badge: "sky",
  },
  personal: {
    card: "border-white/25 hover:border-white/45 hover:shadow-deep-blue-900/25",
    badge: "neutral",
  },
} as const;

interface ProjectCardProps {
  project: ProjectCardData;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const category = categoryStyles[project.category ?? "personal"];
  return (
    <Link href={`/projects/${project.slug}`} className="block group">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="h-full"
      >
        <Card className={cn(glassCard, category.card, "flex h-full flex-col overflow-hidden hover:-translate-y-1 cursor-pointer")}>
        <CardHeader>
          {/* 窄屏（<lg）纵向堆叠：标题独占整行宽度，角色徽章下移为独立元信息行，
              避免徽章挤占标题导致逐字换行、卡片被拉高且徽章下方大片空区突兀；
              宽屏（lg+，两列网格卡宽定足）恢复徽章右上角与标题同行 */}
          <div className="flex flex-col gap-2.5 lg:flex-row lg:items-start lg:justify-between lg:gap-4">
            <div className="flex min-w-0 items-center gap-3">
              {project.logo && (
                <div
                  className={cn(
                    "flex shrink-0 items-center justify-center overflow-hidden",
                    project.logoWide ? "h-10 w-24" : "h-10 w-10"
                  )}
                >
                  <img
                    src={project.logo}
                    alt={`${project.title} logo`}
                    loading="lazy"
                    className="h-full w-full object-contain"
                  />
                </div>
              )}
              <CardTitle className="text-base text-text-white transition-colors duration-300 group-hover:text-gold-400 sm:text-lg lg:text-xl">
                {project.title}
              </CardTitle>
            </div>
            {project.role && (
              <Badge variant={category.badge} className="shrink-0 self-start text-[10px] lg:self-auto">
                {project.role}
              </Badge>
            )}
          </div>
          <CardDescription className="mt-2 leading-relaxed text-text-on-dark/80">
            {project.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1">
          {/* 技术标签 */}
          <div className="mb-4 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="skill" className="border-white/10 bg-white/[0.08] text-text-on-dark text-[11px]">
                {tag}
              </Badge>
            ))}
          </div>

          {/* 亮点 */}
          {project.highlights && project.highlights.length > 0 && (
            <ul className="space-y-1.5">
              {project.highlights.map((h, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-text-on-dark/80"
                >
                  <ChevronRight
                    size={14}
                    className="mt-0.5 shrink-0 text-gold-500"
                  />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>

        <CardFooter className="gap-3">
          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-text-on-dark/80 transition-colors hover:text-gold-400"
            >
              <Code2 size={16} />
              <span>源码</span>
            </a>
          )}
          {project.links?.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-text-on-dark/80 transition-colors hover:text-gold-400"
            >
              <ExternalLink size={16} />
              <span>演示</span>
            </a>
          )}
        </CardFooter>
      </Card>
    </motion.div>
    </Link>
  );
}
