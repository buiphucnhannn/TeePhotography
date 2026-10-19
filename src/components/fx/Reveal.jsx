"use client";

import { useReveal } from "@/hooks/useReveal";

// Đặt một lần trong layout; mọi `.reveal` / `.split` trên trang đều được theo dõi.
export default function Reveal() {
  useReveal();
  return null;
}
