"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BLOC1_QUESTIONS,
  CIBLAGE_QUESTIONS,
  BLOC2_QUESTIONS,
  Question,
  QuestionVisual,
} from "@/lib/questions";
import { Answers } from "@/lib/scoring";
import { ANSWER_ILLUSTRATIONS } from "@/lib/answer-illustrations";

// ─── Illustrations SVG par type ───────────────────────────────────────────────

function Illustration({ visual, size = 140 }: { visual: QuestionVisual; size?: number }) {
  const { icon, accent } = visual;

  const icons: Record<string, React.ReactNode> = {
    water: (
      <svg width={size} height={size} viewBox="0 0 140 140" fill="none">
        <circle cx="70" cy="70" r="60" fill={accent} fillOpacity="0.08" />
        <path d="M70 20 C70 20 40 60 40 80 C40 96 54 108 70 108 C86 108 100 96 100 80 C100 60 70 20 70 20Z" fill={accent} fillOpacity="0.3" />
        <path d="M70 35 C70 35 50 65 50 80 C50 91 59 100 70 100 C81 100 90 91 90 80 C90 65 70 35 70 35Z" fill={accent} fillOpacity="0.5" />
        <circle cx="62" cy="72" r="4" fill="white" fillOpacity="0.4" />
        <circle cx="55" cy="62" r="2.5" fill="white" fillOpacity="0.3" />
        {/* Water drops */}
        <ellipse cx="30" cy="50" rx="4" ry="6" fill={accent} fillOpacity="0.4" />
        <ellipse cx="110" cy="70" rx="3" ry="5" fill={accent} fillOpacity="0.3" />
        <ellipse cx="100" cy="40" rx="2.5" ry="4" fill={accent} fillOpacity="0.25" />
      </svg>
    ),
    drying: (
      <svg width={size} height={size} viewBox="0 0 140 140" fill="none">
        <circle cx="70" cy="70" r="60" fill={accent} fillOpacity="0.08" />
        {/* Sun */}
        <circle cx="70" cy="55" r="22" fill={accent} fillOpacity="0.4" />
        <circle cx="70" cy="55" r="14" fill={accent} fillOpacity="0.6" />
        {/* Rays */}
        {[0,45,90,135,180,225,270,315].map((deg, i) => (
          <line key={i}
            x1={70 + 26 * Math.cos(deg * Math.PI / 180)}
            y1={55 + 26 * Math.sin(deg * Math.PI / 180)}
            x2={70 + 34 * Math.cos(deg * Math.PI / 180)}
            y2={55 + 34 * Math.sin(deg * Math.PI / 180)}
            stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.6"
          />
        ))}
        {/* Hair strands */}
        <path d="M45 85 Q50 100 55 105" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5" fill="none"/>
        <path d="M65 82 Q68 98 70 108" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.6" fill="none"/>
        <path d="M85 85 Q82 100 80 105" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5" fill="none"/>
        {/* Steam */}
        <path d="M55 78 Q58 72 55 66" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.3" fill="none"/>
        <path d="M70 78 Q73 72 70 66" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.3" fill="none"/>
        <path d="M85 78 Q88 72 85 66" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.3" fill="none"/>
      </svg>
    ),
    hydration: (
      <svg width={size} height={size} viewBox="0 0 140 140" fill="none">
        <circle cx="70" cy="70" r="60" fill={accent} fillOpacity="0.08" />
        {/* Leaf / moisture symbol */}
        <path d="M70 25 C90 45 100 65 85 85 C75 98 55 98 45 85 C30 65 50 45 70 25Z" fill={accent} fillOpacity="0.3" />
        <path d="M70 35 C85 52 92 68 80 82 C72 92 58 92 50 82 C38 68 55 52 70 35Z" fill={accent} fillOpacity="0.5" />
        <path d="M70 35 L70 90" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4" strokeDasharray="3 4"/>
        {/* Sparkles */}
        <circle cx="95" cy="45" r="3" fill={accent} fillOpacity="0.6" />
        <circle cx="105" cy="65" r="2" fill={accent} fillOpacity="0.4" />
        <circle cx="35" cy="55" r="2.5" fill={accent} fillOpacity="0.5" />
        <path d="M90 38 L92 34 L94 38 L90 38Z" fill="white" fillOpacity="0.5"/>
        <path d="M102 60 L104 56 L106 60 L102 60Z" fill="white" fillOpacity="0.4"/>
      </svg>
    ),
    product: (
      <svg width={size} height={size} viewBox="0 0 140 140" fill="none">
        <circle cx="70" cy="70" r="60" fill={accent} fillOpacity="0.08" />
        {/* Jar */}
        <rect x="45" y="60" width="50" height="50" rx="8" fill={accent} fillOpacity="0.3" />
        <rect x="52" y="52" width="36" height="12" rx="4" fill={accent} fillOpacity="0.5" />
        <rect x="48" y="62" width="44" height="10" rx="0" fill={accent} fillOpacity="0.15" />
        {/* Shine */}
        <rect x="50" y="67" width="6" height="20" rx="3" fill="white" fillOpacity="0.2" />
        {/* Product application dots */}
        <circle cx="100" cy="55" r="5" fill={accent} fillOpacity="0.5" />
        <circle cx="112" cy="65" r="3.5" fill={accent} fillOpacity="0.35" />
        <circle cx="107" cy="45" r="2.5" fill={accent} fillOpacity="0.25" />
        {/* Arrow suggesting application */}
        <path d="M88 60 Q95 52 100 55" stroke={accent} strokeWidth="1.5" strokeLinecap="round" fill="none" strokeOpacity="0.5"/>
      </svg>
    ),
    buildup: (
      <svg width={size} height={size} viewBox="0 0 140 140" fill="none">
        <circle cx="70" cy="70" r="60" fill={accent} fillOpacity="0.08" />
        {/* Layers representing buildup */}
        <ellipse cx="70" cy="90" rx="40" ry="8" fill={accent} fillOpacity="0.15" />
        <ellipse cx="70" cy="82" rx="36" ry="7" fill={accent} fillOpacity="0.25" />
        <ellipse cx="70" cy="74" rx="32" ry="6" fill={accent} fillOpacity="0.35" />
        <ellipse cx="70" cy="66" rx="28" ry="5.5" fill={accent} fillOpacity="0.5" />
        {/* Hair strand */}
        <path d="M70 30 Q65 50 70 66" stroke="white" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.6" fill="none"/>
        <path d="M70 30 Q75 50 70 66" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.3" fill="none"/>
        {/* Light/clean indicator */}
        <path d="M28 50 L35 50 M32 44 L32 50 M32 50 L36 56" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.35" fill="none"/>
      </svg>
    ),
    humidity: (
      <svg width={size} height={size} viewBox="0 0 140 140" fill="none">
        <circle cx="70" cy="70" r="60" fill={accent} fillOpacity="0.08" />
        {/* Cloud */}
        <path d="M40 75 C40 65 47 58 57 58 C58 48 67 42 78 44 C88 46 95 55 93 65 C100 66 105 72 103 79 C101 86 94 90 87 90 L47 90 C40 90 34 84 34 77 C34 72 37 68 40 75Z" fill={accent} fillOpacity="0.35" />
        {/* Rain drops */}
        {[[52, 96], [62, 100], [72, 96], [82, 100], [92, 96]].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="2" ry="4" fill={accent} fillOpacity={0.3 + i * 0.05} />
        ))}
        {/* Frizz lines */}
        <path d="M30 40 Q25 35 30 30 Q35 25 30 20" stroke={accent} strokeWidth="1.5" strokeLinecap="round" fill="none" strokeOpacity="0.5"/>
        <path d="M108 50 Q113 45 108 40 Q103 35 108 30" stroke={accent} strokeWidth="1.5" strokeLinecap="round" fill="none" strokeOpacity="0.4"/>
      </svg>
    ),
    texture: (
      <svg width={size} height={size} viewBox="0 0 140 140" fill="none">
        <circle cx="70" cy="70" r="60" fill={accent} fillOpacity="0.08" />
        {/* Hand silhouette */}
        <path d="M50 100 L50 65 C50 62 52 60 55 60 C58 60 60 62 60 65 L60 55 C60 52 62 50 65 50 C68 50 70 52 70 55 L70 52 C70 49 72 47 75 47 C78 47 80 49 80 52 L80 55 C80 52 82 50 85 50 C88 50 90 52 90 55 L90 80 C90 85 87 90 83 93 L75 100 Z" fill={accent} fillOpacity="0.3" />
        <path d="M50 100 L50 65 C50 62 52 60 55 60 C58 60 60 62 60 65 L60 55 C60 52 62 50 65 50 C68 50 70 52 70 55 L70 52 C70 49 72 47 75 47 C78 47 80 49 80 52 L80 55 C80 52 82 50 85 50 C88 50 90 52 90 55 L90 80 C90 85 87 90 83 93 L75 100 Z" stroke={accent} strokeWidth="1.5" fill="none" strokeOpacity="0.6"/>
        {/* Texture indicators */}
        <path d="M30 40 Q38 36 46 42" stroke={accent} strokeWidth="2" strokeLinecap="round" fill="none" strokeOpacity="0.5"/>
        <path d="M30 52 Q38 48 48 54" stroke={accent} strokeWidth="1.5" strokeLinecap="round" fill="none" strokeOpacity="0.4"/>
        <path d="M30 64 Q38 60 46 66" stroke={accent} strokeWidth="1.5" strokeLinecap="round" fill="none" strokeOpacity="0.3"/>
      </svg>
    ),
    elasticity: (
      <svg width={size} height={size} viewBox="0 0 140 140" fill="none">
        <circle cx="70" cy="70" r="60" fill={accent} fillOpacity="0.08" />
        {/* Stretched hair */}
        <line x1="70" y1="25" x2="70" y2="115" stroke={accent} strokeWidth="3" strokeLinecap="round" strokeOpacity="0.6"/>
        {/* Arrows indicating stretch */}
        <path d="M58 35 L70 25 L82 35" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeOpacity="0.7"/>
        <path d="M58 105 L70 115 L82 105" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeOpacity="0.7"/>
        {/* Tension indicators */}
        <path d="M35 70 Q52 55 70 70 Q88 85 105 70" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeOpacity="0.25" strokeDasharray="4 4"/>
        {/* Nodes */}
        <circle cx="70" cy="70" r="5" fill={accent} fillOpacity="0.7"/>
        <circle cx="70" cy="70" r="9" fill={accent} fillOpacity="0.2"/>
      </svg>
    ),
    concerns: (
      <svg width={size} height={size} viewBox="0 0 140 140" fill="none">
        <circle cx="70" cy="70" r="60" fill={accent} fillOpacity="0.08" />
        <circle cx="70" cy="70" r="35" fill={accent} fillOpacity="0.15" />
        <path d="M70 42 L75 58 L92 58 L79 68 L84 84 L70 74 L56 84 L61 68 L48 58 L65 58 Z" fill={accent} fillOpacity="0.5" />
      </svg>
    ),
    texture_type: (
      <svg width={size} height={size} viewBox="0 0 140 140" fill="none">
        <circle cx="70" cy="70" r="60" fill={accent} fillOpacity="0.08" />
        {/* 3 curl patterns */}
        {/* Curly */}
        <path d="M30 55 Q40 45 50 55 Q60 65 50 75" stroke={accent} strokeWidth="2.5" strokeLinecap="round" fill="none" strokeOpacity="0.7"/>
        {/* Coily */}
        <path d="M65 50 Q72 42 78 50 Q85 58 78 65 Q71 72 78 80 Q85 88 78 95" stroke={accent} strokeWidth="2" strokeLinecap="round" fill="none" strokeOpacity="0.5"/>
        {/* Straight */}
        <path d="M98 45 L102 95" stroke={accent} strokeWidth="2.5" strokeLinecap="round" fill="none" strokeOpacity="0.6"/>
        <path d="M105 45 L109 95" stroke={accent} strokeWidth="1.5" strokeLinecap="round" fill="none" strokeOpacity="0.4"/>
      </svg>
    ),
    default: (
      <svg width={size} height={size} viewBox="0 0 140 140" fill="none">
        <circle cx="70" cy="70" r="60" fill={accent} fillOpacity="0.15" />
        <circle cx="70" cy="70" r="25" fill={accent} fillOpacity="0.4" />
      </svg>
    ),
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      {icons[icon] ?? icons.default}
    </div>
  );
}

