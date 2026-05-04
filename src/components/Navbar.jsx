import { useState, useEffect } from "react";
import { cn } from "../lib/utils";
import { Download, Menu, X } from "lucide-react";

const links = ["home", "about", "projects", "skills", "contact"];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [active,    setActive]    = useState("");
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleNav = (l) => {
    setActive(l);
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled || menuOpen
            ? "bg-[#080810]/95 backdrop-blur-md border-b border-[#252540]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">

          {/* Logo */}
          <a
            href="#hero"
            className="flex items-baseline gap-0 flex-shrink-0"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "15px", letterSpacing: "-0.02em" }}
          >
            <span className="text-[#e2e2f4]">manas</span>
            <span className="text-[#00ff88]">.</span>
            <span className="font-mono text-[11px] text-[#3a3a5c] tracking-widest self-end ml-0.5">dev</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-7 list-none">
            {links.map((l) => (
              <li key={l}>
                <a
                  href={l === "home" ? "#hero" : `#${l}`}
                  onClick={() => handleNav(l)}
                  className={cn(
                    "font-mono text-[13px] tracking-[0.08em] transition-colors duration-200 hover:text-[#00ff88]",
                    active === l ? "text-[#00ff88]" : "text-[#6b6b9a]"
                  )}
                >
                  ./{l}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop right — resume + status */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`${import.meta.env.BASE_URL}Manas_Deshpande_Resume.pdf`}
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
                e.currentTarget.style.background  = "rgba(167,139,250,0.12)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(167,139,250,0.2)";
                e.currentTarget.style.background  = "rgba(167,139,250,0.06)";
              }}
            >
              <Download size={10} /> resume
            </a>
            <div className="flex items-center gap-2 text-[11px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
              <span className="text-[#00ff88]">online</span>
            </div>
          </div>

          {/* Mobile: status dot + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              className="p-1.5 rounded-md transition-colors"
              style={{ color: "#6b6b9a" }}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="px-5 pb-5 pt-2 flex flex-col gap-1 border-t border-[#1e1e3a]">
            {links.map((l) => (
              <a
                key={l}
                href={l === "home" ? "#hero" : `#${l}`}
                onClick={() => handleNav(l)}
                className={cn(
                  "font-mono text-[13px] tracking-[0.1em] py-3 px-3 rounded-lg transition-colors duration-200",
                  active === l
                    ? "text-[#00ff88] bg-[#00ff8808]"
                    : "text-[#6b6b9a] hover:text-[#00ff88] hover:bg-[#ffffff05]"
                )}
              >
                ./{l}
              </a>
            ))}

            {/* Resume in drawer */}
            <div className="mt-2 pt-3 border-t border-[#1e1e3a]">
              <a
                href={`${import.meta.env.BASE_URL}Manas_Deshpande_Resume.pdf`}
                download="Manas_Deshpande_Resume.pdf"
                className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase px-3 py-2 rounded-md"
                style={{
                  color: "#a78bfa",
                  border: "1px solid rgba(167,139,250,0.2)",
                  background: "rgba(167,139,250,0.06)",
                }}
              >
                <Download size={11} /> download resume
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
