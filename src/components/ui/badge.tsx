import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-deep-blue-900 text-gold-500 hover:bg-deep-blue-800",
        skill:
          "border-deep-blue-900/10 bg-cool-bg-alt text-deep-blue-700 hover:bg-deep-blue-900/10",
        gold: "border-transparent bg-gold-500/10 text-gold-500 hover:bg-gold-500/20",
        outline: "text-text-secondary border-border-medium",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
