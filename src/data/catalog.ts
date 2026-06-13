export type Category =
  | "Matemáticas"
  | "Ciencias"
  | "Programación"
  | "Idiomas"
  | "Historia"
  | "Literatura";

export const CATEGORIES: Record<Category, string[]> = {
  Matemáticas: ["Álgebra", "Cálculo", "Geometría", "Estadística"],
  Ciencias: ["Física", "Química", "Biología", "Astronomía"],
  Programación: ["Python", "JavaScript", "Java", "Web Development"],
  Idiomas: ["Inglés", "Español", "Francés", "Alemán"],
  Historia: ["Historia Mundial", "Historia del Arte", "Arqueología"],
  Literatura: ["Narrativa", "Poesía", "Teatro", "Ensayo"],
};

export const DOCUMENT_TYPES = [
  "Libro de Texto",
  "Guía de Estudio",
  "Manual Técnico",
  "Paper Académico",
  "Presentación",
  "Material de Curso",
  "Documento de Investigación",
  "Apuntes",
  "Tutorial",
] as const;

export const DIFFICULTY_LEVELS = [
  "Principiante",
  "Intermedio",
  "Avanzado",
  "Experto",
] as const;

export const LANGUAGES = ["Español", "Inglés", "Francés", "Alemán"] as const;

export type Document = {
  hash: string;
  title: string;
  author: string;
  year: number;
  category: Category;
  type: (typeof DOCUMENT_TYPES)[number];
  level: (typeof DIFFICULTY_LEVELS)[number];
  language: (typeof LANGUAGES)[number];
  pages: number;
  chunks: number;
  description: string;
  tags: string[];
  processedDate: string;
};

export const DOCUMENTS: Document[] = [
  {
    hash: "586e3eb2",
    title: "Python para todos",
    author: "Fernando Aguilera",
    year: 2024,
    category: "Programación",
    type: "Material de Curso",
    level: "Principiante",
    language: "Español",
    pages: 184,
    chunks: 312,
    description:
      "Curso introductorio a Python: tipos, control de flujo, funciones, estructuras de datos y un primer vistazo a la programación orientada a objetos.",
    tags: ["python", "fundamentos", "scripting"],
    processedDate: "2024-11-25T13:39:07",
  },
  {
    hash: "a91c4f02",
    title: "Cálculo de una variable",
    author: "María Soto",
    year: 2021,
    category: "Matemáticas",
    type: "Libro de Texto",
    level: "Intermedio",
    language: "Español",
    pages: 420,
    chunks: 690,
    description:
      "Límites, derivadas e integrales con énfasis en la intuición geométrica y ejercicios resueltos paso a paso.",
    tags: ["cálculo", "derivadas", "integrales"],
    processedDate: "2024-11-24T09:12:00",
  },
  {
    hash: "c4d7b110",
    title: "Fundamentos de Física Moderna",
    author: "Akira Tanaka",
    year: 2019,
    category: "Ciencias",
    type: "Libro de Texto",
    level: "Avanzado",
    language: "Inglés",
    pages: 512,
    chunks: 880,
    description:
      "Relatividad especial, mecánica cuántica y estructura atómica para estudiantes de ingeniería y física.",
    tags: ["física", "cuántica", "relatividad"],
    processedDate: "2024-11-23T18:40:00",
  },
  {
    hash: "f0aa5521",
    title: "JavaScript: Patrones Modernos",
    author: "Lucía Fernández",
    year: 2023,
    category: "Programación",
    type: "Guía de Estudio",
    level: "Intermedio",
    language: "Español",
    pages: 96,
    chunks: 158,
    description:
      "ES2023+, módulos, async/await y patrones de diseño aplicados al desarrollo web actual.",
    tags: ["javascript", "web", "patrones"],
    processedDate: "2024-11-22T11:05:00",
  },
  {
    hash: "7b2e9a44",
    title: "Breve Historia del Arte",
    author: "Elena Ruiz",
    year: 2018,
    category: "Historia",
    type: "Material de Curso",
    level: "Principiante",
    language: "Español",
    pages: 240,
    chunks: 401,
    description:
      "Un recorrido por los grandes movimientos artísticos, del Renacimiento a las vanguardias del siglo XX.",
    tags: ["arte", "historia", "movimientos"],
    processedDate: "2024-11-21T15:22:00",
  },
  {
    hash: "2d8f1c63",
    title: "Inglés Académico B2",
    author: "John Carter",
    year: 2022,
    category: "Idiomas",
    type: "Tutorial",
    level: "Intermedio",
    language: "Inglés",
    pages: 130,
    chunks: 210,
    description:
      "Estructuras, vocabulario y estrategias de escritura para textos académicos en inglés nivel B2.",
    tags: ["inglés", "writing", "b2"],
    processedDate: "2024-11-20T08:48:00",
  },
  {
    hash: "9e51aa07",
    title: "Estadística Aplicada con Python",
    author: "Rosa Medina",
    year: 2024,
    category: "Matemáticas",
    type: "Documento de Investigación",
    level: "Avanzado",
    language: "Español",
    pages: 305,
    chunks: 540,
    description:
      "Inferencia, regresión y visualización de datos usando pandas, numpy y statsmodels.",
    tags: ["estadística", "datos", "python"],
    processedDate: "2024-11-19T17:30:00",
  },
  {
    hash: "b3c6e8d9",
    title: "Cien Años de Soledad — Guía de Lectura",
    author: "Carlos Pérez",
    year: 2020,
    category: "Literatura",
    type: "Apuntes",
    level: "Principiante",
    language: "Español",
    pages: 64,
    chunks: 102,
    description:
      "Análisis de personajes, temas y simbolismo de la obra cumbre del realismo mágico.",
    tags: ["literatura", "garcía márquez", "análisis"],
    processedDate: "2024-11-18T12:00:00",
  },
];
