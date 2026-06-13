"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/catalog", label: "Catálogo" },
  { href: "/assistants", label: "Asistentes" },
  { href: "/chat", label: "Chat" },
  { href: "/upload", label: "Subir" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-surface/80 backdrop-blur-sm">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
        <Link href="/" className="label-mono text-ink focus-ring rounded-sm">
          yachani
        </Link>
        <div className="flex items-center gap-1 overflow-x-auto">
          {LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors focus-ring",
                  active
                    ? "bg-charcoal text-white"
                    : "text-ink/70 hover:bg-surface-card hover:text-ink",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
