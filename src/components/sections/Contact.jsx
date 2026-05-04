import { useEffect, useRef } from "react";
import { Mail, GitFork, Link2, MapPin, Send } from "lucide-react";

const links = [
  {
    icon: Mail,
    label: "Email",
    value: "manasdeshpande51@gmail.com",
    href: "mailto:manasdeshpadnde51@gmail.com",
    color: "#00ff88",
  },
  {
    icon: GitFork,
    label: "GitHub",
    value: "github.com/ManasD2011",
    href: "https://github.com/ManasD2011",
    color: "#a78bfa",
  },
  {
    icon: Link2,
    label: "LinkedIn",
    value: "linkedin.com/in/manas-deshpande21",
    href: "https://linkedin.com/in/manas-deshpande21",
    color: "#60a5fa",
  },
];

export default function Contact() {
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
    <section id="contact" className="py-16 md:py-32 px-4 md:px-6 bg-[#0b0b16]" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="fade-up mb-14">
          <p className="section-label">04 CONTACT</p>
          <h2
            className="text-3xl md:text-5xl font-extrabold leading-tight tracking-[-0.03em]"
            style={{ fontFamily: "'Space Grotesk', 'Syne', sans-serif", color: "#eeeeff" }}
          >
            Let's Connect
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div className="fade-up">
            <p className="leading-[1.9] mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "15px", color: "#9898be" }}>
              Open to <span className="text-[#e2e2f4]">AI/ML roles, research collaborations, and internships</span> — remote or based in Mumbai.
              If you're building something in computer vision, deep learning, or applied AI, let's talk.
            </p>

            <div className="flex items-center gap-2 font-mono text-[11px] mb-8" style={{ color: "#6060a0" }}>
              <MapPin size={12} style={{ color: "#00e5a0" }} />
              Mumbai, Maharashtra, India
            </div>

            <div className="space-y-3">
              {links.map(({ icon: Icon, label, value, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 w-full"
                  style={{ background: "#0a0a1c", border: "1px solid #1e1e3a" }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = color + "40"}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = "#1e1e3a"}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                    style={{ background: `${color}10`, border: `1px solid ${color}25` }}
                  >
                    <Icon size={15} style={{ color }} />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-[#6b6b9a] tracking-widest mb-0.5">{label}</div>
                    <div className="font-mono text-[12px] text-[#9494b8] group-hover:text-[#e2e2f4] transition-colors">{value}</div>
                  </div>
                  <Send size={12} className="ml-auto text-[#3a3a5c] group-hover:text-[#00ff88] transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Right: Terminal message */}
          <div className="fade-up hidden lg:block">
            <div
              className="rounded-xl overflow-hidden border border-[#252540]"
              style={{ boxShadow: "0 0 40px rgba(0,255,136,0.04)" }}
            >
              <div className="bg-[#111120] border-b border-[#252540] px-4 py-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <span className="font-mono text-[10px] text-[#3a3a5c] mx-auto">send_message.sh</span>
              </div>
              <div className="bg-[#080810] p-6 font-mono text-sm leading-8">
                <div className="text-[#3a3a5c] mb-4"># Why work with me?</div>
                <div><span className="text-[#6b6b9a]">skills</span><span className="text-[#3a3a5c]">:</span></div>
                <div className="pl-4 text-[#9494b8]">- End-to-end ML pipeline development</div>
                <div className="pl-4 text-[#9494b8]">- Real-world computer vision systems</div>
                <div className="pl-4 text-[#9494b8]">- Full-stack AI application deployment</div>
                <div className="pl-4 text-[#9494b8]">- Fast learner, accuracy-first mindset</div>
                <div className="mt-4"><span className="text-[#6b6b9a]">available</span><span className="text-[#3a3a5c]">:</span> <span style={{ color: "#00e5a0" }}>true</span></div>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-[#00ff88]">❯</span>
                  <span className="cursor-blink text-[#e2e2f4]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-5xl mx-auto mt-20 pt-8 border-t border-[#252540] flex items-center justify-between">
        <span className="font-mono text-[11px] text-[#3a3a5c]">
          © 2026 Manas Deshpande
        </span>
        <span className="font-mono text-[11px] text-[#3a3a5c]">
          built with React + Tailwind
        </span>
      </div>
    </section>
  );
}
