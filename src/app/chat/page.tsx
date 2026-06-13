"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Send, Bot, FileText, BookText } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Message = { role: "user" | "assistant"; content: string };

const ASSISTANT = {
  name: "Tutor Python",
  role: "Tutor Personal",
  style: "Balanceado",
  detailLevel: "Moderado",
  doc: "Python para todos",
};

const WELCOME: Message = {
  role: "assistant",
  content: `¡Hola! Soy ${ASSISTANT.name}, tu ${ASSISTANT.role.toLowerCase()}. Estoy aquí para ayudarte con «${ASSISTANT.doc}». Hazme preguntas concretas sobre el material.`,
};

// Maqueta: respuesta enlatada hasta conectar el backend RAG.
function mockReply(prompt: string): Message {
  return {
    role: "assistant",
    content: `Buena pregunta sobre "${prompt.slice(0, 60)}". En la versión final consultaré «${ASSISTANT.doc}» y citaré las fuentes [Documento]. Por ahora esto es una maqueta de la interfaz, sin modelo conectado.`,
  };
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  function send() {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { role: "user", content: text }, mockReply(text)]);
    setInput("");
    requestAnimationFrame(() =>
      endRef.current?.scrollIntoView({ behavior: "smooth" }),
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px]">
      {/* Chat column */}
      <div className="flex flex-col">
        <h1 className="text-h2 font-bold text-ink">Chat educativo</h1>
        <p className="mt-1 text-sm text-muted">
          Conversa con <span className="text-ink">{ASSISTANT.name}</span> sobre el
          material seleccionado.
        </p>

        <Card bare className="mt-6 flex min-h-[60vh] flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {messages.map((m, i) => (
              <ChatBubble key={i} message={m} />
            ))}
            <div ref={endRef} />
          </div>

          <div className="border-t border-hairline p-3">
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                rows={1}
                placeholder="¿Qué deseas saber?"
                className="max-h-32 flex-1 resize-none rounded-lg border border-hairline bg-surface px-3 py-2.5 text-[15px] text-ink outline-none placeholder:text-mist focus-ring focus:border-charcoal"
              />
              <button
                onClick={send}
                disabled={!input.trim()}
                aria-label="Enviar"
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-full bg-charcoal text-white transition-colors hover:bg-[#373b47] focus-ring",
                  "disabled:pointer-events-none disabled:opacity-40",
                )}
              >
                <Send className="size-4" />
              </button>
            </div>
          </div>
        </Card>
      </div>

      {/* Info column */}
      <aside className="order-first lg:order-last">
        <div className="flex flex-col gap-4 lg:sticky lg:top-20">
          <Card>
            <div className="flex size-10 items-center justify-center rounded-full bg-charcoal text-white">
              <Bot className="size-5" />
            </div>
            <h2 className="mt-3 font-semibold text-ink">{ASSISTANT.name}</h2>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <Badge>{ASSISTANT.role}</Badge>
              <Badge>{ASSISTANT.style}</Badge>
              <Badge>{ASSISTANT.detailLevel}</Badge>
            </div>
            <div className="mt-4 border-t border-hairline pt-4">
              <p className="text-[13px] font-medium text-ink">Documento base</p>
              <p className="mt-1 flex items-center gap-2 text-sm text-muted">
                <FileText className="size-3.5" />
                {ASSISTANT.doc}
              </p>
            </div>
          </Card>

          <Link
            href="/document"
            className={buttonClasses("secondary", "w-full")}
          >
            <BookText className="size-4" />
            Ver documento + chat
          </Link>
        </div>
      </aside>
    </div>
  );
}

function ChatBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed",
          isUser
            ? "bg-charcoal text-white"
            : "bg-surface-card text-ink",
        )}
      >
        {message.content}
      </div>
    </div>
  );
}
