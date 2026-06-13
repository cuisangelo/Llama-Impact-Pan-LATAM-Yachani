import { type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
};

export function Chip({ className, active = false, type = "button", ...props }: ChipProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[13px] font-medium transition-colors focus-ring",
        active
          ? "bg-charcoal text-white"
          : "bg-surface-card text-ink/80 hover:bg-surface-hover",
        className,
      )}
      {...props}
    />
  );
}
