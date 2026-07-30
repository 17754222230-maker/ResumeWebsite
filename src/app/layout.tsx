import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

// next/font 自托管 Inter：消除外部字体请求与 CLS，以 CSS 变量接入 globals.css 的 --font-sans 回退链
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Wangziyan | 全栈开发工程师",
  description:
    "个人技术简历与作品集网站。专注全栈开发、AI 应用构建与优雅的用户体验。",
  keywords: [
    "全栈开发",
    "React",
    "Next.js",
    "TypeScript",
    "AI Agent",
    "个人简历",
  ],
  authors: [{ name: "Wangziyan" }],
  openGraph: {
    title: "Wangziyan | 全栈开发工程师",
    description:
      "个人技术简历与作品集网站。专注全栈开发、AI 应用构建与优雅的用户体验。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`scroll-smooth ${inter.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-cool-bg text-text-primary font-sans antialiased">
        {children}
        <Footer />
      </body>
    </html>
  );
}
