"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Disable on touch devices or fine pointer absent
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.closest("button") ||
          target.closest("a") ||
          target.closest("input") ||
          target.closest("textarea") ||
          target.closest("select") ||
          target.getAttribute("role") === "button")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden">
      {/* Precision Gold Center Dot */}
      <motion.div
        className="fixed top-0 left-0 h-2 w-2 rounded-full bg-[#d4af37] shadow-[0_0_10px_#d4af37]"
        animate={{
          x: pos.x - 4,
          y: pos.y - 4,
          scale: isHovered ? 0 : 1,
          opacity: 1,
        }}
        transition={{ type: "spring", stiffness: 1200, damping: 50 }}
      />

      {/* Outer 3D Cinematic Gold Lens Reticle */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full border ${isHovered
            ? "border-[#d4af37] bg-[#d4af37]/15 shadow-[0_0_25px_rgba(212,175,55,0.45)]"
            : "border-[#d4af37]/40 shadow-[0_0_12px_rgba(212,175,55,0.2)]"
          }`}
        animate={{
          x: pos.x - (isHovered ? 24 : 16),
          y: pos.y - (isHovered ? 24 : 16),
          width: isHovered ? 48 : 32,
          height: isHovered ? 48 : 32,
          scale: isHovered ? 1.15 : 1,
        }}
        transition={{ type: "spring", stiffness: 600, damping: 35 }}
      />
    </div>
  );
}
