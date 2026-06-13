"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Send, Bot } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import { SAMPLE_DOCUMENT } from "@/data/sample-document";

type Message = { role: "user" | "assistant"; content: string };

export default function DocumentChatPage() {
  const [page, setPage] = useState(0);
  const pages = SAMPLE_DOCUMENT.pages;
  const current = pages[page];

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Estás revisando «${SAMPLE_DOCUMENT.title}». Pregúntame sobre lo que ves en pantalla.`,
    },
  ]);
  const [input, setInput] = useState("");

  function send() {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", content: text },
      {
        role: "assistant",
        content: `Sobre la página ${current.page}: en la versión final buscaría la respuesta en el documento y la citaría. Maqueta sin modelo conectado.`,
      },
    ]);
    setInput("");
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="label-mono mb-2 text-muted">documento + chat</p>
        <h1 className="text-h2 font-bold text-ink">{SAMPLE_DOCUMENT.title}</h1>
        <p className="mt-1 text-sm text-muted">
          Asistente: <span className="text-ink">{SAMPLE_DOCUMENT.assistant}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Document viewer */}
        <Card bare className="flex flex-col">
          <div className="flex items-center justify-between border-b border-hairline px-5 py-3">
            <span className="text-sm font-medium text-ink">
              Página {current.page} de {pages.length}
            </span>
            <div className="flex gap-1">
              <NavBtn
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                label="Anterior"
              >
                <ChevronLeft className="size-4" />
              </NavBtn>
              <NavBtn
                onClick={() => setPage((p) => Math.min(pages.length - 1, p + 1))}
                disabled={page === pages.length - 1}
                label="Siguiente"
              >
                <ChevronRight className="size-4" />
              </NavBtn>
            </div>
          </div>
          <div className="min-h-[55vh] flex-1 overflow-y-auto p-6">
            <pre className="font-sans text-[15px] leading-relaxed whitespace-pre-wrap text-ink/90">
              {current.text}
            </pre>
          </div>
        </Card>

        {/* Chat */}
        <Card bare className="flex flex-col">
          <div className="flex items-center gap-2 border-b border-hairline px-5 py-3">
            <div className="flex size-7 items-center justify-center rounded-full bg-charcoal text-white">
              <Bot className="size-4" />
            </div>
            <span className="text-sm font-medium text-ink">Asistente IA</span>
            <Badge className="ml-auto">Maqueta</Badge>
          </div>
          <div className="min-h-[40vh] flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "flex",
                  m.role === "user" ? "justify-end" : "justify-start",
                )}
              >
                <div
                  className={cn(
                    "max-w-[88%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
                    m.role === "user"
                      ? "bg-charcoal text-white"
                      : "bg-surface-card text-ink",
                  )}
                >
                  {m.content}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-hairline p-3">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Pregunta sobre el material…"
                className="flex-1 rounded-lg border border-hairline bg-surface px-3 py-2.5 text-sm text-ink outline-none placeholder:text-mist focus-ring focus:border-charcoal"
              />
              <button
                onClick={send}
                disabled={!input.trim()}
                aria-label="Enviar"
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-charcoal text-white transition-colors hover:bg-[#373b47] focus-ring disabled:pointer-events-none disabled:opacity-40"
              >
                <Send className="size-4" />
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function NavBtn({
  onClick,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  disabled: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex size-8 items-center justify-center rounded-full bg-surface-card text-ink transition-colors hover:bg-surface-hover focus-ring disabled:pointer-events-none disabled:opacity-40"
    >
      {children}
    </button>
  );
}
