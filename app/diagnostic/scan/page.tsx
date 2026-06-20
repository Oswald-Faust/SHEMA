"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type GestureStep = {
  id: number;
  title: string;
  subtitle: string;
  instruction: string;
  duration: number; // seconds
  indicator: "volume" | "elasticite" | "cuir";
};

const STEPS: GestureStep[] = [
  {
    id: 1,
    title: "GESTE 1/3 · SCAN 360°",
    subtitle: "CALCUL DU VOLUME & DENSITÉ",
    instruction: "Montrez le côté de haut en bas, puis répétez pour le côté gauche et l'arrière.",
    duration: 7,
    indicator: "volume",
  },
  {
    id: 2,
    title: "GESTE 2/3 · PULL & RELEASE",
    subtitle: "ÉVALUATION DU SHRINKAGE & ÉLASTICITÉ",
    instruction: "Sélectionnez une mèche et étirez-la doucement pour mesurer son élasticité.",
    duration: 7,
    indicator: "elasticite",
  },
  {
    id: 3,
    title: "GESTE 3/3 · ZOOM CUIR CHEVELU",
    subtitle: "DÉTECTION SÉCHERESSE · IRRITATION",
    instruction: "Écartez les cheveux, puis montrez le sommet en exposant les racines.",
    duration: 7,
    indicator: "cuir",
  },
];

const INDICATOR_LABELS: Record<string, string[]> = {
  volume: ["CHEVEUX", "POSITION", "LUMINOSITÉ"],
  elasticite: ["CHEVEUX", "POSITION", "LUMINOSITÉ"],
  cuir: ["CHEVEUX", "POSITION", "LUMINOSITÉ"],
};

const INDICATOR_STATES: Record<string, ("green" | "orange" | "red")[]> = {
  volume: ["green", "orange", "green"],
  elasticite: ["green", "green", "orange"],
  cuir: ["green", "red", "green"],
};

function IndicatorBar({ label, state }: { label: string; state: "green" | "orange" | "red" }) {
  const colors = { green: "#4CAF50", orange: "#FF9800", red: "#F44336" };
  return (
    <div className="flex-1 flex flex-col gap-1">
      <div className="h-1.5 rounded-full" style={{ background: colors[state], opacity: 0.8 }} />
      <span className="text-[8px] tracking-widest uppercase font-semibold text-center"
        style={{ color: "rgba(255,255,255,0.6)" }}>
        {label}
      </span>
    </div>
  );
}

function FrameCorners({ color = "rgba(255,255,255,0.6)" }: { color?: string }) {
  const corners = [
    { top: "16px", left: "16px", borderTop: `2px solid ${color}`, borderLeft: `2px solid ${color}`, width: "28px", height: "28px" },
    { top: "16px", right: "16px", borderTop: `2px solid ${color}`, borderRight: `2px solid ${color}`, width: "28px", height: "28px" },
    { bottom: "16px", left: "16px", borderBottom: `2px solid ${color}`, borderLeft: `2px solid ${color}`, width: "28px", height: "28px" },
    { bottom: "16px", right: "16px", borderBottom: `2px solid ${color}`, borderRight: `2px solid ${color}`, width: "28px", height: "28px" },
  ];
  return (
    <>
      {corners.map((style, i) => (
        <div key={i} className="absolute" style={{ ...style, borderRadius: "2px" }} />
      ))}
    </>
  );
}

