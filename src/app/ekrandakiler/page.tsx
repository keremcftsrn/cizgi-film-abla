"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Ekrandakiler() {
  const animations = [
    { 
      id: 1, 
      title: "Z Takımı", 
      channel: "TRT Çocuk", 
      color: "bg-[#e0f2fe]", 
      schedule: "Hafta içi her gün 15:30'da!",
      link: "https://www.youtube.com/@TRTCocuk" 
    },
    { 
      id: 2, 
      title: "Pırıl", 
      channel: "TRT Çocuk", 
      color: "bg-[#fce7f3]", 
      schedule: "Hafta sonu 10:00'da yayında!",
      link: "https://www.youtube.com/@TRTCocuk" 
    },
    { 
      id: 3, 
      title: "Yeni Proje (Çok Yakında)", 
      channel: "Sürpriz", 
      color: "bg-[#fefce8]", 
      schedule: "Geliştirme Aşamasında...",
      link: "#" 
    },
  ];

  return (
    <div className="min-h-screen bg-[#f0f9ff] pt-32 pb-24 px-4 relative overflow-hidden">
      
      <div className="max-w-6xl mx-auto mb-8 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-500 font-bold hover:text-blue-600 transition-colors bg-white px-4 py-2 rounded-full shadow-sm">
          <ArrowLeft size={20} />
          Ana Sayfaya Dön
        </Link>
      </div>

      <div className="max-w-6xl mx-auto mb-16 text-center mt-4">
        <span className="text-6xl mb-4 block animate-bounce">📺</span>
        <h1 className="text-4xl md:text-6xl font-display font-black text-slate-800 mb-4">
          Ekrandaki Maceralar
        </h1>
        <p className="text-lg md:text-xl text-slate-600 font-medium">
          Televizyon dünyasında kahramanlarımızın maceralarına katılın!
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {animations.map((anim, idx) => (
          <motion.div
            key={anim.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={`rounded-[3rem] p-8 ${anim.color} border-4 border-white flex flex-col items-center text-center shadow-xl hover:scale-[1.02] transition-transform`}
          >
            <div className="w-40 h-40 md:w-48 md:h-48 bg-white/60 rounded-[2rem] flex items-center justify-center shrink-0 border-2 border-white/80 shadow-inner mb-6">
              <span className="text-6xl">🍿</span>
            </div>
            <div className="flex flex-col items-center w-full">
              <span className="px-4 py-1.5 bg-white rounded-full text-slate-700 font-bold text-sm mb-3 shadow-sm border-2 border-slate-100">
                📺 {anim.channel}
              </span>
              
              <h3 className="font-display font-black text-3xl text-slate-800 mb-2">{anim.title}</h3>
              
              <div className="flex items-center justify-center gap-2 text-slate-600 mb-6 font-semibold bg-white/60 px-4 py-2 rounded-xl text-sm border-2 border-white">
                <span className="text-lg">📅</span> {anim.schedule}
              </div>
              
              {anim.link !== "#" ? (
                <a href={anim.link} target="_blank" rel="noopener noreferrer" className="px-6 py-4 w-full justify-center bg-white rounded-2xl text-slate-800 font-display font-bold text-xl flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm border-2 border-slate-100 hover:border-red-200 hover:text-red-500">
                  <span className="text-2xl">▶️</span>
                  Bölümleri İzle
                </a>
              ) : (
                <div className="px-6 py-4 w-full justify-center bg-slate-100 rounded-2xl text-slate-400 font-display font-bold text-xl flex items-center gap-2 shadow-inner border-2 border-slate-200">
                  <span className="text-2xl">⏳</span>
                  Yakında
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
