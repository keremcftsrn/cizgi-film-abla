export const dynamic = 'force-dynamic';
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, BookOpen, PenTool, Tv, Heart } from "lucide-react";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function BenKimim() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 'global' } });
  const bioContent = settings?.longBio || "Merhaba! Ben Elif Çiftçi. Çocukların o kocaman, renkli hayal dünyalarına hikayeler yazan, onları bazen sayfaların arasında bazen de ekran karşısında maceralara çıkaran bir yazar ve senaristim.";

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

        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border-4 border-white relative">
          <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-pink-200 to-purple-200 p-2 shrink-0 shadow-lg">
               <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-pink-300 font-bold text-center border-4 border-white shadow-inner overflow-hidden">
                 {settings?.heroImage ? (
                   <img src={settings.heroImage} alt="Elif Çiftçi" className="w-full h-full object-cover" />
                 ) : (
                   "Fotoğraf"
                 )}
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

          <div className="space-y-6 text-lg text-slate-700 font-medium leading-relaxed whitespace-pre-line">
            {bioContent}
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-center">
            <div className="flex gap-4">
               <Heart className="text-pink-400" size={32} />
               <BookOpen className="text-purple-400" size={32} />
               <PenTool className="text-blue-400" size={32} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}