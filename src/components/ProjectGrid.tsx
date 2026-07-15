"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/knowledge";

export default function ProjectGrid() {
  return (
    <section id="projects" className="relative bg-cool-bg-alt py-24">
      {/* 背景装饰 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-deep-blue-900/3 blur-3xl" />
        <div className="absolute -right-40 -bottom-40 h-80 w-80 rounded-full bg-gold-500/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto max-w-6xl px-6">
        {/* 标题区 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <Badge variant="gold" className="mb-4">
            项目
          </Badge>
          <h2 className="mb-4 text-3xl font-bold text-deep-blue-900 md:text-4xl">
            项目经历
          </h2>
          <div className="mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-gold-500 to-gold-300" />
          <p className="mt-4 max-w-xl mx-auto text-text-secondary">
            以下是我参与和主导的部分项目，涵盖了全栈开发、AI 集成和 DevOps 自动化。
          </p>
        </motion.div>

        {/* 项目卡片网格 */}
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
