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
      
      <footer className="w-full bg-slate-50 py-12 text-center border-t border-slate-100 mt-auto">
        <p className="text-slate-500 font-medium font-display">
          © {new Date().getFullYear()} Çizgi Film Abla (Elif Çiftçi). Tüm hakları saklıdır.
        </p>
      </footer>
    </div>
  );
}
