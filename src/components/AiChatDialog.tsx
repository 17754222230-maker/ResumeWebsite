"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, Sparkles, Copy, Check } from "lucide-react";
import { WELCOME_MESSAGE } from "@/lib/ai/prompt";

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

export default function AiChatDialog({ open, onClose }: AiChatDialogProps) {
  const [sessionId] = useState(() => Math.random().toString(36).substring(2, 15));
  const [messages, setMessages] = useState<ChatMsg[]>([
    { id: nextId(), role: "assistant", content: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

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
          className="fixed right-8 top-1/2 z-50 flex w-[380px] -translate-y-1/2 flex-col rounded-2xl border border-border-light bg-cool-bg-card shadow-2xl md:w-[480px]"
          style={{ height: "620px" }}
        >
          {/* ===== 头部 ===== */}
          <div className="flex items-center justify-between rounded-t-2xl border-b border-border-light bg-gradient-to-r from-deep-blue-900 to-deep-blue-800 px-5 py-3.5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-500/20">
                <Sparkles size={15} className="text-gold-500" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-text-white">AI 助手</h3>
                <p className="text-[10px] text-text-on-dark/60">
                  关于王仔研的任何问题
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded-full text-text-on-dark/50 transition-colors hover:bg-white/10 hover:text-text-white"
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
                      ? "bg-deep-blue-900 text-text-white rounded-tr-md"
                      : "bg-cool-bg-alt text-text-primary rounded-tl-md"
                  }`}
                >
                  {msg.content}
                  {/* 复制按钮（仅助手消息） */}
                  {msg.role === "assistant" && msg.content && (
                    <button
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="absolute -right-8 top-2 flex h-6 w-6 items-center justify-center rounded-md opacity-0 transition-opacity hover:bg-border-light group-hover:opacity-100"
                      title="复制"
                    >
                      {copiedId === msg.id ? (
                        <Check size={12} className="text-green-500" />
                      ) : (
                        <Copy size={12} className="text-text-secondary" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* 加载中 */}
            {isLoading && messages[messages.length - 1]?.content === "" && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl rounded-tl-md bg-cool-bg-alt px-4 py-3">
                  <Loader2 size={14} className="animate-spin text-gold-500" />
                  <span className="text-xs text-text-secondary">思考中...</span>
                </div>
              </div>
            )}
          </div>

          {/* ===== 输入框 ===== */}
          <form onSubmit={handleSubmit} className="border-t border-border-light px-4 py-3">
            <div className="flex items-center gap-2 rounded-xl border border-border-medium bg-cool-bg pl-4 pr-1.5 transition-colors focus-within:border-gold-500/50">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="问一下王仔研的情况..."
                className="flex-1 bg-transparent py-2.5 text-sm text-text-primary outline-none placeholder:text-text-secondary/50"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-gold-500/10 hover:text-gold-500 disabled:opacity-30"
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
