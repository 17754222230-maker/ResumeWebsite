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
} from "@/components/ui/card";

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
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="h-full"
      >
        <Card className="flex h-full flex-col overflow-hidden border-border-light transition-all duration-300 hover:border-gold-500/30 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
        {/* 卡片顶部装饰条 */}
        <div className="h-1.5 w-full bg-gradient-to-r from-deep-blue-900 via-gold-500 to-deep-blue-900 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <CardTitle className="text-lg text-deep-blue-900 md:text-xl">
              {project.title}
            </CardTitle>
            {project.role && (
              <Badge variant="gold" className="shrink-0 text-[10px]">
                {project.role}
              </Badge>
            )}
          </div>
          <CardDescription className="mt-2 leading-relaxed">
            {project.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1">
          {/* 技术标签 */}
          <div className="mb-4 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="skill" className="text-[11px]">
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
                  className="flex items-start gap-2 text-sm text-text-secondary"
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
              className="flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-deep-blue-900"
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
              className="flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-deep-blue-900"
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
