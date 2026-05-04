import { useEffect, useState } from "react";
import { GitFork, Link2, ArrowDown } from "lucide-react";

/* ── Terminal data ──────────────────────────────── */
const termLines = [
  { type: "prompt", text: "cat profile.json" },
  { type: "json",   key: "name",     val: '"Manas Deshpande"' },
  { type: "json",   key: "role",     val: '"AI/ML Engineer"' },
  { type: "json",   key: "location", val: '"Mumbai, India"' },
  { type: "json",   key: "focus",    val: '["Computer Vision", "NLP", "Deep Learning"]' },
];

/* ── Cycling roles ──────────────────────────────── */
const ROLES = [
  "AI / ML Engineer",
  "Computer Vision Dev",
  "Deep Learning Builder",
  "LLM Systems Designer",
];

/* ── Terminal line renderer ─────────────────────── */
function TerminalLine({ line, visible }) {
  if (!visible) return null;
  if (line.type === "prompt") return (
    <div className="flex items-center gap-2">
      <span style={{ color: "#00e5a0" }}>❯</span>
      <span className="text-[#d4d4f0]">{line.text}</span>
    </div>
  );
  return (
    <div className="pl-2">
      <span className="text-[#555575]">  &quot;</span>
      <span style={{ color: "#b794f4" }}>{line.key}</span>
      <span className="text-[#555575]">&quot;: </span>
      <span style={{ color: "#f6c90e" }}>{line.val}</span>
      {line.key !== "focus" && <span className="text-[#555575]">,</span>}
    </div>
  );
}

