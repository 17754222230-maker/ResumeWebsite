import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * 玻璃卡样式规范（全站卡片唯一来源，避免样式碎片化）：
 * - glassCard：普通卡 — 白玻璃底 + 白边，hover 金边提亮
 * - glassGoldCard：重点卡 — 金色渐变玻璃底 + 金边，hover 金边增强
 * 使用处：TechStack / ProjectCard / BlogSection / 项目详情页
 */
export const glassCard =
  "rounded-xl border border-white/10 bg-white/[0.07] shadow-sm backdrop-blur-md transition-all hover:border-gold-500/40 hover:bg-white/[0.10] hover:shadow-xl hover:shadow-deep-blue-900/40";

export const glassGoldCard =
  "rounded-xl border border-gold-500/40 bg-gradient-to-br from-white/[0.07] to-gold-500/[0.08] shadow-sm backdrop-blur-md transition-all hover:border-gold-500/60 hover:shadow-xl hover:shadow-deep-blue-900/40";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border border-border-light bg-cool-bg-card text-text-primary shadow-sm transition-all duration-300 hover:shadow-md",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-semibold leading-tight tracking-tight text-text-primary",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-text-secondary", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};