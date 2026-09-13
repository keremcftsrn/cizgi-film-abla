"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export default function ProjectsSection() {
  return (
    <section className="w-full bg-white py-24 px-4 relative" id="projeler">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 bg-pastel-purple/20 rounded-[3rem] p-8 md:p-16">
        
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-600 font-bold text-sm mb-6">
            <Sparkles size={16} />
            <span>Sürprizler Yolda!</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-display font-black text-slate-800 mb-6">
            Yakında Gelecek Projeler
          </h2>
          
          <p className="text-lg text-slate-600 font-medium mb-8 max-w-md">
            Şu sıralar yepyeni bir kitap ve eğlenceli bir animasyon filmi üzerinde çalışıyorum. Çok yakında detayları buradan paylaşacağım!
          </p>

          <button className="px-8 py-4 bg-slate-800 text-white rounded-full font-bold flex items-center gap-2 mx-auto md:mx-0 hover:bg-slate-700 transition-colors">
            Haberdar Ol 
            <ArrowRight size={20} />
          </button>
        </div>

        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="flex-1 relative flex justify-center"
        >
          <div className="w-64 h-64 md:w-80 md:h-80 bg-white rounded-full shadow-2xl border-8 border-purple-100 flex items-center justify-center relative overflow-hidden">
             <div className="text-center">
               <span className="text-6xl">🤫</span>
               <p className="font-bold text-slate-400 mt-4">Gizli Proje</p>
             </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