/* ── Component ──────────────────────────────────── */
export default function Hero() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [roleIdx,  setRoleIdx]  = useState(0);
  const [roleFade, setRoleFade] = useState(true);
  const [nameIn,   setNameIn]   = useState(false);
  const [lastName,  setLastName] = useState(false);

  /* Terminal type-in */
  useEffect(() => {
    if (visibleLines < termLines.length) {
      const t = setTimeout(() => setVisibleLines(v => v + 1), visibleLines === 0 ? 500 : 300);
      return () => clearTimeout(t);
    }
  }, [visibleLines]);

  /* Name bounce-in — first word then last word */
  useEffect(() => {
    const t1 = setTimeout(() => setNameIn(true),   80);
    const t2 = setTimeout(() => setLastName(true), 220);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  /* Role cycling */
  useEffect(() => {
    const cycle = setInterval(() => {
      setRoleFade(false);
      setTimeout(() => { setRoleIdx(i => (i + 1) % ROLES.length); setRoleFade(true); }, 300);
    }, 2800);
    return () => clearInterval(cycle);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center px-4 md:px-6 pt-24 md:pt-20 overflow-hidden">

      {/* Grid bg */}
      <div className="absolute inset-0 opacity-[0.07]" style={{
        backgroundImage: "linear-gradient(rgba(40,40,70,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(40,40,70,0.9) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse at 30% 50%, black 10%, transparent 55%)",
      }} />

      {/* Glow orbs */}
      <div className="absolute pointer-events-none" style={{ top:"38%", left:"18%", width:500, height:500, background:"radial-gradient(circle, rgba(0,229,160,0.12) 0%, transparent 70%)", transform:"translate(-50%,-50%)" }} />
      <div className="absolute pointer-events-none" style={{ top:"65%", left:"60%", width:280, height:280, background:"radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%)", transform:"translate(-50%,-50%)" }} />

      <div className="max-w-5xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        {/* ── Left ── */}
        <div className="flex flex-col min-w-0">

          {/* Shell path */}
          <p className="font-mono text-[10px] tracking-[0.28em] uppercase mb-6" style={{ color: "#363660" }}>
            ❯ manas@portfolio <span style={{ color: "#252545" }}>~</span>
          </p>

          {/* Name — whole-word bounce, gradient applied to parent span directly */}
          <h1
            className="font-extrabold tracking-[-0.05em] mb-6"
            style={{ fontFamily: "'Space Grotesk','Syne',sans-serif", fontSize: "clamp(2rem, 5.5vw, 4.2rem)", lineHeight: 0.92 }}
          >
            {/* First name — white */}
            <span
              style={{
                display: "block",
                color: "#eeeeff",
                opacity:   nameIn ? 1 : 0,
                transform: nameIn ? "translateY(0) scale(1)" : "translateY(-44px) scale(1.1)",
                transition: "opacity 0.4s ease, transform 0.65s cubic-bezier(0.22, 1.45, 0.36, 1)",
              }}
            >
              Manas
            </span>
            {/* Last name — gradient */}
            <span
              style={{
                display: "block",
                backgroundImage: "linear-gradient(135deg, #00e5a0 0%, #00c9e0 55%, #7b8cff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                paddingRight: "0.1em",
                opacity:   lastName ? 1 : 0,
                transform: lastName ? "translateY(0) scale(1)" : "translateY(-44px) scale(1.1)",
                transition: "opacity 0.4s ease 0.07s, transform 0.65s cubic-bezier(0.22, 1.45, 0.36, 1) 0.07s",
              }}
            >
              Deshpande
            </span>
          </h1>

          {/* Role pill + location */}
          <div className="flex items-center gap-3 mb-5">
            <span
              className="inline-flex items-center gap-2 font-mono text-[10.5px] tracking-[0.18em] uppercase px-3 py-1.5 rounded-full"
              style={{ color: "#00e5a0", background: "rgba(0,229,160,0.07)", border: "1px solid rgba(0,229,160,0.15)", minWidth: "210px" }}
            >
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse" style={{ background: "#00e5a0" }} />
              <span style={{ opacity: roleFade ? 1 : 0, transition: "opacity 0.28s ease", WebkitTextFillColor: "#00e5a0" }}>
                {ROLES[roleIdx]}
              </span>
            </span>
            <span className="font-mono text-[11px] tracking-[0.12em]" style={{ color: "#484878" }}>
              · Mumbai, India
            </span>
          </div>

          {/* Description */}
          <p className="leading-[1.85] mb-8 max-w-[400px]" style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "14.5px", color: "#8888b8" }}>
            Building AI systems that work in the real world — from surveillance
            intelligence to medical imaging to LLM evaluation pipelines.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <a
              href="#projects"
              id="hero-cta-projects"
              className="inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.14em] rounded-lg"
              style={{ padding: "12px 28px", background: "linear-gradient(135deg, #00e5a0, #00c9e0)", color: "#060614", WebkitTextFillColor: "#060614", transition: "box-shadow 0.25s ease, opacity 0.2s ease" }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 28px rgba(0,229,160,0.4)"; e.currentTarget.style.opacity = "0.88"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.opacity = "1"; }}
            >
              view_projects()
            </a>
            <a
              href="https://github.com/ManasD2011"
              target="_blank" rel="noreferrer"
              id="hero-cta-github"
              className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] rounded-lg"
              style={{ padding: "10px 18px", color: "#9090b8", border: "1px solid #252545", transition: "color 0.2s, border-color 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.color = "#00e5a0"; e.currentTarget.style.borderColor = "rgba(0,229,160,0.35)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#9090b8"; e.currentTarget.style.borderColor = "#252545"; }}
            >
              <GitFork size={13} /> GitHub
            </a>
            <a
              href="https://linkedin.com/in/manas-deshpande21"
              target="_blank" rel="noreferrer"
              id="hero-cta-linkedin"
              className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] rounded-lg"
              style={{ padding: "10px 18px", color: "#9090b8", border: "1px solid #252545", transition: "color 0.2s, border-color 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.color = "#00c9e0"; e.currentTarget.style.borderColor = "rgba(0,201,224,0.35)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#9090b8"; e.currentTarget.style.borderColor = "#252545"; }}
            >
              <Link2 size={13} /> LinkedIn
            </a>

          </div>
        </div>

        {/* ── Right: Terminal ── */}
        <div className="w-full">
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #1e1e3a", boxShadow: "0 0 0 1px rgba(0,229,160,0.04), 0 0 80px rgba(0,229,160,0.06), 0 32px 80px rgba(0,0,0,0.75)" }}>
            <div className="px-4 py-3 flex items-center gap-2" style={{ background: "#0c0c1e", borderBottom: "1px solid #1e1e3a" }}>
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="font-mono text-[11px] mx-auto tracking-widest" style={{ color: "#404065" }}>zsh — manas@portfolio</span>
            </div>
            <div className="px-5 py-5 md:px-7 md:py-7 font-mono text-[13px] leading-7 md:leading-9 min-h-[260px]" style={{ background: "#08081a" }}>
              {termLines.map((line, i) => <TerminalLine key={i} line={line} visible={i < visibleLines} />)}
              {visibleLines >= termLines.length && (
                <div className="flex items-center gap-2 mt-1">
                  <span style={{ color: "#00e5a0" }}>❯</span>
                  <span className="cursor-blink" style={{ color: "#d4d4f0" }} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <ArrowDown size={12} className="animate-bounce" style={{ color: "#252550" }} />
        <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, #252550, transparent)" }} />
      </div>
    </section>
  );
}
