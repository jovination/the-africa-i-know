import { Button } from "@/components/ui/button"
import {ArrowRight, Mic } from 'lucide-react';
import Image from "next/image"



export default function Hero(){
    return(
        <div className="container mx-auto px-6 md:px-8 w-full">
            <div className="py-20 w-full flex flex-col items-center space-y-4">
            <Button className="bg-[#F3F3F3] text-black hover:bg-[#F3f3f3] ">A movement. A mindset. A mirror of who we are.</Button>
            <h1 className="text-black text-4xl md:text-6xl font-bold text-center">THE AFRICA I KNOW</h1>
            <p className="max-w-md w-full text-center text-[#878787] text-sm">A Pan-African platform celebrating innovation, resilience, and abundance amplifying voices that move our continent forward.</p>
            <div className="w-full md:w-fit grid grid-cols-1 md:grid-cols-2 gap-3 px-10">
                <Button className="w-full bg-[#9F8033] h-12 hover:bg-[#9f8033]/90 px-6">Listen the Great Africans     <Mic className="ml-2" /></Button>
                <Button variant="outline" className="w-full h-12 text-black border-2 border-black/70 px-6"> Follow the Movement <ArrowRight className="ml-2" /></Button>
            </div>
            <div className="w-full mt-4 grid grid-cols-1 md:grid-cols-2 md:px-15 gap-6">
                <div className="w-full space-y-5">
                <div className="md:max-w-[570px] w-full h-[400px] bg-gray-200 rounded-2xl overflow-hidden relative">
                    <Image src="/dar-es-salaam.png" fill className="object-cover" alt="Dar es Salaam" />
                </div>
                <span className="text-2xl text-[#737373] mt-20">Dar es Salaam, Tanzania - Visual by iam_jerry.tz </span>
                </div>
                <div className="w-full space-y-5">
                <div className="md:max-w-[570px] w-full h-[400px] bg-gray-200 rounded-2xl overflow-hidden relative">
                    <Image src="/nigeria.png" fill className="object-cover" alt="Nairobi" />
                </div>
                <span className="text-2xl text-[#737373]">Lagos, Nigeria - Visual By telemediang</span>
                </div>
            </div>

            </div>
            
        </div>
    )
}