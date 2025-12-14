// app/landing/page.js
"use client";

import { useEffect, useState } from "react";
import { Instagram, MessageCircle } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function LandingPage() {
  const targetDate = new Date("2025-12-21T00:00:00").getTime();
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [attendance, setAttendance] = useState("");
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    const { data, error } = await supabase.from("wedding_wishes").select("*").order("created_at", { ascending: false });

    if (!error) {
      setWishes(data);
    }
  };

  const handleSubmitWish = async (e) => {
    e.preventDefault();
    if (!name || !message || !attendance) return;

    setLoading(true);

    const { error } = await supabase.from("wedding_wishes").insert([
      {
        name,
        message,
        attendance,
      },
    ]);

    if (!error) {
      setName("");
      setMessage("");
      setAttendance("");
      fetchWishes(); // refresh data
    }

    setLoading(false);
  };

  const getRelativeTime = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now - past;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return "baru saja";
    if (minutes < 60) return `${minutes} menit lalu`;
    if (hours < 24) return `${hours} jam lalu`;
    if (days === 1) return "kemarin";
    if (days < 7) return `${days} hari lalu`;

    return past.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const isNewWish = (dateString) => {
    const now = new Date();
    const created = new Date(dateString);
    const diffMinutes = (now - created) / 1000 / 60;

    return diffMinutes <= 60; // <= 1 jam
  };

  const googleCalendarUrl =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=Walimatul+Urs+Yunisa+%26+Usep" +
    "&dates=20251221T010000Z/20251221T070000Z" +
    "&details=Undangan+Pernikahan+Yunisa+dan+Usep" +
    "&location=Jl.+Kamboja+II+No.+14,+Pekanbaru";

  return (
    <>
      {/* SECTION 1 — HERO */}
      <div
        className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white"
        style={{
          backgroundImage: "url('/bg.png')",
        }}
      >
        <div className="bg-white/10 px-8 py-10 rounded-2xl text-center backdrop-blur-lg border border-[#5e81a2]/60 shadow-lg">
          <p className="font-playfair text-2xl text-[#5e81a2] mb-2">Walimatul &#39;Urs</p>

          <h1 className="font-playfair text-4xl text-[#5e81a2] font-bold mb-4">Yunisa & Usep</h1>

          <p className="font-poppins text-lg text-[#5e81a2] mb-1">Ahad, 21 Desember 2025</p>

          {/* 🔽 Tanggal Hijriah */}
          <p className="font-poppins text-sm text-[#5e81a2]/80 mb-6 italic">(1 Rajab 1447 H)</p>

          {/* Countdown */}
          <div className="flex gap-8 text-center font-poppins mb-6">
            <div>
              <p className="text-3xl text-[#5e81a2] font-bold">{countdown.days}</p>
              <span className="text-sm text-[#5e81a2]">Hari</span>
            </div>
            <div>
              <p className="text-3xl text-[#5e81a2] font-bold">{countdown.hours}</p>
              <span className="text-sm text-[#5e81a2]">Jam</span>
            </div>
            <div>
              <p className="text-3xl text-[#5e81a2] font-bold">{countdown.minutes}</p>
              <span className="text-sm text-[#5e81a2]">Menit</span>
            </div>
            <div>
              <p className="text-3xl text-[#5e81a2] font-bold">{countdown.seconds}</p>
              <span className="text-sm text-[#5e81a2]">Detik</span>
            </div>
          </div>

          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full
             border border-[#5e81a2]/70 text-[#5e81a2]
             bg-white/10 backdrop-blur-lg
             hover:bg-[#5e81a2] hover:text-white transition"
          >
            Add to Calendar
          </a>
        </div>
      </div>

      {/* SECTION 2 — AYAT SUCI QS AR-RUM 21 */}
      <section className="py-20 px-6 bg-blue-50 text-center">
        <p className="font-playfair text-2xl md:text-3xl text-[#5e81a2] mb-4 text-center leading-loose">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>

        <h2 className="font-playfair text-3xl text-[#5e81a2] mb-6">QS. Ar-Rum Ayat 21</h2>

        <p className="font-playfair text-2xl text-gray-700 leading-relaxed mb-8">
          وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِقَوْمٍ يَتَفَكَّرُونَ
        </p>

        <p className="font-poppins text-gray-600 max-w-2xl mx-auto text-lg">
          “Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang. Sesungguhnya pada yang
          demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berfikir.”
        </p>
      </section>

      {/* SECTION 3 — PEMBUKA */}
      <section className="py-20 px-6 bg-white text-center">
        <p className="font-poppins text-gray-700 mb-8 text-lg">Assalamu’alaikum Warahmatullahi Wabarakatuh</p>
        {/* Paragraf Pembuka */}
        <p className="font-poppins text-gray-700 max-w-2xl mx-auto text-lg leading-relaxed mb-10">Dengan memohon Rahmat dan Ridho Allah Subhanahu Wa Ta’ala, kami bermaksud menyelenggarakan Resepsi Pernikahan Putra-putri kami :</p>

        {/* Nama Pasangan - Perempuan */}
        <div className="mb-10">
          <h3 className="font-playfair text-3xl text-[#5e81a2] mb-2">Yunisa, S.Pd</h3>
          <p className="font-poppins text-[#5e81a2] max-w-xl mx-auto text-lg">Putri Bungsu dari Bapak Drs. H. Sirat Yasir, MM & Ibu Hj. Amelia, S.Pd.AUD</p>
        </div>

        {/* Ampersand */}
        <div className="my-6">
          <span className="font-playfair text-6xl md:text-7xl text-[#5e81a2]/70">&</span>
        </div>

        {/* Nama Pasangan - Laki-laki */}
        <div>
          <h3 className="font-playfair text-3xl text-[#5e81a2] mb-2">Usep Sofyan, S.T</h3>
          <p className="font-poppins text-[#5e81a2] max-w-xl mx-auto text-lg">Putra Tunggal dari Bapak Nanang dan Ibu Ai Suryati</p>
        </div>
      </section>

      {/* SECTION 4 — DETAIL ACARA */}
      <section className="py-20 px-6 bg-blue-50 text-center">
        {/* Paragraf Pembuka */}
        <p className="font-poppins text-gray-700 max-w-2xl mx-auto text-lg leading-relaxed mb-8">Yang In Syaa Allah dilaksanakan pada :</p>

        {/* Tanggal */}
        <h3 className="font-playfair text-2xl text-[#5e81a2] mb-1">Ahad, 21 Desember 2025</h3>
        <p className="font-poppins text-sm text-[#5e81a2]/80 mb-6 italic">(1 Rajab 1447 H)</p>

        {/* Akad Nikah */}
        <div className="mb-6">
          <p className="font-playfair text-xl text-gray-800">Akad Nikah</p>
          <p className="font-poppins text-gray-600">Jam 08.00 s.d selesai</p>
        </div>

        {/* Resepsi */}
        <div className="mb-10">
          <p className="font-playfair text-xl text-gray-800">Resepsi</p>
          <p className="font-poppins text-gray-600">Jam 12.20 s.d 15.00</p>
        </div>

        {/* Alamat */}
        <p className="font-poppins text-gray-700 max-w-xl mx-auto text-lg leading-relaxed mb-2">Bertempat di Rumah Kediaman kami</p>
        <p className="font-poppins text-gray-700 max-w-xl mx-auto text-lg leading-relaxed mb-10">Jl. Kamboja II No. 14, Delima, Kec. Binawidya (Panam), Kota Pekanbaru, Riau</p>

        {/* Penutup */}
        <p className="font-poppins text-gray-700 max-w-2xl mx-auto text-lg leading-relaxed mb-8">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan do’a dan restu kepada putra-putri kami.
        </p>

        {/* Salam Penutup */}
        <p className="font-poppins text-gray-700 text-lg">Wassalamu’alaikum Warahmatullahi Wabarakatuh</p>
      </section>

      {/* SECTION 5 — ADAB WALIMAH */}
      <section className="py-20 px-6 bg-white text-center">
        {/* Heading */}
        <h2 className="font-playfair text-3xl text-[#5e81a2] mb-6">Adab Walimah</h2>

        {/* Paragraf Pembuka */}
        <p className="font-poppins text-gray-700 max-w-2xl mx-auto text-lg leading-relaxed mb-10">Tanpa mengurangi rasa hormat kami, ada hal-hal dalam adab seorang muslim ketika menghadiri walimah yang harus diperhatikan:</p>

        {/* Poin-poin Adab */}
        <ul className="text-left max-w-xl mx-auto space-y-4 text-gray-800 font-poppins">
          <li className="flex items-start">
            <span className="font-bold mr-2">•</span>
            Memakai pakaian yang sopan dan menutup aurat.
          </li>
          <li className="flex items-start">
            <span className="font-bold mr-2">•</span>
            Tamu Ikhwan dan Akhwat dipisah.
          </li>
          <li className="flex items-start">
            <span className="font-bold mr-2">•</span>
            Tidak berjabat tangan dengan non-mahram.
          </li>
          <li className="flex items-start">
            <span className="font-bold mr-2">•</span>
            Memperhatikan waktu sholat.
          </li>
          <li className="flex items-start">
            <span className="font-bold mr-2">•</span>
            Dilarang memotret kedua mempelai.
          </li>
        </ul>
      </section>

      {/* SECTION 6 — WEDDING GIFT */}
      <section className="py-20 px-6 bg-blue-50 text-center">
        {/* Heading */}
        <h2 className="font-playfair text-3xl text-[#5e81a2] mb-6">Send Gift</h2>

        {/* Paragraf Pembuka */}
        <p className="font-poppins text-gray-700 max-w-2xl mx-auto text-lg leading-relaxed mb-10">
          Tanpa mengurangi rasa hormat, bagi Bapak/Ibu/Saudara/i yang ingin mengirimkan hadiah pernikahan dapat melalui rekening dibawah ini atau dapat langsung pada acara walimah:
        </p>

        {/* Rekening 1 */}
        <div className="bg-white shadow-md rounded-xl p-6 max-w-md mx-auto mb-8 border border-pink-100">
          <p className="font-playfair text-xl text-gray-800 mb-2">Bank BSI</p>
          <p className="font-poppins text-gray-700 text-lg font-semibold">7294912996</p>
          <p className="font-poppins text-gray-600 text-sm mt-2 mb-4">a.n. Usep Sofyan</p>

          <button
            onClick={() => {
              navigator.clipboard.writeText("7294912996");
              alert("Rekening BSI disalin!");
            }}
            className="mt-2 px-4 py-2 bg-[#5e81a2] hover:bg-[#5e81a2] text-white text-sm rounded-lg transition"
          >
            Copy Rekening
          </button>
        </div>

        {/* Rekening 2 */}
        <div className="bg-white shadow-md rounded-xl p-6 max-w-md mx-auto mb-10 border border-pink-100">
          <p className="font-playfair text-xl text-gray-800 mb-2">Bank BSI</p>
          <p className="font-poppins text-gray-700 text-lg font-semibold">7152693081</p>
          <p className="font-poppins text-gray-600 text-sm mt-2 mb-4">a.n. Yunisa</p>

          <button
            onClick={() => {
              navigator.clipboard.writeText("7152693081");
              alert("Rekening BSI disalin!");
            }}
            className="mt-2 px-4 py-2 bg-[#5e81a2] hover:bg-[#5e81a2] text-white text-sm rounded-lg transition"
          >
            Copy Rekening
          </button>
        </div>

        {/* Penutup */}
        <p className="font-poppins text-gray-700 text-lg">Syukron. Jazakumullahu Khairan.</p>
      </section>

      {/* SECTION 7 — WEDDING WISH */}
      <section className="py-20 px-6 bg-white text-center">
        <h2 className="font-playfair text-3xl text-[#5e81a2] mb-4">Wishes and Du&#39;a</h2>

        <p className="font-poppins text-gray-600 mb-10">Tuliskan doa dan ucapan terbaik untuk kami</p>

        {/* FORM */}
        <div className="max-w-xl mx-auto bg-blue-50 p-8 rounded-2xl shadow-sm mb-12">
          <form onSubmit={handleSubmitWish} className="space-y-5">
            <input type="text" placeholder="Nama" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 font-poppins text-black" required />

            <textarea placeholder="Ucapan & Doa" rows="4" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 font-poppins text-black" required />

            <select value={attendance} onChange={(e) => setAttendance(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 font-poppins text-black" required>
              <option value="">Konfirmasi Kehadiran</option>
              <option value="Hadir">Hadir</option>
              <option value="Tidak Hadir">Tidak Hadir</option>
              <option value="InsyaAllah Hadir">InsyaAllah Hadir</option>
            </select>

            <button type="submit" disabled={loading} className="w-full bg-[#5e81a2] hover:bg-[#5e81a2] text-white py-3 rounded-lg font-poppins transition disabled:opacity-60">
              {loading ? "Mengirim..." : "Kirim Ucapan"}
            </button>
          </form>
        </div>

        {/* LIST PESAN */}
        <div className="max-w-2xl mx-auto">
          {wishes.length === 0 && <p className="text-gray-500 font-poppins text-center">Belum ada ucapan</p>}

          <div className="max-h-[360px] overflow-y-auto space-y-4 pr-2">
            {wishes.map((wish) => (
              <div key={wish.id} className="bg-blue-50 p-5 rounded-xl text-left shadow-sm">
                {/* Nama, Badge & Waktu */}
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    <p className="font-poppins font-semibold text-[#5e81a2]">{wish.name}</p>

                    {isNewWish(wish.created_at) && <span className="text-xs bg-[#5e81a2] text-white px-2 py-0.5 rounded-full font-poppins">Baru</span>}
                  </div>

                  <span className="text-xs text-gray-500 font-poppins">{getRelativeTime(wish.created_at)}</span>
                </div>

                {/* Pesan */}
                <p className="font-poppins text-[#5e81a2] mt-1">{wish.message}</p>

                {/* Kehadiran */}
                <span className="text-sm text-[#5e81a2] italic block mt-2">{wish.attendance}</span>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-500 mt-4 text-center font-poppins">*Scroll untuk melihat ucapan lainnya</p>
        </div>
      </section>

      {/* SECTION 8 — FOOTER */}
      <footer className="py-12 px-6 bg-[#5e81a2] text-center text-white">
        {/* Text */}
        <p className="font-poppins text-sm mb-6">
          Made with ❤️ by <span className="font-semibold">satubiru.id</span>
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          {/* WhatsApp Button */}
          <a href="https://wa.me/6281371618343" target="_blank" className="flex items-center gap-2 px-5 py-2 bg-green-600 hover:bg-green-700 rounded-full font-poppins text-sm transition">
            <MessageCircle size={18} />
          </a>

          {/* Instagram Button */}
          <a href="https://instagram.com/satubiru.id" target="_blank" className="flex items-center gap-2 px-5 py-2 bg-pink-600 hover:bg-pink-700 rounded-full font-poppins text-sm transition">
            <Instagram size={18} />
          </a>
        </div>
      </footer>
    </>
  );
}
