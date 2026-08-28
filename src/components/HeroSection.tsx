"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
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
          {/* CTA 图标按钮：圆形玻璃拟态容器 + 品牌/功能色图标（色值取自各 SVG 原始主色调，hover 时同色系提亮） */}
          <a
            href="#projects"
            aria-label="查看项目"
            title="查看项目"
            className="group flex h-12 items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.08] px-6 shadow-lg shadow-deep-blue-900/30 backdrop-blur-md transition-all duration-300 hover:border-[#3283FA]/60 hover:bg-[#3283FA]/15 hover:shadow-[#3283FA]/30 active:scale-95"
          >
            <svg viewBox="0 0 1024 1024" aria-hidden="true" className="h-6 w-6 transition-all duration-300 group-hover:scale-110 group-hover:brightness-125">
              <path d="M410.67 544H133.33A69.33 69.33 0 0 0 64 613.33v277.34A69.33 69.33 0 0 0 133.33 960h277.34A69.33 69.33 0 0 0 480 890.67V613.33A69.33 69.33 0 0 0 410.67 544zM402 842a40 40 0 0 1-40 40H182a40 40 0 0 1-40-40V662a40 40 0 0 1 40-40h180a40 40 0 0 1 40 40z m488.67-298H613.33A69.33 69.33 0 0 0 544 613.33v277.34A69.33 69.33 0 0 0 613.33 960h277.34A69.33 69.33 0 0 0 960 890.67V613.33A69.33 69.33 0 0 0 890.67 544zM882 842a40 40 0 0 1-40 40H662a40 40 0 0 1-40-40V662a40 40 0 0 1 40-40h180a40 40 0 0 1 40 40zM410.67 64H133.33A69.33 69.33 0 0 0 64 133.33v277.34A69.33 69.33 0 0 0 133.33 480h277.34A69.33 69.33 0 0 0 480 410.67V133.33A69.33 69.33 0 0 0 410.67 64zM402 362a40 40 0 0 1-40 40H182a40 40 0 0 1-40-40V182a40 40 0 0 1 40-40h180a40 40 0 0 1 40 40z m292.49 94.18a81.35 81.35 0 0 0 115 0l126.69-126.67a81.35 81.35 0 0 0 0-115L809.51 87.82a81.35 81.35 0 0 0-115 0L567.82 214.49a81.35 81.35 0 0 0 0 115z" fill="#3283FA" />
            </svg>
            <span className="text-sm font-medium text-text-white/90 transition-colors duration-300 group-hover:text-text-white">查看项目</span>
          </a>
          <a
            href="#blogs"
            aria-label="查看文章"
            title="查看文章"
            className="group flex h-12 items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.08] px-6 shadow-lg shadow-deep-blue-900/30 backdrop-blur-md transition-all duration-300 hover:border-[#1E80FF]/60 hover:bg-[#1E80FF]/15 hover:shadow-[#1E80FF]/30 active:scale-95"
          >
            <svg viewBox="0 0 1316 1024" aria-hidden="true" className="h-6 w-6 transition-all duration-300 group-hover:scale-110 group-hover:brightness-125">
              <path d="M643.181714 247.698286l154.916572-123.172572L643.181714 0.256 643.072 0l-154.660571 124.269714 154.660571 123.245715 0.109714 0.182857z m0 388.461714h0.109715l399.579428-315.245714-108.361143-87.04-291.218285 229.888h-0.146286l-0.109714 0.146285L351.817143 234.093714l-108.251429 87.04 399.433143 315.136 0.146286-0.146285z m-0.146285 215.552l0.146285-0.146286 534.893715-422.034285 108.397714 87.04-243.309714 192L643.145143 1024 10.422857 525.056 0 516.754286l108.251429-86.893715L643.035429 851.748571z" fill="#1E80FF" />
            </svg>
            <span className="text-sm font-medium text-text-white/90 transition-colors duration-300 group-hover:text-text-white">查看文章</span>
          </a>
          <a
            href="#footer"
            aria-label="联系我"
            title="联系我"
            className="group flex h-12 items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.08] px-6 shadow-lg shadow-deep-blue-900/30 backdrop-blur-md transition-all duration-300 hover:border-[#0dbeeb]/60 hover:bg-[#0dbeeb]/15 hover:shadow-[#0dbeeb]/30 active:scale-95"
          >
            <svg viewBox="0 0 1026 1024" aria-hidden="true" className="h-6 w-6 transition-all duration-300 group-hover:scale-110 group-hover:brightness-125">
              <path d="M1025.117 893.168c-0.01-2.695-0.355-4.985-0.68-6.63-0.035-9.05-0.03-18.105-0.03-27.16l0.005-37.78c0-63.8 0-127.6 0.025-191.409l0.01-1.64c0.03-4.17 0.03-5.9-0.04-7.32-0.03-0.715-0.02-1.43-0.02-2.15 0.005-1.77 0.01-3.96-0.175-6.475-0.965-12.955-6.665-24.23-16.495-32.615-12.93-11.01-27.7-11.01-32.56-11.01l-417.199 0.005-0.505-0.005-1.475 0.005c-27.955 0.24-49.822 21.875-49.785 49.25 0.087 69.34 0.092 139.85 0.092 208.034 0.003 34.66 0.003 69.315 0.015 103.96 0 3.56 0.21 8.97 2.033 14.86 6.36 20.65 24.99 34.1 47.465 34.26l12.36 0.09c14.285 0.11 29.055 0.225 43.64 0.225l2.88 0c73.84-0.095 147.68-0.215 221.519-0.345l59.65-0.1 22.96 0.03c19.16 0.04 38.32 0.07 57.48 0.07l1.89 0c10.43-0.01 20.265-3.47 28.46-10 8.13-6.49 17.82-18.405 17.785-38.37-0.025-9.27-0.035-20.1 0.015-30.94C1024.767 898.318 1025.117 895.973 1025.117 893.168zM956.528 624.979c-25.475 24.495-53.105 49.66-79.98 74.14-33.04 30.09-67.205 61.21-97.7 91.355-3.42 3.38-6.46 5.445-9.57 6.5-1.76 0.59-4.16 1.41-9.53-2.15-1.82-1.215-3.7-2.77-5.6-4.64-30.46-30.065-64.5-61.105-97.43-91.12-26.81-24.445-54.36-49.565-79.885-74.08L956.528 624.979zM968.448 897.298c-0.05 8.92-0.05 17.83-0.04 26.02-16.5-0.01-33-0.04-49.49-0.07l-14.87-0.03-67.945 0.1c-73.835 0.13-147.66 0.25-221.489 0.34l-2.815 0.005c-14.37 0-29.035-0.115-43.21-0.225l-6.29-0.04c-0.01-32.38-0.01-64.755-0.01-97.13-0.005-45.31-0.01-91.65-0.035-137.99 18.705 17.48 37.895 34.99 56.735 52.17 32.52 29.645 66.155 60.3 95.815 89.58 4.435 4.38 9.125 8.23 13.98 11.45 13.62 9.03 26.535 12.01 37.665 12.01 7.98 0 15.045-1.53 20.79-3.48 11.29-3.825 21.42-10.27 30.975-19.705 29.685-29.345 63.415-60.075 96.045-89.785 17.985-16.38 36.29-33.07 54.17-49.735-0.01 43.605-0.015 87.205-0.015 130.81l-0.005 37.755c0 9.93-0.01 19.86 0.035 29.755 0.005 1.525 0.115 2.925 0.275 4.15C968.568 894.448 968.458 895.808 968.448 897.298zM307.037 518.759C129.272 573.749 5.12 751.768 5.12 951.663c0 17.675 14.327 32 32 32s32-14.325 32-32c0-172.11 105.612-324.984 256.832-371.764 16.882-5.22 26.335-23.14 21.112-40.03C341.842 522.989 323.922 513.531 307.037 518.759zM760.158 280.754C760.123 148.187 652.243 40.335 519.669 40.335c-132.602 0-240.484 107.855-240.484 240.427 0 132.592 107.882 240.467 240.484 240.467C652.278 521.229 760.158 413.354 760.158 280.754zM343.184 280.762c0-97.282 79.172-176.427 176.49-176.427 97.295 0 176.46 79.147 176.485 176.427 0 97.302-79.17 176.462-176.485 176.462C422.356 457.224 343.184 378.064 343.184 280.762z" fill="#0dbeeb" />
            </svg>
            <span className="text-sm font-medium text-text-white/90 transition-colors duration-300 group-hover:text-text-white">联系我</span>
          </a>
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
