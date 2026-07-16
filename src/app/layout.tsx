import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
      className="scroll-smooth"
    >
      <body className="min-h-screen flex flex-col bg-cool-bg text-text-primary font-sans antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
