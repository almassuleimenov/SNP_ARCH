import type { Metadata } from "next";
// 1. ИМПОРТИРУЕМ CORMORANT GARAMOND
import { Inter, Cormorant_Garamond } from "next/font/google"; 
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import Noise from "@/components/ui/Noise";
import Preloader from "@/components/ui/Preloader";

// 2. НАСТРАИВАЕМ ШРИФТЫ
const inter = Inter({ 
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans", // Это имя переменной для Tailwind
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  variable: "--font-serif", // Имя для serif шрифта
  weight: ["300", "400", "500", "600", "700"], // Загружаем разные толщины
  style: ["normal", "italic"], // Обязательно курсив для красоты
});

export const metadata: Metadata = {
  title: "SNP.ARCH | Architecture Studio",
  description: "Premium architecture and interior design based in Almaty.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* 3. ДОБАВЛЯЕМ ОБЕ ПЕРЕМЕННЫЕ В BODY */}
      <body className={`${inter.variable} ${cormorant.variable} font-sans bg-black text-white antialiased`}>
        
        <Preloader />
        <div className="hidden md:block">
            <CustomCursor />
        </div>
        <Noise />
        <Navbar />

        <div className="relative z-10">
            {children}
        </div>

      </body>
    </html>
  );
}