"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/knowledge";

interface HeroSectionProps {
  /** W 金色锁定态：隐藏圆形光晕，呈现纯粹星空 */
  starLocked?: boolean;
}

export default function HeroSection({ starLocked = false }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* 深色背景已上移至首页全屏固定背景层（HomeClient，#120F17），Galaxy 星空透明叠加其上 */}
      {/* 深邃背景层 — 动态光晕（金色锁定态下整层淡出，避免圆形光晕破坏纯粹星空） */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ opacity: starLocked ? 0 : 1, transition: "opacity 1s ease" }}
      >
        {/* 金色光晕 — 缓慢漂移（金泄秀，代表才华） */}
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -25, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] -left-10 h-[450px] w-[450px] rounded-full bg-gold-500/10 blur-[120px]"
        />
        {/* 青色光晕 — 反向漂移（水润局，代表流动） */}
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] -right-10 h-[400px] w-[400px] rounded-full bg-accent-teal/10 blur-[120px]"
        />
        {/* 中心纵深感光晕 — 缓慢脉动 */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-deep-blue-600/20 blur-[150px]"
        />
      </div>

      {/* 网格纹理（深色背景下用浅色网点） */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #F0F4F8 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* 底部淡出过渡带：星辰在进入经历区前自然隐没（透明 → #120F17，与 TechStack 起点同色） */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[28vh]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(18,15,23,0.55) 55%, #120F17 100%)",
        }}
      />

      <div className="container relative z-10 mx-auto flex flex-col items-center px-6 text-center">
        {/* 头像 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mb-8"
        >
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-gold-500 to-gold-300 p-[3px] shadow-xl shadow-gold-500/30">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-[#1B1622] text-3xl font-bold text-gold-500">
              {profile.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </motion.div>

        {/* 姓名与标题 */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-3 text-4xl font-bold tracking-tight text-text-white md:text-6xl lg:text-7xl"
        >
          {profile.name}
          <span className="ml-2 text-gold-500">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mb-4 text-lg text-gold-400 md:text-xl"
        >
          {profile.title}
        </motion.p>

        {/* Slogan */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12 max-w-xl text-base leading-relaxed text-text-on-dark/70 md:text-lg"
        >
          "{profile.slogan}"
        </motion.p>

        {/* CTA 按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button variant="gold" size="lg" asChild>
            <a href="#projects">查看项目</a>
          </Button>
          <Button variant="outline" size="lg" asChild className="border-gold-500/30 text-text-white transition-colors hover:border-gold-500/70 hover:bg-gold-500/10 hover:text-gold-400">
            <a href="#footer">联系我</a>
          </Button>
        </motion.div>
      </div>

      {/* 向下滚动指示 — 底部居中（避开右下角数字人） */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#tech-stack"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-text-on-dark/50 transition-colors hover:text-gold-500"
        >
          <span className="text-xs">向下滚动</span>
          <ArrowDown size={18} />
        </motion.a>
      </motion.div>
    </section>
  );
}
