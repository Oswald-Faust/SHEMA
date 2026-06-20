/**
 * Petites illustrations SVG (44×44) pour chaque option de réponse.
 * Keyed par `questionId_optionValue`.
 */

type IllusProps = { accent: string; opacity?: number };

function WaterAbsorbed({ accent }: IllusProps) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="19" fill={accent} fillOpacity="0.1"/>
      {/* Arrow down into hair */}
      <path d="M22 10 L22 22" stroke={accent} strokeWidth="2" strokeLinecap="round"/>
      <path d="M18 18 L22 23 L26 18" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Hair strands */}
      <path d="M14 26 Q16 30 14 34" stroke={accent} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M22 25 L22 34" stroke={accent} strokeWidth="2" strokeLinecap="round"/>
      <path d="M30 26 Q28 30 30 34" stroke={accent} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

function WaterSlow({ accent }: IllusProps) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="19" fill={accent} fillOpacity="0.07"/>
      {/* Drop on surface */}
      <ellipse cx="22" cy="20" rx="6" ry="5" fill={accent} fillOpacity="0.3"/>
      <path d="M22 15 L25 20 L19 20 Z" fill={accent} fillOpacity="0.5"/>
      {/* Dotted arrow */}
      <path d="M22 25 L22 32" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2"/>
      {/* Hair line */}
      <line x1="12" y1="32" x2="32" y2="32" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6"/>
    </svg>
  );
}

function WaterPearling({ accent }: IllusProps) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="19" fill={accent} fillOpacity="0.06"/>
      {/* Hair surface */}
      <line x1="10" y1="28" x2="34" y2="28" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5"/>
      {/* Water beads on surface */}
      <circle cx="16" cy="24" r="4" fill={accent} fillOpacity="0.35"/>
      <circle cx="22" cy="23" r="5" fill={accent} fillOpacity="0.45"/>
      <circle cx="29" cy="24" r="3.5" fill={accent} fillOpacity="0.3"/>
      {/* Shine */}
      <circle cx="21" cy="21.5" r="1.2" fill="white" fillOpacity="0.6"/>
    </svg>
  );
}

function DryFast({ accent }: IllusProps) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="19" fill={accent} fillOpacity="0.1"/>
      {/* Sun */}
      <circle cx="22" cy="16" r="6" fill={accent} fillOpacity="0.5"/>
      {[0,45,90,135,180,225,270,315].map((deg, i) => {
        const a = (deg * Math.PI) / 180;
        return (
          <line key={i}
            x1={22 + 8 * Math.cos(a)} y1={16 + 8 * Math.sin(a)}
            x2={22 + 11 * Math.cos(a)} y2={16 + 11 * Math.sin(a)}
            stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6"/>
        );
      })}
      {/* Dry hair */}
      <path d="M18 28 L18 36" stroke={accent} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M22 27 L22 36" stroke={accent} strokeWidth="2" strokeLinecap="round"/>
      <path d="M26 28 L26 36" stroke={accent} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function DryMedium({ accent }: IllusProps) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="19" fill={accent} fillOpacity="0.07"/>
      {/* Clock */}
      <circle cx="22" cy="18" r="8" stroke={accent} strokeWidth="1.5" fill="none" strokeOpacity="0.5"/>
      <line x1="22" y1="18" x2="22" y2="13" stroke={accent} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="22" y1="18" x2="26" y2="18" stroke={accent} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Wet drops */}
      <circle cx="16" cy="30" r="2" fill={accent} fillOpacity="0.4"/>
      <circle cx="22" cy="32" r="1.5" fill={accent} fillOpacity="0.3"/>
      <circle cx="28" cy="30" r="2" fill={accent} fillOpacity="0.4"/>
    </svg>
  );
}

