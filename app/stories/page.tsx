import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronLeft } from 'lucide-react';
import { StoriesSuspense } from "@/components/ui/suspense";
import { StoriesList } from "@/components/StoriesList";

export default function Stories() {
  return (
    <div className="w-full">
      <Header />
      
      {/* Stories heading */}
      <div className=" container mx-auto px-6 md:px-8">
        <div className="flex items-center gap-2 mb-4 md:mb-6">
          <ChevronLeft size={24} className="text-[#1a1a1a] -rotate-90" />
          <h1 className="font-bold text-xl ">Stories</h1>
        </div>
        <p className=" p-text-base md:text-lg text-[#444] max-w-5xl ">
          Everyday builders. Bold ideas. Real impact. Stories from across Africa designers, founders, scientists, artists, farmers showing how ingenuity and community move us forward.
        </p>
      </div>

      {/* Stories Grid with Suspense */}
      <div className="container mx-auto px-6 md:px-8 py-10">
        <StoriesSuspense>
          <StoriesList />
        </StoriesSuspense>
      </div>
      
      <Footer />
    </div>
  );
}