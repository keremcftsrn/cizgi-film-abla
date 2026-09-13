"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Anilar() {
  const photos = [
    { id: 1, title: "Tüyap Kitap Fuarı" },
    { id: 2, title: "Okul Söyleşisi" },
    { id: 3, title: "İmza Günü" },
    { id: 4, title: "Çocuklarla Atölye" },
    { id: 5, title: "İzmir Fuarı" },
    { id: 6, title: "Ankara Fuarı" },
  ];

  return (
    <div className="min-h-screen bg-[#fefce8] pt-32 pb-24 px-4 relative overflow-hidden">
      
      <div className="max-w-6xl mx-auto mb-8 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-yellow-600 font-bold hover:text-yellow-700 transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-yellow-100">
          <ArrowLeft size={20} />
          Ana Sayfaya Dön
        </Link>
      </div>

      <div className="max-w-6xl mx-auto mb-16 text-center mt-4">
        <span className="text-6xl mb-4 block animate-bounce">📸</span>
        <h1 className="text-4xl md:text-6xl font-display font-black text-slate-800 mb-4">
          Anılarımız
        </h1>
        <p className="text-lg md:text-xl text-slate-600 font-medium">
          Çocuklarla geçirdiğimiz o en güzel, en tatlı anların fotoğrafları!
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {photos.map((photo, idx) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -10, rotate: idx % 2 === 0 ? 2 : -2 }}
            className="w-full h-[320px] md:h-[400px] bg-white rounded-[2rem] p-4 shadow-xl flex flex-col border-4 border-white cursor-pointer"
          >
            <div className="w-full flex-grow bg-slate-100 rounded-2xl mb-4 flex items-center justify-center overflow-hidden relative shadow-inner">
              <span className="text-5xl">📷</span>
            </div>
            <div className="text-center font-bold text-slate-700 font-display text-2xl">
              {photo.title}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
