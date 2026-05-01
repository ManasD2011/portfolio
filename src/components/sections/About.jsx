import { useEffect, useRef } from "react";
import { Code2, Brain, Layers, Zap } from "lucide-react";




const traits = [
  { icon: Brain, label: "Deep Learning", desc: "TensorFlow · Keras · PyTorch", color: "#00e5a0" },
  { icon: Code2, label: "Full-Stack AI", desc: "FastAPI · Next.js · React", color: "#00c9e0" },
  { icon: Layers, label: "Computer Vision", desc: "YOLOv8 · OpenCV · U-Net", color: "#a78bfa" },
  { icon: Zap, label: "NLP & RAG", desc: "FAISS · Gemini · LangChain", color: "#f6c90e" },
];

export default function About() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle("visible", e.isIntersecting)),
      { threshold: 0.15 }
    );
    ref.current?.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-28 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="fade-up mb-14">
          <p className="section-label">01 ABOUT</p>
          <h2
            className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-[-0.03em]"
            style={{ fontFamily: "'Space Grotesk', 'Syne', sans-serif", color: "#eeeeff" }}
          >
            Who I Am
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Text */}
          <div
            className="fade-up space-y-4 leading-[1.9]"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "15px", color: "#9898be" }}
          >
            <p>
              Third-year B.E. student at{" "}
              <span style={{ color: "#eeeeff", fontWeight: 600 }}>VIT, Mumbai</span> — building
              at the intersection of{" "}
              <span style={{ color: "#00e5a0" }}>machine learning</span>,{" "}
              <span style={{ color: "#00c9e0" }}>computer vision</span>, and{" "}
              <span style={{ color: "#a78bfa" }}>full-stack engineering</span>.
            </p>
            <p>
              I focus on systems that are actually deployable — a YOLOv8 surveillance
              pipeline with 6 live services, a U-Net brain tumor segmentation model on
              BraTS 2021, and a RAG prompt evaluator backed by FAISS + Gemini.
            </p>
            <p>
              Open to <span style={{ color: "#eeeeff", fontWeight: 500 }}>AI/ML roles and research opportunities</span> —
              internships, full-time, or collaborations in computer vision, deep learning, or applied AI.
            </p>

          </div>

          {/* Right: Trait cards */}
          <div className="fade-up grid grid-cols-1 gap-3">
            {traits.map(({ icon: Icon, label, desc, color }) => (
              <div
                key={label}
                className="flex items-start gap-4 rounded-xl p-5 transition-all duration-200"
                style={{ background: "#0d0d1e", border: "1px solid #1e1e3a" }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = color + "44"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "#1e1e3a"}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: color + "12", border: `1px solid ${color}28` }}
                >
                  <Icon size={16} style={{ color }} />
                </div>
                <div>
                  <div
                    className="font-mono text-xs font-medium mb-0.5"
                    style={{ color: "#d0d0ee" }}
                  >
                    {label}
                  </div>
                  <div className="font-mono text-[11px]" style={{ color: "#6060a0" }}>
                    {desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
