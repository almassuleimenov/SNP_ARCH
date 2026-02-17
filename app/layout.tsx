import type { Metadata } from "next";
// 1. ИМПОРТИРУЕМ CORMORANT GARAMOND
import { Inter, Cormorant_Garamond } from "next/font/google"; 
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import Noise from "@/components/ui/Noise";
import Preloader from "@/components/ui/Preloader";
import SmoothScroll from "@/components/ui/SmoothScroll"; // 👈 ИМПОРТ СКРОЛЛА

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
    icon: "/icon.png", // Не забудь про фавиконку, про которую я говорил!
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 3. ДОБАВЛЯЕМ ОБЕ ПЕРЕМЕННЫЕ В BODY */}
      <body className={`${inter.variable} ${cormorant.variable} font-sans bg-black text-white antialiased`}>
        
        {/* 👇 ОБЕРАЧИВАЕМ ВСЁ В SMOOTH SCROLL 👇 */}
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

        </SmoothScroll>

      </body>
    </html>
  );
}