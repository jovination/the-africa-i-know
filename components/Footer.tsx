import Image from "next/image"
import Link from "next/link"
import JoinForm from "./JoinForm";


export default function Footer(){
    const currentYear = new Date().getFullYear();
    return (
        <div>
            <div className="w-full bg-[#2C2421] py-10 ">
                <div className="max-w-2xl w-full mx-auto flex flex-col items-center">
                <JoinForm />
                </div>
             </div>   
            <div className="w-full bg-black px-6 md:px-8">
                <div className="container mx-auto flex flex-col items-center py-10">
                    <Image src="/African-new.png" width={150} height={150} alt="logo" />

                    <div className="grid grid-cols-3 gap-10 mt-10">
                    <Link href="https://www.instagram.com/theafricaiknow_taik" target="_blank" rel="noopener noreferrer">
                    <Image src="/instagram.png" width={155} height={155} alt="Instagram" />
                    </Link>
                    <Link href="https://open.spotify.com/episode/0GGO5IuSEqxXCi9xDcHMX4" target="_blank" rel="noopener noreferrer">
                    <Image src="/spotify.png" width={150} height={150} alt="Spotify" />
                    </Link>
                    <Link href="https://www.youtube.com/@TheGreatAfricans" target="_blank" rel="noopener noreferrer">
                    <Image src="/youtube-podcast.png" width={130} height={130}  alt="YouTube" />
                    </Link>
                    </div>
                    <div className="flex flex-col gap-4 items-center mt-10">
                        <p className="text-md  text-white text-cente">THE AFRICA I KNOW © {currentYear}</p>
                        <p className="text-md text-white text-center" >A movement. A mindset. A mirror of who we are.</p>
                        <p className="text-md text-white text-center">#TheAfricaIKnow  ·  #TheGreatAfricans  ·  #AfricaMoves  ·  #Ubuntu</p>
                        <p className="text-md text-white text-center">Privacy and Policy</p>
                        
                    </div>
                </div>

            </div>
        </div>
    );
}