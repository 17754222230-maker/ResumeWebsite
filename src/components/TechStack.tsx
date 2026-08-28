"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { glassCard } from "@/components/ui/card";
import { cn } from "@/lib/utils";
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
    <section
      id="tech-stack"
      className="relative py-24 overflow-hidden"
      style={{
        // 半透明夜色蒙版：雪山图从背后透出，起点与 Hero 底部过渡带终点同色（rgba(10,22,38,0.55)），
        // 主体略加深保证卡片可读，尾端收敛到 rgba(12,26,44,0.68) 与项目区起点同色衔接，无生硬分界线
        background:
          "linear-gradient(180deg, rgba(10,22,38,0.55) 0%, rgba(11,24,40,0.62) 30%, rgba(11,24,40,0.62) 70%, rgba(12,26,44,0.68) 100%)",
      }}
    >
      <div className="container relative mx-auto max-w-6xl px-6">
        {/* ===== 标题区 ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="mb-3 flex items-baseline gap-3">
            <span className="font-mono text-xs tracking-[0.25em] text-gold-400">01</span>
            <span className="font-mono text-[10px] tracking-[0.25em] text-text-on-dark/70">EXPERIENCE</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-text-white md:text-4xl">
            工作经历 &amp; 技术栈
          </h2>
          <p className="max-w-xl leading-relaxed text-text-on-dark/90">
            用 AI 原生思维做工程：Java、Python、C++、TypeScript 多语言实践，
            横跨 MES、ERP、在线教育、机票交易多领域，让 AI Coding 成为日常生产力
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
          <motion.div variants={itemVariants} className="mb-6 flex items-center gap-4">
            <h3 className="text-xl font-semibold tracking-tight text-text-white">工作经历</h3>
            <span className="h-px flex-1 bg-white/10" />
          </motion.div>

          {/* 时间轴：左侧竖线贯穿，金色描边节点标记各段经历（芯部半透明让夜色透出） */}
          <div className="relative space-y-8 before:absolute before:bottom-2 before:left-[5px] before:top-2 before:w-px before:bg-white/10">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="relative pl-8"
              >
                {/* 时间轴节点 */}
                <span className="absolute left-0 top-[7px] h-[11px] w-[11px] rounded-full border-2 border-gold-400 bg-deep-blue-900/70" />

                {/* 头部：mono 时间段做金色锚点，角色降为弱文本（徽章归零） */}
                <div className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-mono text-xs tracking-wider text-gold-400">
                    {exp.period}
                  </span>
                  <span className="text-xs text-text-on-dark/70">{exp.role}</span>
                </div>

                {/* 公司名称（区块内唯一视觉焦点）+ 岗位业务定位 */}
                <h4 className="mb-1 text-xl font-semibold tracking-tight text-text-white">
                  {exp.company}
                </h4>
                {exp.subtitle && (
                  <p className="mb-3 text-[13px] leading-relaxed text-text-on-dark/75">
                    {exp.subtitle}
                  </p>
                )}

                {/* 亮点列表：开头【项目名】加粗为白色视觉锚点，其余文本保持弱化 */}
                <ul className="space-y-1.5">
                  {exp.highlights.map((h, j) => {
                    const prefix = h.match(/^(【[^】]+】)/)?.[0];
                    return (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-sm text-text-on-dark/90"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold-500/50" />
                        <span>
                          {prefix && (
                            <strong className="font-semibold text-text-white">{prefix}</strong>
                          )}
                          {prefix ? h.slice(prefix.length) : h}
                        </span>
                      </li>
                    );
                  })}
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
          <motion.div variants={itemVariants} className="mb-6 flex items-center gap-4">
            <h3 className="text-xl font-semibold tracking-tight text-text-white">技术栈</h3>
            <span className="h-px flex-1 bg-white/10" />
          </motion.div>

          {/* ★ 重点卡片：后端 + AI */}
          <div className="mb-4 grid gap-4 md:grid-cols-2">
            {featuredCats.map((cat) => {
              const skills = allSkills.filter((s) => s.category === cat);
              return (
                <motion.div
                  key={cat}
                  variants={itemVariants}
                  className={cn(
                    glassCard,
                    "border-l-2 border-l-gold-400/70 p-5 hover:border-l-gold-400",
                  )}
                >
                  <div className="mb-3 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                    <h4 className="text-base font-semibold text-text-white">
                      {cat}
                    </h4>
                  </div>
                  {/* 核心技能：标签 + 一句技术理解（深度叙事，区别于其他类别的纯标签墙） */}
                  <div className="space-y-2.5">
                    {skills.map((s) => (
                      <div key={s.name} className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        <Badge
                          variant="skill"
                          className="border-white/10 bg-white/[0.08] text-text-on-dark text-xs transition-all hover:bg-gold-500/15 hover:text-gold-400"
                        >
                          {s.name}
                        </Badge>
                        {s.subtext && (
                          <span className="flex-1 text-[13px] leading-relaxed text-text-on-dark/75">
                            {s.subtext}
                          </span>
                        )}
                      </div>
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
                  className={cn(glassCard, "p-5")}
                >
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-text-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                    {cat}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((s) => (
                      <Badge
                        key={s.name}
                        variant="skill"
                        className="border-white/10 bg-white/[0.08] text-text-on-dark text-xs transition-all hover:bg-gold-500/15 hover:text-gold-400"
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
