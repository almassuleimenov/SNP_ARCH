'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Send, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function Consultation() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const phoneNumber = "77478306902";
  // Кодируем сообщение для WhatsApp, чтобы оно перенеслось корректно
  const waMessage = encodeURIComponent("Здравствуйте! Хочу записаться на консультацию.");
  
  return (
    <section className="bg-zinc-950 text-white py-20 md:py-32 px-6 md:px-20 border-t border-white/10">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
        
        {/* --- ЛЕВАЯ ЧАСТЬ: ФОРМА --- */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
        >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6">
                Book a<br /> 
                {/* Используем наш красивый шрифт для акцента */}
                <span className="font-serif italic text-gray-400 font-light text-5xl md:text-7xl">
                  Consultation
                </span>
            </h2>
            <p className="text-gray-400 mb-12 text-lg font-light leading-relaxed max-w-md">
                Оставьте контакты, и мы свяжемся с вами для обсуждения деталей вашего будущего проекта.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                {/* Input: Name */}
                <div className="relative group">
                    <input 
                        type="text" 
                        required
                        placeholder="Как к вам обращаться?" 
                        // py-4 (высокие поля) + text-lg (крупный текст)
                        className="w-full bg-transparent border-b border-white/20 py-4 text-lg focus:outline-none focus:border-white transition-colors placeholder:text-gray-600 font-light"
                    />
                </div>
                
                {/* Input: Phone */}
                <div className="relative group">
                    <input 
                        type="tel" 
                        required
                        placeholder="+7 (___) ___ __ __" 
                        className="w-full bg-transparent border-b border-white/20 py-4 text-lg focus:outline-none focus:border-white transition-colors placeholder:text-gray-600 font-light"
                    />
                </div>

                {/* Submit Button - Крупная кнопка */}
                <button 
                    type="submit"
                    className="group flex items-center justify-between w-full bg-white text-black px-8 py-5 mt-6 hover:bg-gray-200 transition-colors"
                >
                    <span className="text-sm tracking-widest uppercase font-bold">
                        {isSubmitted ? "Отправлено" : "Оставить заявку"}
                    </span>
                    <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${isSubmitted ? 'translate-x-2' : 'group-hover:translate-x-2'}`} />
                </button>
            </form>
        </motion.div>

        {/* --- ПРАВАЯ ЧАСТЬ: МЕССЕНДЖЕРЫ --- */}
        <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10 pt-16 md:pt-0 md:pl-24"
        >
            <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-8">
                Быстрая связь
            </h3>

            <div className="flex flex-col gap-6">
                {/* WhatsApp */}
                <a 
                    href={`https://wa.me/${phoneNumber}?text=${waMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-6 border border-white/10 hover:border-[#25D366] transition-colors bg-white/5 backdrop-blur-sm"
                >
                    <div className="flex items-center gap-5">
                        <MessageCircle className="w-8 h-8 text-gray-400 group-hover:text-[#25D366] transition-colors" />
                        <div>
                            <div className="text-xl font-medium">WhatsApp</div>
                            <div className="text-sm text-gray-500 font-light">Отвечаем сразу</div>
                        </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-[#25D366] -rotate-45 transition-transform" />
                </a>

                {/* Telegram */}
                <a 
                    href={`https://t.me/snparch`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-6 border border-white/10 hover:border-[#229ED9] transition-colors bg-white/5 backdrop-blur-sm"
                >
                    <div className="flex items-center gap-5">
                        <Send className="w-8 h-8 text-gray-400 group-hover:text-[#229ED9] transition-colors" />
                        <div>
                            <div className="text-xl font-medium">Telegram</div>
                            <div className="text-sm text-gray-500 font-light">Личный чат архитектора</div>
                        </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-[#229ED9] -rotate-45 transition-transform" />
                </a>
            </div>
        </motion.div>

      </div>
    </section>
  );
}