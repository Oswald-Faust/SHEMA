"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ScoringResult } from "@/lib/scoring";
import Link from "next/link";

// ─── Score ring ───────────────────────────────────────────────────────────────

function ScoreRing({ score, accent }: { score: number; accent: string }) {
  const normalized = (score + 100) / 2; // 0-100 visual
  const r = 44;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (normalized / 100) * circumference;

  return (
    <div className="relative w-28 h-28 flex items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" width="112" height="112" viewBox="0 0 112 112">
        <circle cx="56" cy="56" r={r} stroke="var(--diag-border)" strokeWidth="5" fill="none" />
        <motion.circle
          cx="56" cy="56" r={r}
          stroke={accent}
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
        />
      </svg>
      <div className="text-center z-10">
        <div className="text-2xl font-bold" style={{ color: accent }}>
          {score > 0 ? `+${score}` : score}
        </div>
        <div className="text-[9px] tracking-widest uppercase" style={{ color: "var(--diag-text-muted)" }}>
          Score
        </div>
      </div>
    </div>
  );
}

// ─── Concern badges ───────────────────────────────────────────────────────────

const CONCERN_GROUPS: Record<string, { label: string; id: string }> = {
  "casse": { label: "Groupe Casse", id: "casse" },
  "pousse": { label: "Groupe Pousse", id: "pousse" },
  "alopécie": { label: "Groupe Alopécie", id: "alopecie" },
  "cuir chevelu sec/irrité": { label: "Groupe Cuir Chevelu", id: "cuir" },
  "cheveux secs": { label: "Groupe Cheveux Secs", id: "sec" },
};

// ─── CTA card ─────────────────────────────────────────────────────────────────

function CTACard({
  icon,
  title,
  subtitle,
  price,
  accent,
  onPress,
  variant = "default",
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  price?: string;
  accent: string;
  onPress?: () => void;
  variant?: "default" | "primary" | "outline";
}) {
  return (
    <button
      onClick={onPress}
      className="result-card w-full text-left p-4 rounded-2xl flex items-start gap-3.5"
      style={{
        background:
          variant === "primary"
            ? `rgba(${hexToRgb(accent)}, 0.15)`
            : "var(--diag-surface)",
        border:
          variant === "primary"
            ? `1px solid rgba(${hexToRgb(accent)}, 0.35)`
            : "1px solid var(--diag-border)",
      }}>
      <div
        className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center"
        style={{ background: `rgba(${hexToRgb(accent)}, 0.15)` }}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm" style={{ color: "var(--diag-text)" }}>{title}</p>
        <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "var(--diag-text-muted)" }}>{subtitle}</p>
      </div>
      {price && (
        <div className="flex-shrink-0 text-right">
          <p className="text-sm font-bold" style={{ color: accent }}>{price}</p>
        </div>
      )}
    </button>
  );
}

// ─── Main results page ────────────────────────────────────────────────────────

