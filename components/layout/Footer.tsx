'use client';

import { ArrowUp, Instagram, Linkedin, Palette, Mail, Phone } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link'; 

export default function Footer() {

    const pathname = usePathname(); 

  if (pathname && pathname.startsWith('/studio')) {
    return null;
  }
  
  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-black text-white pt-20 pb-10 px-6 md:px-20 border-t border-white/10">
      
      {/* 1. BIG CALL TO ACTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-10">
        <div>
            {/* Дорогой шрифт для заголовка */}
            <h2 className="text-5xl md:text-9xl font-serif italic text-white/90 mb-8">
                Have an Idea?
            </h2>
            <a 
                href="mailto:hello@snp.arch" 
                className="group flex items-center gap-4 text-xl md:text-3xl font-light text-gray-400 hover:text-white transition-colors"
            >
                <div className="p-3 rounded-full border border-white/20 group-hover:bg-white group-hover:text-black transition-all">
                    <Mail className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <span className="border-b border-transparent group-hover:border-white pb-1 transition-all">
                    hello@snp.arch
                </span>
            </a>
        </div>

        <button 
            onClick={(e) => scrollToTop(e)}
            className="hidden md:flex flex-col items-center gap-3 group cursor-pointer"
        >
            <div className="p-5 rounded-full border border-white/20 group-hover:bg-white group-hover:text-black transition-all duration-500">
                <ArrowUp className="w-6 h-6" />
            </div>
            <span className="text-xs uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">Back to Top</span>
        </button>
      </div>

      {/* 2. GRID INFO */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-20 border-t border-white/10 pt-16 pb-20">
        
        {/* Location */}
        <div className="flex flex-col gap-6">
            <h4 className="text-xs text-gray-500 uppercase tracking-widest">Location</h4>
            <address className="not-italic text-lg text-gray-300 leading-relaxed font-light">
                мкр. Самал-3, 15к1<br />
                Алматы, Казахстан
            </address>
        </div>

        {/* Socials - С большими отступами */}
        <div className="flex flex-col gap-6">
            <h4 className="text-xs text-gray-500 uppercase tracking-widest">Socials</h4>
            <div className="flex flex-col gap-4 text-lg text-gray-400 font-light">
                <a href="https://instagram.com" target="_blank" className="hover:text-white transition-colors flex items-center gap-3 w-fit">
                    <Instagram className="w-4 h-4" /> Instagram
                </a>
                <a href="https://linkedin.com" target="_blank" className="hover:text-white transition-colors flex items-center gap-3 w-fit">
                    <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
                <a href="https://behance.net" target="_blank" className="hover:text-white transition-colors flex items-center gap-3 w-fit">
                    <Palette className="w-4 h-4" /> Behance
                </a>
            </div>
        </div>

        {/* Menu - С большими отступами */}
        <div className="flex flex-col gap-6">
            <h4 className="text-xs text-gray-500 uppercase tracking-widest">Sitemap</h4>
            <div className="flex flex-col gap-4 text-lg text-gray-400 font-light">
                <a href="/" onClick={scrollToTop} className="hover:text-white transition-colors w-fit">Home</a>
                <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="hover:text-white transition-colors w-fit">Selected Works</a>
                <a href="#location" onClick={(e) => scrollToSection(e, 'studio')} className="hover:text-white transition-colors w-fit">The Studio</a>
                <a href="#consultation" onClick={(e) => scrollToSection(e, 'consultation')} className="hover:text-white transition-colors w-fit">
                    Contact
                </a>            
                </div>
        </div>

         {/* Contact */}
         <div className="flex flex-col gap-6">
            <h4 className="text-xs text-gray-500 uppercase tracking-widest">Phone</h4>
            <div className="flex flex-col gap-4 text-lg text-gray-400 font-light">
                <a href="tel:+77478306902" className="hover:text-white transition-colors flex items-center gap-3 w-fit">
                    <Phone className="w-4 h-4" /> +7 (747) 830 69 02
                </a>
            </div>
        </div>
      </div>

      {/* 3. COPYRIGHT */}
      <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 uppercase tracking-wider pt-8 border-t border-white/5 font-sans">
        <span>© 2026 SNP.ARCH. All rights reserved.</span>
        
        <div className="flex gap-8 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-400 transition-colors">Terms of Use</Link>
        </div>
        
        <span className="hidden md:block opacity-50 hover:opacity-100 transition-opacity">
            Designed by Suleimenov Almas
        </span>
      </div>
    </footer>
  );
}