"use client";

import { motion } from "framer-motion";

export default function GallerySection() {
  const photos = [
    { id: 1, title: "Tüyap Kitap Fuarı" },
    { id: 2, title: "Okul Söyleşisi" },
    { id: 3, title: "İmza Günü" },
    { id: 4, title: "Çocuklarla Atölye" },
    { id: 5, title: "İzmir Fuarı" },
  ];

  return (
    <section className="w-full bg-[#fefce8] pt-10 pb-24 px-4 overflow-hidden relative" id="anilar">
      <div className="max-w-6xl mx-auto mb-12 text-center z-10 relative">
        <motion.div 
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-6 py-2 bg-white rounded-full shadow-sm text-yellow-600 font-bold mb-4 border-2 border-yellow-200 font-display text-lg"
        >
          <span className="text-2xl">📸</span> Anılarımız
        </motion.div>
        <h2 className="text-3xl md:text-5xl font-display font-black text-slate-800 mb-4">
          Çocuklarla Yan Yana!
        </h2>
        <p className="text-lg text-slate-600 font-medium">
          Fuarlar, okul ziyaretleri ve bolca gülücük...
        </p>
      </div>

      <div className="flex overflow-x-auto gap-6 pb-10 px-4 md:px-20 snap-x snap-mandatory hide-scrollbar relative z-10">
        {photos.map((photo, idx) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="snap-center shrink-0 w-[260px] h-[320px] md:w-[320px] md:h-[400px] bg-white rounded-[2rem] p-4 shadow-xl rotate-[-2deg] hover:rotate-2 hover:scale-105 transition-all duration-300 flex flex-col border-4 border-white cursor-pointer"
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
    </section>
  );
}
