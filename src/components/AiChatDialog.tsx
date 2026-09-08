"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, Copy, Check, CircleAlert } from "lucide-react";

interface ChatMsg {
  id: string;
  role: "user" | "assistant";
  content: string;
  /** 服务异常/网络异常消息：使用独立的警示气泡样式，不提供复制按钮 */
  isError?: boolean;
}

interface AiChatDialogProps {
  open: boolean;
  onClose: () => void;
}

let msgCounter = 0;
const nextId = () => `msg_${++msgCounter}_${Date.now()}`;

/** 按当前系统时间返回差异化问候语（用户首次打开窗口时作为首条消息展示） */
function getTimeGreeting(): string {
  const h = new Date().getHours();
  if (h >= 6 && h < 12) return "早上好 ☀️";
  if (h >= 12 && h < 14) return "中午好 🌤️";
  if (h >= 14 && h < 18) return "下午好 🌇";
  if (h >= 18 && h < 21) return "晚上好 🌆";
  return "夜深了，注意休息 🌙";
}

/**
 * 行内 Markdown 渲染：模型输出中的 **加粗** 与 `行内代码` 按排版意图展示，
 * 其余内容原样保留（换行由气泡的 whitespace-pre-wrap 处理）。
 * 未闭合的标记保持字面显示，流式输出中也不会闪错。
 */
function renderInlineMarkdown(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(
        <strong key={key++} className="font-semibold text-text-white">
          {token.slice(2, -2)}
        </strong>,
      );
    } else {
      nodes.push(
        <code
          key={key++}
          className="rounded bg-white/10 px-1 py-0.5 font-mono text-[0.85em] text-gold-300"
        >
          {token.slice(1, -1)}
        </code>,
      );
    }
    lastIndex = match.index + token.length;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
}


