"use client";

import { motion } from "framer-motion";

export default function AnimationsSection() {
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
  ];

  return (
    <section className="w-full bg-[#f0f9ff] pt-20 pb-24 px-4 relative overflow-hidden" id="ekrandakiler">
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-[40px] md:h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto mb-16 text-center mt-12">
        <motion.div 
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-6 py-2 bg-white rounded-full shadow-sm text-blue-500 font-bold mb-4 border-2 border-blue-200 font-display text-lg"
        >
          <span className="text-2xl">📺</span> Televizyon Dünyası
        </motion.div>
        <h2 className="text-3xl md:text-5xl font-display font-black text-slate-800 mb-4">
          Ekrandaki Maceralar
        </h2>
        <p className="text-lg text-slate-600 font-medium">
          Senaryosunu yazdığım, severek izlenen çizgi diziler!
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {animations.map((anim, idx) => (
          <motion.div
            key={anim.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            className={`rounded-[3rem] p-8 ${anim.color} border-4 border-white flex flex-col md:flex-row items-center gap-8 shadow-xl hover:scale-[1.02] transition-transform`}
          >
            <div className="w-40 h-40 md:w-48 md:h-48 bg-white/60 rounded-[2rem] flex items-center justify-center shrink-0 border-2 border-white/80 shadow-inner">
              <span className="text-6xl">🍿</span>
            </div>
            <div className="flex flex-col items-center md:text-left w-full">
              <span className="px-4 py-1.5 bg-white rounded-full text-slate-700 font-bold text-sm mb-3 shadow-sm border-2 border-slate-100">
                📺 {anim.channel}
              </span>
              
              <h3 className="font-display font-black text-3xl text-slate-800 mb-2">{anim.title}</h3>
              
              <div className="flex items-center justify-center md:justify-start gap-2 text-slate-600 mb-6 font-semibold bg-white/60 px-4 py-2 rounded-xl text-sm border-2 border-white">
                <span className="text-lg">📅</span> {anim.schedule}
              </div>
              
              <a href={anim.link} target="_blank" rel="noopener noreferrer" className="px-6 py-4 w-full justify-center bg-white rounded-2xl text-slate-800 font-display font-bold text-xl flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm border-2 border-slate-100 hover:border-red-200 hover:text-red-500">
                <span className="text-2xl">▶️</span>
                Bölümleri İzle
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
