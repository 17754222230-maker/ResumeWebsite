"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "首页", href: "#hero" },
  { label: "技术栈", href: "#tech-stack" },
  { label: "项目", href: "#projects" },
  { label: "博客", href: "#blogs" },
  { label: "联系", href: "#footer" },
];

export interface NavbarProps {
  /** W 字符是否处于金色联动态（仅在传入 onLogoClick 时生效） */
  logoGold?: boolean;
  /** 点击 W 的回调；不传时 Logo 保持原有链接行为，不影响其他页面 */
  onLogoClick?: () => void;
}

export default function Navbar({ logoGold = false, onLogoClick }: NavbarProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // rAF 节流：scroll 高频触发时每帧最多更新一次 state（布尔 bail-out 进一步免重渲染）
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50);
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-deep-blue-900/90 backdrop-blur-md shadow-lg"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo：有回调时为可点击按钮（W 白/金联动），无回调时保持原链接行为 */}
        {onLogoClick ? (
          <button
            type="button"
            onClick={onLogoClick}
            className="relative cursor-pointer text-xl font-bold tracking-tight"
            aria-pressed={logoGold}
            aria-label="切换星空互动模式"
          >
            <span
              className={cn(
                "transition-colors duration-300",
                logoGold ? "text-gold-400" : "text-white",
              )}
              style={logoGold ? undefined : { textShadow: "0 1px 3px rgba(11, 42, 74, 0.55)" }}
            >
              W
            </span>
            <span className="text-gold-400">.</span>
          </button>
        ) : (
          <Link
            href="#hero"
            className="relative text-xl font-bold tracking-tight"
          >
            <span className="text-text-white">W</span>
            <span className="text-gold-400">.</span>
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
