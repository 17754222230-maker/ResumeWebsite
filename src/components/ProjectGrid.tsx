"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/knowledge";

export default function ProjectGrid() {
  return (
    <section
      id="projects"
      className="relative py-24 overflow-hidden"
      style={{
        // 半透明夜色蒙版：起点承接经历区尾端 rgba(12,26,44,0.68)，主体略加深保证卡片对比度，
        // 尾端收敛到 rgba(11,24,40,0.80) 与博客区起点同色衔接，雪山图自背后柔和透出
        background:
          "linear-gradient(180deg, rgba(12,26,44,0.68) 0%, rgba(14,30,52,0.75) 25%, rgba(14,30,52,0.75) 75%, rgba(11,24,40,0.80) 100%)",
      }}
    >
      <div className="container relative mx-auto max-w-6xl px-6">
        {/* 标题区 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="mb-3 flex items-baseline gap-3">
            <span className="font-mono text-xs tracking-[0.25em] text-gold-400">02</span>
            <span className="font-mono text-[10px] tracking-[0.25em] text-text-on-dark/50">PROJECTS</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-text-white md:text-4xl">
            项目经历
          </h2>
          <p className="max-w-xl text-text-on-dark/80">
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
