"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export default function HeroSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  const [namaTamu, setNamaTamu] = useState("Tamu Undangan");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGuest() {
      if (!slug) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.from("guests").select("name").eq("slug", slug).single();

      if (!error && data) {
        setNamaTamu(data.name);
      }

      setLoading(false);
    }

    fetchGuest();
  }, [slug]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-50">
      <div className="text-center">
        <h1 className="font-playfair text-4xl font-bold text-[#5e81a2] mb-2">Ngunduh Mantu</h1>

        <h1 className="font-playfair text-3xl text-[#5e81a2] mb-4">Usep & Yunisa</h1>

        <p className="font-poppins text-gray-600">Minggu, 4 Januari 2026 (15 Rajab 1447 H)</p>

        <p className="font-poppins text-gray-600 mt-4">Kepada Yth</p>

        <h2 className="font-playfair text-xl text-gray-800 mt-1">{loading ? "Memuat..." : namaTamu}</h2>

        <button onClick={() => router.push("/yunisadanusep")} className="mt-6 px-6 py-3 bg-[#5e81a2] text-white rounded-full shadow-md font-poppins hover:bg-[#5e81a2] hover:text-white transition">
          Buka Undangan
        </button>
      </div>
    </div>
  );
}