export default function ResultatsPage() {
  const router = useRouter();
  const [result, setResult] = useState<ScoringResult | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("shema_result");
    if (!stored) { router.push("/diagnostic"); return; }
    setResult(JSON.parse(stored));
  }, [router]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--diag-bg)" }}>
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-8 h-8 rounded-full border-2 border-t-transparent"
          style={{ borderColor: "#C8895A", borderTopColor: "transparent" }} />
      </div>
    );
  }

  const isHaute = result.porosity === "haute_elevee" || result.porosity === "haute_mixte";
  const isMixte = result.hasNuance;
  const accent = isHaute ? "#C8895A" : "#5A9EC8";
  const { profileText } = result;

  const isLowReliability = result.reliability < 60;
  const textureLabel =
    result.texture === "bouclee" ? "Bouclée" :
    result.texture === "crepus_frisee" ? "Crépus / Frisée" :
    result.texture === "lisse" ? "Lisse" : null;

  const subscriptionFrequency = result.texture === "crepus_frisee" ? "6 semaines" : "5 semaines";

  return (
    <div className="min-h-screen pb-12" style={{ background: "var(--diag-bg)" }}>
      <div className="max-w-lg mx-auto px-4">

        {/* ── Top brand bar ── */}
        <div className="pt-6 pb-4 flex items-center justify-between">
          <span className="text-xs font-bold tracking-[0.25em] uppercase"
            style={{ color: "var(--diag-text)" }}>
            SHEMA
          </span>
          <Link href="/diagnostic">
            <span className="text-xs" style={{ color: "var(--diag-text-muted)" }}>
              Refaire →
            </span>
          </Link>
        </div>

        {/* ── Hero result card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl p-6 mb-4 overflow-hidden relative"
          style={{
            background: "var(--diag-surface)",
            border: `1px solid rgba(${hexToRgb(accent)}, 0.2)`,
          }}>

          {/* Glow bg */}
          <div className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at top right, rgba(${hexToRgb(accent)}, 0.12) 0%, transparent 65%)`,
            }} />

          <div className="relative flex items-center gap-5">
            <ScoreRing score={result.score} accent={accent} />
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 mb-2">
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide"
                  style={{ background: `rgba(${hexToRgb(accent)}, 0.2)`, color: accent }}>
                  {profileText.title}
                </span>
                {isMixte && (
                  <span className="text-xs" style={{ color: "var(--diag-text-muted)" }}>
                    {profileText.subtitle}
                  </span>
                )}
              </div>
              {textureLabel && (
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: "var(--diag-pill)", color: "var(--diag-text-muted)" }}>
                    {textureLabel}
                  </span>
                </div>
              )}
              <p className="text-xs leading-relaxed" style={{ color: "var(--diag-text-muted)" }}>
                {isLowReliability
                  ? "Tes réponses présentent des contradictions — un diagnostic personnalisé t'apportera plus de précision."
                  : `Résultat${isMixte ? " avec nuance" : " confirmé"}`}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Description profil ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="rounded-2xl p-5 mb-4"
          style={{ background: "var(--diag-surface)", border: "1px solid var(--diag-border)" }}>
          <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "var(--diag-text-soft)" }}>
            {profileText.description}
          </p>
        </motion.div>

        {/* ── Conseils basiques (gratuits) ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="rounded-2xl p-5 mb-5"
          style={{ background: "var(--diag-surface-soft)", border: "1px solid var(--diag-border)" }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "var(--diag-text-muted)" }}>
            Les basiques pour toi · Gratuit
          </p>
          <div className="flex flex-col gap-2">
            {profileText.tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center text-[9px] font-bold"
                  style={{ background: `rgba(${hexToRgb(accent)}, 0.15)`, color: accent }}>
                  {i + 1}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--diag-text-soft)" }}>{tip}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Séparateur ── */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px" style={{ background: "var(--diag-border)" }} />
          <span className="text-xs uppercase tracking-widest" style={{ color: "var(--diag-text-muted)" }}>
            Agir maintenant
          </span>
          <div className="flex-1 h-px" style={{ background: "var(--diag-border)" }} />
        </div>

        {/* ── CTA Produits ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}>

          <p className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: accent }}>
            Les produits adaptés à ta porosité
          </p>

          <div className="rounded-2xl p-5 mb-3"
            style={{ background: `rgba(${hexToRgb(accent)}, 0.08)`, border: `1px solid rgba(${hexToRgb(accent)}, 0.2)` }}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-bold text-base" style={{ color: "var(--diag-text)" }}>
                  Bundle {profileText.bundleName === "haute_porosite" ? "Haute Porosité" : "Faible Porosité"}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--diag-text-muted)" }}>
                  {profileText.bundle}
                </p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ background: `rgba(${hexToRgb(accent)}, 0.2)`, color: accent }}>
                -15%
              </span>
            </div>
            <p className="text-xs mb-4" style={{ color: "var(--diag-text-muted)" }}>
              {profileText.bundleName === "haute_porosite"
                ? "Shampoing Réparateur · Masque Protéiné · Huile Scellante · Leave-in"
                : "Shampoing Clarifiant · Masque Pénétrant · Leave-in Ultra Léger · Spray Léger"}
            </p>
            <button className="cta-primary w-full py-3 rounded-xl text-sm font-bold text-white">
              Voir les produits et ajouter au panier
            </button>
          </div>

          {/* Réception automatique */}
          <div className="rounded-xl p-4 mb-5 flex items-start gap-3"
            style={{ background: "var(--diag-surface)", border: "1px solid var(--diag-border)" }}>
            <div className="flex-shrink-0 mt-0.5">
              <input type="checkbox" className="w-4 h-4 rounded" style={{ accentColor: accent }} />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: "var(--diag-text)" }}>
                Recevoir mes soins automatiquement · Livraison gratuite
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--diag-text-muted)" }}>
                Livrés 5 jours avant la fin de ta routine, toutes les {subscriptionFrequency}. Annulation en un clic.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── CTAs accompagnement ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}>

          <p className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "var(--diag-text-muted)" }}>
            Aller plus loin
          </p>

          <div className="flex flex-col gap-2.5 mb-5">
            {/* Routine personnalisée */}
            <CTACard
              accent={accent}
              variant="primary"
              icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L11 6L15 7L12 10L13 14L9 12L5 14L6 10L3 7L7 6Z" fill={accent} fillOpacity="0.8"/></svg>}
              title="Obtiens ta routine personnalisée"
              subtitle="La méthode et astuces spécifiques pour toi · Les produits adaptés · Un calendrier intelligent"
              price="Dès 29€"
            />

            {/* Coaching */}
            <CTACard
              accent="#E8E84A"
              icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="6" r="3.5" stroke="#E8E84A" strokeWidth="1.5"/><path d="M3 16C3 13.2 5.7 11 9 11C12.3 11 15 13.2 15 16" stroke="#E8E84A" strokeWidth="1.5" strokeLinecap="round"/></svg>}
              title="Réserver une séance coaching"
              subtitle="Séance visio 1:1 avec un coach capillaire Shema · Routine 100% adaptée"
              price="Sur devis"
            />

            {/* Suivi personnel */}
            <div className="rounded-2xl p-4"
              style={{ background: "var(--diag-surface)", border: "1px solid var(--diag-border)" }}>
              <p className="text-sm font-semibold mb-3" style={{ color: "var(--diag-text)" }}>
                Suivi personnel avec un coach
              </p>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {[
                  { duration: "3 mois", desc: "Solo" },
                  { duration: "6 mois", desc: "Solo" },
                  { duration: "9 mois", desc: "Solo" },
                ].map((opt) => (
                  <button key={opt.duration}
                    className="py-2.5 rounded-xl text-center"
                    style={{ background: "var(--diag-surface-strong)", border: "1px solid var(--diag-border)" }}>
                    <p className="text-sm font-bold" style={{ color: "var(--diag-text)" }}>{opt.duration}</p>
                    <p className="text-[10px]" style={{ color: "var(--diag-text-muted)" }}>{opt.desc}</p>
                  </button>
                ))}
              </div>
              <p className="text-xs mb-2" style={{ color: "var(--diag-text-muted)" }}>En famille ou entre amis (jusqu&apos;à 3 personnes)</p>
              <div className="grid grid-cols-3 gap-2">
                {["3 mois", "6 mois", "9 mois"].map((d) => (
                  <button key={d}
                    className="py-2.5 rounded-xl text-center"
                    style={{ background: "var(--diag-surface)", border: "1px solid var(--diag-border)" }}>
                    <p className="text-sm font-bold" style={{ color: "var(--diag-text)" }}>{d}</p>
                    <p className="text-[10px]" style={{ color: "var(--diag-text-muted)" }}>Groupe</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Challenges */}
            {result.concerns.length > 0 && (
              <div className="rounded-2xl p-4"
                style={{ background: "var(--diag-surface)", border: "1px solid var(--diag-border)" }}>
                <p className="text-sm font-semibold mb-3" style={{ color: "var(--diag-text)" }}>
                  Rejoindre un challenge de groupe
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.concerns.map((c) => {
                    const g = CONCERN_GROUPS[c];
                    if (!g) return null;
                    return (
                      <button key={g.id}
                        className="px-3 py-1.5 rounded-full text-xs font-medium"
                        style={{
                          background: `rgba(${hexToRgb(accent)}, 0.12)`,
                          border: `1px solid rgba(${hexToRgb(accent)}, 0.25)`,
                          color: accent,
                        }}>
                        {g.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* ── Scan diagnostic option ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}>
          <Link href="/diagnostic/scan">
            <div className="rounded-2xl p-4 mb-5 flex items-center gap-3.5 cursor-pointer"
              style={{ background: "var(--diag-surface)", border: "1px solid var(--diag-border)" }}>
              <div className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center"
                style={{ background: "var(--diag-surface-strong)" }}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <rect x="2" y="2" width="5" height="5" rx="1.5" stroke="white" strokeWidth="1.5" strokeOpacity="0.6"/>
                  <rect x="15" y="2" width="5" height="5" rx="1.5" stroke="white" strokeWidth="1.5" strokeOpacity="0.6"/>
                  <rect x="2" y="15" width="5" height="5" rx="1.5" stroke="white" strokeWidth="1.5" strokeOpacity="0.6"/>
                  <rect x="15" y="15" width="5" height="5" rx="1.5" stroke="white" strokeWidth="1.5" strokeOpacity="0.6"/>
                  <circle cx="11" cy="11" r="2.5" fill="white" fillOpacity="0.4"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold" style={{ color: "var(--diag-text)" }}>
                  Diagnostic scan vidéo
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--diag-text-muted)" }}>
                  Analyse visuelle de tes cheveux par caméra · 3 gestes guidés
                </p>
              </div>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 3L9 7L5 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4"/>
              </svg>
            </div>
          </Link>
        </motion.div>

        {/* ── Footer ── */}
        <div className="text-center">
          <p className="text-xs" style={{ color: "var(--diag-text-muted)" }}>
            hellotribe@shematribe.com
          </p>
        </div>

      </div>
    </div>
  );
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}
