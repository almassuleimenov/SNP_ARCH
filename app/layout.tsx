import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google"; 
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import Noise from "@/components/ui/Noise";
import Preloader from "@/components/ui/Preloader";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Footer from "@/components/layout/Footer"; // 🔥 1. ДОБАВИЛ ИМПОРТ

// 2. НАСТРАИВАЕМ ШРИФТЫ
const inter = Inter({ 
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "SNP.ARCH | Architecture Studio",
  description: "Premium architecture and interior design based in Almaty.",
  icons: {
    icon: "/icon.png", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable} font-sans bg-black text-white antialiased selection:bg-[#C8A97E] selection:text-black`}>
        
        <SmoothScroll>
            
            <Preloader />
            
            <div className="hidden md:block">
                <CustomCursor />
            </div>
            
            <Noise />
            
            <Navbar />

            <div className="relative z-10">
                {children}
            </div>

            {/* 🔥 2. ВСТАВИЛ ФУТЕР СЮДА */}
            <Footer />

        </SmoothScroll>

      </body>
    </html>
  );
}