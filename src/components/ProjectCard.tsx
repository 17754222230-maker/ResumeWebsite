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
  role?: string;
  highlights?: string[];
  links?: {
    demo?: string;
    github?: string;
  };
}

interface ProjectCardProps {
  project: ProjectCardData;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="block group">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="h-full"
      >
        <Card className={cn(glassCard, "flex h-full flex-col overflow-hidden hover:-translate-y-1 cursor-pointer")}>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <CardTitle className="text-lg text-text-white transition-colors duration-300 group-hover:text-gold-400 md:text-xl">
              {project.title}
            </CardTitle>
            {project.role && (
              <Badge variant="gold" className="shrink-0 text-[10px]">
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
