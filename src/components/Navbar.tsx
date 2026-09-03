"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "首页", href: "#hero" },
  { label: "技术栈", href: "#tech-stack" },
  { label: "项目", href: "#projects" },
  { label: "博客", href: "#blogs" },
  { label: "联系", href: "#footer" },
];

/* ===== 滚动联动配色：天蓝 → 深蓝夜幕 =====
   progress=0（页顶）标签栏取 Hero 天空同族的天蓝（采样自雪山图渲染顶边 ≈#025B89），
   与照片无缝衔接；随滚动沿同色系沉入 deep-blue-700 → deep-blue-900 夜幕。
   全程蓝色族内插值，不经过灰/橄榄等脏色，中段停留也干净 */
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
/** 色标：[进度, r, g, b] */
const SKY_STOPS: readonly (readonly number[])[] = [
  [0, 10, 92, 140], // 天蓝 #0A5C8C
  [0.45, 22, 52, 80], // deep-blue-700 暮色初合
  [1, 10, 22, 38], // deep-blue-900 深夜
];
/** 沿路径取色，返回 css rgba() 串 */
const skyAt = (p: number, alpha: number) => {
  let a = SKY_STOPS[0];
  let b = SKY_STOPS[SKY_STOPS.length - 1];
  for (let i = 1; i < SKY_STOPS.length; i++) {
    if (p <= SKY_STOPS[i][0]) {
      a = SKY_STOPS[i - 1];
      b = SKY_STOPS[i];
      break;
    }
  }
  const t = clamp01((p - a[0]) / (b[0] - a[0] || 1));
  const c = [1, 2, 3].map((k) => Math.round(a[k] + (b[k] - a[k]) * t));
  return `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${alpha})`;
};

export interface NavbarProps {
  /** 品牌标是否处于金色联动态（仅在传入 onLogoClick 时生效） */
  logoGold?: boolean;
  /** 点击 W 的回调；不传时 Logo 保持原有链接行为，不影响其他页面 */
  onLogoClick?: () => void;
}

export default function Navbar({ logoGold = false, onLogoClick }: NavbarProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  /** 滚动进度 0→1：0 页顶（天蓝），1 联系区块进入视口下半（深蓝夜幕） */
  const [progress, setProgress] = useState(0);
  /** 首屏完全隐藏 Navbar（不遮挡雪山背景），一旦滚动才滑入；菜单展开时保持可见 */
  const visible = isOpen || progress > 0.003;

  useEffect(() => {
    // rAF 节流：scroll 高频触发时每帧最多更新一次 state（阈值 bail-out 进一步免重渲染）
    let ticking = false;
    const update = () => {
      ticking = false;
      // 终点锚定「联系」区块：其顶边进入视口下半时即视为到达，进度封顶为 1
      const footer = document.getElementById("footer");
      const span = footer
        ? footer.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.5
        : document.documentElement.scrollHeight - window.innerHeight;
      const p = clamp01(window.scrollY / Math.max(1, span));
      setProgress((prev) => (Math.abs(prev - p) < 0.004 ? prev : p));
    };
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "relative isolate fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-full opacity-0",
        visible && progress > 0.02 && "shadow-lg",
      )}
    >
      {/* 底色层：天蓝 → 深蓝夜幕 + 毛玻璃；progress=1 时即深蓝夜幕滚动态 */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 backdrop-blur-md"
        style={{ backgroundColor: skyAt(progress, 0.94) }}
      />

      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo「金水相生 · W」：投影勾边保证叠在天蓝/照片上仍可读 */}
        {onLogoClick ? (
          <button
            type="button"
            onClick={onLogoClick}
            className="flex cursor-pointer items-center"
            aria-pressed={logoGold}
            aria-label="切换星空互动模式"
          >
            <Logo size={26} gold={logoGold} shadow />
          </button>
        ) : (
          <Link href="#hero" className="flex items-center">
            <Logo size={26} shadow title="王仔研 · 返回首页" />
          </Link>
        )}

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-sm font-medium text-text-on-dark/80 transition-colors hover:text-gold-500"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button
          className="text-text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="切换菜单"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-deep-blue-800/95 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-2 px-6 pb-6 pt-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-lg px-4 py-3 text-text-on-dark/80 transition-colors hover:bg-deep-blue-700 hover:text-gold-500"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
