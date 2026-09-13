"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Ana Sayfa", href: "/" },
    { name: "Ben Kimim?", href: "/ben-kimim" },
    { name: "Kitaplarım", href: "/kitaplar" },
    { name: "Ekrandakiler", href: "/ekrandakiler" },
    { name: "Anılarımız", href: "/anilar" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-lg shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center bg-white/80 backdrop-blur-md rounded-full px-6 py-3 shadow-sm border-2 border-pink-100">
          
          {/* Logo / Yazar İsmi */}
          <Link href="/" className="flex flex-col items-center group overflow-visible">
            <span className="font-display text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b9e] to-[#4facfe] group-hover:scale-105 transition-transform pb-1 px-1 drop-shadow-sm">
              Çizgi Film Abla
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-1">
            {links.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="px-4 py-2 text-slate-600 font-display font-bold text-lg rounded-full hover:bg-pink-100 hover:text-pink-600 transition-all duration-200"
              >
                {link.name}
              </Link>
            ))}
            
            {/* Sepet */}
            <div className="w-px h-6 bg-slate-200 mx-1"></div>
            <Link href="/sepet" className="flex items-center justify-center p-2.5 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white hover:shadow-lg hover:scale-105 transition-all relative border-2 border-white ml-1">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-slate-800 text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center shadow-sm border-2 border-white">
                0
              </span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <Link href="/sepet" className="flex items-center justify-center p-2 rounded-full bg-pink-400 text-white relative">
              <ShoppingCart size={20} />
            </Link>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-pink-500 p-2 bg-white rounded-full shadow-sm"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-4 right-4 mt-2 bg-white rounded-[2rem] shadow-xl overflow-hidden border-2 border-pink-100"
          >
            <div className="px-4 py-4 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-6 py-3 rounded-2xl font-display text-xl font-bold text-center text-slate-600 hover:text-white hover:bg-pink-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
