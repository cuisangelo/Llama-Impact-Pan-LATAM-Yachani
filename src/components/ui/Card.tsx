import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  /** Drop the default p-6 to control padding from the caller. */
  bare?: boolean;
};

export function Card({ className, bare = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn("relative rounded-2xl bg-surface-card text-ink", className)}
      {...props}
    >
      {bare ? children : <div className="p-6">{children}</div>}
    </div>
  );
}
