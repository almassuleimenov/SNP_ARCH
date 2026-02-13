import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Founder from "@/components/home/Founder"; // <-- ИМПОРТ
import SelectedProjects from "@/components/home/SelectedProjects";
import Location from "@/components/home/Location"; 
import Consultation from "@/components/home/Consultation";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <About />
      <Founder /> {/* <-- ДОБАВИЛИ СЮДА */}
      <SelectedProjects />
      <Location />
      <Consultation />
      <Footer />
    </main>
  );
}