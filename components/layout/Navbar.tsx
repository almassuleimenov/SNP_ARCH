// src/components/layout/Navbar.tsx

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6 text-white mix-blend-difference">
      {/* Логотип */}
      <div className="text-xl font-bold uppercase tracking-widest">
        SNP.ARCH
      </div>

      {/* Меню */}
      <div className="flex gap-8 text-sm font-medium">
        <Link href="/" className="hover:opacity-50 transition-opacity">Projects</Link>
        <Link href="/" className="hover:opacity-50 transition-opacity">Studio</Link>
        <Link href="/" className="hover:opacity-50 transition-opacity">Contact</Link>
      </div>
    </nav>
  );
}