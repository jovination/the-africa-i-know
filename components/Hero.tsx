import { Button } from "@/components/ui/button"
import {ArrowRight, Mic } from 'lucide-react';
import Image from "next/image"
import { ListenDialog } from "@/components/ListenDialog"
import { FollowButton } from "@/components/FollowButton"
interface HeroCity {
    id: string;
    title: string;
    location: string;
    thumbnail: string;
    featured: boolean;
}

interface APICityResponse {
    id: number;
    title: string;
    location: string;
    thumbnail: string;
    featured: boolean;
}

export default async function Hero() {
    let displayCities: HeroCity[] = [];
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://dashboard.africaiknow.com'}/api/cities`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AFRICA_PODCAS_API}`,
                'Content-Type': 'application/json'
            },
            cache: 'force-cache',
            next: { tags: ['cities'] }
        });
        
        if (response.ok) {
            const result = await response.json();
            if (result.success && result.data && result.data.length > 0) {
                const featured = (result.data as APICityResponse[])
                    .filter((city) => city.featured)
                    .map((city) => ({ ...city, id: city.id.toString() }));
                displayCities = featured.slice(0, 2);
            }
        }
    } catch (error) {
        console.error("Error fetching cities for Hero:", error);
    }

    // Default static fallback if API fails or no data
    if (displayCities.length === 0) {
        displayCities = [
            {
                id: 'static-1',
                title: 'Visual by iam_jerry.tz ',
                location: 'Dar es Salaam, Tanzania',
                thumbnail: '/dar-es-salaam.png',
                featured: true
            },
            {
                id: 'static-2',
                title: 'Visual By telemediang',
                location: 'Lagos, Nigeria',
                thumbnail: '/nigeria.png',
                featured: true
            }
        ];
    }

    return (
        <div className="container mx-auto px-6 md:px-8 w-full">
            <div className="py-10 md:py-20 w-full flex flex-col items-center space-y-4">
                <Button className="bg-[#F3F3F3] text-black hover:bg-[#F3f3f3] ">A movement. A mindset. A mirror of who we are.</Button>
                <h1 className="text-black text-4xl md:text-6xl font-bold text-center">THE AFRICA I KNOW</h1>
                <p className="max-w-md w-full text-center text-[#878787] text-sm">A Pan-African platform celebrating innovation, resilience, and abundance amplifying voices that move our continent forward.</p>
                <div className="w-full md:w-fit grid grid-cols-1 md:grid-cols-2 gap-3 px-5">
                    <ListenDialog />
                    <FollowButton />
                </div>
                <div className="w-full mt-4 grid grid-cols-1  md:flex md:items-center md:justify-center md:px-15 gap-6">
                    {displayCities.map((city, index) => (
                        <div key={city.id} className="md:max-w-142.5 w-full space-y-5">
                            <div className=" h-80 md:h-100 bg-gray-200 rounded-3xl overflow-hidden relative cursor-pointer">
                                <Image src={city.thumbnail} fill className="object-cover" alt={city.location || city.title || "City"} />
                                {city.featured && (
                                    <div className="absolute top-4 left-4 px-5 py-2 bg-black/20 backdrop-blur-md border border-white/60 rounded-full">
                                        <p className="text-white font-semibold text-sm">Featured</p>
                                    </div>
                                )}
                            </div>
                            <span className={index === 0 ? "text-2xl text-[#737373] mt-20" : "text-2xl text-[#737373]"}>
                                {city.location ? `${city.location} - ${city.title}` : city.title}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}