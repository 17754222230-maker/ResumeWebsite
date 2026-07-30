"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import AiChatDialog from "@/components/AiChatDialog";

export default function AiAgentCharacter() {
  const [chatOpen, setChatOpen] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [showAutoGuide, setShowAutoGuide] = useState(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoGuideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoGuideDismissRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotion = useReducedMotion();

  // #46 跨分区背景自适应：只读复用 isHeroVisible 判断当前叠压区
  // isHeroVisible=true → 首屏近黑(#120F17)；false → 深蓝分区(#1B3A5C)
  const isOnDarkBg = isHeroVisible;
  const glowBoost = isOnDarkBg ? 0.82 : 1; // 首屏 0.82（配合峰值 0.55 渐变已足够亮）→ 深蓝区 1.0
  const strokeBoost = isOnDarkBg ? 0.82 : 1; // 描边圈同理

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero");
      if (!hero) return;
      const heroBottom = hero.offsetTop + hero.offsetHeight;
      setIsHeroVisible(heroBottom > window.scrollY + 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    setIsHovered(true);
    cancelAutoGuide();
  };

  const handleMouseLeave = () => {
    hideTimerRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  // #45.2 首访自动引导（Intercom 式）
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("ai-agent-guided")) return;

    autoGuideTimerRef.current = setTimeout(() => {
      setShowAutoGuide(true);
      autoGuideDismissRef.current = setTimeout(() => {
        setShowAutoGuide(false);
        localStorage.setItem("ai-agent-guided", "1");
      }, 6000);
    }, 8000);

    return () => {
      if (autoGuideTimerRef.current) clearTimeout(autoGuideTimerRef.current);
      if (autoGuideDismissRef.current) clearTimeout(autoGuideDismissRef.current);
    };
  }, []);

  // 用户主动交互时取消自动引导
  const cancelAutoGuide = () => {
    if (autoGuideTimerRef.current) { clearTimeout(autoGuideTimerRef.current); autoGuideTimerRef.current = null; }
    if (autoGuideDismissRef.current) { clearTimeout(autoGuideDismissRef.current); autoGuideDismissRef.current = null; }
    if (showAutoGuide) {
      setShowAutoGuide(false);
      localStorage.setItem("ai-agent-guided", "1");
    }
  };

  const isFullyVisible = isHovered || isHeroVisible;

  return (
    <motion.div
      className="fixed right-4 bottom-24 md:bottom-8 z-50 select-none opacity-[0.92] transition-opacity duration-300 hover:opacity-100"
      animate={{ x: isFullyVisible ? "0%" : "55%" }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      onClick={() => { setChatOpen(true); cancelAutoGuide(); }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: "pointer" }}
    >
      {/* 对话气泡（hover 或首访自动引导触发） */}
      <AnimatePresence>
        {(isHovered || showAutoGuide) && (
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.9 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-full right-0 -mb-3 origin-bottom-right whitespace-nowrap rounded-xl border border-gold-500/20 bg-white/[0.08] backdrop-blur-md px-4 py-2.5 text-xs text-white/90 shadow-md"
          >
            {showAutoGuide && !isHovered ? "点我可以聊聊这份简历~" : "有什么问题随时询问哦~"}
            <div className="absolute -bottom-1 right-[46px] md:right-[58px] h-3 w-3 rotate-45 border-b border-r border-gold-500/20 bg-white/[0.10] backdrop-blur-md" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* SVG Q 版动漫男生头像 — 深蓝圆底衬 + 金色描边圈 */}
      <motion.div
        animate={reduceMotion ? { y: 0 } : { y: [0, -3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
      <svg
        width="128"
        height="123"
        viewBox="0 24 100 96"
        className="h-auto w-[104px] drop-shadow-md md:w-[128px]"
        aria-label="AI 助手头像"
      >
        <defs>
          {/* 头像底衬：深蓝径向渐变（上亮下深，呼应夜色主题） */}
          <radialGradient id="avatarBgGrad" cx="50%" cy="32%" r="75%">
            <stop offset="0%" stopColor="#2E6398" />
            <stop offset="55%" stopColor="#1D4A7A" />
            <stop offset="100%" stopColor="#0B1D3A" />
          </radialGradient>
          {/* 金色描边圈：亮金 → 金 → 暗金 */}
          <linearGradient id="avatarRingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="50%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          {/* 发色：深蓝上浅下深 */}
          <linearGradient id="avatarHairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1D4A7A" />
            <stop offset="100%" stopColor="#0F2B4C" />
          </linearGradient>
          {/* 西装肋部：深蓝渐暗 */}
          <linearGradient id="avatarJacketGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1D4A7A" />
            <stop offset="100%" stopColor="#0B1D3A" />
          </linearGradient>
          {/* 柔和金晕（#44 峰值提亮 + 范围扩大，#46 深蓝区补偿对比度） */}
          <radialGradient id="avatarGlowGrad" cx="50%" cy="50%" r="58%">
            <stop offset="0%" stopColor="rgba(251,191,36,0.55)" />
            <stop offset="50%" stopColor="rgba(251,191,36,0.18)" />
            <stop offset="100%" stopColor="rgba(251,191,36,0)" />
          </radialGradient>
          {/* 圆形头像裁剪 */}
          <clipPath id="avatarClip">
            <circle cx="50" cy="72" r="32" />
          </clipPath>
        </defs>

        {/* 光晕包裹层（#46 深蓝区 glowBoost 上浮补偿对比度） */}
        <circle cx="50" cy="72" r="48" fill="url(#avatarGlowGrad)" opacity={glowBoost} style={{ transition: "opacity 0.6s ease" }} />

        {/* 头像整组：平时静止（降权精简），hover 俏皮点头摇摆（±4°） */}
        <motion.g
          animate={isHovered && !reduceMotion ? { rotate: [0, -4, 3, -4, 3, 0] } : { rotate: 0 }}
          transition={isHovered && !reduceMotion ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
          style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
        >
          {/* 圆形深蓝底衬 */}
          <circle cx="50" cy="72" r="32" fill="url(#avatarBgGrad)" />

          {/* 头像内容（圆形裁剪） */}
          <g clipPath="url(#avatarClip)">
            {/* 肩部西装 + 白衬领 + 金色衣扣 */}
            <path d="M 24 106 C 29 90 39 85 44 84.5 L 46 83.5 Q 50 86 54 83.5 L 56 84.5 C 61 85 71 90 76 106 Z" fill="url(#avatarJacketGrad)" />
            <path d="M 45.5 84 L 50 90.5 L 54.5 84 Q 50 86.8 45.5 84 Z" fill="#E8F1FA" />
            <circle cx="50" cy="94" r="1" fill="#FBBF24" />
            <circle cx="50" cy="99" r="1" fill="#FBBF24" opacity="0.85" />

            {/* 脖子 */}
            <path d="M 46 79 L 46 84 Q 50 86 54 84 L 54 79 Z" fill="#F2C39B" />

            {/* 耳朵 + 脸 */}
            <ellipse cx="34.5" cy="67" rx="2.2" ry="3.2" fill="#FFDFC4" />
            <ellipse cx="65.5" cy="67" rx="2.2" ry="3.2" fill="#FFDFC4" />
            <ellipse cx="50" cy="67" rx="15.5" ry="14.5" fill="#FFDFC4" />

            {/* 干净短发（深蓝）+ 刘海 + 金色发丝高光 */}
            <path d="M 34.5 67 C 33 48 41 44 50 44 C 59 44 67 48 65.5 67 C 63.5 59 60.5 57 56.5 60.5 C 53.5 55.5 47 55.5 44 60 C 40.5 56.5 36.5 59.5 34.5 67 Z" fill="url(#avatarHairGrad)" />
            <path d="M 42 49.5 Q 46 47.5 50.5 48" stroke="#FBBF24" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6" />
            <path d="M 55 50 Q 58.5 51.5 60.5 54.5" stroke="#FCD34D" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.5" />
            {/* 右侧补充发丝高光（#45.3 移除耳麦后右侧发型平衡） */}
            <path d="M 58 48.5 Q 61.5 50.5 63 53.5" stroke="#FBBF24" strokeWidth="0.9" strokeLinecap="round" fill="none" opacity="0.55" />

            {/* 眉毛 */}
            <path d="M 40.5 62.5 Q 43.5 61 46 62.3" stroke="#123A63" strokeWidth="1" strokeLinecap="round" fill="none" />
            <path d="M 54 62.3 Q 56.5 61 59.5 62.5" stroke="#123A63" strokeWidth="1" strokeLinecap="round" fill="none" />

            {/* 大眼睛（眨眼：静态 rx/ry + scaleY，规避属性关键帧竞态） */}
            <motion.ellipse
              cx="43.5" cy="66.5" rx="2.3" ry="3.1" fill="#0B2A4A"
              initial={{ scaleY: 1 }}
              animate={reduceMotion ? { scaleY: 1 } : { scaleY: [1, 1, 0.1, 1] }}
              transition={{ duration: 3.6, repeat: Infinity, times: [0, 0.92, 0.96, 1], ease: "easeInOut" }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
            <motion.ellipse
              cx="56.5" cy="66.5" rx="2.3" ry="3.1" fill="#0B2A4A"
              initial={{ scaleY: 1 }}
              animate={reduceMotion ? { scaleY: 1 } : { scaleY: [1, 1, 0.1, 1] }}
              transition={{ duration: 3.6, repeat: Infinity, times: [0, 0.92, 0.96, 1], ease: "easeInOut" }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
            <circle cx="42.8" cy="65.3" r="0.9" fill="#FFFFFF" />
            <circle cx="55.8" cy="65.3" r="0.9" fill="#FFFFFF" />

            {/* 亲和微笑 + 暖色腮红 */}
            <path d="M 46.5 74 Q 50 76.8 53.5 74" stroke="#0B2A4A" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            <ellipse cx="38.5" cy="71.5" rx="2.2" ry="1.3" fill="#E8956D" opacity="0.48" />
            <ellipse cx="61.5" cy="71.5" rx="2.2" ry="1.3" fill="#E8956D" opacity="0.48" />
          </g>

          {/* 金色描边圈（#44 strokeWidth 2.2→1.5 降权）+ 外圈淡金光环（#46 深蓝区 strokeBoost 补偿） */}
          <circle cx="50" cy="72" r="32" fill="none" stroke="url(#avatarRingGrad)" strokeWidth="1.5" opacity={strokeBoost} style={{ transition: "opacity 0.6s ease" }} />
          <circle cx="50" cy="72" r="34.5" fill="none" stroke="#FBBF24" strokeWidth="1" opacity={0.22 * strokeBoost} style={{ transition: "opacity 0.6s ease" }} />
        </motion.g>
      </svg>
      </motion.div>

      {/* AI 对话窗口 */}
      <AiChatDialog open={chatOpen} onClose={() => setChatOpen(false)} />
    </motion.div>
  );
}
