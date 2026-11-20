"use client";

import { useEffect } from "react";

export function PointerAmbience() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".site-canvas");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    if (!root || reducedMotion.matches || coarsePointer.matches) return;

    let frame = 0;
    const updatePointer = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = event.clientX;
        const y = event.clientY;
        root.style.setProperty("--pointer-x", `${x}px`);
        root.style.setProperty("--pointer-y", `${y}px`);
        root.style.setProperty("--pointer-dx", `${(x / window.innerWidth - 0.5) * 18}px`);
        root.style.setProperty("--pointer-dy", `${(y / window.innerHeight - 0.5) * 14}px`);
      });
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", updatePointer);
    };
  }, []);

  return <div className="pointer-glow" aria-hidden="true" />;
}
