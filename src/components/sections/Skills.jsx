import { useEffect, useRef } from "react";

// icon: simple-icons slug → rendered as <img src="https://cdn.simpleicons.org/{slug}/{hex}">
// icon: null → falls back to abbr text
const TECHS = [
  { label: "Python",      icon: "python",        color: "#3b8eda", r: 36, bx: 8,  by: 14 },
  { label: "OpenCV",      icon: "opencv",        color: "#00e5a0", r: 36, bx: 48, by: 11 },
  { label: "Gemini",      icon: "googlegemini",  color: "#4285f4", r: 36, bx: 87, by: 17 },
  { label: "FastAPI",     icon: "fastapi",       color: "#009688", r: 36, bx: 24, by: 73 },
  { label: "PyTorch",     icon: "pytorch",       color: "#ee4c2c", r: 36, bx: 68, by: 70 },
  { label: "TensorFlow",  icon: "tensorflow",    color: "#ff6f00", r: 28, bx: 20, by: 40 },
  { label: "YOLOv8",      icon: null,            abbr: "YOLO",    color: "#00c9e0", r: 28, bx: 60, by: 28 },
  { label: "FAISS",       icon: null,            abbr: "FAIS",    color: "#60a5fa", r: 28, bx: 78, by: 48 },
  { label: "LangChain",   icon: "langchain",     color: "#7ecc5e", r: 28, bx: 55, by: 60 },
  { label: "HuggingFace", icon: "huggingface",   color: "#ffd21e", r: 28, bx: 91, by: 63 },
  { label: "Next.js",     icon: "nextdotjs",     color: "#ccccee", r: 28, bx: 40, by: 47 },
  { label: "U-Net",       icon: null,            abbr: "UN",      color: "#a78bfa", r: 28, bx: 33, by: 24 },
  { label: "Scikit",      icon: "scikitlearn",   color: "#f89939", r: 28, bx: 7,  by: 54 },
  { label: "NumPy",       icon: "numpy",         color: "#4dabcf", r: 28, bx: 82, by: 82 },
  { label: "Docker",      icon: "docker",        color: "#2496ed", r: 28, bx: 14, by: 62 },
  { label: "Git",         icon: "git",           color: "#f05033", r: 28, bx: 72, by: 20 },
  { label: "Flask",       icon: "flask",         color: "#aaaaaa", r: 20, bx: 5,  by: 85 },
  { label: "MongoDB",     icon: "mongodb",       color: "#47a248", r: 20, bx: 44, by: 85 },
  { label: "TypeScript",  icon: "typescript",    color: "#3178c6", r: 20, bx: 94, by: 37 },
  { label: "Linux",       icon: "linux",         color: "#fcc624", r: 20, bx: 93, by: 80 },
  { label: "Jupyter",     icon: "jupyter",       color: "#f37726", r: 20, bx: 62, by: 85 },
  { label: "LaTeX",       icon: "latex",         color: "#008b8b", r: 20, bx: 32, by: 88 },
  { label: "Tailwind",    icon: "tailwindcss",   color: "#38bdf8", r: 20, bx: 75, by: 88 },
];


