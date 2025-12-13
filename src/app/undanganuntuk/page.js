import { Suspense } from "react";
import HeroSection from "../components/HeroSection";

export const dynamic = "force-dynamic";

export default function Undangan() {
  return (
    <Suspense fallback={<div>Memuat undangan...</div>}>
      <HeroSection />
    </Suspense>
  );
}
