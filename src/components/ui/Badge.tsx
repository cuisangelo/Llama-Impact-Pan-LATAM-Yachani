import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type BadgeProps = HTMLAttributes<HTMLSpanElement>;

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-surface-card px-2.5 py-0.5 text-xs font-medium text-ink/70",
        className,
      )}
      {...props}
    />
  );
}
