import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import Image from "next/image"


export default function TheGreatAfricans() {
    return (
        <div className=" w-full container mx-auto py-12 flex flex-col items-center px-6 md:px-8">
            <div className="max-w-4xl w-full h-90 md:h-125 rounded-2xl overflow-hidden relative">
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
            <div className="py-20 flex flex-col items-center">
                <Button className="w-fit  bg-black h-13 hover:bg-[#9f8033]/90 px-12">Episode 01</Button>
                <div className="mt-10 space-y-3">
                    <p className="text-sm">Guest name</p>
                    <p className="text-3xl font-bold">Dr Mzamo Masito</p>
                    <p className="text-sm text-right">Author. Advocate. Builder.</p>
                </div>
                <div className="md:w-180 w-full h-80 md:h-130 relative overflow-hidden rounded-2xl mt-10">
                    <Image src="/guest.webp" fill alt="Guest" className="object-cover"  />
                </div>
                <div className="flex flex-col items-center mt-10">
                    <span className="text-5xl text-center">Episode Description</span>
                    <p className="max-w-2xl text-md text-center font-bold mt-3">Before the titles. Before the boardrooms. Before the book that is changing a nation’s conversation  there was a boy.</p>
                    <p className="max-w-2xl text-sm text-[#878787] text-center mt-3">A boy from Gugulethu. From the Cape Flats. A boy who grew up in communities shaped by poverty, violence, and the quiet absence of men who had never been taught how to stay.</p>
                    <p className="max-w-2xl text-sm text-[#878787] text-center mt-3">
                        That boy became Dr Mzamo Masito. Google Africa’s first Chief Marketing Officer. A leader at Nike, Unilever, and Vodacom. 
                        A man who held power in the boardrooms of the world’s biggest companies and made the extraordinary choice to walk back. 
                        Back to the communities. Back to the boys. Back to the work that no one else was doing.
                    </p>
                    <p className="max-w-2xl text-sm text-[#878787] text-center mt-3">
                        Twenty years ago, Mzamo co-founded African Men Care a non-profit dedicated to the one group being quietly left behind across this continent: the boy child. And this year, he published a book that is shaking South Africa awake: “This Country Hates Our Boys Boy, You Are On Your Own.”
                    </p>
                    <p className="max-w-2xl text-sm text-[#878787] text-center mt-3">
                        His message is simple. And it is profound: hurt boys become hurting men. If we want to end the cycle of violence, of absence, of pain we must go back to the beginning. We must start with the boy.  
                    </p>
                    <p className="max-w-2xl text-md text-center font-bold mt-3">Every man is every boy.  This is a Great African.</p>
                    <p className="max-w-2xl text-sm text-[#878787] text-center mt-3">
                        In this conversation, Mzamo shares the Africa he knows — the one seen through the eyes of boys who are struggling, men who are searching, and communities that are learning to heal.  He speaks about what Ubuntu truly means when applied to masculinity. And he speaks directly to the young African boy who feels like he is on his own.
                    </p>
                    <p className="max-w-2xl text-sm text-[#878787] text-center mt-3">
                        This is not a long interview. It is a 12-minute conversation. Intimate. Honest. The kind that changes how you see the world.
                    </p>
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
        </div>  
    )
}