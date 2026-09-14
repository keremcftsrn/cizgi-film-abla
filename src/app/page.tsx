import HeroSection from "@/components/HeroSection";
import GallerySection from "@/components/GallerySection";
import BooksSection from "@/components/BooksSection";
import AnimationsSection from "@/components/AnimationsSection";
import ProjectsSection from "@/components/ProjectsSection";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Home() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "global" } }) || {
    heroImage: null,
    heroTitle: "Merhaba, Ben Elif Çiftçi",
    heroSubtitle: "Yıllardır çocukların dünyasına hikayelerle, renklerle ve neşeyle dokunan bir yazar ve senaristim.",
    aboutText: "Sadece sayfalarda değil, ekranlarda da varım! Kahramanlarımı evlerinize misafir ediyor, hayal gücünüze eşlik ediyorum."
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden bg-[#fffbfa]">
      <HeroSection settings={settings} />
      
      {/* Masalsı Dalga Geçişi */}
      <div className="w-full overflow-hidden leading-none z-10 -mt-2">
        <svg className="relative block w-full h-[40px] md:h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#fefce8"></path>
        </svg>
      </div>

      <GallerySection />
      
      <div className="w-full overflow-hidden leading-none z-10 -mt-1 bg-white">
        <svg className="relative block w-full h-[40px] md:h-[60px] rotate-180" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#fefce8"></path>
        </svg>
      </div>

      <BooksSection />
      <AnimationsSection />
      <ProjectsSection />
      
            <footer className="w-full bg-slate-50 py-12 text-center border-t border-slate-100 mt-auto flex flex-col items-center justify-center">
        <div className="flex gap-6 mb-6">
          {settings.socialInstagram && (
            <a href={settings.socialInstagram} target="_blank" className="text-slate-400 hover:text-pink-500 transition">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
          )}
          {settings.socialYoutube && (
            <a href={settings.socialYoutube} target="_blank" className="text-slate-400 hover:text-red-500 transition">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          )}
          {settings.socialTiktok && (
            <a href={settings.socialTiktok} target="_blank" className="text-slate-400 hover:text-black transition">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
            </a>
          )}
        </div>
        <p className="text-slate-500 font-medium font-display">
          © {new Date().getFullYear()} Çizgi Film Abla (Elif Çiftçi). Tüm hakları saklıdır.
        </p>
      </footer>
    </div>
  );
}
