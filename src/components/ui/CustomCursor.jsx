import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");

    const mouse = { x: -999, y: -999 };
    const pos   = { x: -999, y: -999 };
    let visible  = false;
    let hovering = false;
    let t        = 0;
    let raf;

    // Resize
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Track mouse
    const onMove  = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; visible = true; };
    const onLeave = () => { visible = false; };
    document.addEventListener("mousemove",  onMove);
    document.addEventListener("mouseleave", onLeave);

    // Hover state for interactive elements
    const over  = () => { hovering = true;  };
    const out   = () => { hovering = false; };
    const attachHover = () =>
      document.querySelectorAll("a,button,[role='button'],input,textarea,label,[draggable]")
        .forEach((el) => { el.addEventListener("mouseenter", over); el.addEventListener("mouseleave", out); });
    setTimeout(attachHover, 500);

    const lerp = (a, b, f) => a + (b - a) * f;

    function draw(x, y) {
      const pulse  = Math.sin(t * 0.06) * 0.12;          // subtle breathing
      const scale  = (hovering ? 1.4 : 1.0) + pulse;

      const arm    = 14 * scale;   // arm length
      const half   = 1.0 * scale;  // arm half-width at base
      const gap    = 2.5 * scale;  // gap around centre dot

      ctx.save();
      ctx.translate(x, y);

      // ── Soft outer bloom ─────────────────────────────────────
      const bloom = ctx.createRadialGradient(0, 0, 0, 0, 0, 28 * scale);
      bloom.addColorStop(0,   "rgba(0,229,160,0.13)");
      bloom.addColorStop(0.5, "rgba(0,229,160,0.05)");
      bloom.addColorStop(1,   "rgba(0,229,160,0)");
      ctx.fillStyle = bloom;
      ctx.beginPath();
      ctx.arc(0, 0, 28 * scale, 0, Math.PI * 2);
      ctx.fill();

      // ── Four arms ────────────────────────────────────────────
      // Each arm: slim tapered rectangle from `gap` to `gap+arm`,
      // widest at the inner end, tip at 0 width.
      ctx.shadowColor = "#00e5a0";
      ctx.shadowBlur  = 8 * scale;
      ctx.fillStyle   = "#00e5a0";

      const dirs = [[0, -1], [1, 0], [0, 1], [-1, 0]]; // up right down left
      dirs.forEach(([dx, dy]) => {
        ctx.beginPath();
        // Base corners (at `gap` from centre)
        ctx.moveTo(-dy * half + dx * gap,  dx * half + dy * gap);
        ctx.lineTo( dy * half + dx * gap, -dx * half + dy * gap);
        // Tip (at `gap + arm` from centre)
        ctx.lineTo(dx * (gap + arm), dy * (gap + arm));
        ctx.closePath();
        ctx.fill();
      });

      // ── Centre dot ───────────────────────────────────────────
      ctx.shadowBlur = 10 * scale;
      const cg = ctx.createRadialGradient(0, 0, 0, 0, 0, 3 * scale);
      cg.addColorStop(0,   "rgba(255,255,255,1)");
      cg.addColorStop(0.5, "rgba(0,229,160,0.9)");
      cg.addColorStop(1,   "rgba(0,229,160,0)");
      ctx.fillStyle = cg;
      ctx.beginPath();
      ctx.arc(0, 0, 3 * scale, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pos.x = lerp(pos.x, mouse.x, 0.20);
      pos.y = lerp(pos.y, mouse.y, 0.20);
      if (visible) { t++; draw(pos.x, pos.y); }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 99999 }}
    />
  );
}
