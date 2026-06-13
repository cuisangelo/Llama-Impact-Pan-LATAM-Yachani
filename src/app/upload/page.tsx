"use client";

import { useState } from "react";
import Link from "next/link";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Field } from "@/components/ui/Field";
import { Button, buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import {
  CATEGORIES,
  DOCUMENT_TYPES,
  DIFFICULTY_LEVELS,
  LANGUAGES,
} from "@/data/catalog";

const FORMATS = ["PDF", "Word", "EPub", "HTML", "PowerPoint", "TXT"];
const STEPS = ["Metadata", "Archivo", "Procesamiento"];

export default function UploadPage() {
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState("");

  return (
    <div className="flex flex-col gap-10">
      <PageHeader
        eyebrow="subir"
        title="Subir nuevo documento"
        description="Añade material a la biblioteca. Se procesa, limpia y convierte en base de conocimiento para los asistentes."
      />

      <div className="flex flex-wrap gap-2">
        {FORMATS.map((f) => (
          <Badge key={f}>{f}</Badge>
        ))}
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-3">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "flex size-7 items-center justify-center rounded-full text-[13px] font-medium transition-colors",
                  i <= step
                    ? "bg-charcoal text-white"
                    : "bg-surface-card text-muted",
                )}
              >
                {i + 1}
              </span>
              <span
                className={cn(
                  "text-sm",
                  i <= step ? "font-medium text-ink" : "text-muted",
                )}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <span className="h-px w-8 bg-hairline" aria-hidden />
            )}
          </div>
        ))}
      </div>

      {step === 0 && (
        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            setStep(1);
          }}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field label="Título del documento">
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Nombre descriptivo del documento"
                  required
                />
              </Field>
            </div>
            <Field label="Categoría">
              <Select>
                {Object.keys(CATEGORIES).map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </Select>
            </Field>
            <Field label="Tipo de documento">
              <Select>
                {DOCUMENT_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </Select>
            </Field>
            <Field label="Nivel">
              <Select>
                {DIFFICULTY_LEVELS.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </Select>
            </Field>
            <Field label="Idioma">
              <Select>
                {LANGUAGES.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </Select>
            </Field>
            <Field label="Autor">
              <Input placeholder="Autor o creador" />
            </Field>
            <Field label="Año de publicación">
              <Input type="number" defaultValue={2026} min={1900} max={2026} />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Etiquetas" hint="Palabras clave separadas por comas">
                <Input placeholder="python, fundamentos, scripting" />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Descripción">
                <textarea
                  rows={3}
                  placeholder="Breve descripción del contenido"
                  className="w-full resize-none rounded-lg border border-hairline bg-surface px-3 py-2.5 text-[15px] text-ink outline-none placeholder:text-mist focus-ring focus:border-charcoal"
                />
              </Field>
            </div>
          </div>
          <div>
            <Button type="submit" disabled={!title.trim()}>
              Continuar
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </form>
      )}

      {step === 1 && (
        <div className="flex flex-col gap-5">
          <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-hairline bg-surface-card/50 px-6 py-16 text-center transition-colors hover:bg-surface-card">
            <div className="flex size-12 items-center justify-center rounded-full bg-charcoal text-white">
              <UploadCloud className="size-6" />
            </div>
            <p className="font-medium text-ink">
              Arrastra un archivo o haz clic para seleccionar
            </p>
            <p className="text-sm text-muted">
              PDF, Word, EPub, HTML, PowerPoint o TXT
            </p>
            <input type="file" className="hidden" />
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setStep(0)}
              className={buttonClasses("secondary")}
            >
              <ArrowLeft className="size-4" />
              Volver
            </button>
            <Button onClick={() => setStep(2)}>
              Procesar
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <Card className="flex flex-col items-center text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-charcoal text-white">
            <CheckCircle2 className="size-6" />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-ink">
            {title.trim() || "Documento"} procesado
          </h2>
          <p className="mt-1 max-w-md text-sm text-muted">
            En la versión final se extraería el texto, se generarían fragmentos y
            embeddings, y quedaría disponible en el catálogo. Esto es una maqueta.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => {
                setStep(0);
                setTitle("");
              }}
              className={buttonClasses("secondary")}
            >
              <FileText className="size-4" />
              Subir otro
            </button>
            <Link href="/catalog" className={buttonClasses("tertiary")}>
              Ir al catálogo
            </Link>
            <Link href="/assistants" className={buttonClasses("primary")}>
              Crear asistente
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
}
