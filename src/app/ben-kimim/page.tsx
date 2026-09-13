"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, BookOpen, PenTool, Tv, Heart } from "lucide-react";

export default function BenKimim() {
  return (
    <div className="min-h-screen bg-[#fdfaf6] pt-32 pb-20 px-4 relative overflow-hidden">
      
      {/* Dekoratif Arkaplanlar */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-[20%] right-[-5%] w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-pink-500 font-bold hover:text-pink-600 transition-colors mb-8 bg-white px-4 py-2 rounded-full shadow-sm">
          <ArrowLeft size={20} />
          Ana Sayfaya Dön
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border-4 border-white relative"
        >
          <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-pink-200 to-purple-200 p-2 shrink-0 shadow-lg">
               <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-pink-300 font-bold text-center border-4 border-white shadow-inner">
                 Fotoğraf
               </div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="font-display text-4xl md:text-6xl font-black text-slate-800 mb-2">
                Elif Çiftçi Kimdir?
              </h1>
              <h2 className="font-display text-xl md:text-2xl font-bold text-purple-400 italic">
                (Çizgi Film Abla)
              </h2>
            </div>
          </div>

          <div className="space-y-6 text-lg text-slate-700 font-medium leading-relaxed">
            <p>
              Merhaba! Ben Elif Çiftçi. Çocukların o kocaman, renkli hayal dünyalarına hikayeler yazan, onları bazen sayfaların arasında bazen de ekran karşısında maceralara çıkaran bir yazar ve senaristim.
            </p>
            <p>
              Yazı serüvenim boyunca <strong>40'ın üzerinde çocuk kitabı</strong> yayımladım. Her bir hikayeyi yazarken kendi içimdeki o küçük çocukla sohbet ettim. Minik okurlarımın kitaplarımı okurken yüzlerinde oluşan o gülümseme, benim için dünyanın en büyük ödülü oldu.
            </p>
            
            <div className="bg-pink-50 p-6 rounded-3xl border border-pink-100 my-8">
              <h3 className="font-display font-black text-2xl text-pink-600 mb-4 flex items-center gap-2">
                <Tv size={24} /> Ekranlardaki Sihir
              </h3>
              <p>
                Sadece kitaplarla sınırlı kalmadım! Kalemimi televizyon ekranlarına da taşıdım. TRT Çocuk başta olmak üzere birçok platformda yayınlanan sevilen çizgi dizilerin (Z Takımı, Pırıl vb.) senaryolarını yazarak, kahramanları evlerinize misafir ettim. Ekranda canlanan karakterlerimin çocuklara güzel değerler kattığını görmek benim için ayrı bir gurur.
              </p>
            </div>

            <p>
              Kitap fuarlarında, okul söyleşilerinde ve imza günlerinde çocuklarla göz göze gelmek, onların hayallerini dinlemek bana her zaman yeni projeler için ilham veriyor. 
            </p>
            <p className="font-bold text-slate-800">
              Umarım bir gün seninle de o sayfalardan birinde veya ekrandaki renkli bir macerada buluşuruz! Sevgiyle ve masallarla kal...
            </p>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-center">
            <div className="flex gap-4">
               <Heart className="text-pink-400" size={32} />
               <BookOpen className="text-purple-400" size={32} />
               <PenTool className="text-blue-400" size={32} />
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
