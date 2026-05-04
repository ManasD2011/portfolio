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
    <section id="about" className="py-16 md:py-32 px-4 md:px-6" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="fade-up mb-14">
          <p className="section-label">01 ABOUT</p>
          <h2
            className="text-3xl md:text-5xl font-extrabold leading-tight tracking-[-0.03em]"
            style={{ fontFamily: "'Space Grotesk', 'Syne', sans-serif", color: "#eeeeff" }}
          >
            Who I Am
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Text */}
          <div
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", color: "#9898be" }}
            className="fade-up space-y-4 leading-[1.9] md:text-[13px]"
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
          <div className="fade-up flex flex-wrap gap-2 md:gap-3 pt-2">
            {traits.map(({ icon: Icon, label, desc, color }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 font-mono text-[11px] md:text-[12px] px-3 py-1.5 rounded-full border"
                style={{
                  color: color,
                  borderColor: color + "40",
                  background: color + "0e",
                }}
              >
                <Icon size={12} style={{ color }} />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
