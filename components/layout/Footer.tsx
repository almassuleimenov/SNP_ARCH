'use client';

import { ArrowUp, Instagram, Linkedin, Palette, Mail, Phone } from 'lucide-react'; // Добавил иконки Linkedin и Palette (для Behance)

export default function Footer() {
  
  // Умная функция скролла
  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault(); // Отменяем стандартный переход
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Скролл наверх
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    // Добавили id="contact", чтобы ссылка Contact вела сюда
    <footer id="contact" className="bg-black text-white pt-20 pb-10 px-6 md:px-20 border-t border-white/10">
      
      {/* 1. BIG CALL TO ACTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-10">
        <div>
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase mb-6">
                Have an Idea?
            </h2>
            <a 
                href="mailto:hello@snp.arch" 
                className="group flex items-center gap-4 text-2xl md:text-4xl font-serif italic text-gray-400 hover:text-white transition-colors border-b border-transparent hover:border-white pb-2"
            >
                <Mail className="w-6 h-6 md:w-8 md:h-8" />
                <span>hello@snp.arch</span>
            </a>
        </div>

        <button 
            onClick={(e) => scrollToTop(e)}
            className="hidden md:flex flex-col items-center gap-2 group cursor-pointer"
        >
            <div className="p-4 rounded-full border border-white/20 group-hover:bg-white group-hover:text-black transition-all duration-300">
                <ArrowUp className="w-6 h-6" />
            </div>
            <span className="text-xs uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">Back to Top</span>
        </button>
      </div>

      {/* 2. GRID INFO */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-20 border-t border-white/10 pt-16 pb-20">
       {/* Column 1: Address */}
        <div className="flex flex-col gap-4">
            <h4 className="text-xs text-gray-500 uppercase tracking-widest">Location</h4>
            <address className="not-italic text-lg text-gray-300 leading-relaxed">
                мкр. Самал-3, 15к1<br />
                Алматы, Казахстан
            </address>
        </div>

        {/* Column 2: Socials (ИСПРАВЛЕНО) */}
        <div className="flex flex-col gap-4">
            <h4 className="text-xs text-gray-500 uppercase tracking-widest">Socials</h4>
            <div className="flex flex-col gap-2 text-lg text-gray-300">
                {/* target="_blank" открывает в новой вкладке */}
                <a href="https://www.instagram.com/snp.arch?igsh=Nnp0MmJqc2tzdTM=" target="_blank" className="hover:text-white transition-colors flex items-center gap-2">
                    <Instagram className="w-4 h-4" /> Instagram
                </a>
                <a href="https://linkedin.com" target="_blank" className="hover:text-white transition-colors flex items-center gap-2">
                    <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
                <a href="https://behance.net" target="_blank" className="hover:text-white transition-colors flex items-center gap-2">
                    <Palette className="w-4 h-4" /> Behance
                </a>
            </div>
        </div>

        {/* Column 3: Menu (ИСПРАВЛЕНО - теперь скроллит) */}
        <div className="flex flex-col gap-4">
            <h4 className="text-xs text-gray-500 uppercase tracking-widest">Sitemap</h4>
            <div className="flex flex-col gap-2 text-lg text-gray-300">
                <a href="/" onClick={scrollToTop} className="hover:text-white transition-colors cursor-pointer">
                    Home
                </a>
                {/* Скроллит к id="projects" */}
                <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="hover:text-white transition-colors cursor-pointer">
                    All Projects
                </a>
                {/* Скроллит к id="studio" */}
                <a href="#studio" onClick={(e) => scrollToSection(e, 'studio')} className="hover:text-white transition-colors cursor-pointer">
                    Studio
                </a>
                {/* Скроллит к id="contact" (самому футеру) */}
                <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="hover:text-white transition-colors cursor-pointer">
                    Contact
                </a>
            </div>
        </div>

         {/* Column 4: Phone */}
         <div className="flex flex-col gap-4">
            <h4 className="text-xs text-gray-500 uppercase tracking-widest">Contact</h4>
            <div className="flex flex-col gap-2 text-lg text-gray-300">
                <a href="tel:+77071234567" className="hover:text-white transition-colors flex items-center gap-2">
                    <Phone className="w-4 h-4" /> +7 (747) 830 69 02
                </a>
            </div>
        </div>
      </div>

      {/* 3. COPYRIGHT */}
      <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 uppercase tracking-wider pt-8 border-t border-white/5">
        <span>© 2026 SNP.ARCH. All rights reserved.</span>
        <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400">Terms of Use</a>
        </div>
        <span className="hidden md:block">Designed by Almas</span>
      </div>
    </footer>
  );
}