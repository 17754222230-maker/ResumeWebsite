import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 合并 Tailwind 类名，解决样式冲突
 * cn() 是 class-variance-authority 的标准辅助函数
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
