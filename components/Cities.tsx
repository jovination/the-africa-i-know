import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardFooter } from "./ui/card"
import Image from "next/image"
import { Play } from "lucide-react"

// City data
const citiesData = [
    {
        id: 1,
        name: "Dar es Salaam",
        country: "Tanzania",
        image: "/dar-es-salaam.png",
        views: "1.3M+",
        publishedDate: "October 15, 2025",
        platform: "Youtube"
    },
    {
        id: 2,
        name: "Lagos",
        country: "Nigeria",
        image: "/nigeria.png",
        views: "2.1M+",
        publishedDate: "September 28, 2025",
        platform: "Youtube"
    },
    {
        id: 3,
        name: "Zanzibar City",
        country: "Tanzania",
        image: "/zanzibar.png",
        views: "890K+",
        publishedDate: "November 2, 2025",
        platform: "Youtube"
    },
    {
        id: 4,
        name: "Kigali",
        country: "Rwanda",
        image: "/rwanda.png",
        views: "1.5M+",
        publishedDate: "October 8, 2025",
        platform: "Youtube"
    },
    {
        id: 5,
        name: "Johannesburg",
        country: "South Africa",
        image: "/south-africa.png",
        views: "3.2M+",
        publishedDate: "September 15, 2025",
        platform: "Youtube"
    }
];

export default function Cities(){
    return(
        <div className="w-full bg-white">
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
                {citiesData.map((city) => (
                    <Card key={city.id} className="w-full cursor-pointer p-0 pb-5 transition-transform duration-300 rounded-2xl overflow-hidden shadow-sm">
                        <CardHeader className="p-0 relative w-full h-64">
                        <Image src={city.image} alt={city.name} fill
                        className="object-cover rounded-2xl"
                        sizes="200px"    />
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-16 h-16 bg-black/30   rounded-full flex items-center justify-center shadow-lg pointer-events-auto hover:bg-black/40 transition-colors cursor-pointer">
                                <Play className="w-7 h-7 text-white ml-1" />
                            </div>
                        </div>
                        </CardHeader>
                        <CardFooter className="flex items-center justify-between">
                            <div>
                                <p className="text-md">{city.name}, {city.country}</p>
                                <p className="text-lg font-bold ">{city.views} Views</p>
                            </div>
                            <div>
                                <p className="text-sm text-right">Published</p>
                                <p className="text-md font-bold text-right">{city.publishedDate}</p>
                                <p className="text-xs text-gray-600 text-right">{city.platform}</p>
                            </div>
                        </CardFooter>
                        
                    </Card>
                ))}
                <div className="w-full bg-[#FEF7ED] rounded-2xl p-8 text-center flex flex-col items-center justify-center">
                    <p className="text-4xl font-bold mb-4 text-center">More cities<br />coming soon.</p>
                    <p className="text-lg text-gray-600 ">Want yours featured?</p>
                    <p className="text-md text-gray-700 font-medium">Tag us with <strong>#MyCityIn60Seconds</strong></p>
                </div>

            </div>

                
            </div>
        </div>
    )
}