export default function AiChatDialog({ open, onClose }: AiChatDialogProps) {
  const [sessionId] = useState(() => Math.random().toString(36).substring(2, 15));
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  // 首次打开时按当前时间插入问候语作为首条消息（仅一次，后续开关保留对话历史）
  const greetingShownRef = useRef(false);

  useEffect(() => {
    if (open && !greetingShownRef.current) {
      greetingShownRef.current = true;
      setMessages([
        {
          id: nextId(),
          role: "assistant",
          content: `${getTimeGreeting()}\n你有什么想要了解关于王仔研的工作履历、项目经历以及博客文章等信息吗`,
        },
      ]);
    }
  }, [open]);

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // 不支持剪贴板 API 时忽略
    }
  };

  // 自动滚动
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // 无障碍焦点管理：打开时移焦输入框（等入场动画起步），关闭时把焦点归还给触发元素
  useEffect(() => {
    if (open) {
      prevFocusRef.current = document.activeElement as HTMLElement | null;
      const t = setTimeout(() => inputRef.current?.focus(), 200);
      return () => clearTimeout(t);
    }
    if (prevFocusRef.current) {
      prevFocusRef.current.focus();
      prevFocusRef.current = null;
    }
  }, [open]);

  // ESC 关闭
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // 移动端全屏铺满时锁定背景滚动，避免背后页面跟着滑动
  useEffect(() => {
    if (!open) return;
    if (!window.matchMedia("(max-width: 767px)").matches) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const text = input.trim();
      if (!text || isLoading) return;

      setInput("");
      const userMsg: ChatMsg = { id: nextId(), role: "user", content: text };
      setMessages((prev) => [...prev, userMsg]);

      // 预留一条空助手消息用于流式追加
      const assistantId = nextId();
      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", content: "" },
      ]);

      setIsLoading(true);
      abortRef.current = new AbortController();

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [{ role: "user", content: text }],
            sessionId,
          }),
          signal: abortRef.current.signal,
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({ error: "服务暂不可用，请稍后重试" }));
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? { ...m, content: err.error || "服务暂不可用，请稍后重试", isError: true }
                : m,
            ),
          );
          setIsLoading(false);
          return;
        }

        // 读取流式响应
        const reader = res.body?.getReader();
        if (!reader) {
          setIsLoading(false);
          return;
        }

        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          // 解析 AI SDK 格式: 0:"文本"
          const lines = buffer.split("\n");
          buffer = lines.pop() || ""; // 保留未完成的行

          for (const line of lines) {
            if (line.startsWith("0:")) {
              try {
                const chunk = JSON.parse(line.slice(2));
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId ? { ...m, content: m.content + chunk } : m,
                  ),
                );
              } catch {
                // 跳过解析失败的片段
              }
            }
          }
        }
      } catch (err: any) {
        if (err?.name !== "AbortError") {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? { ...m, content: "网络出了点问题，请稍后重试", isError: true }
                : m,
            ),
          );
        }
      } finally {
        setIsLoading(false);
        abortRef.current = null;
      }
    },
    [input, isLoading, sessionId],
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex h-[100dvh] w-full flex-col bg-white/[0.07] shadow-2xl shadow-deep-blue-900/60 backdrop-blur-md md:left-auto md:right-4 md:top-1/2 md:h-[min(620px,calc(100vh_-_6rem))] md:w-[calc(100vw-2rem)] md:max-w-[480px] md:-translate-y-1/2 md:rounded-2xl md:border md:border-white/10"
          role="dialog"
          aria-modal="true"
          aria-label="大白 AI 助手对话窗口"
        >
          {/* ===== 头部 ===== */}
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-5 py-3.5 md:rounded-t-2xl">
            <div className="flex items-center gap-2.5">
              {/* 头像：白底圆形容器内缩图片（object-contain + 内边距），
                  保证原图四角完整落入圆内，大白双耳不被圆形裁切 */}
              <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-white p-1.5">
                <img src="/images/white-bear.webp" alt="大白" className="h-full w-full object-contain" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-text-white">我是大白</h3>
                <p className="text-[10px] text-text-on-dark/70">
                  我可以回答关于王仔研的相关问题哦
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded-full text-text-on-dark/60 transition-colors hover:bg-white/10 hover:text-gold-400"
            >
              <X size={16} />
            </button>
          </div>

          {/* ===== 消息列表 ===== */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-1 items-start ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`group relative max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap select-text ${
                    msg.isError
                      ? "rounded-tl-md border border-gold-500/40 bg-gold-500/[0.08] text-gold-100"
                      : msg.role === "user"
                        ? "bg-gold-500 text-white font-medium rounded-tr-md"
                        : "bg-white/[0.05] text-text-primary rounded-tl-md"
                  }`}
                >
                  {msg.isError && (
                    <CircleAlert
                      size={14}
                      className="mr-1.5 inline-block -translate-y-px text-gold-400"
                    />
                  )}
                  {renderInlineMarkdown(msg.content)}
                  {/* 复制按钮（仅助手正常消息） */}
                  {msg.role === "assistant" && msg.content && !msg.isError && (
                    <button
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="absolute -right-8 top-2 flex h-6 w-6 items-center justify-center rounded-md opacity-0 transition-opacity hover:bg-white/10 group-hover:opacity-100"
                      title="复制"
                    >
                      {copiedId === msg.id ? (
                        <Check size={12} className="text-green-500" />
                      ) : (
                        <Copy size={12} className="text-text-on-dark/60" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* 加载中 */}
            {isLoading && messages[messages.length - 1]?.content === "" && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl rounded-tl-md bg-white/[0.05] px-4 py-3">
                  <Loader2 size={14} className="animate-spin text-gold-500" />
                  <span className="text-xs text-text-on-dark/60">思考中...</span>
                </div>
              </div>
            )}
          </div>

          {/* ===== 输入框 ===== */}
          <form onSubmit={handleSubmit} className="border-t border-white/10 px-4 py-3">
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] pl-4 pr-1.5 transition-colors focus-within:border-gold-500/50">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="问一下王仔研的情况..."
                aria-label="输入问题"
                className="flex-1 bg-transparent py-2.5 text-sm text-text-primary outline-none placeholder:text-text-on-dark/50"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-500 text-deep-blue-900 transition-colors hover:bg-gold-400 disabled:opacity-30"
              >
                <Send size={15} />
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
