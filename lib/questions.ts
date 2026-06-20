export type AnswerOption = {
  label: string;
  value: "A" | "B" | "C" | "D" | "E";
  score: number;
};

export type Question = {
  id: string;
  bloc: 1 | 2 | "ciblage";
  variable?: keyof typeof VARIABLE_WEIGHTS;
  text: string;
  subtitle?: string;
  visual: QuestionVisual;
  options: AnswerOption[];
  multiSelect?: boolean;
  maxSelect?: number;
  conflict?: ConflictTrigger;
};

export type QuestionVisual = {
  gradient: string;
  accent: string;
  icon: string;
  refLabel: string;
};

export type ConflictTrigger = {
  triggeredBy: string;
  condition: (answers: Record<string, string | string[]>) => boolean;
};

export const VARIABLE_WEIGHTS = {
  water_absorption: 0.25,
  drying_speed: 0.20,
  moisture_retention: 0.20,
  product_absorption: 0.15,
  buildup: 0.10,
  humidity: 0.10,
  texture: 0.05,
  elasticity: 0.05,
} as const;

export const SCORE_FACTOR = 100 / (2 * (Object.values(VARIABLE_WEIGHTS) as number[]).reduce((a, b) => a + b, 0));

// ─── BLOC 1 — 8 questions obligatoires ───────────────────────────────────────

export const BLOC1_QUESTIONS: Question[] = [
  {
    id: "Q1",
    bloc: 1,
    variable: "water_absorption",
    text: "Quand tu mouilles tes cheveux…",
    visual: {
      gradient: "linear-gradient(160deg, #0A1628 0%, #0D2137 40%, #0A3050 100%)",
      accent: "#4A9EE8",
      icon: "water",
      refLabel: "Absorption de l'eau",
    },
    options: [
      { label: "Ils absorbent l'eau immédiatement", value: "A", score: 2 },
      { label: "L'eau met quelques secondes", value: "B", score: 0 },
      { label: "L'eau reste en surface / perle", value: "C", score: -2 },
    ],
  },
  {
    id: "Q2",
    bloc: 1,
    variable: "drying_speed",
    text: "Après lavage, sans aucun produit…",
    visual: {
      gradient: "linear-gradient(160deg, #1A0D00 0%, #2E1A08 40%, #3D2510 100%)",
      accent: "#E8A44A",
      icon: "drying",
      refLabel: "Vitesse de séchage",
    },
    options: [
      { label: "Sèchent très vite (moins d'1h)", value: "A", score: 2 },
      { label: "Sèchent en quelques heures", value: "B", score: 0 },
      { label: "Mettent très longtemps à sécher", value: "C", score: -2 },
    ],
  },
  {
    id: "Q3",
    bloc: 1,
    variable: "moisture_retention",
    text: "Après avoir hydraté tes cheveux…",
    visual: {
      gradient: "linear-gradient(160deg, #001A12 0%, #002E20 40%, #004030 100%)",
      accent: "#4AE8A4",
      icon: "hydration",
      refLabel: "Rétention d'hydratation",
    },
    options: [
      { label: "Deviennent secs très rapidement", value: "A", score: 2 },
      { label: "Restent hydratés environ 1 jour", value: "B", score: 0 },
      { label: "Restent hydratés plusieurs jours", value: "C", score: -2 },
    ],
  },
  {
    id: "Q4",
    bloc: 1,
    variable: "product_absorption",
    text: "Quand tu appliques un produit sur tes cheveux…",
    visual: {
      gradient: "linear-gradient(160deg, #150A28 0%, #220F3D 40%, #2D1450 100%)",
      accent: "#B44AE8",
      icon: "product",
      refLabel: "Réaction aux produits",
    },
    options: [
      { label: "Il est absorbé rapidement", value: "A", score: 2 },
      { label: "Il reste légèrement en surface", value: "B", score: 0 },
      { label: "Il reste en surface / laisse des résidus", value: "C", score: -2 },
    ],
  },
  {
    id: "Q5",
    bloc: 1,
    variable: "buildup",
    text: "Après plusieurs applications de produits…",
    visual: {
      gradient: "linear-gradient(160deg, #1A1400 0%, #2E2408 40%, #403410 100%)",
      accent: "#E8D44A",
      icon: "buildup",
      refLabel: "Build-up / résidus",
    },
    options: [
      { label: "Mes cheveux restent légers", value: "A", score: 2 },
      { label: "Deviennent un peu lourds", value: "B", score: 0 },
      { label: "Deviennent gras ou collants", value: "C", score: -2 },
    ],
  },
  {
    id: "Q6",
    bloc: 1,
    variable: "humidity",
    text: "Par temps humide, sous la pluie ou par forte chaleur…",
    visual: {
      gradient: "linear-gradient(160deg, #001A1A 0%, #002E30 40%, #004040 100%)",
      accent: "#4AE8E8",
      icon: "humidity",
      refLabel: "Réaction à l'humidité",
    },
    options: [
      { label: "Mes cheveux gonflent rapidement", value: "A", score: 2 },
      { label: "Peu de changement visible", value: "B", score: 0 },
      { label: "Restent inchangés / rigides", value: "C", score: -2 },
    ],
  },
  {
    id: "Q7",
    bloc: 1,
    variable: "texture",
    text: "En passant les doigts sur tes cheveux secs…",
    visual: {
      gradient: "linear-gradient(160deg, #1A0A0A 0%, #2E1010 40%, #401818 100%)",
      accent: "#E84A4A",
      icon: "texture",
      refLabel: "Texture au toucher",
    },
    options: [
      { label: "Rugueux / rêches", value: "A", score: 2 },
      { label: "Normaux", value: "B", score: 0 },
      { label: "Doux / lisses", value: "C", score: -2 },
    ],
  },
  {
    id: "Q8",
    bloc: 1,
    variable: "elasticity",
    text: "En étirant doucement un cheveu mouillé…",
    subtitle: "Prends un cheveu entre tes doigts et tire doucement",
    visual: {
      gradient: "linear-gradient(160deg, #0A0A1A 0%, #101030 40%, #181848 100%)",
      accent: "#4A4AE8",
      icon: "elasticity",
      refLabel: "Élasticité",
    },
    options: [
      { label: "Il casse immédiatement", value: "A", score: 2 },
      { label: "Il s'étire un peu puis casse", value: "B", score: 0 },
      { label: "Il s'étire et revient à sa forme", value: "C", score: -2 },
    ],
  },
];

