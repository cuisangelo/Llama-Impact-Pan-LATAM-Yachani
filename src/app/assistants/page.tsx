"use client";

import { useState } from "react";
import Link from "next/link";
import { Bot, FileText, Trash2, MessageSquare, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Field } from "@/components/ui/Field";
import { Button, buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import {
  ASSISTANTS,
  ASSISTANT_ROLES,
  COMMUNICATION_STYLES,
  DETAIL_LEVELS,
} from "@/data/assistants";

type Tab = "saved" | "create";

export default function AssistantsPage() {
  const [tab, setTab] = useState<Tab>("saved");
  const [temperature, setTemperature] = useState(0.7);
  const [contextWindow, setContextWindow] = useState(5);

  return (
    <div className="flex flex-col gap-10">
      <PageHeader
        eyebrow="asistentes"
        title="Gestión de asistentes"
        description="Crea asistentes personalizados sobre tus documentos y administra los que ya tienes."
      />

      {/* Tabs */}
      <div className="flex w-fit gap-1 rounded-full bg-surface-card p-1">
        <TabButton active={tab === "saved"} onClick={() => setTab("saved")}>
          Asistentes guardados
        </TabButton>
        <TabButton active={tab === "create"} onClick={() => setTab("create")}>
          Crear nuevo
        </TabButton>
      </div>

      {tab === "saved" ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ASSISTANTS.map((a) => (
            <Card key={a.id} className="flex h-full flex-col">
              <div className="flex size-10 items-center justify-center rounded-full bg-charcoal text-white">
                <Bot className="size-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-ink">{a.name}</h3>
              <div className="mt-1 flex flex-wrap gap-1.5">
                <Badge>{a.role}</Badge>
                <Badge>{a.style}</Badge>
              </div>
              <div className="mt-4 space-y-1.5 text-sm text-muted">
                {a.docs.map((d) => (
                  <p key={d.hash} className="flex items-center gap-2">
                    <FileText className="size-3.5 shrink-0" />
                    <span className="truncate">{d.title}</span>
                  </p>
                ))}
              </div>
              <div className="mt-5 flex gap-2 border-t border-hairline pt-4">
                <Link
                  href="/chat"
                  className={buttonClasses("primary", "flex-1")}
                >
                  <MessageSquare className="size-4" />
                  Usar
                </Link>
                <button
                  className={buttonClasses("tertiary")}
                  aria-label="Eliminar asistente"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <form
          className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Nombre del asistente">
                <Input placeholder="Ej: Tutor de Matemáticas" />
              </Field>
              <Field label="Rol">
                <Select>
                  {ASSISTANT_ROLES.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Estilo de comunicación">
                <Select defaultValue="Balanceado">
                  {COMMUNICATION_STYLES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Nivel de detalle">
                <Select defaultValue="Moderado">
                  {DETAIL_LEVELS.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </Select>
              </Field>
            </div>

            <Card>
              <h3 className="text-sm font-semibold text-ink">
                Opciones avanzadas
              </h3>
              <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <RangeField
                  label="Creatividad (temperature)"
                  value={temperature}
                  min={0}
                  max={1}
                  step={0.1}
                  onChange={setTemperature}
                  display={temperature.toFixed(1)}
                />
                <RangeField
                  label="Contexto (k fragmentos)"
                  value={contextWindow}
                  min={1}
                  max={10}
                  step={1}
                  onChange={(v) => setContextWindow(Math.round(v))}
                  display={String(contextWindow)}
                />
              </div>
            </Card>

            <div>
              <Button type="submit">
                <Sparkles className="size-4" />
                Crear asistente
              </Button>
            </div>
          </div>

          <aside>
            <Card className="lg:sticky lg:top-20">
              <h3 className="text-sm font-semibold text-ink">
                Documentos base
              </h3>
              <p className="mt-2 text-sm text-muted">
                Selecciona documentos desde el catálogo para vincularlos a este
                asistente.
              </p>
              <Link
                href="/catalog"
                className={buttonClasses("secondary", "mt-4 w-full")}
              >
                Ir al catálogo
              </Link>
            </Card>
          </aside>
        </form>
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-ring",
        active ? "bg-charcoal text-white" : "text-ink/70 hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}

function RangeField({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="flex items-center justify-between text-[13px] font-medium text-ink">
        {label}
        <span className="label-mono text-muted">{display}</span>
      </span>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1 w-full cursor-pointer appearance-none rounded-full bg-hairline accent-charcoal"
      />
    </label>
  );
}
