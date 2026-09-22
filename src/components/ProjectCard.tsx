"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface ProjectCardData {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail?: string;
  logo?: string;
  logoWide?: boolean;
  category?: "fliggy" | "techpark" | "personal";
  role?: string;
  period?: string;
  company?: string;
  highlights?: string[];
}

const categoryStyles = {
  fliggy: {
    label: "飞猪项目",
    badge: "gold" as const,
    border: "border-gold-500/25 hover:border-gold-500/60",
    title: "group-hover:text-gold-300",
  },
  techpark: {
    label: "企业系统",
    badge: "sky" as const,
    border: "border-sky-400/20 hover:border-sky-400/55",
    title: "group-hover:text-sky-200",
  },
  personal: {
    label: "个人项目",
    badge: "emerald" as const,
    border: "border-emerald-400/20 hover:border-emerald-400/55",
    title: "group-hover:text-emerald-200",
  },
};

interface ProjectCardProps {
  project: ProjectCardData;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const reduce = useReducedMotion();
  const category = categoryStyles[project.category ?? "personal"];

  return (
    <Link href={`/projects/${project.slug}`} className="group block h-full">
      <motion.article
        initial={reduce ? undefined : { opacity: 0, y: 30 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-70px" }}
        transition={{ duration: 0.58, delay: (index % 2) * 0.08 }}
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-2xl border bg-deep-blue-900/68 shadow-2xl shadow-black/10 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:bg-deep-blue-900/82 hover:shadow-black/25",
          category.border,
        )}
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          {project.thumbnail && (
            <Image
              src={project.thumbnail}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-deep-blue-900 via-deep-blue-900/20 to-black/10" />

          <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-4 p-4 sm:p-5">
            <Badge variant={category.badge}>{category.label}</Badge>
            {project.logo && (
              <div
                className={cn(
                  "flex items-center justify-center rounded-xl border border-white/15 bg-deep-blue-900/55 p-2 backdrop-blur-md",
                  project.logoWide ? "h-11 w-24" : "h-11 w-11",
                )}
              >
                <Image
                  src={project.logo}
                  alt={`${project.title} logo`}
                  width={project.logoWide ? 96 : 44}
                  height={44}
                  className="h-full w-full object-contain"
                />
              </div>
            )}
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-text-on-dark/58">
              {project.period && (
                <span className="font-mono">{project.period}</span>
              )}
              {project.role && (
                <>
                  <span className="h-1 w-1 rounded-full bg-white/30" />
                  <span>{project.role}</span>
                </>
              )}
            </div>
            <h3
              className={cn(
                "text-xl font-semibold leading-tight tracking-tight text-white transition-colors sm:text-2xl",
                category.title,
              )}
            >
              {project.title}
            </h3>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <p className="mb-5 text-sm leading-relaxed text-text-on-dark/72 line-clamp-3">
            {project.description}
          </p>

          {project.highlights && project.highlights.length > 0 && (
            <ul className="mb-6 space-y-2">
              {project.highlights.slice(0, 2).map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-text-on-dark/76"
                >
                  <ChevronRight
                    size={14}
                    className="mt-1 shrink-0 text-text-on-dark/45"
                  />
                  <span className="line-clamp-2">{highlight}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-auto flex items-end justify-between gap-4 border-t border-white/[0.08] pt-4">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 5).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.055] px-2.5 py-1 text-[10px] text-text-on-dark/68"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span
              className={cn(
                "flex shrink-0 items-center gap-1 text-xs font-medium text-text-on-dark/55 transition-colors",
                category.title,
              )}
            >
              查看案例
              <ArrowUpRight size={14} />
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
