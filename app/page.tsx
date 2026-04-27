import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Image from "next/image";
import ManifestoSection from "@/components/ManifestoSection"
import Footer from "@/components/Footer";
import NominateBuilder from "@/components/NominateBuilder";



export default function Home() {
  return (
    <div className="">
      <div className="w-full min-h-screen">
      <Header />
      <Hero />
      </div>
      <ManifestoSection />
      <NominateBuilder />
      <Footer />
    </div>
  );
}
