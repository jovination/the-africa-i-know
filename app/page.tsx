import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ManifestoSection from "@/components/ManifestoSection"
import Footer from "@/components/Footer";
import NominateBuilder from "@/components/NominateBuilder";
import Founder from "@/components/Founder";
import TheGreatAfricans from "@/components/The-Great-Africans";



export default function Home() {
  return (
    <div className="">
      <div className="w-full min-h-screen">
      <Header />
      <Hero />
      </div>
      <ManifestoSection />
      <TheGreatAfricans />
      <NominateBuilder />
      <Founder />
      <Footer />
    </div>
  );
}
