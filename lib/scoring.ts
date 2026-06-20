import { BLOC1_QUESTIONS, VARIABLE_WEIGHTS, SCORE_FACTOR } from "./questions";

export type Answers = Record<string, string | string[]>;

export type Porosity = "haute_elevee" | "haute_mixte" | "faible_mixte" | "faible_elevee";

export type ScoringResult = {
  score: number;
  porosity: Porosity;
  reliability: number;
  hasNuance: boolean;
  texture: "bouclee" | "crepus_frisee" | "lisse" | null;
  concerns: string[];
  profileText: ProfileText;
};

export type ProfileText = {
  title: string;
  subtitle: string;
  description: string;
  bundle: string;
  bundleName: string;
  tips: string[];
};

export function computeScore(answers: Answers): ScoringResult {
  let rawScore = 0;

  for (const q of BLOC1_QUESTIONS) {
    const answer = answers[q.id] as string | undefined;
    if (!answer || !q.variable) continue;
    const option = q.options.find((o) => o.value === answer);
    if (!option) continue;
    const weight = VARIABLE_WEIGHTS[q.variable] as number;
    rawScore += option.score * weight;
  }

  // Contribution questions affinage (Bloc 2) : poids réduit
  const REFINEMENT_IDS = ["R1", "R2", "R3", "R4", "R5"];
  for (const id of REFINEMENT_IDS) {
    const answer = answers[id] as string | undefined;
    if (!answer) continue;
    const score = answer === "A" ? 1 : answer === "B" ? -1 : 0;
    rawScore += score * 0.05;
  }

  const normalizedScore = Math.round(rawScore * SCORE_FACTOR);
  const clamped = Math.max(-100, Math.min(100, normalizedScore));

  // Fiabilité = 100 - (conflits × 10) - (réponses neutres × 5)
  const conflictsCount = countConflicts(answers);
  const neutralCount = BLOC1_QUESTIONS.filter((q) => {
    const a = answers[q.id] as string | undefined;
    return a && a === "B";
  }).length;
  const reliability = Math.max(0, 100 - conflictsCount * 10 - neutralCount * 5);

  const porosity = classifyPorosity(clamped);
  const hasNuance = porosity === "haute_mixte" || porosity === "faible_mixte";

  // Texture et problématiques
  const textureMap: Record<string, ScoringResult["texture"]> = {
    A: "bouclee",
    B: "crepus_frisee",
    C: "lisse",
  };
  const texture = textureMap[(answers["Q10"] as string) ?? ""] ?? null;

  const concernsMap: Record<string, string> = {
    A: "casse",
    B: "pousse",
    C: "alopécie",
    D: "cuir chevelu sec/irrité",
    E: "cheveux secs",
  };
  const rawConcerns = answers["Q9"];
  const concerns = Array.isArray(rawConcerns)
    ? rawConcerns.map((v) => concernsMap[v]).filter(Boolean)
    : [];

  return {
    score: clamped,
    porosity,
    reliability,
    hasNuance,
    texture,
    concerns,
    profileText: getProfileText(porosity),
  };
}

function countConflicts(answers: Answers): number {
  let count = 0;
  if (answers["Q1"] === "A" && answers["Q3"] === "C") count++;
  if (answers["Q4"] === "A" && answers["Q5"] === "C") count++;
  if (answers["Q3"] !== "A" && answers["Q7"] === "A") count++;
  if (
    (answers["Q6"] === "A" && answers["Q7"] === "C") ||
    (answers["Q6"] === "C" && answers["Q7"] === "A")
  )
    count++;
  if (answers["Q7"] === "A" && answers["Q5"] === "C") count++;
  return count;
}

function classifyPorosity(score: number): Porosity {
  if (score > 30) return "haute_elevee";
  if (score > 0) return "haute_mixte";
  if (score > -30) return "faible_mixte";
  return "faible_elevee";
}

function getProfileText(porosity: Porosity): ProfileText {
  switch (porosity) {
    case "haute_elevee":
    case "haute_mixte":
      return {
        title: "Porosité Élevée",
        subtitle:
          porosity === "haute_mixte" ? "à tendance mixte" : "",
        description:
          "Tes cheveux ne gardent pas les produits car leurs écailles sont trop ouvertes. Résultat : ils sont souvent secs, ternes, cassants malgré les soins que tu fais. Ta solution spécifique est de maintenir l'hydratation, faire que les soins restent dans les cheveux le plus longtemps possible, adopter les méthodes et routines adaptées à ta porosité.\n\nAvec la bonne méthode et routine adaptées, tu peux avoir les résultats en 4 ou 5 semaines.",
        bundle: "Routine Hydratation Intense",
        bundleName: "haute_porosite",
        tips: [
          "Hydrater tes cheveux avec un produit riche en eau tous les 2 jours maximum",
          "Utiliser des produits riches et nourrissants",
          "Sceller l'hydratation avec une huile ou un beurre riche après chaque soin",
          "Protéger tes cheveux la nuit",
          "Éviter l'utilisation de la chaleur trop longtemps — écailles trop ouvertes = évaporation immédiate",
        ],
      };

    case "faible_mixte":
    case "faible_elevee":
      return {
        title: "Porosité Faible",
        subtitle:
          porosity === "faible_mixte" ? "à tendance mixte" : "",
        description:
          "Les écailles de tes cheveux sont fermées, du coup tes cheveux ont du mal à absorber les produits — c'est pour ça qu'ils semblent sans vie, avec des résidus qui s'accumulent et parfois cassants. Ta solution spécifique est : ouvrir les écailles avant de soigner pour que les produits puissent entrer, utiliser les méthodes et routines adaptées pour faire pénétrer les produits, maintenir l'hydratation le plus longtemps possible sans asphyxier le cheveu.\n\nAvec la bonne méthode et routine, tu peux avoir les résultats en 4 ou 5 semaines.",
        bundle: "Routine Pénétration",
        bundleName: "faible_porosite",
        tips: [
          "Utiliser de la chaleur avant chaque soin pour ouvrir les écailles — bien suivre les instructions pour les cheveux peu poreux",
          "Préférer des produits légers — les produits lourds restent en surface",
          "Clarifier régulièrement pour éviter l'accumulation",
          "Protéger tes cheveux la nuit",
        ],
      };
  }
}
