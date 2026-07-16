"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/knowledge";

export default function ProjectGrid() {
  return (
    <section id="projects" className="relative bg-cool-bg-alt py-24 overflow-hidden">
      {/* 纵深背景层 — 动态光晕 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* 深蓝光晕 — 缓慢漂移 */}
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-deep-blue-900/10 blur-[100px]"
        />
        {/* 金色光晕 — 反向漂移 */}
        <motion.div
          animate={{ x: [0, 25, 0], y: [0, -20, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-40 -bottom-40 h-80 w-80 rounded-full bg-gold-500/10 blur-[100px]"
        />
      </div>
      {/* 微渐变背景 — 往中心聚拢的纵深感 */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 60% at 50% 60%, rgba(11,29,58,0.03) 0%, transparent 70%)",
        }}
      />

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
