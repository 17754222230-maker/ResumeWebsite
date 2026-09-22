"use client";

import { motion, useReducedMotion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/knowledge";

export default function ProjectGrid() {
  const reduce = useReducedMotion();

  return (
    <section
      id="projects"
      className="relative overflow-hidden py-28"
      style={{
        background:
          "linear-gradient(180deg, rgba(12,26,44,0.88) 0%, rgba(14,35,56,0.94) 45%, rgba(11,24,40,0.92) 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 top-6 font-mono text-[18vw] font-bold leading-none tracking-tighter text-white/[0.025]"
      >
        PROJECTS
      </div>

      <div className="container relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 30 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.58 }}
          className="mb-14 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"
        >
          <div>
            <div className="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.24em] text-gold-400">
              <span>02</span>
              <span className="text-text-on-dark/45">SELECTED WORK</span>
            </div>
            <h2 className="mb-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              项目经历
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-text-on-dark/72 sm:text-lg">
              从核心交易链路、企业经营中台到智能决策 Agent。每个案例都从真实业务约束出发，给出可追溯的工程答案。
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-text-on-dark/55">
            <span className="flex items-center gap-2">
              <i className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              飞猪项目
            </span>
            <span className="flex items-center gap-2">
              <i className="h-1.5 w-1.5 rounded-full bg-sky-300" />
              企业系统
            </span>
            <span className="flex items-center gap-2">
              <i className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              个人项目
            </span>
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