function DrySlow({ accent }: IllusProps) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="19" fill={accent} fillOpacity="0.06"/>
      {/* Hair dripping */}
      <path d="M18 12 Q18 22 18 30" stroke={accent} strokeWidth="2" strokeLinecap="round"/>
      <path d="M22 11 Q22 22 22 30" stroke={accent} strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M26 12 Q26 22 26 30" stroke={accent} strokeWidth="2" strokeLinecap="round"/>
      {/* Drops falling */}
      <ellipse cx="18" cy="33" rx="1.5" ry="2.5" fill={accent} fillOpacity="0.5"/>
      <ellipse cx="22" cy="34" rx="2" ry="3" fill={accent} fillOpacity="0.6"/>
      <ellipse cx="26" cy="33" rx="1.5" ry="2.5" fill={accent} fillOpacity="0.5"/>
    </svg>
  );
}

function HydrationLost({ accent }: IllusProps) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="19" fill={accent} fillOpacity="0.1"/>
      {/* Cracked/dry hair */}
      <path d="M22 10 Q22 22 22 34" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 2"/>
      {/* Evaporation arrows */}
      <path d="M14 20 Q12 16 14 12" stroke={accent} strokeWidth="1.2" strokeLinecap="round" fill="none" strokeOpacity="0.5"/>
      <path d="M30 20 Q32 16 30 12" stroke={accent} strokeWidth="1.2" strokeLinecap="round" fill="none" strokeOpacity="0.5"/>
    </svg>
  );
}

function HydrationOneDay({ accent }: IllusProps) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="19" fill={accent} fillOpacity="0.08"/>
      <path d="M22 10 Q22 22 22 34" stroke={accent} strokeWidth="2.5" strokeLinecap="round"/>
      {/* Small dot on strand */}
      <circle cx="22" cy="20" r="3" fill={accent} fillOpacity="0.3"/>
      {/* 1 day marker */}
      <text x="22" y="14" textAnchor="middle" fontSize="7" fill={accent} fillOpacity="0.7" fontWeight="bold">1j</text>
    </svg>
  );
}

function HydrationLong({ accent }: IllusProps) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="19" fill={accent} fillOpacity="0.1"/>
      {/* Lush hair with sparkles */}
      <path d="M22 10 Q20 20 22 34" stroke={accent} strokeWidth="3" strokeLinecap="round"/>
      <path d="M22 10 Q24 20 22 34" stroke={accent} strokeWidth="1" strokeLinecap="round" strokeOpacity="0.3"/>
      <circle cx="28" cy="16" r="2" fill={accent} fillOpacity="0.6"/>
      <circle cx="30" cy="22" r="1.5" fill={accent} fillOpacity="0.5"/>
      <path d="M26 12 L27 14 L26 16 L25 14 Z" fill={accent} fillOpacity="0.5"/>
    </svg>
  );
}

function ProductAbsorbed({ accent }: IllusProps) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="19" fill={accent} fillOpacity="0.1"/>
      {/* Product drops going IN */}
      <circle cx="22" cy="14" r="5" fill={accent} fillOpacity="0.4"/>
      <path d="M18 18 L22 24" stroke={accent} strokeWidth="1.5" strokeDasharray="2 1.5"/>
      <path d="M26 18 L22 24" stroke={accent} strokeWidth="1.5" strokeDasharray="2 1.5"/>
      {/* Hair */}
      <path d="M22 24 L22 34" stroke={accent} strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="22" cy="26" r="3" fill={accent} fillOpacity="0.35"/>
    </svg>
  );
}

function ProductSurface({ accent }: IllusProps) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="19" fill={accent} fillOpacity="0.07"/>
      {/* Product layer on top */}
      <ellipse cx="22" cy="18" rx="8" ry="3" fill={accent} fillOpacity="0.3"/>
      {/* Arrow partial */}
      <path d="M22 21 L22 25" stroke={accent} strokeWidth="1.5" strokeDasharray="2 2"/>
      {/* Hair */}
      <path d="M22 26 L22 34" stroke={accent} strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

function ProductResidues({ accent }: IllusProps) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="19" fill={accent} fillOpacity="0.06"/>
      {/* Buildup layers */}
      <ellipse cx="22" cy="18" rx="10" ry="4" fill={accent} fillOpacity="0.2"/>
      <ellipse cx="22" cy="17" rx="8" ry="3" fill={accent} fillOpacity="0.3"/>
      <ellipse cx="22" cy="16" rx="6" ry="2.5" fill={accent} fillOpacity="0.45"/>
      {/* Hair stuck under */}
      <path d="M22 20 L22 34" stroke={accent} strokeWidth="2.5" strokeLinecap="round"/>
      {/* X mark */}
      <path d="M28 10 L32 14 M32 10 L28 14" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6"/>
    </svg>
  );
}

