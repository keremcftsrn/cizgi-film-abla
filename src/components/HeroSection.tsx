"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative w-full max-w-[1400px] mx-auto px-4 pt-28 pb-16 md:pt-36 md:pb-20 flex flex-col items-center overflow-hidden">
      
      {/* Masalsı Arkaplan Parçacıkları ve Renkleri */}
      <div className="absolute top-0 inset-x-0 h-full -z-10 pointer-events-none">
        <motion.div animate={{ x: [0, 15, 0], y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 8 }} className="absolute top-20 left-10 md:left-20 text-white drop-shadow-md opacity-90">
          <svg width="100" height="60" viewBox="0 0 24 24" fill="#ffffff"><path d="M17.5 19C19.9853 19 22 16.9853 22 14.5C22 12.1325 20.1749 10.2017 17.8596 10.0166C17.4475 6.61907 14.5369 4 11 4C7.13401 4 4 7.13401 4 11C4 11.2335 4.01141 11.4645 4.03362 11.6923C1.76161 12.2343 0 14.2838 0 16.75C0 19.6495 2.35051 22 5.25 22H17.5Z"/></svg>
        </motion.div>
        <motion.div animate={{ x: [0, -20, 0], y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 10 }} className="absolute top-40 right-5 md:right-32 text-white drop-shadow-md opacity-80 scale-125">
          <svg width="120" height="70" viewBox="0 0 24 24" fill="#ffffff"><path d="M17.5 19C19.9853 19 22 16.9853 22 14.5C22 12.1325 20.1749 10.2017 17.8596 10.0166C17.4475 6.61907 14.5369 4 11 4C7.13401 4 4 7.13401 4 11C4 11.2335 4.01141 11.4645 4.03362 11.6923C1.76161 12.2343 0 14.2838 0 16.75C0 19.6495 2.35051 22 5.25 22H17.5Z"/></svg>
        </motion.div>

        {/* Çok Tatlı Animasyonlu Renk Topları */}
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 z-10 w-full max-w-6xl relative">
        
        {/* Metin ve Özgeçmiş Alanı */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 text-center flex flex-col items-center md:items-start order-2 md:order-1"
        >
          <motion.div 
            whileHover={{ scale: 1.05, rotate: -2 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-md text-pink-500 font-display font-bold text-sm mb-4 border-2 border-pink-100"
          >
            ✨ <span>Masal Dünyasına Hoş Geldin!</span>
          </motion.div>
          
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-slate-800 leading-[1.1] mb-2 flex flex-col items-center md:items-start w-full">
            <span className="mb-1">Merhaba, Ben</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b9e] via-[#d946ef] to-[#4facfe]">
              Elif Çiftçi
            </span>
          </h1>
          
          <div className="w-full flex justify-center md:justify-start">
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-black text-pink-400 mb-6 drop-shadow-sm italic opacity-90 inline-block">
              (Namıdiğer Çizgi Film Abla)
            </h2>
          </div>
          
          {/* Kısa Özgeçmiş */}
          <div className="bg-white/70 p-5 md:p-6 rounded-[2rem] shadow-sm backdrop-blur-md border-2 border-white mb-6 text-left relative overflow-hidden group w-full">
            <div className="absolute top-0 left-0 w-3 h-full bg-gradient-to-b from-pink-400 to-purple-400"></div>
            <p className="text-lg text-slate-700 font-medium leading-relaxed pl-2">
              Yıllardır çocukların dünyasına hikayelerle, renklerle ve neşeyle dokunan bir yazar ve senaristim. 
              Sadece sayfalarda değil, ekranlarda da varım! Kahramanlarımı evlerinize misafir ediyor, hayal gücünüze eşlik ediyorum.
            </p>
          </div>
          
          {/* İstatistik Kutucukları (Çok Daha Hareketli) */}
          <div className="grid grid-cols-3 gap-3 md:gap-4 w-full">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: -3 }}
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="flex flex-col items-center justify-center p-4 bg-white/90 backdrop-blur-sm border-2 border-pink-200 rounded-[2rem] shadow-lg cursor-pointer"
            >
              <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-4xl mb-2 inline-block">📚</motion.span>
              <h3 className="font-display font-black text-2xl text-pink-500 leading-none mb-1">+40</h3>
              <p className="text-slate-600 font-bold text-[11px] md:text-xs text-center leading-tight">Çocuk<br/>Kitabı</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 3 }}
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.2 }}
              className="flex flex-col items-center justify-center p-4 bg-white/90 backdrop-blur-sm border-2 border-purple-200 rounded-[2rem] shadow-lg cursor-pointer"
            >
              <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="text-4xl mb-2 inline-block">📺</motion.span>
              <h3 className="font-display font-black text-2xl text-purple-500 leading-none mb-1">10</h3>
              <p className="text-slate-600 font-bold text-[11px] md:text-xs text-center leading-tight">Çizgi<br/>Film</p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.1, rotate: -3 }}
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut", delay: 0.4 }}
              className="flex flex-col items-center justify-center p-4 bg-white/90 backdrop-blur-sm border-2 border-yellow-200 rounded-[2rem] shadow-lg cursor-pointer"
            >
              <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-4xl mb-2 inline-block">💖</motion.span>
              <h3 className="font-display font-black text-2xl text-yellow-500 leading-none mb-1">∞</h3>
              <p className="text-slate-600 font-bold text-[11px] md:text-xs text-center leading-tight">Mutlu<br/>Çocuk</p>
            </motion.div>
          </div>

        </motion.div>

        {/* Görsel Çerçevesi */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
          className="relative flex justify-center items-center order-1 md:order-2 w-[260px] md:w-auto mt-6 md:mt-0"
        >
          <motion.div className="absolute -top-6 -left-6 text-yellow-400 animate-float animation-delay-2000"><span className="text-5xl drop-shadow-md">⭐</span></motion.div>
          <motion.div className="absolute -bottom-4 -right-4 text-pink-400 animate-float"><span className="text-5xl drop-shadow-md">🎈</span></motion.div>

          <div className="w-[260px] h-[260px] md:w-[380px] md:h-[380px] rounded-[3rem] rotate-3 bg-white p-3 shadow-2xl animate-float">
            <div className="w-full h-full rounded-[2.5rem] bg-gradient-to-br from-pink-200 via-purple-100 to-blue-200 flex items-center justify-center overflow-hidden relative shadow-inner border-4 border-white">
               <p className="text-center font-display text-2xl text-pink-500 px-4 rotate-[-3deg] font-black">
                 Fotoğraf Alanı
               </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
