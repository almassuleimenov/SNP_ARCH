import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
 
export default function NotFound() {
  return (
    <div className="h-screen w-full bg-black text-white flex flex-col items-center justify-center p-4 text-center">
      {/* Огромная цифра */}
      <h1 className="text-[150px] md:text-[250px] font-bold tracking-tighter leading-none opacity-10 select-none">
        404
      </h1>
      
      {/* Сообщение */}
      <div className="absolute flex flex-col items-center gap-6">
          <h2 className="text-2xl md:text-4xl font-serif italic">
            Project not found
          </h2>
          <p className="text-gray-500 max-w-md">
            Похоже, эта страница еще на этапе проектирования или была снесена.
          </p>
          
          <Link 
            href="/" 
            className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Return Home
          </Link>
      </div>
    </div>
  )
}