// ─── CIBLAGE — 2 questions de profil ─────────────────────────────────────────

export const CIBLAGE_QUESTIONS: Question[] = [
  {
    id: "Q9",
    bloc: "ciblage",
    text: "Quelles sont tes 2 principales problématiques ?",
    subtitle: "Sélectionne jusqu'à 2 réponses",
    multiSelect: true,
    maxSelect: 2,
    visual: {
      gradient: "linear-gradient(160deg, #0A1A0A 0%, #101E10 40%, #152515 100%)",
      accent: "#7AE87A",
      icon: "concerns",
      refLabel: "Problématiques",
    },
    options: [
      { label: "Casse", value: "A", score: 0 },
      { label: "Pousse", value: "B", score: 0 },
      { label: "Alopécie", value: "C", score: 0 },
      { label: "Cuir chevelu sec ou irrité", value: "D", score: 0 },
      { label: "Cheveux secs", value: "E", score: 0 },
    ],
  },
  {
    id: "Q10",
    bloc: "ciblage",
    text: "Quelle est ta texture capillaire ?",
    visual: {
      gradient: "linear-gradient(160deg, #1A0A14 0%, #2E1020 40%, #40152E 100%)",
      accent: "#E84AB4",
      icon: "texture_type",
      refLabel: "Type de texture",
    },
    options: [
      { label: "Bouclée", value: "A", score: 0 },
      { label: "Crépus / Frisée", value: "B", score: 0 },
      { label: "Lisse", value: "C", score: 0 },
    ],
  },
];