export default function ScanPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [recording, setRecording] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [done, setDone] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [started, setStarted] = useState(false);

  const attachStreamToVideo = useCallback(async () => {
    const video = videoRef.current;
    const stream = streamRef.current;
    if (!video || !stream) return;

    if (video.srcObject !== stream) {
      video.srcObject = stream;
    }

    try {
      await video.play();
    } catch {
      // Browsers can transiently reject play() while the element is mounting.
    }
  }, []);

  const step = STEPS[stepIndex];
  const indicators = INDICATOR_LABELS[step.indicator];
  const states = INDICATOR_STATES[step.indicator];

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      setStarted(true);
    } catch {
      setCameraError(true);
    }
  }, []);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  useEffect(() => {
    return () => stopCamera();
  }, [stopCamera]);

  useEffect(() => {
    if (!started) return;
    attachStreamToVideo();
  }, [started, attachStreamToVideo]);

  const startRecording = useCallback(() => {
    setRecording(true);
    setCountdown(step.duration);

    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(interval);
          setRecording(false);
          if (stepIndex < STEPS.length - 1) {
            setStepIndex((i) => i + 1);
          } else {
            setDone(true);
            stopCamera();
          }
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  }, [step.duration, stepIndex, stopCamera]);

  if (done) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ background: "var(--dark-bg)" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center">
          <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{ background: "rgba(76,175,80,0.15)", border: "1px solid rgba(76,175,80,0.35)" }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M6 16L12 22L26 8" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2" style={{ color: "var(--dark-text)" }}>
            Scan terminé
          </h2>
          <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
            Les 3 gestes ont été capturés avec succès
          </p>
          <button
            onClick={() => router.push("/diagnostic/resultats")}
            className="cta-primary w-full max-w-xs py-3.5 rounded-2xl text-white font-bold">
            Voir mon analyse complète
          </button>
        </motion.div>
      </div>
    );
  }

  if (cameraError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ background: "var(--dark-bg)" }}>
        <div className="text-center">
          <p className="text-lg font-bold mb-2" style={{ color: "var(--dark-text)" }}>
            Caméra inaccessible
          </p>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>
            Autorise l'accès à la caméra dans les paramètres de ton navigateur.
          </p>
          <button onClick={() => router.back()}
            className="cta-dark px-6 py-3 rounded-xl text-sm font-medium text-white">
            Retour
          </button>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "#000" }}>
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="text-center mb-8">
            <p className="text-xs tracking-[0.3em] uppercase mb-3"
              style={{ color: "rgba(255,255,255,0.4)" }}>
              SHEMA · SCAN CAPILLAIRE
            </p>
            <h1 className="text-2xl font-bold mb-3" style={{ color: "white" }}>
              Diagnostic vidéo
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
              3 gestes guidés · 21 secondes · Analyse visuelle de ta fibre capillaire
            </p>
          </div>
          <div className="w-full max-w-xs flex flex-col gap-3 mb-8">
            {STEPS.map((s) => (
              <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: "rgba(200,137,90,0.2)", color: "#C8895A" }}>
                  {s.id}
                </div>
                <div>
                  <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>
                    {s.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={startCamera}
            className="cta-primary w-full max-w-xs py-4 rounded-2xl text-white font-bold text-base mb-4">
            Autoriser la caméra
          </button>
          <button onClick={() => router.back()}
            className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
            Passer cette étape
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: "#000" }}>
      {/* ── Camera feed ── */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: "scaleX(-1)" }}
      />

      {/* ── Dark overlay ── */}
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.25)" }} />

      {/* ── Top indicators (VARL style) ── */}
      <div className="absolute top-0 left-0 right-0 px-4 pt-safe-top"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)" }}>
        <div className="pt-4 pb-2">
          {/* Title */}
          <div className="text-center mb-3">
            <p className="text-xs font-bold tracking-[0.2em] uppercase"
              style={{ color: "rgba(255,255,255,0.9)" }}>
              {step.title}
            </p>
            <p className="text-[10px] tracking-[0.15em] uppercase mt-0.5"
              style={{ color: "rgba(255,255,255,0.5)" }}>
              {step.subtitle}
            </p>
          </div>
          {/* Segment indicators */}
          <div className="flex gap-2">
            {indicators.map((label, i) => (
              <IndicatorBar key={label} label={label} state={states[i]} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Frame corners ── */}
      <FrameCorners color="rgba(200,137,90,0.7)" />

      {/* ── Instruction bubble ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute bottom-28 left-4 right-4">
          <div className="inline-block max-w-xs px-4 py-2.5 rounded-2xl text-sm font-medium"
            style={{
              background: "rgba(100,80,200,0.85)",
              backdropFilter: "blur(10px)",
              color: "white",
            }}>
            {step.instruction}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Bottom CTA ── */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-safe-bottom"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)", paddingBottom: "24px" }}>
        <button
          onClick={startRecording}
          disabled={recording}
          className="w-full py-4 rounded-2xl text-base font-bold"
          style={{
            background: recording ? "#1A1A1A" : "white",
            color: recording ? "rgba(255,255,255,0.8)" : "#0A0A0A",
          }}>
          {recording ? `Arrêter · ${countdown}s / ${step.duration}s` : "Commencer"}
        </button>
      </div>

      {/* ── Step dots ── */}
      <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-2">
        {STEPS.map((s) => (
          <div key={s.id}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{
              background: s.id <= stepIndex + 1 ? "white" : "rgba(255,255,255,0.25)",
              width: s.id === stepIndex + 1 ? "20px" : "6px",
            }}
          />
        ))}
      </div>
    </div>
  );
}
