"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  experiences,
  getSkillCategories,
  skills as allSkills,
} from "@/lib/knowledge";

const featuredCategories = ["后端技术", "AI 与智能化"];

const categoryEnNames: Record<string, string> = {
  后端技术: "BACKEND",
  "AI 与智能化": "AI ENGINEERING",
  数据库: "DATABASE",
  消息与中间件: "MIDDLEWARE",
  前端技术: "FRONTEND",
  系统与工具: "TOOLING",
};

export default function TechStack() {
  const reduce = useReducedMotion();
  const categories = getSkillCategories();
  const featuredCats = categories.filter((category) =>
    featuredCategories.includes(category),
  );
  const otherCats = categories.filter(
    (category) => !featuredCategories.includes(category),
  );

  const reveal = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-70px" },
          transition: { duration: 0.58, delay },
        };

  return (
    <section
      id="tech-stack"
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, rgba(10,22,38,0.55) 0%, rgba(10,22,38,0.90) 18%, rgba(12,30,48,0.94) 72%, rgba(12,26,44,0.88) 100%)",
      }}
    >
      <div className="relative flex min-h-[520px] items-center overflow-hidden sm:min-h-[580px]">
        <Image
          src="/images/sections/experience-journey.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[67%_center]"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(6,16,28,0.96) 0%, rgba(6,16,28,0.82) 42%, rgba(6,16,28,0.24) 76%, rgba(6,16,28,0.15) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,22,38,0.62) 0%, transparent 24%, transparent 68%, rgba(10,22,38,0.96) 100%)",
          }}
        />

        <motion.div
          {...reveal()}
          className="container relative z-10 mx-auto max-w-6xl px-6 py-24"
        >
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3 font-mono text-xs tracking-[0.24em] text-gold-400">
              <span>01</span>
              <span className="text-text-on-dark/55">CAREER JOURNEY</span>
            </div>
            <h2 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              工作经历
              <br />
              <span className="text-text-on-dark/58">&amp; 技术能力</span>
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-text-on-dark/82 sm:text-lg">
              从 7×24 钢铁产线到机票交易与 LLM Agent，系统形态一直在变，工程纪律始终不变：幂等、对账、归因、兜底，让每个答案可验证、可追溯。
            </p>
          </div>
        </motion.div>
      </div>

      <div className="container relative mx-auto max-w-6xl px-6 pb-28">
        <motion.div {...reveal()} className="mb-24">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-gold-400">
                EXPERIENCE
              </p>
              <h3 className="text-2xl font-semibold text-white sm:text-3xl">
                职业路径
              </h3>
            </div>
            <span className="hidden text-sm text-text-on-dark/45 sm:block">
              MES → ERP → 在线交易 → 飞猪 → Agent
            </span>
          </div>

          <div className="space-y-5">
            {experiences.map((experience, index) => (
              <motion.article
                key={`${experience.company}-${experience.period}`}
                {...reveal(index * 0.08)}
                className="grid overflow-hidden rounded-2xl border border-white/10 bg-deep-blue-900/65 shadow-2xl shadow-black/10 backdrop-blur-xl md:grid-cols-[12rem_1fr]"
              >
                <div className="border-b border-white/10 p-6 md:border-b-0 md:border-r md:p-7">
                  <span className="mb-8 block font-mono text-4xl font-semibold text-gold-400/80">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="font-mono text-xs tracking-wide text-gold-300">
                    {experience.period}
                  </p>
                  <p className="mt-2 text-sm text-text-on-dark/58">
                    {experience.role}
                  </p>
                </div>

                <div className="p-6 md:p-7 lg:p-8">
                  <h4 className="mb-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    {experience.company}
                  </h4>
                  {experience.subtitle && (
                    <p className="mb-5 max-w-3xl text-sm leading-relaxed text-text-on-dark/68">
                      {experience.subtitle}
                    </p>
                  )}
                  <ul className="grid gap-x-8 gap-y-3 lg:grid-cols-2">
                    {experience.highlights.map((highlight) => {
                      const prefix = highlight.match(/^(【[^】]+】)/)?.[0];
                      return (
                        <li
                          key={highlight}
                          className="flex items-start gap-3 text-sm leading-relaxed text-text-on-dark/82"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                          <span>
                            {prefix && (
                              <strong className="font-semibold text-white">
                                {prefix}
                              </strong>
                            )}
                            {prefix ? highlight.slice(prefix.length) : highlight}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        <motion.div {...reveal()}>
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-gold-400">
                CAPABILITY MATRIX
              </p>
              <h3 className="text-2xl font-semibold text-white sm:text-3xl">
                技术能力
              </h3>
            </div>
            <span className="hidden text-sm text-text-on-dark/45 sm:block">
              确定性工程 × AI 应用
            </span>
          </div>

          <div className="mb-5 grid gap-5 md:grid-cols-2">
            {featuredCats.map((category, index) => {
              const categorySkills = allSkills.filter(
                (skill) => skill.category === category,
              );
              return (
                <motion.article
                  key={category}
                  {...reveal(index * 0.08)}
                  className="relative overflow-hidden rounded-2xl border border-gold-500/25 bg-gradient-to-br from-white/[0.09] to-gold-500/[0.06] p-6 backdrop-blur-xl sm:p-7"
                >
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                      <span className="mb-2 block font-mono text-3xl font-semibold text-gold-400/75">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h4 className="text-xl font-semibold text-white">
                        {category}
                      </h4>
                    </div>
                    <span className="font-mono text-[10px] tracking-[0.18em] text-text-on-dark/38">
                      {categoryEnNames[category]}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {categorySkills.map((skill) => (
                      <div
                        key={skill.name}
                        className="grid gap-1.5 border-t border-white/[0.08] pt-3 sm:grid-cols-[8.5rem_1fr] sm:items-baseline sm:gap-4"
                      >
                        <span className="text-sm font-medium text-gold-200">
                          {skill.name}
                        </span>
                        {skill.subtext && (
                          <span className="text-[13px] leading-relaxed text-text-on-dark/67">
                            {skill.subtext}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {otherCats.map((category, index) => {
              const categorySkills = allSkills.filter(
                (skill) => skill.category === category,
              );
              return (
                <motion.article
                  key={category}
                  {...reveal(index * 0.06)}
                  className="border-t border-white/15 py-5"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h4 className="text-sm font-semibold text-white">
                      {category}
                    </h4>
                    <span className="font-mono text-[9px] tracking-[0.14em] text-text-on-dark/35">
                      {categoryEnNames[category]}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill) => (
                      <Badge
                        key={skill.name}
                        variant="skill"
                        className={cn(
                          "border-white/10 bg-white/[0.065] text-[11px] text-text-on-dark/78",
                          "hover:bg-gold-500/15 hover:text-gold-300",
                        )}
                      >
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
