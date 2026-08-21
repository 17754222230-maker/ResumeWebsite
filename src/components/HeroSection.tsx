"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/knowledge";

export default function HeroSection() {
  // 向下滚动指示：仅在视口内且未开启减弱动态时运行 infinite 动画（P2 性能）
  const arrowRef = useRef<HTMLDivElement>(null);
  const arrowInView = useInView(arrowRef, { margin: "-15% 0px -15% 0px" });
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* 背景为全屏固定雪山图（HomeClient），本区无任何装饰动画层，图片直接透出 */}

      {/* 底部淡出过渡带：雪山图在进入经历区前自然隐入夜色（透明 → rgba(10,22,38,0.55)，
          与 TechStack 起点同色，消除分区交界生硬分界线） */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[28vh]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(10,22,38,0.36) 55%, rgba(10,22,38,0.55) 100%)",
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
          {/* W 头像圈：赤金环与 W 字母分层——环层用 CSS mask 切出 3px 赤金圆环（环内透明
              露出雪山），W 字母独立层叠加其上（mask 只作用于环层，不裁切字母） */}
          <div className="relative flex h-32 w-32 items-center justify-center">
            {/* 亮黄色环层（与 Hero 三按钮同色系 linear-gradient(135deg,#ffe259,#ffa751)） */}
            <div
              className="absolute inset-0 rounded-full shadow-xl shadow-[#ffa751]/30"
              style={{
                background: "linear-gradient(135deg, #ffe259, #ffa751)",
                WebkitMask:
                  "radial-gradient(circle farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3.5px))",
                mask:
                  "radial-gradient(circle farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3.5px))",
              }}
            />
            {/* W 字母层（不受 mask 影响） */}
            <span
              className="relative z-10 text-3xl font-bold"
              style={{
                color: "#ffe259",
                textShadow:
                  "0 1px 3px rgba(10,22,38,0.65), 0 2px 14px rgba(10,22,38,0.85)",
              }}
            >
              {profile.name.charAt(0).toUpperCase()}
            </span>
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
          <span className="ml-2 text-gold-400">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mb-4 text-lg text-gold-400 md:text-xl"
          style={{ textShadow: "0 1px 3px rgba(10,22,38,0.9), 0 2px 12px rgba(10,22,38,0.85)" }}
        >
          {profile.title}
        </motion.p>

        {/* Slogan */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12 max-w-xl text-base leading-relaxed text-text-on-dark/80 md:text-lg"
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
          {/* 查看项目：用户指定渐变 linear-gradient(135deg,#ffe259,#ffa751) */}
          <Button variant="gold" size="lg" asChild className="bg-[linear-gradient(135deg,#ffe259,#ffa751)] text-deep-blue-900 shadow-lg shadow-[#ffa751]/40 hover:bg-[linear-gradient(135deg,#ffe98a,#ffb464)]">
            <a href="#projects">查看项目</a>
          </Button>
          {/* 查看文章：同上渐变 */}
          <Button variant="gold" size="lg" asChild className="bg-[linear-gradient(135deg,#ffe259,#ffa751)] text-deep-blue-900 shadow-lg shadow-[#ffa751]/40 hover:bg-[linear-gradient(135deg,#ffe98a,#ffb464)]">
            <a href="#blogs">查看文章</a>
          </Button>
          {/* 联系我：同上渐变（原 outline 风格改为渐变实心，三按钮视觉统一） */}
          <Button variant="gold" size="lg" asChild className="bg-[linear-gradient(135deg,#ffe259,#ffa751)] text-deep-blue-900 shadow-lg shadow-[#ffa751]/40 hover:bg-[linear-gradient(135deg,#ffe98a,#ffb464)]">
            <a href="#footer">联系我</a>
          </Button>
        </motion.div>
      </div>

      {/* 向下滚动指示 — 底部居中（避开右下角数字人）；滚出视口即暂停动画 */}
      <motion.div
        ref={arrowRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#tech-stack"
          animate={arrowInView && !reduceMotion ? { y: [0, 8, 0] } : { y: 0 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-text-on-dark/70 transition-colors hover:text-gold-500"
        >
          <span className="text-xs">向下滚动</span>
          <ArrowDown size={18} />
        </motion.a>
      </motion.div>
    </section>
  );
}
