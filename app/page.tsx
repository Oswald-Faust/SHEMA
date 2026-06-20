"use client";

import Link from "next/link";
import { motion } from "framer-motion";

// ─── Hair porosity illustration ────────────────────────────────────────────────

function PorosityIllustration() {
  const coord = (value: number) => Number(value.toFixed(3));

  return (
    <svg width="280" height="280" viewBox="0 0 280 280" fill="none" className="w-full max-w-xs mx-auto">
      {/* Outer decorative ring */}
      <circle cx="140" cy="140" r="130" stroke="var(--accent)" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="6 4"/>
      <circle cx="140" cy="140" r="118" stroke="var(--accent)" strokeOpacity="0.08" strokeWidth="0.5"/>

      {/* Background circle */}
      <circle cx="140" cy="140" r="105" fill="var(--surface-2)"/>
      <circle cx="140" cy="140" r="105" stroke="var(--border-2)" strokeWidth="1"/>

      {/* === HAUTE POROSITÉ (left) === */}
      <g transform="translate(62, 88)">
        {/* Label */}
        <text x="26" y="-12" textAnchor="middle" fontSize="7" fill="var(--accent)" fontFamily="var(--font-inter)" fontWeight="600" letterSpacing="0.1em">ÉLEVÉE</text>
        {/* Cross-section of high porosity fiber - rough, open cuticles */}
        <circle cx="26" cy="26" r="22" fill="var(--accent)" fillOpacity="0.08"/>
        <circle cx="26" cy="26" r="15" fill="var(--accent)" fillOpacity="0.2"/>
        <circle cx="26" cy="26" r="10" fill="var(--accent)" fillOpacity="0.35"/>
        {/* Spiky raised cuticles */}
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => {
          const a = (deg * Math.PI) / 180;
          const x1 = coord(26 + 15 * Math.cos(a));
          const y1 = coord(26 + 15 * Math.sin(a));
          const x2 = coord(26 + 21 * Math.cos(a + 0.12));
          const y2 = coord(26 + 21 * Math.sin(a + 0.12));
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7"/>;
        })}
        {/* Hair strand vertical */}
        <path d="M26 48 Q23 62 26 80 Q29 94 26 105" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" fill="none" strokeOpacity="0.5"/>
        <path d="M26 48 Q29 62 26 80 Q23 94 26 105" stroke="var(--accent)" strokeWidth="1" strokeLinecap="round" fill="none" strokeOpacity="0.2"/>
        {/* Frizz lines */}
        {[58,64,72,82,90,98].map((y, i) => (
          <line key={i} x1={26 + (i%2===0?-6:6)} y1={y} x2={26 + (i%2===0?-12:12)} y2={y - 2} stroke="var(--accent)" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.35"/>
        ))}
      </g>

      {/* === FAIBLE POROSITÉ (right) === */}
      <g transform="translate(168, 88)">
        <text x="26" y="-12" textAnchor="middle" fontSize="7" fill="#5A9EC8" fontFamily="var(--font-inter)" fontWeight="600" letterSpacing="0.1em">FAIBLE</text>
        {/* Smooth, tight cuticles */}
        <circle cx="26" cy="26" r="22" fill="#5A9EC8" fillOpacity="0.08"/>
        <circle cx="26" cy="26" r="17" fill="#5A9EC8" fillOpacity="0.15"/>
        <circle cx="26" cy="26" r="12" fill="#5A9EC8" fillOpacity="0.28"/>
        {/* Smooth rings */}
        <circle cx="26" cy="26" r="20" stroke="#5A9EC8" strokeWidth="0.8" strokeOpacity="0.3" fill="none"/>
        <circle cx="26" cy="26" r="15" stroke="#5A9EC8" strokeWidth="0.8" strokeOpacity="0.4" fill="none"/>
        {/* Smooth hair strand */}
        <path d="M26 48 L26 105" stroke="#5A9EC8" strokeWidth="2.5" strokeLinecap="round" fill="none" strokeOpacity="0.55"/>
        <path d="M23 48 L23 105" stroke="#5A9EC8" strokeWidth="0.8" strokeLinecap="round" fill="none" strokeOpacity="0.18"/>
        <path d="M29 48 L29 105" stroke="#5A9EC8" strokeWidth="0.8" strokeLinecap="round" fill="none" strokeOpacity="0.18"/>
        {/* Shine dots */}
        {[56,68,80,94].map((y, i) => (
          <circle key={i} cx={22} cy={y} r="1.5" fill="white" fillOpacity="0.4"/>
        ))}
      </g>

      {/* === CENTER — MIXTE === */}
      <g transform="translate(114, 148)">
        <text x="26" y="-8" textAnchor="middle" fontSize="7" fill="var(--txt-muted)" fontFamily="var(--font-inter)" fontWeight="600" letterSpacing="0.08em">MIXTE</text>
        {/* Semi-rough cuticles */}
        <circle cx="26" cy="20" r="16" fill="var(--txt-muted)" fillOpacity="0.1"/>
        <circle cx="26" cy="20" r="11" fill="var(--txt-muted)" fillOpacity="0.18"/>
        <circle cx="26" cy="20" r="7" fill="var(--txt-muted)" fillOpacity="0.25"/>
        {[0,60,120,180,240,300].map((deg, i) => {
          const a = (deg * Math.PI) / 180;
          const x1 = coord(26 + 11 * Math.cos(a));
          const y1 = coord(20 + 11 * Math.sin(a));
          const x2 = coord(26 + 15 * Math.cos(a + 0.1));
          const y2 = coord(20 + 15 * Math.sin(a + 0.1));
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--txt-muted)" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.5"/>;
        })}
      </g>

      {/* Center label */}
      <text x="140" y="140" textAnchor="middle" fontSize="11" fill="var(--txt-muted)" fillOpacity="0.4" fontFamily="var(--font-inter)" fontWeight="500" letterSpacing="0.15em">POROSITÉ</text>
    </svg>
  );
}

