"use client";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-50">
      <div className="text-center">
        <h1 className="font-playfair text-4xl font-bold text-[#5e81a2] mb-2">Walimatul 'Urs</h1>

        <h1 className="font-playfair text-3xl text-[#5e81a2] mb-4">Yunisa & Usep</h1>

        <p className="font-poppins text-gray-600">Ahad, 21 Desember 2025</p>

        <p className="font-poppins text-gray-600 mt-1">Kepada Yth</p>

        <h2 className="font-playfair text-xl text-gray-800 mt-1">Tamu Undangan</h2>

        <button onClick={() => router.push("/yunisadanusep")} className="mt-6 px-6 py-3 bg-[#5e81a2] text-white rounded-full shadow-md font-poppins hover:bg-pink-700 transition">
          Buka Undangan
        </button>
      </div>
    </div>
  );
}
