import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/animations/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: "VONEMIELUS ARCHITECTS",
  description: "Architecture Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-black text-white antialiased`}>
        {/* Курсор ставим выше всех, чтобы он не зависел от анимаций скролла */}
        <CustomCursor /> 
        
        {/* Navbar обычно тоже фиксированный, его можно оставить вне SmoothScroll или внутри — зависит от логики компонента */}

        <SmoothScroll>
          <main>
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}