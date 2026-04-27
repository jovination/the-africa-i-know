import Image from "next/image"
import Link from "next/link"
import JoinForm from "./JoinForm";


export default function Footer(){
    const currentYear = new Date().getFullYear();
    return (
        <div>
            <div className="w-full bg-[#2C2421] py-10">
                <div className="max-w-2xl w-full mx-auto flex flex-col items-center">
                <JoinForm />
                </div>
             </div>   
            <div className="w-full bg-black">
                <div className="container mx-auto flex flex-col items-center py-10">
                    <Image src="/African-new.png" width={150} height={150} alt="logo" />

                    <div className="grid grid-cols-3 gap-10 mt-10">
                    <Link href="/">
                    <Image src="/instagram.png" width={155} height={155} alt="logo" />
                    </Link>
                    <Link href="/">
                    <Image src="/spotify.png" width={150} height={150} alt="logo" />
                    </Link>
                    <Link href="/">
                    <Image src="/youtube-podcast.png" width={130} height={130}  alt="logo" />
                    </Link>
                    </div>
                    <div className="flex flex-col gap-4 items-center mt-10">
                        <p className="text-md font-semibold text-white">THE AFRICA I KNOW © {currentYear}</p>
                        <p className="text-md font-semibold text-white" >A movement. A mindset. A mirror of who we are.</p>
                        <p className="text-md font-semibold text-white">#TheAfricaIKnow  ·  #TheGreatAfricans  ·  #AfricaMoves  ·  #Ubuntu</p>
                        <p className="text-md font-semibold text-white">Privacy and Policy</p>
                        
                    </div>
                </div>

            </div>
        </div>
    );
}