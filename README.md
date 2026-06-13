# 📚 Yachani — Biblioteca Educativa

Plataforma educativa que pone recursos de calidad al alcance de todos:
un catálogo de documentos, asistentes conversacionales construidos sobre
ese material y un chat para estudiar con ellos.

> **Estado: maqueta (UI).** Esta es la migración de la app original (Streamlit
> + Python) a **Next.js**. Por ahora es solo la interfaz con datos de ejemplo —
> sin backend, sin modelos de IA y sin almacenamiento conectados. El objetivo es
> tener el cascarón y el sistema de diseño listos para, más adelante, revivir el
> backend (RAG, embeddings, storage).

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript 6**
- **Tailwind CSS v4** (config CSS-first vía `@theme`)
- **lucide-react** para iconografía · **pnpm** como gestor

## Desarrollo

```bash
pnpm install
pnpm dev      # http://localhost:3000
```

Otros scripts: `pnpm build`, `pnpm start`, `pnpm lint`.

## Estructura

```
src/
  app/                 # Rutas (App Router)
    page.tsx           # Inicio
    catalog/           # Catálogo de documentos (búsqueda + filtros)
    assistants/        # Crear y administrar asistentes
    chat/              # Chat educativo
    upload/            # Subida de documentos (wizard)
    document/          # Visor de documento + chat
    globals.css        # Tokens de diseño (Tailwind v4 @theme)
  components/
    ui/                # Button, Card, Chip, Badge, Input, Select, Field
    Nav.tsx            # Barra de navegación
    PageHeader.tsx
  data/                # Datos de ejemplo (catálogo, asistentes, documento)
  lib/cn.ts            # Helper de className (clsx + tailwind-merge)
```

## Diseño

La interfaz sigue el sistema de diseño **"devfolio"** de
[`cuisangelo/DESIGN.md`](https://github.com/cuisangelo/cuisangelo/blob/main/DESIGN.md):
mono-cromo (charcoal + grises), **plano** (sin sombras; separación por *surface
shift* y hairlines), tipografía **Inter**, pills para acciones y cards de gris
suave. Tema claro únicamente.

## Roadmap (para revivir el backend)

- Capa de datos persistente (catálogo, asistentes).
- Procesado de documentos + embeddings + vector store (RAG).
- Chat conectado a un LLM con citado de fuentes.

> La versión original en Streamlit + Python permanece en el historial de git
> (rama `main`, antes de esta migración).
