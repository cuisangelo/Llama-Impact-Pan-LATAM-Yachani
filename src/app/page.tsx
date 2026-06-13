import Link from "next/link";
import {
  BookOpen,
  Bot,
  MessageSquare,
  Upload,
  ArrowRight,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { buttonClasses } from "@/components/ui/Button";
import { CATEGORIES, DOCUMENTS } from "@/data/catalog";

const GUIDE = [
  {
    href: "/catalog",
    icon: BookOpen,
    title: "Catálogo",
    points: [
      "Biblioteca completa de documentos",
      "Filtros por categoría, nivel y tipo",
      "Selección de materiales para tu asistente",
    ],
  },
  {
    href: "/assistants",
    icon: Bot,
    title: "Asistentes",
    points: [
      "Crea asistentes personalizados",
      "Configura rol, estilo y detalle",
      "Administra los que ya creaste",
    ],
  },
  {
    href: "/chat",
    icon: MessageSquare,
    title: "Chat educativo",
    points: [
      "Conversa con tu asistente",
      "Pregunta sobre los documentos base",
      "Guarda e historiza tus conversaciones",
    ],
  },
  {
    href: "/upload",
    icon: Upload,
    title: "Subir documentos",
    points: [
      "Carga PDF, Word, EPub y más",
      "Procesamiento y categorización",
      "Añade metadatos educativos",
    ],
  },
];

const STEPS = [
  {
    title: "Explora el catálogo",
    body: "Navega los documentos y selecciona los materiales que te interesan.",
  },
  {
    title: "Crea tu asistente",
    body: "Configura un asistente sobre los documentos elegidos.",
  },
  {
    title: "Empieza a aprender",
    body: "Conversa con tu asistente y haz preguntas sobre el material.",
  },
  {
    title: "Contribuye",
    body: "Sube nuevos materiales y ayuda a crecer la biblioteca.",
  },
];

export default function HomePage() {
  const stats = [
    { label: "Documentos", value: DOCUMENTS.length },
    { label: "Categorías", value: Object.keys(CATEGORIES).length },
    { label: "Nuevos (hoy)", value: 2 },
  ];

  return (
    <div className="flex flex-col gap-16">
      {/* Hero */}
      <section className="max-w-3xl">
        <p className="label-mono mb-3 text-muted">biblioteca educativa</p>
        <h1 className="text-display font-bold tracking-tight text-ink">
          Yachani
        </h1>
        <p className="mt-5 text-xl leading-relaxed text-muted">
          Democratizando la educación a través del conocimiento compartido.
          Recursos de calidad al alcance de todos, con asistentes que entienden
          tus documentos.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/catalog" className={buttonClasses("primary")}>
            Explorar catálogo
            <ArrowRight className="size-4" />
          </Link>
          <Link href="/assistants" className={buttonClasses("secondary")}>
            Crear asistente
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label}>
            <p className="text-4xl font-bold text-ink">{s.value}</p>
            <p className="mt-1 text-sm text-muted">{s.label}</p>
          </Card>
        ))}
      </section>

      {/* Navigation guide */}
      <section>
        <h2 className="text-h2 font-bold text-ink">Guía de navegación</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {GUIDE.map(({ href, icon: Icon, title, points }) => (
            <Link key={href} href={href} className="group focus-ring rounded-2xl">
              <Card className="h-full transition-colors group-hover:bg-surface-hover">
                <div className="flex items-start justify-between">
                  <div className="flex size-10 items-center justify-center rounded-full bg-charcoal text-white">
                    <Icon className="size-5" />
                  </div>
                  <ArrowRight className="size-4 text-muted transition-transform group-hover:translate-x-0.5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-ink">{title}</h3>
                <ul className="mt-2 space-y-1 text-sm text-muted">
                  {points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* How to start */}
      <section>
        <h2 className="text-h2 font-bold text-ink">¿Cómo empezar?</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Card key={step.title}>
              <span className="label-mono text-muted">0{i + 1}</span>
              <h3 className="mt-3 font-semibold text-ink">{step.title}</h3>
              <p className="mt-1 text-sm text-muted">{step.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured categories */}
      <section>
        <h2 className="text-h2 font-bold text-ink">Categorías destacadas</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {Object.keys(CATEGORIES).map((category) => (
            <Chip key={category}>{category}</Chip>
          ))}
        </div>
      </section>
    </div>
  );
}
