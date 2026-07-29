"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/knowledge";

/**
 * 金色水滴动效（周期 9s，严格时序因果 + 百分比几何自适应贴环）：
 * 几何：SVG 以容器宽 142.857%（=160/112）渲染，1 SVG 单位 ≡ 容器宽/112，
 * 因此金环外缘半径恒为 56 单位、圆心恒为 (80,58)，与实际渲染像素无关，水带永远贴环。
 * 1) 0.3–3.5s 高山流水 — 左右水带共享环顶同一起点同时渗出（右侧稍慢 0.3s 抵达），
 *    mask 揭示三段式流速，圆头前锋；流头高光自起点出发随下行渐显；
 * 2) 3.5s 水流抵达环底 → 3.7s 液膜先横向摊开 → 表面张力收拢鼓起 → 拉长 → 颈断；
 * 3) 5.85s 断开（环底残留液膜回弹）→ 重力加速下落 → 6.5s 触水，4 圈大涟漪展开至 8.9s。
 * 动画使用 transform/opacity/pathLength(mask)/d；尊重 prefers-reduced-motion。
 */
function GoldenDrip() {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return null;

  const CYCLE = 9;
  const t = (sec: number) => sec / CYCLE; // 秒 → 归一化时间点

  // ===== 时序锚点：ARRIVE（水流抵达环底）必须早于 DRIP_START（液膜首现）=====
  const ARRIVE = 3.5;
  const DRIP_START = 3.7;
  const SPLASH = 6.5;

  // 涟漪：形态沿用已认可参数（rx26/ry7.5、横跨约 108px）
  const ripples = [0, 1, 2, 3].map((i) => {
    const start = SPLASH + 0.3 * i;
    const end = Math.min(start + 1.3 + 0.15 * i, CYCLE - 0.1);
    return {
      key: i,
      opacityFrames: [0, 0, 0.45 - 0.09 * i, 0, 0],
      opacityTimes: [0, t(start), t(start + 0.06), t(end), 1],
      scaleFrames: [0.12, 0.12, 1 + 0.36 * i, 1 + 0.36 * i],
      scaleTimes: [0, t(start), t(end), 1],
    };
  });

  // ===== 变宽水带：顶端在环顶 (80,2)（r=56，正落环缘）汇成一点，
  // 内缘沿 r≈55.5 与环外缘微叠 0.5 单位（相切无缝），外缘向下渐扩至 r=59.5，底部宽约 4 =====
  const BAND_LEFT =
    "M 80 2 C 49 2.3, 24.5 27.3, 24.5 58 C 24.5 88.7, 49 113.5, 80 113.5 L 80 117.5 C 47 117.5, 20.5 90.9, 20.5 58 C 20.5 25.1, 47 2.2, 80 2 Z";
  const BAND_RIGHT =
    "M 80 2 C 111 2.3, 135.5 27.3, 135.5 58 C 135.5 88.7, 111 113.5, 80 113.5 L 80 117.5 C 113 117.5, 139.5 90.9, 139.5 58 C 139.5 25.1, 113 2.2, 80 2 Z";
  // mask 揭示弧：沿水带中线 r=57.5，圆头宽描边（前锋圆润），pathLength 推进即水流前锋
  const REVEAL_LEFT = "M 80 0.5 A 57.5 57.5 0 0 0 22.5 58 A 57.5 57.5 0 0 0 80 115.5";
  const REVEAL_RIGHT = "M 80 0.5 A 57.5 57.5 0 0 1 137.5 58 A 57.5 57.5 0 0 1 80 115.5";

  // 三段式流速：两侧同刻（0.3s）自同一起点渗出，右侧整体稍慢——渗出 → 坡陡流急 → 近环底减速涌入
  const flowFramesL = [0, 0, 0.12, 0.8, 1, 1];
  const flowTimesL = [0, t(0.3), t(1.4), t(2.6), t(3.2), 1];
  const flowFramesR = [0, 0, 0.1, 0.75, 1, 1];
  const flowTimesR = [0, t(0.3), t(1.5), t(2.9), t(ARRIVE), 1];

  // 流头高光：自共享起点出发，起点处透明度为 0（杜绝静止亮点），随下行渐显；采样点在中线 r=57.5
  const headCy = [0.5, 0.5, 8.2, 29.25, 58, 86.75, 107.8, 115.5, 115.5, 115.5];
  const headCxL = [80, 80, 51.25, 30.2, 22.5, 30.2, 51.25, 80, 80, 80];
  const headCxR = [80, 80, 108.75, 129.8, 137.5, 129.8, 108.75, 80, 80, 80];
  const headOpacity = [0, 0, 0.35, 0.6, 0.75, 0.8, 0.85, 0.9, 0, 0];
  const headTimesL = [0, t(0.3), t(1.48), t(1.78), t(2.07), t(2.37), t(2.75), t(3.2), t(3.4), 1];
  const headTimesR = [0, t(0.3), t(1.64), t(2.0), t(2.36), t(2.72), t(3.08), t(ARRIVE), t(3.7), 1];

  // 液滴统一时间轴：3.7s 液膜摊开（晚于 ARRIVE）→ 4.3–4.9s 张力收拢鼓起 → 5.3s 拉长 →
  // 5.65s 颈细 → 5.85s 断开 → 6.5s 触水
  const dripTimes = [0, t(DRIP_START), t(4.3), t(4.9), t(5.3), t(5.65), t(5.85), t(SPLASH), t(6.57), 1];

  // 形态 morph 序列（命令结构完全一致）：锚点 (80,114) 正在环底缘——
  // 液膜（横向摊开）→ 扁球（表面张力收拢）→ 拉长 → 颈断 → 断开后圆润泪滴
  const DRIP_FILM = "M 80 114 C 74 114.3, 71 114.8, 71 115.8 A 9 2.2 0 0 0 89 115.8 C 89 114.8, 86 114.3, 80 114 Z";
  const DRIP_BALL = "M 80 114 C 76 114.5, 74 115.5, 74 118 A 6 4.5 0 0 0 86 118 C 86 115.5, 84 114.5, 80 114 Z";
  const DRIP_STRETCH = "M 80 114 C 77 118, 75 121, 75 124.5 A 5 5.5 0 0 0 85 124.5 C 85 121, 83 118, 80 114 Z";
  const DRIP_NECK = "M 80 114 C 78.5 120, 76 124, 76 127.5 A 4.8 5.2 0 0 0 85.6 127.5 C 85.6 124, 83 120, 80 114 Z";
  const DRIP_FREE = "M 80 114 C 76.5 119.5, 74.5 122.5, 74.5 125.5 A 5.5 5.5 0 0 0 85.5 125.5 C 85.5 122.5, 83.5 119.5, 80 114 Z";

  return (
    <svg
      viewBox="0 0 160 175"
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[33.143%]"
      style={{ width: "142.857%", height: "auto" }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="dripGold" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id="arcGold" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.05" />
          <stop offset="55%" stopColor="#FBBF24" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <radialGradient id="headGold" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFBEB" stopOpacity="1" />
          <stop offset="55%" stopColor="#FDE68A" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="glowGold" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="rippleGold" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="#F59E0B" stopOpacity="0" />
          <stop offset="85%" stopColor="#FBBF24" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
        {/* mask 揭示：宽描边弧的 pathLength 从环顶推进到环底，逐步露出变宽水带 */}
        <mask id="flowRevealL" maskUnits="userSpaceOnUse">
          <motion.path
            d={REVEAL_LEFT}
            fill="none"
            stroke="#fff"
            strokeWidth="12"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: flowFramesL }}
            transition={{
              duration: CYCLE,
              repeat: Infinity,
              times: flowTimesL,
              ease: ["linear", "easeIn", "linear", "easeOut", "linear"],
            }}
          />
        </mask>
        <mask id="flowRevealR" maskUnits="userSpaceOnUse">
          <motion.path
            d={REVEAL_RIGHT}
            fill="none"
            stroke="#fff"
            strokeWidth="12"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: flowFramesR }}
            transition={{
              duration: CYCLE,
              repeat: Infinity,
              times: flowTimesR,
              ease: ["linear", "easeIn", "linear", "easeOut", "linear"],
            }}
          />
        </mask>
      </defs>

      {/* 环顶起点的湿润高光：水带出现前极缓渗出，两条水带视觉上从这一点分岔，杜绝突兀登场 */}
      <motion.circle
        cx="80"
        cy="2"
        r="2.4"
        fill="url(#headGold)"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0.3, 0, 0] }}
        transition={{ duration: CYCLE, repeat: Infinity, times: [0, t(0.7), t(2.2), t(3.2), 1], ease: "easeInOut" }}
      />

      {/* 变宽水带：顶尖底宽，内缘与环外缘相切，经 mask 揭示“边前进边变宽”；透明度极缓渐入 */}
      <motion.path
        d={BAND_LEFT}
        fill="url(#arcGold)"
        mask="url(#flowRevealL)"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.12, 0.85, 0.85, 0, 0] }}
        transition={{ duration: CYCLE, repeat: Infinity, times: [0, t(0.3), t(0.8), t(2.2), t(4.9), t(6.0), 1], ease: "easeInOut" }}
      />
      <motion.path
        d={BAND_RIGHT}
        fill="url(#arcGold)"
        mask="url(#flowRevealR)"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.12, 0.85, 0.85, 0, 0] }}
        transition={{ duration: CYCLE, repeat: Infinity, times: [0, t(0.3), t(0.8), t(2.4), t(4.9), t(6.0), 1], ease: "easeInOut" }}
      />

      {/* 流头高光：自共享起点出发、随下行才渐显，与各自揭示进度同步（非匀速） */}
      <motion.circle
        r="3"
        fill="url(#headGold)"
        initial={{ cx: 80, cy: 0.5, opacity: 0 }}
        animate={{ cx: headCxL, cy: headCy, opacity: headOpacity }}
        transition={{ duration: CYCLE, repeat: Infinity, times: headTimesL, ease: "linear" }}
      />
      <motion.circle
        r="3"
        fill="url(#headGold)"
        initial={{ cx: 80, cy: 0.5, opacity: 0 }}
        animate={{ cx: headCxR, cy: headCy, opacity: headOpacity }}
        transition={{ duration: CYCLE, repeat: Infinity, times: headTimesR, ease: "linear" }}
      />

      {/* 环底汇合处的聚光：水流抵达（3.5s）后才亮起，水滴脱离后消退 */}
      <motion.circle
        cx="80"
        cy="114"
        r="7"
        fill="url(#glowGold)"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.6, 0.6, 0, 0] }}
        transition={{ duration: CYCLE, repeat: Infinity, times: [0, t(3.4), t(3.9), t(5.6), t(6.3), 1], ease: "easeInOut" }}
      />

      {/* 水滴：严格在水流抵达（3.5s）之后的 3.7s 才首现 — 液膜摊开 → 张力收拢 → 拉长 → 颈断 → 加速下落 */}
      <motion.g
        initial={{ y: 0, opacity: 0, scaleX: 0.5, scaleY: 0.3 }}
        animate={{
          y: [0, 0, 0, 0, 0, 0, 0, 32, 32, 32],
          opacity: [0, 0, 0.9, 1, 1, 1, 1, 1, 0, 0],
          scaleX: [0.5, 0.5, 1.1, 1, 1, 0.97, 0.95, 0.9, 0.9, 0.9],
          scaleY: [0.3, 0.3, 1, 1, 1, 1.03, 1.1, 1.18, 1.18, 1.18],
        }}
        transition={{
          duration: CYCLE,
          repeat: Infinity,
          times: dripTimes,
          ease: ["linear", "easeOut", "easeInOut", "easeInOut", "easeInOut", "easeIn", [0.55, 0, 1, 0.45], "linear", "linear"],
        }}
        style={{ transformBox: "fill-box", transformOrigin: "50% 0%" }}
      >
        <motion.path
          fill="url(#dripGold)"
          initial={{ d: DRIP_FILM }}
          animate={{ d: [DRIP_FILM, DRIP_FILM, DRIP_FILM, DRIP_BALL, DRIP_BALL, DRIP_STRETCH, DRIP_NECK, DRIP_FREE, DRIP_FREE, DRIP_FREE] }}
          transition={{
            duration: CYCLE,
            repeat: Infinity,
            times: dripTimes,
            ease: ["linear", "easeOut", "easeInOut", "easeInOut", "easeInOut", "easeIn", [0.55, 0, 1, 0.45], "linear", "linear"],
          }}
        />
        {/* 水滴高光 */}
        <circle cx="77.5" cy="122" r="1.1" fill="#FEF3C7" opacity="0.85" />
      </motion.g>

      {/* 断开瞬间环底残留的小凸起液膜：表面张力回缩—回弹—消退 */}
      <motion.path
        d="M 74.5 114 A 5.5 2.4 0 0 0 85.5 114 Z"
        fill="url(#dripGold)"
        initial={{ opacity: 0, scaleY: 0.2 }}
        animate={{
          opacity: [0, 0, 0.85, 0.85, 0, 0],
          scaleY: [0.2, 0.2, 1, 0.45, 0.75, 0.15],
        }}
        transition={{ duration: CYCLE, repeat: Infinity, times: [0, t(5.85), t(5.98), t(6.25), t(6.55), 1], ease: "easeOut" }}
        style={{ transformBox: "fill-box", transformOrigin: "50% 0%" }}
      />

      {/* 涟漪：落点处 4 圈大尺寸椭圆环依次延迟展开，最大横向半径约 54（近乎铺满圆环宽度） */}
      {ripples.map((r) => (
        <motion.ellipse
          key={r.key}
          cx="80"
          cy="148"
          rx="26"
          ry="7.5"
          fill="none"
          stroke="url(#rippleGold)"
          strokeWidth="1.6"
          initial={{ opacity: 0, scale: 0.12 }}
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
