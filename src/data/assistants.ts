export const ASSISTANT_ROLES = [
  "Tutor Personal",
  "Asistente de Investigación",
  "Profesor",
  "Mentor",
  "Consultor Especializado",
] as const;

export const COMMUNICATION_STYLES = ["Formal", "Balanceado", "Casual"] as const;
export const DETAIL_LEVELS = ["Conciso", "Moderado", "Detallado"] as const;

export type Assistant = {
  id: string;
  name: string;
  role: (typeof ASSISTANT_ROLES)[number];
  style: (typeof COMMUNICATION_STYLES)[number];
  detailLevel: (typeof DETAIL_LEVELS)[number];
  temperature: number;
  contextWindow: number;
  docs: { title: string; hash: string }[];
  createdAt: string;
};

export const ASSISTANTS: Assistant[] = [
  {
    id: "agent_tutor_python",
    name: "Tutor Python",
    role: "Tutor Personal",
    style: "Balanceado",
    detailLevel: "Moderado",
    temperature: 0.3,
    contextWindow: 5,
    docs: [{ title: "Python para todos", hash: "586e3eb2" }],
    createdAt: "2024-11-25T13:39:40",
  },
  {
    id: "agent_calculo",
    name: "Mentor de Cálculo",
    role: "Mentor",
    style: "Formal",
    detailLevel: "Detallado",
    temperature: 0.2,
    contextWindow: 8,
    docs: [{ title: "Cálculo de una variable", hash: "a91c4f02" }],
    createdAt: "2024-11-24T10:02:11",
  },
  {
    id: "agent_arte",
    name: "Guía de Arte",
    role: "Profesor",
    style: "Casual",
    detailLevel: "Moderado",
    temperature: 0.6,
    contextWindow: 5,
    docs: [{ title: "Breve Historia del Arte", hash: "7b2e9a44" }],
    createdAt: "2024-11-21T16:10:00",
  },
];
