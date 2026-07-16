"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { experiences, getSkillCategories, skills as allSkills } from "@/lib/knowledge";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const featuredCategories = ["后端技术", "AI 与智能化"];

export default function TechStack() {
  const categories = getSkillCategories();
  const featuredCats = categories.filter((c) => featuredCategories.includes(c));
  const otherCats = categories.filter((c) => !featuredCategories.includes(c));

  return (
    <section id="tech-stack" className="relative bg-cool-bg py-24">
      {/* 背景装饰 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-deep-blue-900/3 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gold-500/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto max-w-6xl px-6">
        {/* ===== 标题区 ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <Badge variant="gold" className="mb-4">
            技术能力
          </Badge>
          <h2 className="mb-4 text-3xl font-bold text-deep-blue-900 md:text-4xl">
            工作经历 &amp; 技术栈
          </h2>
          <div className="mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-gold-500 to-gold-300" />
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">
            四年全栈经验，深耕 Java 后端与微服务，持续探索 AI 赋能开发
          </p>
        </motion.div>

        {/* ===== 工作经历（紧凑双卡） ===== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-16"
        >
          {/* 小标题 */}
          <motion.div variants={itemVariants} className="mb-6 flex items-center gap-3">
            <span className="h-4 w-1 rounded-full bg-gold-500" />
            <h3 className="text-lg font-semibold text-deep-blue-900">工作经历</h3>
          </motion.div>

          {/* 双列卡片 */}
          <div className="grid gap-4 md:grid-cols-2">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="rounded-xl border border-border-light bg-cool-bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                {/* 头部：时间段 + 角色 */}
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="inline-block rounded-full bg-gold-500/10 px-2.5 py-0.5 font-mono text-xs text-gold-500">
                    {exp.period}
                  </span>
                  <Badge variant="default" className="text-[10px] font-normal">
                    {exp.role}
                  </Badge>
                </div>

                {/* 公司名称 */}
                <h4 className="mb-3 text-base font-semibold text-deep-blue-900">
                  {exp.company}
                </h4>

                {/* 亮点列表 */}
                <ul className="space-y-1.5">
                  {exp.highlights.map((h, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-sm text-text-secondary"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold-400" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ===== 技术栈 ===== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* 小标题 */}
          <motion.div variants={itemVariants} className="mb-6 flex items-center gap-3">
            <span className="h-4 w-1 rounded-full bg-gold-500" />
            <h3 className="text-lg font-semibold text-deep-blue-900">技术栈</h3>
          </motion.div>

          {/* ★ 重点卡片：后端 + AI */}
          <div className="mb-4 grid gap-4 md:grid-cols-2">
            {featuredCats.map((cat) => {
              const skills = allSkills.filter((s) => s.category === cat);
              return (
                <motion.div
                  key={cat}
                  variants={itemVariants}
                  className="rounded-xl border border-gold-500/20 bg-gradient-to-br from-cool-bg-card to-gold-500/[0.03] p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-gold-500" />
                    <h4 className="text-sm font-semibold text-deep-blue-900">
                      {cat}
                    </h4>
                    <Badge
                      variant="gold"
                      className="ml-auto text-[10px] font-normal"
                    >
                      {cat === "后端技术" ? "核心" : "前沿"}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((s) => (
                      <Badge
                        key={s.name}
                        variant="skill"
                        className="text-[11px] transition-all hover:bg-deep-blue-900 hover:text-gold-500"
                      >
                        {s.name}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* 其他技能卡片 */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {otherCats.map((cat) => {
              const skills = allSkills.filter((s) => s.category === cat);
              return (
                <motion.div
                  key={cat}
                  variants={itemVariants}
                  className="rounded-xl border border-border-light bg-cool-bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-deep-blue-900">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                    {cat}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((s) => (
                      <Badge
                        key={s.name}
                        variant="skill"
                        className="text-[11px]"
                      >
                        {s.name}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
