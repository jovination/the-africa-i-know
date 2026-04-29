import Image from 'next/image';
import YouTubePodcastPlayer from './YouTubePodcastPlayer';

export default function ManifestoSection() {
    return (
        <div className="w-full min-h-screen bg-[#FEF7ED] ">
            <div className="w-full container mx-auto px-6 md:px-8 flex flex-col items-center py-10 space-y-4">
            <span className="text-5xl text-center">The Manifesto</span>
            <p className="max-w-md text-md font-bold text-center">Africa is not a place of lack it is a place of light.</p>
            <p className="max-w-2xl text-sm text-[#878787] text-center">The Africa I Know is a Pan-African movement born from pride, purpose, and the desire to reclaim our narrative. It is a call to celebrate the Africa that is innovative, resilient, creative, and abundant the Africa that moves with unity and love.</p>

            <p className="max-w-2xl text-sm text-[#878787] text-center">It is a movement of Africans telling their own stories of impact, progress, and transformation through the spirit of Ubuntu: “I am because we are.” For too long, Africa’s story has been told about us, not by us. This movement changes that. By amplifying voices, connecting changemakers, and celebrating our shared humanity, we are shaping a collective consciousness that reminds us all: Africa is not a place of lack it is a place of light.</p>
            <div className="max-w-6xl w-full bg-[#F8F0E4] rounded-2xl mt-10 p-5 md:p-10 flex flex-col md:flex-row gap-10">
                <div className="md:max-w-75 w-full h-75 relative overflow-hidden rounded-2xl">
                    <Image src="/founder.webp" alt="Founder" fill className="object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                    <p className="font-bold text-xl">FOUNDER QUOTE</p>
                    <p className="font-bold">By Mwamvita Makamba</p>
                    <p className="font-thin text-gray-200">Founder</p>
                    <p className="font-bold text-xl max-w-lg">“This is not just a communications exercise. It is a movement grounded in Ubuntu. Every post, every story, every conversation is part of a larger mosaic of an Africa that is moving forward, together.”</p>

                </div>
        

            </div>
        <div className='w-full flex flex-col items-center'>
        <YouTubePodcastPlayer
        youtubeUrl="https://youtu.be/DHKPLklcXRU?si=0wGAgvsVHW4l8IjO"
      />
                </div>
            </div>

        </div>
    )
}   