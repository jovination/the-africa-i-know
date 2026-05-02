"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardFooter } from "./ui/card"
import Image from "next/image"
import { Play } from "lucide-react"
import { getCities, type City } from "@/app/data/cities"
import { type YouTubeVideoData } from "@/lib/youtube"

// City data is now imported from @/app/data/cities

interface CityWithMetadata extends City {
  metadata: YouTubeVideoData | null;
}

export default function Cities(){
    const [citiesWithMetadata, setCitiesWithMetadata] = useState<CityWithMetadata[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCitiesAndMetadata = async () => {
            try {
                // First fetch cities from API
                const citiesData = await getCities();
                
                // Then fetch metadata for each city
                const results = await Promise.allSettled(
                    citiesData.map(async (city: City) => {
                        try {
                            const response = await fetch('/api/youtube', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ videoUrl: city.videoUrl })
                            });
                            
                            if (response.ok) {
                                const data = await response.json();
                                return { ...city, metadata: data.data };
                            } else {
                                return { ...city, metadata: null };
                            }
                        } catch (error) {
                            console.error('Error fetching city metadata:', error);
                            return { ...city, metadata: null };
                        }
                    })
                );

                const successfulResults = results
                    .filter((result: PromiseSettledResult<CityWithMetadata>) => result.status === 'fulfilled')
                    .map((result: PromiseFulfilledResult<CityWithMetadata>) => result.value);

                setCitiesWithMetadata(successfulResults);
            } catch (error) {
                console.error('Error fetching cities:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCitiesAndMetadata();
    }, []);
    return(
        <div id="cities" className="w-full bg-white">
            <div className="container mx-auto px-5 md:px-8 py-12 flex flex-col items-center min-h-screen">
                <span className="text-5xl text-center">My City in 60 Seconds</span>
            <p className="max-w-2xl text-sm text-[#878787] text-center mt-3">60 seconds. One city. The rhythm, the beauty, the people. Narrated by Mwamvita, guided by Ubuntu.</p>
            <div className="mt-10 max-w-lg w-full">
                <Field orientation="horizontal">
                <Input  className="h-12 w-full " type="search" placeholder="Search 60 Sec Video by Cities or Countries..." />
                <Button className="h-12 px-8">Search</Button>
                </Field>
            </div>
            <div className="max-w-7xl w-full mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    // Loading skeleton
                    Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="w-full p-0 pb-5 rounded-2xl overflow-hidden shadow-sm animate-pulse">
                            <div className="relative w-full h-64 bg-gray-300 rounded-2xl mb-4"></div>
                            <div className="px-4 space-y-2">
                                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                            </div>
                        </div>
                    ))
                ) : (
                    citiesWithMetadata.map((city) => (
                        <Card key={city.id} className="w-full cursor-pointer p-0 pb-5 transition-transform duration-300 rounded-2xl overflow-hidden shadow-sm"
                              onClick={() => window.open(city.videoUrl, '_blank')}>
                            <CardHeader className="p-0 relative w-full h-64">
                                <Image 
                                    src={city.metadata?.thumbnail || '/placeholder.jpg'} 
                                    alt={city.metadata?.title || city.location} 
                                    fill
                                    className="object-cover rounded-2xl"
                                    sizes="200px"    
                                />
                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-16 h-16 bg-black/30 rounded-full flex items-center justify-center shadow-lg pointer-events-auto hover:bg-black/40 transition-colors cursor-pointer">
                                        <Play className="w-7 h-7 text-white ml-1" />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardFooter className="flex items-center justify-between">
                                <div>
                                    <p className="text-md">{city.location}, {city.country}</p>
                                    <p className="text-lg font-bold">{city.metadata?.views || 'Loading...'} Views</p>
                                </div>
                                <div>
                                    <p className="text-sm text-right">Published</p>
                                    <p className="text-md font-bold text-right">{city.metadata?.publishedDate || 'Loading...'}</p>
                                    <p className="text-xs text-gray-600 text-right">{city.platform}</p>
                                </div>
                            </CardFooter>
                        </Card>
                    ))
                )}
                <div className="w-full bg-[#FEF7ED] rounded-2xl p-8 text-center flex flex-col items-center justify-center shadow-sm">
                    <p className="text-4xl font-bold mb-4 text-center">More cities<br />coming soon.</p>
                    <p className="text-lg text-gray-600 ">Want yours featured?</p>
                    <p className="text-md text-gray-700 font-medium">Tag us with <strong>#MyCityIn60Seconds</strong></p>
                </div>

            </div>

                
            </div>
        </div>
    )
}