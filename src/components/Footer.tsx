"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Mail, ArrowUp, Check } from "lucide-react";
import { profile } from "@/lib/knowledge";

const footerLinks = [
  {
    label: "简历",
    href: "/resume/王仔研的简历_17754222230_全.pdf",
    icon: Code2,
  },
  {
    label: "Email",
    href: `mailto:${profile.contact.email}`,
    icon: Mail,
  },
];

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
            <p className="whitespace-nowrap text-sm leading-relaxed text-text-on-dark/60">
              {profile.title} · 用代码构建数字世界的艺术与逻辑
            </p>
          </motion.div>

          {/* 社交链接 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4"
          >
            {footerLinks.map((link) =>
              link.label === "Email" ? (
                <button
                  key={link.label}
                  onClick={handleCopyEmail}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-text-on-dark/20 text-text-on-dark/60 transition-all duration-300 hover:border-gold-500/50 hover:bg-gold-500/10 hover:text-gold-500"
                  aria-label={link.label}
                  title={copied ? "已复制" : "复制邮箱"}
                >
                  {copied ? <Check size={18} className="text-green-400" /> : <link.icon size={18} />}
                </button>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="王仔研的简历.pdf"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-text-on-dark/20 text-text-on-dark/60 transition-all duration-300 hover:border-gold-500/50 hover:bg-gold-500/10 hover:text-gold-500"
                  aria-label={link.label}
                  title="下载简历"
                >
                  <link.icon size={18} />
                </a>
              ),
            )}
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
          <p className="text-xs text-text-on-dark/40">
            &copy; {new Date().getFullYear()} {profile.name}. All rights
            reserved.
          </p>

          {/* 回到顶部 */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-text-on-dark/40 transition-colors hover:text-gold-500"
          >
            <ArrowUp size={14} />
            <span>回到顶部</span>
          </button>
        </motion.div>
      </div>
    </footer>
  );
}
