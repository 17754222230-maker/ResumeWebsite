"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/knowledge";

/**
 * 金色水滴动效（周期 7.5s）：
 * 1) 0–3.8s 汇聚 — 两条金色弧光从环顶沿左右两侧缓缓流向环底（pathLength 生长），
 *    环底同步从扁平液膜鼓起成泪滴；
 * 2) 4.35–4.6s 颈部拉伸断开；4.6–5.25s 重力加速下落（cubic-bezier 加速 + 形态拉长）；
 * 3) 5.25s 触水，4 圈涟漪逐圈延迟 0.32s 展开（easeOut），后圈更淡更慢；余下静默。
 * 仅动画 transform/opacity/pathLength；尊重 prefers-reduced-motion。
 */
function GoldenDrip() {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return null;

  const CYCLE = 7.5;
  const t = (sec: number) => sec / CYCLE; // 秒 → 归一化时间点

  // 涟漪：触水 5.25s，逐圈延迟 0.32s，扩散时长逐圈变长、峰值透明度逐圈衰减
  const SPLASH = 5.25;
  const ripples = [0, 1, 2, 3].map((i) => {
    const start = SPLASH + 0.32 * i;
    const end = Math.min(start + 1.4 + 0.18 * i, CYCLE - 0.1);
    return {
      key: i,
      opacityFrames: [0, 0, 0.5 - 0.11 * i, 0, 0],
      opacityTimes: [0, t(start), t(start + 0.06), t(end), 1],
      scaleFrames: [0.15, 0.15, 1 + 0.32 * i, 1 + 0.32 * i],
      scaleTimes: [0, t(start), t(end), 1],
    };
  });

  // 沿环汇聚弧光：从环顶 (80,1) 分别经左/右侧到环底 (80,115)，半径 57 贴合头像金环外缘
  const arcLeft = "M 80 1 A 57 57 0 0 0 23 58 A 57 57 0 0 0 80 115";
  const arcRight = "M 80 1 A 57 57 0 0 1 137 58 A 57 57 0 0 1 80 115";
  const arcAnim = {
    pathLength: [0, 0, 1, 1, 1],
    opacity: [0, 0.1, 0.8, 0, 0],
  };
  const arcTransition = {
    duration: CYCLE,
    repeat: Infinity,
    times: [0, t(0.3), t(3.8), t(4.4), 1],
    ease: "easeInOut" as const,
  };

  return (
    <svg
      width="160"
      height="175"
      viewBox="0 0 160 175"
      className="pointer-events-none absolute top-[-2px] left-1/2 -translate-x-1/2"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="dripGold" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id="arcGold" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.15" />
          <stop offset="70%" stopColor="#FBBF24" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <radialGradient id="glowGold" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="rippleGold" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="#F59E0B" stopOpacity="0" />
          <stop offset="85%" stopColor="#FBBF24" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 汇聚弧光：金色液态高光沿环缘从顶部向两侧下方缓缓流动，汇合于环底 */}
      <motion.path
        d={arcLeft}
        fill="none"
        stroke="url(#arcGold)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={arcAnim}
        transition={arcTransition}
      />
      <motion.path
        d={arcRight}
        fill="none"
        stroke="url(#arcGold)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={arcAnim}
        transition={arcTransition}
      />

      {/* 环底汇合处的聚光：随弧光抵达逐渐亮起，水滴脱离后消退 */}
      <motion.circle
        cx="80"
        cy="115"
        r="7"
        fill="url(#glowGold)"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.55, 0, 0] }}
        transition={{ duration: CYCLE, repeat: Infinity, times: [0, t(3.0), t(4.3), t(5.0), 1], ease: "easeInOut" }}
      />

      {/* 水滴：顶部锚在环底，由扁平液膜鼓起成泪滴 → 颈部拉伸 → 加速下落时形态拉长 */}
      <motion.g
        initial={{ y: 0, opacity: 0, scaleX: 1.35, scaleY: 0.2 }}
        animate={{
          y: [0, 0, 0, 0, 30, 30, 30],
          opacity: [0, 0, 0.95, 1, 1, 0, 0],
          scaleX: [1.35, 1.35, 1.02, 0.95, 0.88, 0.88, 0.88],
          scaleY: [0.2, 0.2, 0.95, 1.12, 1.28, 1.28, 1.28],
        }}
        transition={{
          duration: CYCLE,
          repeat: Infinity,
          times: [0, t(2.2), t(4.35), t(4.6), t(5.25), t(5.32), 1],
          ease: ["linear", "easeInOut", "easeInOut", [0.55, 0, 1, 0.45], "linear", "linear"],
        }}
        style={{ transformBox: "fill-box", transformOrigin: "50% 0%" }}
      >
        <path
          d="M 80 115 C 76.5 120.5, 74.5 123.5, 74.5 126.5 A 5.5 5.5 0 0 0 85.5 126.5 C 85.5 123.5, 83.5 120.5, 80 115 Z"
          fill="url(#dripGold)"
        />
        {/* 水滴高光 */}
        <circle cx="77.5" cy="125.5" r="1.2" fill="#FEF3C7" opacity="0.85" />
      </motion.g>

      {/* 涟漪：落点处 4 圈椭圆环依次延迟展开，easeOut 先快后慢，后圈更淡更慢（自然衰减） */}
      {ripples.map((r) => (
        <motion.ellipse
          key={r.key}
          cx="80"
          cy="148"
          rx="16"
          ry="5.5"
          fill="none"
          stroke="url(#rippleGold)"
          strokeWidth="1.4"
          initial={{ opacity: 0, scale: 0.15 }}
          animate={{ opacity: r.opacityFrames, scale: r.scaleFrames }}
          transition={{
            duration: CYCLE,
            repeat: Infinity,
            times: r.opacityTimes,
            ease: "easeOut",
            scale: { duration: CYCLE, repeat: Infinity, times: r.scaleTimes, ease: "easeOut" },
          }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
      ))}
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 100% 70% at 50% 45%,
            #102A43 0%,
            #0B1D3A 35%,
            #081530 65%,
            #040B18 100%)
        `,
      }}
    >
      {/* 深邃背景层 — 动态光晕，营造往屏幕里延伸的纵深感 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 金色光晕 — 缓慢漂移（金泄秀，代表才华） */}
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -25, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] -left-10 h-[450px] w-[450px] rounded-full bg-gold-500/10 blur-[120px]"
        />
        {/* 青色光晕 — 反向漂移（水润局，代表流动） */}
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] -right-10 h-[400px] w-[400px] rounded-full bg-accent-teal/10 blur-[120px]"
        />
        {/* 中心纵深感光晕 — 缓慢脉动 */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-deep-blue-600/20 blur-[150px]"
        />
      </div>

      {/* 网格纹理 */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #F0F4F8 1px, transparent 0)",
          backgroundSize: "40px 40px",
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
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-gold-500 to-gold-300 p-[3px] shadow-xl shadow-gold-500/20">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-deep-blue-900 text-3xl font-bold text-gold-500">
              {profile.name.charAt(0).toUpperCase()}
            </div>
          </div>
          {/* 金色水滴涟漪动效 */}
          <GoldenDrip />
        </motion.div>

        {/* 姓名与标题 */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-3 text-4xl font-bold tracking-tight text-text-white md:text-6xl"
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
          className="mb-10 max-w-xl text-base leading-relaxed text-text-on-dark/70 md:text-lg"
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
          <Button variant="outline" size="lg" asChild className="border-gold-500/30 text-text-white hover:bg-gold-500/10 hover:text-gold-400">
            <a href="#footer">联系我</a>
          </Button>
        </motion.div>
      </div>

      {/* 向下滚动指示 — 右下角 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 right-8"
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
