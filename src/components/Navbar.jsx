import { useState, useEffect } from "react";
import { cn } from "../lib/utils";
import { Download } from "lucide-react";

const links = ["about", "projects", "skills", "contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#080810]/90 backdrop-blur-md border-b border-[#252540]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="flex items-baseline gap-0"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '15px', letterSpacing: '-0.02em' }}
        >
          <span className="text-[#e2e2f4]">manas</span>
          <span className="text-[#00ff88]">.</span>
          <span className="font-mono text-[11px] text-[#3a3a5c] tracking-widest self-end ml-0.5">dev</span>
        </a>

        {/* Links */}
        <ul className="flex items-center gap-8 list-none">
          {links.map((l) => (
            <li key={l}>
              <a
                href={`#${l}`}
                onClick={() => setActive(l)}
                className={cn(
                  "font-mono text-[11px] tracking-[0.14em] transition-colors duration-200 hover:text-[#00ff88]",
                  active === l ? "text-[#00ff88]" : "text-[#6b6b9a]"
                )}
              >
                ./{l}
              </a>
            </li>
          ))}
        </ul>

        {/* Resume download + Status indicator */}
        <div className="flex items-center gap-4">
          <a
            href="/Manas_Deshpande_Resume.pdf"
            download="Manas_Deshpande_Resume.pdf"
            id="navbar-resume-download"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.14em] uppercase px-3 py-1.5 rounded-md"
            style={{
              color: "#a78bfa",
              border: "1px solid rgba(167,139,250,0.2)",
              background: "rgba(167,139,250,0.06)",
              transition: "color 0.2s, border-color 0.2s, background 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "rgba(167,139,250,0.45)";
              e.currentTarget.style.background = "rgba(167,139,250,0.12)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "rgba(167,139,250,0.2)";
              e.currentTarget.style.background = "rgba(167,139,250,0.06)";
            }}
          >
            <Download size={10} />
            resume
          </a>
          <div className="flex items-center gap-2 text-[#3a3a5c] text-[11px] font-mono tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
            <span className="text-[#00ff88]">online</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
