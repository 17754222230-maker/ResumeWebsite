"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Mail, ArrowUp, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/knowledge";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCopyEmail = async () => {
    const email = profile.contact.email;
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <footer id="footer" className="relative bg-deep-blue-900">
      {/* 顶部水波纹装饰 */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* 左侧信息 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h3 className="mb-2 text-xl font-bold text-text-white">
              {profile.name}
              <span className="text-gold-500">.</span>
            </h3>
            <p className="whitespace-nowrap text-sm leading-relaxed text-text-on-dark/70">
              {profile.title} · 用代码构建数字世界的艺术与逻辑
            </p>
          </motion.div>

          {/* 联系操作按钮：深蓝底 + 亮黄图标点缀，hover 提亮/浮起/阴影增强 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {/* 下载简历：统一走 ui/Button（获得 focus ring 与 active 按压态） */}
            <Button
              variant="outline"
              asChild
              className="group h-auto gap-2 rounded-lg border-white/10 bg-white/[0.07] px-4 py-2.5 text-sm font-medium text-text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400/60 hover:bg-white/[0.10] hover:shadow-lg hover:shadow-deep-blue-900/50 active:scale-[0.98]"
            >
              <a
                href="/resume/王仔研的简历_17754222230_全.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="王仔研的简历.pdf"
                aria-label="下载简历"
              >
                <Code2 size={16} className="text-gold-400 transition-transform duration-300 group-hover:scale-110" />
                下载简历
              </a>
            </Button>

            {/* 获取邮箱（点击复制，成功态显示已复制） */}
            <Button
              variant="outline"
              onClick={handleCopyEmail}
              className="group h-auto gap-2 rounded-lg border-white/10 bg-white/[0.07] px-4 py-2.5 text-sm font-medium text-text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400/60 hover:bg-white/[0.10] hover:shadow-lg hover:shadow-deep-blue-900/50 active:scale-[0.98]"
              aria-label="获取邮箱"
              title={copied ? "已复制" : "点击复制邮箱"}
            >
              {copied ? (
                <Check size={16} className="text-green-400" />
              ) : (
                <Mail size={16} className="text-gold-400 transition-transform duration-300 group-hover:scale-110" />
              )}
              {copied ? "已复制" : "获取邮箱"}
            </Button>
          </motion.div>
        </div>

        {/* 底部版权 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 flex flex-col items-center gap-4 border-t border-text-on-dark/10 pt-8 text-center md:flex-row md:justify-between"
        >
          <p className="text-xs text-text-on-dark/60">
            &copy; {new Date().getFullYear()} {profile.name}. All rights
            reserved.
          </p>

          {/* 回到顶部 */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-text-on-dark/60 transition-colors hover:text-gold-500"
          >
            <ArrowUp size={14} />
            <span>回到顶部</span>
          </button>
        </motion.div>
      </div>
    </footer>
  );
}