export default function Skills() {
  const sectionRef  = useRef(null);
  const containerRef = useRef(null);
  const badgeRefs   = useRef([]);
  // Physics state per badge
  const state = useRef(
    TECHS.map(() => ({ x: 0, y: 0, vx: 0, vy: 0, dragging: false, dox: 0, doy: 0 }))
  );
  const cursor = useRef({ x: -999, y: -999 });
  const drag   = useRef(-1); // index of badge being dragged
  // Unique sinusoidal params per badge
  const sineP = useRef(
    TECHS.map(() => ({
      fx: 0.0003 + Math.random() * 0.0002,
      fy: 0.00025 + Math.random() * 0.00018,
      px: Math.random() * Math.PI * 2,
      py: Math.random() * Math.PI * 2,
      ax: 32 + Math.random() * 24,
      ay: 26 + Math.random() * 20,
    }))
  );

  useEffect(() => {
    // Fade-up for the whole section block
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle("visible", e.isIntersecting)),
      { threshold: 0.08 }
    );
    sectionRef.current?.querySelectorAll(".fade-up").forEach((el) => obs.observe(el));

    const container = containerRef.current;

    // Init positions to home with a random velocity kick so they start moving
    const setHome = () => {
      const { width: W, height: H } = container.getBoundingClientRect();
      TECHS.forEach((t, i) => {
        state.current[i].x  = (t.bx / 100) * W;
        state.current[i].y  = (t.by / 100) * H;
        state.current[i].vx = (Math.random() - 0.5) * 4;
        state.current[i].vy = (Math.random() - 0.5) * 4;
      });
    };
    setHome();
    window.addEventListener("resize", setHome);

    // Mouse tracking (relative to container)
    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      cursor.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    document.addEventListener("mousemove", onMove);

    // Drag release
    const onUp = () => { drag.current = -1; };
    document.addEventListener("mouseup", onUp);

    // RAF physics loop
    let raf;
    const tick = (ts) => {
      const { width: W, height: H } = container.getBoundingClientRect();
      const cx = cursor.current.x;
      const cy = cursor.current.y;

      TECHS.forEach((tech, i) => {
        const s  = state.current[i];
        const sp = sineP.current[i];
        const el = badgeRefs.current[i];
        if (!el) return;

        if (drag.current === i) {
          // Follow cursor with spring
          const tx = cx + s.dox;
          const ty = cy + s.doy;
          s.vx += (tx - s.x) * 0.3;
          s.vy += (ty - s.y) * 0.3;
        } else {
          // Target = home + idle sine
          const homeX = (tech.bx / 100) * W;
          const homeY = (tech.by / 100) * H;
          const tx = homeX + Math.sin(ts * sp.fx + sp.px) * sp.ax;
          const ty = homeY + Math.sin(ts * sp.fy + sp.py) * sp.ay;

          // Spring toward animated target — soft spring so it overshoots visibly
          s.vx += (tx - s.x) * 0.015;
          s.vy += (ty - s.y) * 0.015;

          // Cursor repulsion
          const dx = cx - s.x;
          const dy = cy - s.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < 150) {
            const f = ((150 - dist) / 150) ** 2 * 8;
            s.vx -= (dx / dist) * f;
            s.vy -= (dy / dist) * f;
          }
        }

        s.vx *= 0.94;
        s.vy *= 0.94;
        s.x  += s.vx;
        s.y  += s.vy;

        el.style.left = `${s.x}px`;
        el.style.top  = `${s.y}px`;
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      window.removeEventListener("resize", setHome);
    };
  }, []);

  const startDrag = (e, i) => {
    e.preventDefault();
    const s = state.current[i];
    s.dox = s.x - cursor.current.x;
    s.doy = s.y - cursor.current.y;
    drag.current = i;
  };

  return (
    <section id="skills" className="py-28 px-6" ref={sectionRef}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="fade-up mb-8 text-center">
          <p className="section-label justify-center mb-3">03 SKILLS</p>
          <h2
            className="text-4xl lg:text-5xl font-extrabold tracking-[-0.03em]"
            style={{ fontFamily: "'Space Grotesk','Syne',sans-serif", color: "#eeeeff" }}
          >
            Tech Stack
          </h2>
        </div>

        {/* Floating field */}
        <div
          ref={containerRef}
          className="fade-up relative w-full rounded-2xl overflow-hidden select-none"
          style={{ height: 500, border: "1px solid #1e1e3a", background: "#08081a" }}
        >
          {/* Dotted grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 30% 40%, rgba(0,229,160,0.04) 0%, transparent 70%)" }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 40% at 75% 65%, rgba(66,133,244,0.05) 0%, transparent 70%)" }} />

          {/* Badges — positioned via JS, transform only centers them */}
          {TECHS.map((tech, i) => (
            <div
              key={tech.label}
              ref={(el) => (badgeRefs.current[i] = el)}
              onMouseDown={(e) => startDrag(e, i)}
              className="absolute flex flex-col items-center gap-1"
              style={{
                transform: "translate(-50%, -50%)",
                cursor: "grab",
                userSelect: "none",
              }}
            >
              {/* Circle */}
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width:  tech.r * 2,
                  height: tech.r * 2,
                  background: `${tech.color}0e`,
                  border: `1.5px solid ${tech.color}40`,
                  transition: "box-shadow 0.25s ease, border-color 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 20px ${tech.color}45`;
                  e.currentTarget.style.borderColor = `${tech.color}95`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = `${tech.color}40`;
                }}
              >
                {tech.icon ? (
                  <img
                    src={`https://cdn.simpleicons.org/${tech.icon}/${tech.color.replace("#", "")}`}
                    alt={tech.label}
                    draggable={false}
                    style={{ width: tech.r * 0.9, height: tech.r * 0.9, objectFit: "contain" }}
                  />
                ) : (
                  <span
                    className="font-mono font-bold"
                    style={{ fontSize: Math.max(9, tech.r * 0.44), color: tech.color, letterSpacing: "0.05em" }}
                  >
                    {tech.abbr}
                  </span>
                )}
              </div>
              {/* Always-visible label */}
              <span
                className="font-mono whitespace-nowrap"
                style={{ fontSize: 9, color: tech.color + "bb", letterSpacing: "0.06em" }}
              >
                {tech.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
