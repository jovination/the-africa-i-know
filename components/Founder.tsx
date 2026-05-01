    
import Image from "next/image"
import Link from "next/link"
import { FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";

    export default function Founder() {
    return (
        <div className="w-full bg-[#FEF7ED]">
        <div className="w-full container mx-auto px-6 md:px-8 py-10 flex flex-col md:flex-row gap-10">
            <div className="flex items-center justify-center max-w-145 w-full h-100 md:h-150 overflow-hidden relative rounded-2xl">
                <Image src="/Thefounder.webp" alt="Founder" fill className="object-cover" />
            </div>
            <div className="max-w-2xl">
                <div>
                <h1 className="text-2xl font-bold text-[#525252]">The Founder</h1>
                <h3 className="text-4xl font-bold mb-2">Mwamvita Makamba</h3>
                <p className="text-sm mb-3">Tanzanian entrepreneur, investor, and Pan-African business leader. Founder and Chair of MMConnect Africa, with over 15 years of experience across telecommunications, technology, and digital transformation in Sub-Saharan Africa. Through ventures including Kuza Capital, Tiketika, Jibusti Energies, and MMCarbon, she drives commercially viable solutions that expand access and unlock inclusive growth across the continent.</p>
                <p className="text-sm mb-3">Mwamvita previously held senior leadership roles within the Vodacom and Vodafone ecosystem, contributing to the expansion of digital connectivity and financial inclusion across multiple African markets. She served for a decade on the Vodafone Group Foundation Board of Trustees, supporting large-scale social impact initiatives.</p>
                <p className="text-sm ">The Africa I Know is her calling a platform to tell Africa’s story with dignity, beauty, and truth.</p>
                </div>
                <div className="mt-6">
                    <p className="text-lg font-bold ">Lets Connect</p>  
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <Link href="https://www.instagram.com/mwamvitamakamba/" target="_blank" rel="noopener noreferrer">
                    <div className="flex items-center justify-center gap-3 bg-[#A435B5] text-white px-3 py-2 rounded-md cursor-pointer hover:opacity-90 transition-opacity">
                        <FaInstagram size={28} />
                        <p className="text-md font-medium">Instagram</p>
                    </div>
                </Link>
                <Link href="https://www.linkedin.com/in/mwamvita-makamba-26572ab/" target="_blank" rel="noopener noreferrer">
                    <div className="flex items-center justify-center gap-3 bg-[#0077B5] text-white px-3 py-2 rounded-md cursor-pointer hover:opacity-90 transition-opacity">
                        <FaLinkedin size={28} />
                        <p className="text-md font-medium">LinkedIn</p>
                    </div>
                </Link>
                <Link href="https://x.com/Makambas" target="_blank" rel="noopener noreferrer">
                    <div className="flex items-center justify-center gap-3 bg-[#000000] text-white px-3 py-2 rounded-md cursor-pointer hover:opacity-90 transition-opacity">
                        <FaXTwitter size={28} />
                        <p className="text-md font-medium">X</p>
                    </div>
                </Link>
                </div>
            </div>
        </div>
        </div>
    )
}