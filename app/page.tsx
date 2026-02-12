import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import SelectedProjects from "@/components/home/SelectedProjects";
import Footer from "@/components/layout/Footer"; // <-- Импорт

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <About />
      <SelectedProjects />
      <Footer /> 
    </main>
  );
}