function BuildupLight({ accent }: IllusProps) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="19" fill={accent} fillOpacity="0.1"/>
      {/* Light hair floating */}
      <path d="M16 14 Q17 22 16 30" stroke={accent} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M22 13 Q23 22 22 30" stroke={accent} strokeWidth="2" strokeLinecap="round"/>
      <path d="M28 14 Q27 22 28 30" stroke={accent} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Checkmark */}
      <path d="M16 36 L19 39 L28 33" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function BuildupMedium({ accent }: IllusProps) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="19" fill={accent} fillOpacity="0.07"/>
      <path d="M16 14 Q15 22 16 32" stroke={accent} strokeWidth="2" strokeLinecap="round"/>
      <path d="M22 13 Q21 22 22 32" stroke={accent} strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M28 14 Q29 22 28 32" stroke={accent} strokeWidth="2" strokeLinecap="round"/>
      {/* Weight dots */}
      <circle cx="16" cy="32" r="2" fill={accent} fillOpacity="0.4"/>
      <circle cx="22" cy="32" r="2.5" fill={accent} fillOpacity="0.5"/>
      <circle cx="28" cy="32" r="2" fill={accent} fillOpacity="0.4"/>
    </svg>
  );
}

function BuildupHeavy({ accent }: IllusProps) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="19" fill={accent} fillOpacity="0.06"/>
      {/* Heavy drooping hair */}
      <path d="M16 13 Q13 22 14 34" stroke={accent} strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M22 12 Q22 22 22 35" stroke={accent} strokeWidth="3" strokeLinecap="round"/>
      <path d="M28 13 Q31 22 30 34" stroke={accent} strokeWidth="2.5" strokeLinecap="round"/>
      {/* Heavy weight blobs */}
      <circle cx="14" cy="35" r="3.5" fill={accent} fillOpacity="0.5"/>
      <circle cx="22" cy="36" r="4" fill={accent} fillOpacity="0.6"/>
      <circle cx="30" cy="35" r="3.5" fill={accent} fillOpacity="0.5"/>
    </svg>
  );
}

function HumidityFrizz({ accent }: IllusProps) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="19" fill={accent} fillOpacity="0.1"/>
      {/* Puffed up silhouette */}
      <path d="M22 10 Q10 16 10 24 Q10 34 22 36 Q34 34 34 24 Q34 16 22 10Z" stroke={accent} strokeWidth="1.5" fill={accent} fillOpacity="0.15" strokeOpacity="0.5"/>
      {/* Frizz lines */}
      <path d="M12 18 Q8 16 10 12" stroke={accent} strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      <path d="M32 18 Q36 16 34 12" stroke={accent} strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      <path d="M22 10 Q20 6 22 4" stroke={accent} strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

function HumidityLittle({ accent }: IllusProps) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="19" fill={accent} fillOpacity="0.07"/>
      {/* Normal hair profile */}
      <path d="M22 11 Q16 16 16 24 Q16 32 22 34 Q28 32 28 24 Q28 16 22 11Z" stroke={accent} strokeWidth="1.5" fill={accent} fillOpacity="0.12" strokeOpacity="0.4"/>
    </svg>
  );
}

function HumidityRigid({ accent }: IllusProps) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="19" fill={accent} fillOpacity="0.06"/>
      {/* Straight rigid strands */}
      <line x1="16" y1="10" x2="16" y2="34" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6"/>
      <line x1="22" y1="9" x2="22" y2="35" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.7"/>
      <line x1="28" y1="10" x2="28" y2="34" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6"/>
      {/* Freeze lines */}
      <line x1="13" y1="18" x2="31" y2="18" stroke={accent} strokeWidth="0.8" strokeOpacity="0.2"/>
      <line x1="13" y1="26" x2="31" y2="26" stroke={accent} strokeWidth="0.8" strokeOpacity="0.2"/>
    </svg>
  );
}

