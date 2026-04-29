"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mic, X } from 'lucide-react';

export default function Header(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const scrollToJoinForm = () => {
        const form = document.getElementById('join-form');
        if (form) {
            form.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        // Close mobile menu if open
        if (isMenuOpen) {
            setIsMenuOpen(false);
        }
    };

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
                <Button 
                    variant="outline" 
                    className="text-sm font-bold text-black border border-black/50 px-8 h-12" 
                    onClick={scrollToJoinForm}
                >
                    Join the Movement 
                </Button>
                   
            </div>
            <div className="md:hidden">
                <Image 
                    src="/menu.svg" 
                    width={55} 
                    height={55} 
                    alt="menu" 
                    onClick={toggleMenu}
                    className="cursor-pointer"
                />
            </div>

            {/* Mobile Menu Drawer */}
            <div className={`fixed inset-0 z-50 transition-transform duration-300 ease-in-out ${
                isMenuOpen ? 'translate-y-0' : '-translate-y-full'
            }`}>
                {/* Backdrop */}
                <div 
                    className="absolute inset-0 bg-black/50"
                    onClick={toggleMenu}
                />
                
                {/* Menu Content */}
                <div className="relative  bg-[#2C2421] w-full h-auto">
                    {/* Menu Header */}
                    <div className="flex items-center justify-between p-6">
                        <div className="flex items-center gap-3">
                            <Image src="/African-new.png" width={100} height={100} alt="logo" />
                        </div>
                        <Button
                            onClick={toggleMenu}
                            className="p-2 rounded-full border bg-transparent border-destructive/70 transition-colors px-2 text-destructive"
                        >
                          Close   <div className="p-0.5 ml-1 flex items-center justify-center border border-destructive rounded-full text-destructive"><X className="w-5 h-5" /></div>
                        </Button>
                    </div>
                    
                    {/* Menu Items */}
                    <div className="flex flex-col p-6 space-y-4">
                        <Link 
                            href="" 
                            className="text-lg  text-white text-center  font-medium py-3 px-4 rounded-full h-13 border border-[#9D8033]/20 transition-colors"
                            onClick={toggleMenu}
                        >
                            Stories
                        </Link>
                        <Link 
                            href="" 
                            className="text-lg  text-white text-center  font-medium py-3 px-4 rounded-full h-13 border border-[#9D8033]/20 transition-colors"
                            onClick={toggleMenu}
                        >
                            Manifesto
                        </Link>
                        <Link 
                            href="" 
                            className="flex items-center fon justify-center text-lg  text-[#9D8033] text-center  font-medium py-3 px-4 rounded-full h-13 border border-[#9D8033] transition-colors"
                            onClick={toggleMenu}
                        >
                            Podcast <Mic className="ml-3 " />
                        </Link>
                        <Link 
                            href="" 
                            className="text-lg  text-white text-center  font-medium py-3 px-4 rounded-full h-13 border border-[#9D8033]/20 transition-colors"
                            onClick={toggleMenu}
                        >
                            Cities
                        </Link>
                        
                        {/* Action Buttons */}
                        <div className="pt-4 space-y-3">
                            <Button 
                
                            className="w-full text-lg font-bold  text-white text-center  font-medium py-3 px-4 rounded-full h-13 bg-[#9D8033] transition-colors"
                                onClick={scrollToJoinForm}
                            >
                                Join the Movement
                            </Button>
                         
                   <div className="mt-10">
                    <p className="text-md font-bold text-white text-center mb-5">Subscribe now now </p>
                    <div className="flex items-center justify-center gap-8">
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
                    </div>
                    <div className="flex flex-col items-center mt-8">
                    <p className="text-xl  text-white text-center">THE AFRICA I KNOW © {new Date().getFullYear()}</p>
                    </div>


                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}