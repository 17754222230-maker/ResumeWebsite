"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, Copy, Check } from "lucide-react";

interface ChatMsg {
  id: string;
  role: "user" | "assistant";
  content: string;
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
          const err = await res.json().catch(() => ({ error: "请求失败" }));
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, content: `😅 ${err.error || "服务暂不可用，请稍后重试"}` } : m,
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
                ? { ...m, content: "抱歉，网络出了点问题，请重试 🙏" }
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
          className="fixed right-4 top-1/2 z-50 flex w-[calc(100vw-2rem)] max-w-[480px] -translate-y-1/2 flex-col rounded-2xl border border-white/10 bg-white/[0.07] shadow-2xl shadow-deep-blue-900/60 backdrop-blur-md"
          style={{ height: "min(620px, calc(100vh - 6rem))" }}
          role="dialog"
          aria-modal="true"
          aria-label="大白 AI 助手对话窗口"
        >
          {/* ===== 头部 ===== */}
          <div className="flex items-center justify-between rounded-t-2xl border-b border-white/10 bg-white/[0.04] px-5 py-3.5">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full">
                <img src="/images/white-bear.webp" alt="大白" className="h-full w-full object-cover" />
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
                    msg.role === "user"
                      ? "bg-gold-500 text-white font-medium rounded-tr-md"
                      : "bg-white/[0.05] text-text-primary rounded-tl-md"
                  }`}
                >
                  {msg.content}
                  {/* 复制按钮（仅助手消息） */}
                  {msg.role === "assistant" && msg.content && (
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