function TextureRough({ accent }: IllusProps) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="19" fill={accent} fillOpacity="0.1"/>
      {/* Zigzag rough texture */}
      <path d="M10 22 L14 18 L18 24 L22 18 L26 24 L30 18 L34 22" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

function TextureNormal({ accent }: IllusProps) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="19" fill={accent} fillOpacity="0.07"/>
      {/* Slightly wavy texture */}
      <path d="M10 22 Q14 19 18 22 Q22 25 26 22 Q30 19 34 22" stroke={accent} strokeWidth="2.5" strokeLinecap="round" fill="none" strokeOpacity="0.7"/>
    </svg>
  );
}

function TextureSmooth({ accent }: IllusProps) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="19" fill={accent} fillOpacity="0.06"/>
      {/* Smooth line */}
      <line x1="10" y1="22" x2="34" y2="22" stroke={accent} strokeWidth="2.5" strokeLinecap="round"/>
      {/* Shine */}
      <circle cx="18" cy="20" r="1.5" fill="white" fillOpacity="0.5"/>
      <circle cx="26" cy="20" r="1" fill="white" fillOpacity="0.4"/>
    </svg>
  );
}

function ElasticityBreak({ accent }: IllusProps) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="19" fill={accent} fillOpacity="0.1"/>
      {/* Broken strand */}
      <path d="M22 10 L22 18" stroke={accent} strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M22 26 L22 34" stroke={accent} strokeWidth="2.5" strokeLinecap="round"/>
      {/* Break mark */}
      <path d="M18 20 L26 24" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6"/>
      <path d="M18 24 L26 20" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6"/>
    </svg>
  );
}

function ElasticityStretch({ accent }: IllusProps) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="19" fill={accent} fillOpacity="0.07"/>
      {/* Stretched strand */}
      <path d="M22 9 L22 35" stroke={accent} strokeWidth="2.5" strokeLinecap="round"/>
      {/* Arrows showing stretch */}
      <path d="M18 12 L22 9 L26 12" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeOpacity="0.7"/>
      <path d="M18 32 L22 35 L26 32" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeOpacity="0.7"/>
      {/* Break mark in middle */}
      <path d="M19 23 L25 21" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4"/>
    </svg>
  );
}

function ElasticityElastic({ accent }: IllusProps) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="19" fill={accent} fillOpacity="0.06"/>
      {/* Spring/coil */}
      <path d="M22 9 L22 13 Q28 15 28 18 Q28 21 22 22 Q16 23 16 26 Q16 29 22 31 L22 35"
        stroke={accent} strokeWidth="2" strokeLinecap="round" fill="none"/>
      {/* Return arrows */}
      <circle cx="22" cy="22" r="3" fill={accent} fillOpacity="0.3"/>
    </svg>
  );
}

// ─── Export map ────────────────────────────────────────────────────────────────

export const ANSWER_ILLUSTRATIONS: Record<
  string,
  (props: IllusProps) => React.ReactElement
> = {
  "Q1_A": WaterAbsorbed,
  "Q1_B": WaterSlow,
  "Q1_C": WaterPearling,
  "Q2_A": DryFast,
  "Q2_B": DryMedium,
  "Q2_C": DrySlow,
  "Q3_A": HydrationLost,
  "Q3_B": HydrationOneDay,
  "Q3_C": HydrationLong,
  "Q4_A": ProductAbsorbed,
  "Q4_B": ProductSurface,
  "Q4_C": ProductResidues,
  "Q5_A": BuildupLight,
  "Q5_B": BuildupMedium,
  "Q5_C": BuildupHeavy,
  "Q6_A": HumidityFrizz,
  "Q6_B": HumidityLittle,
  "Q6_C": HumidityRigid,
  "Q7_A": TextureRough,
  "Q7_B": TextureNormal,
  "Q7_C": TextureSmooth,
  "Q8_A": ElasticityBreak,
  "Q8_B": ElasticityStretch,
  "Q8_C": ElasticityElastic,
};
