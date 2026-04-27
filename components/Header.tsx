import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"


export default function Header(){
    return(
        <div className="container mx-auto px-5 md:px-8  py-4 w-full flex items-center justify-between">
            <div className="space-x-3 hidden md:block">
                <Link href="" className="text-sm font-bold">Stories</Link>
                <Link href="" className="text-sm font-bold">Manifesto</Link>
                <Link href="" className="text-sm font-bold">Podcast</Link>
                <Link href="" className="text-sm font-bold">Cities</Link>
            </div>
            <div>
                <Link href="">
                <Image src="/Africa-new.png" className="size-24 md:size-32" width={120} height={120} alt="logo" />
                </Link>
            </div>

            <div className="hidden md:block ">
                <Button variant="outline" className="text-sm font-bold text-black border-2 border-black px-6">Join the Movement </Button>
                <Button variant="ghost" className="text-sm font-bold">Eng 
                </Button>    
            </div>
            <div className="md:hidden">
                <Image src="/menu.svg" width={55} height={55} alt="logo" />

            </div>


        </div>
    )
}