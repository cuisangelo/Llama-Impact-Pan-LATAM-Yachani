"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  LayoutGrid,
  List,
  FileText,
  Check,
  ArrowRight,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import {
  CATEGORIES,
  DOCUMENT_TYPES,
  DIFFICULTY_LEVELS,
  DOCUMENTS,
  type Document,
} from "@/data/catalog";

export default function CatalogPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [type, setType] = useState("Todos");
  const [level, setLevel] = useState("Todos");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selected, setSelected] = useState<string[]>([]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DOCUMENTS.filter((doc) => {
      if (category !== "Todas" && doc.category !== category) return false;
      if (type !== "Todos" && doc.type !== type) return false;
      if (level !== "Todos" && doc.level !== level) return false;
      if (!q) return true;
      return [doc.title, doc.author, doc.description, ...doc.tags]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [query, category, type, level]);

  function toggle(hash: string) {
    setSelected((prev) =>
      prev.includes(hash) ? prev.filter((h) => h !== hash) : [...prev, hash],
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <PageHeader
        eyebrow="catálogo"
        title="Catálogo de documentos"
        description="Explora la biblioteca, filtra por categoría o nivel y elige los materiales base para tu asistente."
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
        {/* Results */}
        <div className="order-2 lg:order-1">
          <div className="mb-5 flex items-center justify-between gap-3">
            <p className="text-sm text-muted">
              {results.length} documento{results.length === 1 ? "" : "s"}
            </p>
            <div className="flex items-center gap-1 rounded-full bg-surface-card p-1">
              <ViewToggle
                active={view === "grid"}
                onClick={() => setView("grid")}
                label="Grid"
              >
                <LayoutGrid className="size-4" />
              </ViewToggle>
              <ViewToggle
                active={view === "list"}
                onClick={() => setView("list")}
                label="Lista"
              >
                <List className="size-4" />
              </ViewToggle>
            </div>
          </div>

          {results.length === 0 ? (
            <Card>
              <p className="text-sm text-muted">
                No se encontraron documentos con esos criterios.
              </p>
            </Card>
          ) : view === "grid" ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {results.map((doc) => (
                <DocumentGridCard
                  key={doc.hash}
                  doc={doc}
                  selected={selected.includes(doc.hash)}
                  onToggle={() => toggle(doc.hash)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {results.map((doc) => (
                <DocumentRow
                  key={doc.hash}
                  doc={doc}
                  selected={selected.includes(doc.hash)}
                  onToggle={() => toggle(doc.hash)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Filters */}
        <aside className="order-1 lg:order-2">
          <div className="flex flex-col gap-5 lg:sticky lg:top-20">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-mist" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Título, autor, etiquetas…"
                className="pl-9"
              />
            </div>

            <div className="flex flex-col gap-3">
              <FilterSelect
                label="Categoría"
                value={category}
                onChange={setCategory}
                options={["Todas", ...Object.keys(CATEGORIES)]}
              />
              <FilterSelect
                label="Tipo"
                value={type}
                onChange={setType}
                options={["Todos", ...DOCUMENT_TYPES]}
              />
              <FilterSelect
                label="Nivel"
                value={level}
                onChange={setLevel}
                options={["Todos", ...DIFFICULTY_LEVELS]}
              />
            </div>

            {selected.length > 0 && (
              <Card>
                <h3 className="text-sm font-semibold text-ink">
                  Seleccionados ({selected.length})
                </h3>
                <ul className="mt-3 space-y-2">
                  {selected.map((hash) => {
                    const doc = DOCUMENTS.find((d) => d.hash === hash)!;
                    return (
                      <li
                        key={hash}
                        className="flex items-center justify-between gap-2 text-sm"
                      >
                        <span className="truncate text-ink">{doc.title}</span>
                        <button
                          onClick={() => toggle(hash)}
                          className="text-muted hover:text-ink focus-ring rounded-sm"
                          aria-label="Quitar"
                        >
                          ×
                        </button>
                      </li>
                    );
                  })}
                </ul>
                <Link
                  href="/assistants"
                  className={buttonClasses("primary", "mt-4 w-full")}
                >
                  Crear asistente
                  <ArrowRight className="size-4" />
                </Link>
              </Card>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

function ViewToggle({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={cn(
        "flex items-center justify-center rounded-full px-3 py-1.5 transition-colors focus-ring",
        active ? "bg-charcoal text-white" : "text-ink/60 hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[13px] font-medium text-ink">{label}</span>
      <Select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </Select>
    </label>
  );
}

function SelectMark({ selected }: { selected: boolean }) {
  return (
    <span
      className={cn(
        "flex size-5 items-center justify-center rounded-full border transition-colors",
        selected
          ? "border-charcoal bg-charcoal text-white"
          : "border-hairline bg-surface text-transparent",
      )}
    >
      <Check className="size-3" />
    </span>
  );
}

function DocumentGridCard({
  doc,
  selected,
  onToggle,
}: {
  doc: Document;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <Card
      className={cn(
        "h-full transition-colors",
        selected && "ring-1 ring-charcoal",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-surface text-ink">
          <FileText className="size-5" />
        </div>
        <button
          onClick={onToggle}
          className="focus-ring rounded-full"
          aria-label={selected ? "Quitar de la selección" : "Seleccionar"}
        >
          <SelectMark selected={selected} />
        </button>
      </div>
      <h3 className="mt-4 font-semibold text-ink">{doc.title}</h3>
      <p className="mt-0.5 text-sm text-muted">{doc.author}</p>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
        {doc.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        <Badge>{doc.category}</Badge>
        <Badge>{doc.level}</Badge>
        <Badge>{doc.pages} págs</Badge>
      </div>
    </Card>
  );
}

function DocumentRow({
  doc,
  selected,
  onToggle,
}: {
  doc: Document;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <Card
      bare
      className={cn(
        "flex items-center gap-4 p-4 transition-colors",
        selected && "ring-1 ring-charcoal",
      )}
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface text-ink">
        <FileText className="size-5" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-semibold text-ink">{doc.title}</h3>
        <p className="truncate text-sm text-muted">
          {doc.author} · {doc.type} · {doc.level}
        </p>
      </div>
      <div className="hidden shrink-0 gap-1.5 sm:flex">
        <Badge>{doc.category}</Badge>
        <Badge>{doc.pages} págs</Badge>
      </div>
      <button
        onClick={onToggle}
        className="focus-ring shrink-0 rounded-full"
        aria-label={selected ? "Quitar de la selección" : "Seleccionar"}
      >
        <SelectMark selected={selected} />
      </button>
    </Card>
  );
}
