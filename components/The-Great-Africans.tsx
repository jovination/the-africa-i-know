import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";

export default function TheGreatAfricans() {
    return (
        <div className=" w-full container mx-auto py-12 flex flex-col items-center px-6 md:px-8">
            <div className="max-w-4xl w-full h- md:h-125 rounded-2xl overflow-hidden relative">
                <iframe
                    src="https://www.youtube.com/embed/ag_I7UOvA8w"
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="The Great Africans"
                />
            </div>
            <div className="mt-20 flex flex-col items-center">
                     <span className="text-5xl text-center">The Great Africans</span>
                <p className="max-w-2xl text-md text-center font-bold mt-3">Across this continent, there are people building something extraordinary. Not for headlines. Not for applause. But because the work demands it.</p>
                <p className="max-w-2xl text-sm text-[#878787] text-center mt-3">The Great Africans is where we sit with them. One conversation. One story. One builder at a time. Each episode brings you into an intimate conversation with an African whose work embodies Ubuntu the belief that our humanity is intertwined, that we do not rise alone. </p>
                <p className="max-w-2xl text-sm text-[#878787] text-center mt-4">These are leaders, entrepreneurs, healers, advocates, and everyday heroes who are shaping the continent not from a distance, but from within. This is not an interview show. It is a space for truth, reflection, and the kind of honesty that only comes when people speak from the heart. </p>
                <Button className="bg-[#F3F3F3] text-black hover:bg-[#F3f3f3] mt-4 ">Hosted by Mwamvita Makamba. Guided by Ubuntu.</Button>
                <div className="flex items-center gap-2 mt-4">
                    <p>Available on </p>
                    <p className="font-bold"> Apple Podcasts, Spotify, YouTube, and wherever you listen.</p>
                </div>
               <Link href="https://www.youtube.com/@TheGreatAfricans" target="_blank" rel="noopener noreferrer">
                    <Button className="w-fit mt-4 bg-[#9F8033] h-13 hover:bg-[#9f8033]/90 px-12">Listen Now     <Mic className="ml-2" /></Button>
                </Link>



            </div>
        </div>
    )
}