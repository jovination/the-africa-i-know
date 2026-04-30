import Header from "@/components/Header";
import Footer from "@/components/Footer"
import { ChevronLeft } from 'lucide-react';
import Link from "next/link";
import Image from "next/image";



export default function Stories() {
    return (
        <div className="w-full ">
            <Header />
            <div className="container mx-auto  px-6 md:px-8 py-10">
                <Link href="/" className="flex items-center gap-2">
                    <ChevronLeft />
                    <p className="text-xl font-bold">Stories</p>
                </Link>
                <p className="mt-3 text-xl font-bold pl-6">Stories from across the continent are on their way. Innovation. Resilience. Ubuntu. The voices of Africa told by Africans.</p>

                <div className="w-full my-20 bg-[#FEF7ED] rounded-2xl h-150 flex flex-col items-center justify-center space-y-3">
                    <Image src="/Error.svg" alt="Stories" width={300} height={300} />
                    <p className="text-2xl font-bold mt-10">No stories yet</p>
                    <p className="text-md max-w-md text-center">We are curating stories of builders, leaders, and changemakers from across Africa. Be the first to know when they arrive.</p>
                    
                </div>
            </div>
            <Footer />
        </div>
    );
}