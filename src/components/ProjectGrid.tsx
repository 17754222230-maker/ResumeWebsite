"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/knowledge";

export default function ProjectGrid() {
  return (
    <section
      id="projects"
      className="relative py-24 overflow-hidden"
      style={{
        // 顶端承接经历区尾端 #182E4A，主体用更蓝一档的 #1B3A5C，
        // 尾端收敛到 #0B1D3A 与 Footer（bg-deep-blue-900）同色衔接
        background:
          "linear-gradient(180deg, #182E4A 0%, #1B3A5C 18%, #1B3A5C 80%, #132C47 92%, #0B1D3A 100%)",
      }}
    >
      {/* 纵深背景层 — 动态光晕 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* 深蓝光晕 — 缓慢漂移 */}
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-deep-blue-500/15 blur-[100px]"
        />
        {/* 金色光晕 — 反向漂移 */}
        <motion.div
          animate={{ x: [0, 25, 0], y: [0, -20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-40 -bottom-40 h-80 w-80 rounded-full bg-gold-500/10 blur-[100px]"
        />
      </div>
      {/* 微渐变背景 — 往中心聚拢的纵深感 */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 60% at 50% 60%, rgba(251,191,36,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="container relative mx-auto max-w-6xl px-6">
        {/* 标题区 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <Badge variant="gold" className="mb-4">
            项目
          </Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-wide text-text-white md:text-4xl">
            项目经历
          </h2>
          <div className="mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-gold-500 to-gold-300" />
          <p className="mt-4 max-w-xl mx-auto text-text-on-dark/70">
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
