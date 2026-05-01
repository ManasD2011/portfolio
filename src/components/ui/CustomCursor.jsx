import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Ring lerp position
    const pos   = { x: -300, y: -300 };
    const mouse = { x: -300, y: -300 };
    const prev  = { x: -300, y: -300 };
    // Smooth stretch target
    let sxTarget = 1, syTarget = 1, angleTarget = 0;
    let sxCur = 1, syCur = 1, angleCur = 0;
    let visible = false;
    let raf;

    const show = () => {
      if (!visible) {
        visible = true;
        dot.style.opacity  = "1";
        ring.style.opacity = "1";
      }
    };

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      dot.style.left = `${e.clientX}px`;
      dot.style.top  = `${e.clientY}px`;
      show();
    };

    const onEnter = () => document.body.classList.add("cursor-hover");
    const onLeave = () => document.body.classList.remove("cursor-hover");

    document.addEventListener("mousemove",  onMove);
    document.addEventListener("mouseleave", () => {
      if (visible) { dot.style.opacity = ring.style.opacity = "0"; visible = false; }
      // Reset stretch so ring is always a circle when it reappears
      sxTarget = 1; syTarget = 1;
    });
    document.addEventListener("mouseenter", () => { if (visible) { dot.style.opacity = ring.style.opacity = "1"; } });

    const targets = document.querySelectorAll("a, button, [role='button'], input, textarea, select, label, [draggable]");
    targets.forEach((t) => {
      t.addEventListener("mouseenter", onEnter);
      t.addEventListener("mouseleave", onLeave);
    });

    const lerp = (a, b, t) => a + (b - a) * t;
    // Angle lerp — shortest path
    const lerpAngle = (a, b, t) => {
      let diff = b - a;
      while (diff >  Math.PI) diff -= 2 * Math.PI;
      while (diff < -Math.PI) diff += 2 * Math.PI;
      return a + diff * t;
    };

    const animate = () => {
      // Lerp ring to mouse
      pos.x = lerp(pos.x, mouse.x, 0.13);
      pos.y = lerp(pos.y, mouse.y, 0.13);

      // Velocity computed each frame — resets to 0 when mouse is still
      const vx = mouse.x - prev.x;
      const vy = mouse.y - prev.y;
      prev.x = mouse.x;
      prev.y = mouse.y;
      const speed = Math.hypot(vx, vy);

      if (speed > 0.8) {
        const stretch = Math.min(speed * 0.035, 0.55);
        sxTarget    = 1 + stretch;
        syTarget    = Math.max(1 - stretch * 0.55, 0.55);
        angleTarget = Math.atan2(vy, vx);
      } else {
        sxTarget = 1;
        syTarget = 1;
        // angle stays, let it lerp back slowly
      }

      // Smooth toward targets
      sxCur    = lerp(sxCur,    sxTarget,    0.18);
      syCur    = lerp(syCur,    syTarget,    0.18);
      angleCur = lerpAngle(angleCur, angleTarget, 0.18);

      ring.style.left = `${pos.x}px`;
      ring.style.top  = `${pos.y}px`;
      ring.style.transform = `translate(-50%,-50%) rotate(${angleCur}rad) scaleX(${sxCur}) scaleY(${syCur})`;

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseleave", onLeave);
      targets.forEach((t) => {
        t.removeEventListener("mouseenter", onEnter);
        t.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  id="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} id="cursor-ring" aria-hidden="true" />
    </>
  );
}
