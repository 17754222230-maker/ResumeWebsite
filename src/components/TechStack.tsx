"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { skills, getSkillCategories } from "@/lib/knowledge";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const categoryLabels: Record<string, string> = {
  "前端框架": "Frontend",
  "编程语言": "Languages",
  "前端基础": "Foundations",
  "后端技术": "Backend",
  "数据库": "Database",
  "DevOps": "DevOps",
  "工具": "Tools",
  "云服务": "Cloud",
};

const categoryIcons: Record<string, string> = {
  "前端框架": "⚛️",
  "编程语言": "💻",
  "前端基础": "🌐",
  "后端技术": "⚙️",
  "数据库": "🗄️",
  "DevOps": "🔧",
  "工具": "🛠️",
  "云服务": "☁️",
};

export default function TechStack() {
  const categories = getSkillCategories();

  return (
    <section id="tech-stack" className="relative bg-cool-bg py-24">
      {/* 背景装饰 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-deep-blue-900/3 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gold-500/5 blur-3xl" />
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
            技术栈
          </Badge>
          <h2 className="mb-4 text-3xl font-bold text-deep-blue-900 md:text-4xl">
            技术能力
          </h2>
          <div className="mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-gold-500 to-gold-300" />
        </motion.div>

        {/* 技能分类 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-10 md:grid-cols-2 lg:grid-cols-3"
        >
          {categories.map((category) => {
            const categorySkills = skills.filter(
              (s) => s.category === category,
            );
            return (
              <motion.div
                key={category}
                variants={itemVariants}
                className="group"
              >
                <div className="rounded-xl border border-border-light bg-cool-bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gold-500/20">
                  {/* 分类标题 */}
                  <div className="mb-5 flex items-center gap-3">
                    <span className="text-2xl">
                      {categoryIcons[category] || "📦"}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-deep-blue-900">
                        {category}
                      </h3>
                      <p className="text-xs text-text-secondary">
                        {categoryLabels[category] || category}
                      </p>
                    </div>
                  </div>

                  {/* 技能标签 */}
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill) => (
                      <div
                        key={skill.name}
                        className="group/tag relative"
                      >
                        <Badge
                          variant="skill"
                          className="cursor-default transition-all duration-200 hover:bg-deep-blue-900 hover:text-gold-500"
                        >
                          {skill.name}
                        </Badge>
                        {/* 熟练度指示器 */}
                        {skill.level && (
                          <div className="absolute -bottom-1 left-1/2 hidden -translate-x-1/2 group-hover/tag:block">
                            <div className="whitespace-nowrap rounded bg-deep-blue-900 px-2 py-0.5 text-[10px] text-text-white shadow-lg">
                              {skill.level}%
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