// ─── Profile card ──────────────────────────────────────────────────────────────

function ProfileCard({
  type,
  title,
  sub,
  desc,
  accent,
  accentRgb,
  delay,
}: {
  type: string;
  title: string;
  sub: string;
  desc: string;
  accent: string;
  accentRgb: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="surface-card rounded-2xl p-5 flex gap-4 items-start"
    >
      <div
        className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-sm font-bold"
        style={{
          background: `rgba(${accentRgb}, 0.12)`,
          border: `1px solid rgba(${accentRgb}, 0.2)`,
          color: accent,
        }}
      >
        {type}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm mb-0.5" style={{ color: "var(--txt-primary)" }}>
          {title}
          {sub && (
            <span className="ml-1.5 text-xs font-normal" style={{ color: "var(--txt-muted)" }}>
              {sub}
            </span>
          )}
        </p>
        <p className="text-xs leading-relaxed" style={{ color: "var(--txt-muted)" }}>
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Step card ─────────────────────────────────────────────────────────────────

function StepCard({
  n,
  title,
  desc,
  delay,
}: {
  n: string;
  title: string;
  desc: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
      className="flex items-start gap-3.5"
    >
      <div
        className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
        style={{
          background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
          color: "white",
        }}
      >
        {n}
      </div>
      <div className="pt-0.5">
        <p className="font-semibold text-sm mb-0.5" style={{ color: "var(--txt-primary)" }}>{title}</p>
        <p className="text-xs leading-relaxed" style={{ color: "var(--txt-muted)" }}>{desc}</p>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main className="flex flex-col" style={{ background: "var(--bg)" }}>

      {/* ════ HERO ════════════════════════════════════════════════════════════ */}
      <section className="relative px-4 pt-8 pb-12 overflow-hidden">

        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute rounded-full"
            style={{
              width: "60vw", height: "60vw",
              maxWidth: 420, maxHeight: 420,
              top: "-10%", right: "-15%",
              background: "radial-gradient(circle, rgba(var(--accent-rgb), 0.12) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: "40vw", height: "40vw",
              maxWidth: 280, maxHeight: 280,
              bottom: "5%", left: "-10%",
              background: "radial-gradient(circle, rgba(90,158,200,0.08) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="max-w-lg mx-auto relative">

          {/* Kicker */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-5"
            style={{ color: "var(--accent)" }}
          >
            Diagnostic IA · Gratuit
          </motion.p>

          {/* Display headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mb-5 leading-[1.08]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(44px, 13vw, 68px)",
              fontWeight: 600,
              color: "var(--txt-primary)",
            }}
          >
            Découvre
            <br />
            ta porosité
            <br />
            <em className="gradient-text not-italic">capillaire.</em>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="text-base leading-relaxed mb-8"
            style={{ color: "var(--txt-secondary)" }}
          >
            8 questions. Un algorithme adaptatif. Des produits
            et un accompagnement faits exactement pour toi.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="flex flex-col gap-3 mb-10"
          >
            <Link href="/diagnostic">
              <button
                className="btn-glow w-full py-4 rounded-2xl text-white font-semibold text-base"
                style={{
                  background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%)",
                  boxShadow: "0 8px 32px rgba(var(--accent-rgb), 0.3)",
                }}
              >
                Commencer le diagnostic
              </button>
            </Link>
            <Link href="#comment">
              <button
                className="w-full py-3.5 rounded-2xl text-sm font-medium"
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  color: "var(--txt-secondary)",
                }}
              >
                Comment ça marche ?
              </button>
            </Link>
          </motion.div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <PorosityIllustration />
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="grid grid-cols-3 gap-4 mt-8 pt-8"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            {[
              { v: "100%", l: "Gratuit" },
              { v: "5 min", l: "Résultat" },
              { v: "3", l: "Profils IA" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <p
                  className="text-2xl font-bold gradient-text"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {s.v}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--txt-muted)" }}>
                  {s.l}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════ HOW IT WORKS ════════════════════════════════════════════════════ */}
      <section
        id="comment"
        className="px-4 py-12"
        style={{ background: "var(--surface-2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
      >
        <div className="max-w-lg mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-2"
            style={{ color: "var(--accent)" }}
          >
            Comment ça marche
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mb-8"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 8vw, 38px)",
              fontWeight: 600,
              color: "var(--txt-primary)",
              lineHeight: 1.15,
            }}
          >
            Simple, précis,<br />
            <em className="not-italic" style={{ color: "var(--accent)" }}>adaptatif.</em>
          </motion.h2>

          <div className="flex flex-col gap-7">
            <StepCard
              n="1"
              title="Réponds à 8 questions"
              desc="Questions ciblées sur le comportement réel de tes cheveux — eau, séchage, hydratation, humidité."
              delay={0.1}
            />
            <div className="ml-4 w-px h-6" style={{ background: "var(--border-2)" }} />
            <StepCard
              n="2"
              title="L'algorithme analyse ton profil"
              desc="Scoring pondéré sur 6 variables capillaires. Si tes réponses sont contradictoires, des questions d'affinage se déclenchent automatiquement."
              delay={0.2}
            />
            <div className="ml-4 w-px h-6" style={{ background: "var(--border-2)" }} />
            <StepCard
              n="3"
              title="Résultat + plan d'action"
              desc="Ton profil de porosité, les produits adaptés, et un accompagnement (coaching, suivi, challenges) selon tes besoins."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ════ PROFILES ════════════════════════════════════════════════════════ */}
      <section className="px-4 py-12">
        <div className="max-w-lg mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-2"
            style={{ color: "var(--accent)" }}
          >
            3 profils
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mb-8"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 8vw, 38px)",
              fontWeight: 600,
              color: "var(--txt-primary)",
              lineHeight: 1.15,
            }}
          >
            Lequel<br />
            est le tien ?
          </motion.h2>

          <div className="flex flex-col gap-3 mb-8">
            <ProfileCard
              type="①"
              title="Porosité Élevée"
              sub=""
              desc="Cuticules ouvertes — tes cheveux absorbent vite mais perdent l'hydratation tout aussi vite. Souvent secs, cassants, ternes."
              accent="#C8895A"
              accentRgb="200, 137, 90"
              delay={0.05}
            />
            <ProfileCard
              type="②"
              title="Profil Mixte"
              sub="tendance variable"
              desc="Caractéristiques des deux types. Courant lors d'une transition capillaire ou si la porosité varie selon les zones."
              accent="#9C7D60"
              accentRgb="156, 125, 96"
              delay={0.12}
            />
            <ProfileCard
              type="③"
              title="Porosité Faible"
              sub=""
              desc="Cuticules serrées — tes cheveux résistent à l'absorption. Résidus, manque d'éclat, mais grande capacité de rétention."
              accent="#5A9EC8"
              accentRgb="90, 158, 200"
              delay={0.2}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <Link href="/diagnostic">
              <button
                className="w-full py-4 rounded-2xl font-semibold text-base"
                style={{
                  background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%)",
                  color: "white",
                  boxShadow: "0 10px 28px rgba(var(--accent-rgb), 0.22)",
                  border: "1px solid rgba(var(--accent-rgb), 0.28)",
                }}
              >
                Identifier mon profil →
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ════ FOOTER STRIP ════════════════════════════════════════════════════ */}
      <footer
        className="px-4 py-8 text-center"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <p
          className="text-xs mb-1"
          style={{ fontFamily: "var(--font-display)", fontSize: "22px", color: "var(--txt-primary)", fontStyle: "italic" }}
        >
          Shema
        </p>
        <p className="text-xs" style={{ color: "var(--txt-muted)" }}>
          hellotribe@shematribe.com
        </p>
      </footer>

    </main>
  );
}