// ─── Segment progress bar (VARL style) ────────────────────────────────────────

function SegmentBar({
  total,
  current,
  bloc1Count,
  ciblageCount,
}: {
  total: number;
  current: number;
  bloc1Count: number;
  ciblageCount: number;
}) {
  const bloc2Start = bloc1Count + ciblageCount;
  const segments = [
    { label: "PROFIL", start: 0, end: bloc1Count },
    { label: "CIBLAGE", start: bloc1Count, end: bloc2Start },
    { label: "AFFINAGE", start: bloc2Start, end: total },
  ];

  return (
    <div className="flex gap-1.5 w-full">
      {segments.map((seg, i) => {
        if (seg.start === seg.end) return null;
        const filled = current >= seg.end;
        const active = current >= seg.start && current < seg.end;
        const progress = active
          ? ((current - seg.start) / (seg.end - seg.start)) * 100
          : 0;

        return (
          <div key={i} className="flex-1 flex flex-col gap-1">
            <div className="relative h-1 rounded-full overflow-hidden" style={{ background: "var(--diag-pill-strong)" }}>
              {filled && (
                <div className="absolute inset-0 rounded-full progress-shimmer" />
              )}
              {active && (
                <motion.div
                  className="absolute left-0 top-0 h-full rounded-full progress-shimmer"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </div>
            <span
              className="text-[9px] tracking-widest uppercase font-medium"
              style={{
                color: filled || active ? "var(--diag-text-soft)" : "var(--diag-text-muted)",
              }}
            >
              {seg.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main diagnostic page ─────────────────────────────────────────────────────

export default function DiagnosticPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Answers>({});
  const [multiBuffer, setMultiBuffer] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const buildSequence = useCallback(() => {
    const partialAnswers: Answers = { ...answers };
    const bloc2Active = BLOC2_QUESTIONS.filter(
      (q) => q.conflict && q.conflict.condition(partialAnswers)
    ).slice(0, 4);
    return [...BLOC1_QUESTIONS, ...CIBLAGE_QUESTIONS, ...bloc2Active];
  }, [answers]);

  const sequence = buildSequence();
  const current: Question = sequence[currentIndex];
  const total = sequence.length;

  const handleSelect = (value: string) => {
    if (!current) return;

    if (current.multiSelect) {
      const max = current.maxSelect ?? 2;
      const next = multiBuffer.includes(value)
        ? multiBuffer.filter((v) => v !== value)
        : multiBuffer.length < max
        ? [...multiBuffer, value]
        : multiBuffer;
      setMultiBuffer(next);
      return;
    }

    const newAnswers: Answers = { ...answers, [current.id]: value };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentIndex < sequence.length - 1) {
        setDirection(1);
        setCurrentIndex((i) => i + 1);
      } else {
        submitDiagnostic(newAnswers);
      }
    }, 250);
  };

  const confirmMulti = () => {
    if (!current || !current.multiSelect || multiBuffer.length === 0) return;
    const newAnswers: Answers = { ...answers, [current.id]: multiBuffer };
    setAnswers(newAnswers);
    setMultiBuffer([]);

    setTimeout(() => {
      if (currentIndex < sequence.length - 1) {
        setDirection(1);
        setCurrentIndex((i) => i + 1);
      } else {
        submitDiagnostic(newAnswers);
      }
    }, 150);
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((i) => i - 1);
      if (current?.multiSelect) setMultiBuffer([]);
    }
  };

  const submitDiagnostic = async (finalAnswers: Answers) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/scoring", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: finalAnswers }),
      });
      const data = await res.json();
      sessionStorage.setItem("shema_result", JSON.stringify(data.result));
      router.push("/diagnostic/resultats");
    } catch {
      setIsSubmitting(false);
    }
  };

  // Init multi buffer
  useEffect(() => {
    if (current?.multiSelect) {
      const existing = answers[current.id];
      setMultiBuffer(Array.isArray(existing) ? existing : []);
    }
  }, [currentIndex, current, answers]);

  if (isSubmitting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ background: "var(--diag-bg)" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            className="w-20 h-20 rounded-full mx-auto mb-8 flex items-center justify-center"
            style={{ background: "rgba(200,137,90,0.15)", border: "1px solid rgba(200,137,90,0.3)" }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 4 C10 4 4 9 4 16 C4 23 10 28 16 28" stroke="#C8895A" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M16 28 C22 28 28 23 28 16" stroke="#D4A853" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </motion.div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--diag-text)" }}>
            Analyse en cours…
          </h2>
          <p className="text-sm mb-8" style={{ color: "var(--diag-text-muted)" }}>
            Calcul de ton profil capillaire
          </p>
          <div className="w-48 h-1 rounded-full mx-auto overflow-hidden"
            style={{ background: "var(--diag-pill-strong)" }}>
            <motion.div
              className="h-full rounded-full progress-shimmer"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  if (!current) return null;

  const { visual } = current;
  const isMulti = current.multiSelect ?? false;
  const isLastQuestion = currentIndex === sequence.length - 1;
  const canProceedMulti = isMulti && multiBuffer.length > 0;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--diag-bg)" }}>

      {/* ── Top bar ── */}
      <div className="sticky top-0 z-20 px-4 pt-safe-top pb-3"
        style={{ background: "var(--diag-bg)" }}>
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold tracking-[0.25em] uppercase"
              style={{ color: "var(--diag-text)" }}>
              SHEMA
            </span>
            <span className="text-xs font-medium"
              style={{ color: "var(--diag-text-muted)" }}>
              {currentIndex + 1} / {total}
            </span>
          </div>
          <SegmentBar
            total={total}
            current={currentIndex}
            bloc1Count={BLOC1_QUESTIONS.length}
            ciblageCount={CIBLAGE_QUESTIONS.length}
          />
        </div>
      </div>

      {/* ── Illustration zone ── */}
      <div className="relative illustration-canvas mx-4 mt-3 rounded-2xl overflow-hidden"
        style={{
          background: visual.gradient,
          height: "min(38vh, 220px)",
          border: "1px solid var(--diag-border)",
        }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <Illustration visual={visual} size={140} />
        </div>
        {/* Ref badge bottom-left */}
        <div className="absolute bottom-3 left-3 ref-circle px-2.5 py-1 rounded-lg text-xs font-medium"
          style={{
            background: "var(--diag-overlay)",
            border: "1px solid var(--diag-border-strong)",
            color: visual.accent,
          }}>
          {visual.refLabel}
        </div>
        {/* Bloc badge bottom-right */}
        {current.bloc === 2 && (
          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg text-xs font-medium"
            style={{
              background: "rgba(200,137,90,0.2)",
              border: "1px solid rgba(200,137,90,0.3)",
              color: "#C8895A",
            }}>
            Précision ↑
          </div>
        )}
      </div>

      {/* ── Question + options ── */}
      <div className="flex-1 px-4 pt-5 pb-6">
        <div className="max-w-lg mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -30 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <h2 className="text-xl font-bold mb-1 leading-snug"
                style={{ color: "var(--diag-text)" }}>
                {current.text}
              </h2>
              {current.subtitle && (
                <p className="text-sm mb-5 mt-1" style={{ color: "var(--diag-text-muted)" }}>
                  {current.subtitle}
                </p>
              )}
              {!current.subtitle && <div className="mb-4" />}

              <div className="flex flex-col gap-2.5">
                {current.options.map((option) => {
                  const isSelected = isMulti
                    ? multiBuffer.includes(option.value)
                    : answers[current.id] === option.value;

                  const IllusComp = ANSWER_ILLUSTRATIONS[`${current.id}_${option.value}`] ?? null;
                  return (
                    <button
                      key={option.value}
                      onClick={() => handleSelect(option.value)}
                      className="option-card w-full text-left px-4 py-3 rounded-xl font-medium text-sm"
                      style={{
                        background: isSelected
                          ? `rgba(${hexToRgb(visual.accent)}, 0.15)`
                          : "var(--diag-surface-soft)",
                        border: isSelected
                          ? `1.5px solid ${visual.accent}`
                          : "1.5px solid var(--diag-border)",
                        color: isSelected ? visual.accent : "var(--diag-text-soft)",
                      }}>
                      <div className="flex items-center gap-3">
                        {/* Illustration or radio */}
                        {IllusComp !== null && !isMulti ? (
                          <div className="flex-shrink-0 rounded-lg overflow-hidden"
                            style={{
                              width: 44, height: 44,
                              background: isSelected
                                ? `rgba(${hexToRgb(visual.accent)}, 0.12)`
                                : "var(--diag-surface)",
                              border: `1px solid ${isSelected ? visual.accent + "40" : "var(--diag-border)"}`,
                            }}>
                            <IllusComp accent={isSelected ? visual.accent : "var(--diag-text-muted)"} />
                          </div>
                        ) : (
                          <div
                            className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center border-2"
                            style={{
                              borderColor: isSelected ? visual.accent : "var(--diag-border-strong)",
                              background: isSelected ? visual.accent : "transparent",
                            }}>
                            {isSelected && (
                              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>
                        )}
                        <span className="flex-1">{option.label}</span>
                        {isSelected && !IllusComp && (
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
                            <path d="M2 7L5.5 10.5L12 3" stroke={visual.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── Navigation ── */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={handleBack}
              disabled={currentIndex === 0}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium"
              style={{
                color: "var(--diag-text-muted)",
                background: "var(--diag-surface-soft)",
                opacity: currentIndex === 0 ? 0.3 : 1,
              }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Précédent
            </button>

            {isMulti && (
              <button
                onClick={confirmMulti}
                disabled={!canProceedMulti}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{
                  background: canProceedMulti ? visual.accent : "var(--diag-pill-strong)",
                  color: canProceedMulti ? "white" : "var(--diag-text-muted)",
                }}>
                {isLastQuestion ? "Voir mon résultat" : "Continuer →"}
              </button>
            )}

            {!isMulti && answers[current.id] && !isLastQuestion && (
              <button
                onClick={() => { setDirection(1); setCurrentIndex((i) => i + 1); }}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ background: visual.accent }}>
                Suivant →
              </button>
            )}

            {!isMulti && answers[current.id] && isLastQuestion && (
              <button
                onClick={() => submitDiagnostic(answers)}
                className="btn-cta px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ background: visual.accent }}>
                Voir mon résultat
              </button>
            )}
          </div>
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
