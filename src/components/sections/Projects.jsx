import { useEffect, useRef } from "react";
import { GitFork, Eye, Activity, Brain, MessageSquareCode } from "lucide-react";

const projects = [
  {
    id: "01",
    icon: Eye,
    title: "Object Detection & Surveillance System",
    tagline: "Real-time multi-service CCTV intelligence pipeline",
    desc: "Built a production-ready surveillance system with six independent services: object detection, multi-object tracking, people counting, movement analysis, line-crossing detection, and live video streaming — all orchestrated through a Next.js dashboard.",
    tech: ["YOLOv8", "Next.js", "Python", "OpenCV", "WebSockets", "FastAPI"],
    github: "https://github.com/ManasD2011/Object-Detection-Project",
    featured: true,
    color: "#00e5a0",
  },
  {
    id: "02",
    icon: Brain,
    title: "Brain Tumor Segmentation",
    tagline: "Medical imaging · BraTS 2021 dataset",
    desc: "2D U-Net model (Keras) for brain tumor segmentation trained on BraTS 2021 MRI data. Preprocessing pipeline: greyscale conversion, 128×128 resize, z-score normalization on non-zero voxels. Served via FastAPI with base64-encoded 3-panel overlay output.",
    tech: ["U-Net", "Keras", "TensorFlow", "FastAPI", "BraTS 2021", "Python"],
    github: "https://github.com/ManasD2011/Brain_Tumour_Detection",
    featured: false,
    color: "#a78bfa",
  },
  {
    id: "03",
    icon: MessageSquareCode,
    title: "Prompt Evaluation RAG Model",
    tagline: "LLM prompt quality scoring system",
    desc: "RAG-based system that evaluates LLM prompt quality across six weighted criteria using FAISS vector store, all-MiniLM-L6-v2 embeddings (384-dim), and Gemini 1.5 Flash. Includes exponential backoff and file-based response caching for API rate limit handling.",
    tech: ["FAISS", "Gemini 1.5", "RAG", "Python", "all-MiniLM-L6-v2", "LangChain"],
    github: "https://github.com/ManasD2011/Prompt_Evaluation_Rag_Model",
    featured: false,
    color: "#60a5fa",
  },
];

export default function Projects() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle("visible", e.isIntersecting)),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="py-28 px-6 bg-[#0d0d1a]" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="fade-up mb-14">
          <p className="font-mono text-[11px] text-[#00ff88] tracking-[0.2em] mb-3 flex items-center gap-3">
            02 <span className="w-12 h-px bg-[#252540]" /> PROJECTS
          </p>
          <h2
            className="text-4xl lg:text-5xl font-extrabold text-[#e2e2f4] leading-tight tracking-[-0.03em]"
            style={{ fontFamily: "'Space Grotesk', 'Syne', sans-serif" }}
          >
            What I've Built
          </h2>
        </div>

        <div className="space-y-6">
          {projects.map((p, i) => {
            const Icon = p.icon;
            return (
              <a
                key={p.id}
                href={p.github}
                target="_blank"
                rel="noreferrer"
                className="fade-up group relative flex bg-[#0a0a1c] border rounded-2xl p-8 transition-all duration-300 overflow-hidden no-underline block"
                style={{
                  borderColor: "#1e1e3a",
                  transitionDelay: `${i * 80}ms`,
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = p.color + "55";
                  e.currentTarget.style.boxShadow = `0 0 40px ${p.color}0a`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#1e1e3a";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Featured top line */}
                {p.featured && (
                  <div
                    className="absolute top-0 left-0 w-full h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${p.color}, transparent)` }}
                  />
                )}

                {/* Corner number */}
                <span
                  className="absolute top-6 right-8 font-mono text-5xl font-bold opacity-[0.06] select-none"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: p.color }}
                >
                  {p.id}
                </span>

                <div className="flex items-start gap-6 w-full">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 mt-1"
                    style={{ background: `${p.color}12`, border: `1px solid ${p.color}28` }}
                  >
                    <Icon size={20} style={{ color: p.color }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3
                          className="text-[17px] font-bold leading-snug mb-1 tracking-[-0.02em]"
                          style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#eeeeff" }}
                        >
                          {p.title}
                        </h3>
                        <p className="font-mono text-[11px] tracking-wide" style={{ color: "#606090" }}>
                          {p.tagline}
                        </p>
                      </div>
                      {/* Source badge — decorative, card itself is the link */}
                      <span
                        className="flex-shrink-0 flex items-center gap-1.5 font-mono text-[10px] tracking-wider px-2.5 py-1.5 rounded-lg"
                        style={{ color: p.color, background: p.color + "10", border: `1px solid ${p.color}28` }}
                      >
                        <GitFork size={11} /> source
                      </span>
                    </div>

                    <p className="text-[14px] leading-[1.85] mb-5 max-w-2xl" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#9898be" }}>
                      {p.desc}
                    </p>

                    {/* Tech pills */}
                    <div className="flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] tracking-wider px-2.5 py-1 rounded-md border"
                          style={{
                            color: p.color,
                            borderColor: `${p.color}28`,
                            background: `${p.color}08`,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* More on GitHub */}
        <div className="fade-up mt-10 text-center">
          <a
            href="https://github.com/ManasD2011"
            target="_blank"
            rel="noreferrer"
            data-cursor="github"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest transition-colors"
            style={{ color: "#50508a" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#00e5a0"}
            onMouseLeave={(e) => e.currentTarget.style.color = "#50508a"}
          >
            <GitFork size={14} /> more on github →
          </a>
        </div>
      </div>
    </section>
  );
}
