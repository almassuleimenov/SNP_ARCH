import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 🔥 ДОБАВЛЯЕМ ЭТУ СТРОКУ
    // Теперь Next.js разрешит использовать качество 95 и 100 для твоих фото
    qualities: [75, 95, 100], 
    
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;