// ─── BLOC 2 — Questions d'affinage (déclenchées par conflits) ─────────────────

export const BLOC2_QUESTIONS: Question[] = [
  {
    id: "R1",
    bloc: 2,
    text: "Après 24h sans appliquer de produit…",
    visual: {
      gradient: "linear-gradient(160deg, #0A1628 0%, #0D2137 60%, #0A3050 100%)",
      accent: "#4A9EE8",
      icon: "water",
      refLabel: "Test 24h sans produit",
    },
    options: [
      { label: "Mes cheveux sont secs", value: "A", score: 1 },
      { label: "Encore souples", value: "B", score: -1 },
    ],
    conflict: {
      triggeredBy: "Q1+Q3",
      condition: (a) => a["Q1"] === "A" && a["Q3"] === "C",
    },
  },
  {
    id: "R2",
    bloc: 2,
    text: "Juste après l'application d'un produit, tu vois une couche visible ?",
    visual: {
      gradient: "linear-gradient(160deg, #150A28 0%, #220F3D 60%, #2D1450 100%)",
      accent: "#B44AE8",
      icon: "product",
      refLabel: "Couche résiduelle",
    },
    options: [
      { label: "Non, le produit disparaît", value: "A", score: 1 },
      { label: "Oui, ça reste visible", value: "B", score: -1 },
    ],
    conflict: {
      triggeredBy: "Q4+Q5",
      condition: (a) => a["Q4"] === "A" && a["Q5"] === "C",
    },
  },
  {
    id: "R3",
    bloc: 2,
    text: "Quand tu fais un soin, tu commences par…",
    visual: {
      gradient: "linear-gradient(160deg, #001A12 0%, #002E20 60%, #004030 100%)",
      accent: "#4AE8A4",
      icon: "hydration",
      refLabel: "Ordre d'application",
    },
    options: [
      { label: "Eau ou spray hydratant d'abord", value: "A", score: 1 },
      { label: "Huile ou beurre d'abord", value: "B", score: -1 },
    ],
    conflict: {
      triggeredBy: "Q3+Q7",
      condition: (a) => a["Q3"] !== "A" && a["Q7"] === "A",
    },
  },
  {
    id: "R4",
    bloc: 2,
    text: "Sous la pluie ou dans un air très humide…",
    visual: {
      gradient: "linear-gradient(160deg, #001A1A 0%, #002E30 60%, #004040 100%)",
      accent: "#4AE8E8",
      icon: "humidity",
      refLabel: "Test humidité",
    },
    options: [
      { label: "Mes cheveux gonflent clairement", value: "A", score: 1 },
      { label: "Rien de notable", value: "B", score: -1 },
    ],
    conflict: {
      triggeredBy: "Q6+Q7",
      condition: (a) => (a["Q6"] === "A" && a["Q7"] === "C") || (a["Q6"] === "C" && a["Q7"] === "A"),
    },
  },
  {
    id: "R5",
    bloc: 2,
    text: "Comment est ton cuir chevelu la plupart du temps ?",
    visual: {
      gradient: "linear-gradient(160deg, #1A0A0A 0%, #2E1010 60%, #401818 100%)",
      accent: "#E84A4A",
      icon: "texture",
      refLabel: "État du cuir chevelu",
    },
    options: [
      { label: "Gras", value: "A", score: -1 },
      { label: "Normal", value: "B", score: 0 },
      { label: "Sec", value: "C", score: 1 },
    ],
    conflict: {
      triggeredBy: "Q7+Q5",
      condition: (a) => a["Q7"] === "A" && a["Q5"] === "C",
    },
  },
];

// ─── Toutes les questions dans l'ordre d'affichage ───────────────────────────

export function buildQuestionSequence(
  answers: Record<string, string | string[]>
): Question[] {
  const conflictsDetected = BLOC2_QUESTIONS.filter(
    (q) => q.conflict && q.conflict.condition(answers)
  ).slice(0, 4);

  return [...BLOC1_QUESTIONS, ...CIBLAGE_QUESTIONS, ...conflictsDetected];
}
