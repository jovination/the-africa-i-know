"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Mic } from 'lucide-react'
import Image from "next/image"

export function ListenDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-[#9F8033] text-white h-13 hover:bg-[#9f8033]/90 px-6">
          Listen the Great Africans <Mic className="ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-black">Listen to The Great Africans</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6 py-8 w-full">
          <div className="flex flex-col justify-center items-center gap-3 w-full">
            <a href="https://www.instagram.com/theafricaiknow_taik" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-3  transition-transform w-full border rounded-full h-13 flex items-center justify-center">
              <Image src="/Instagran1.png" alt="Instagram" width={100} height={100} className="object-contain drop-shadow-md" />

            </a>
             <a href="https://open.spotify.com/episode/0GGO5IuSEqxXCi9xDcHMX4" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-3  transition-transform w-full border rounded-full h-13 flex items-center justify-center">
              <Image src="/spotify.png" alt="Spotify" width={100} height={100} className="object-contain drop-shadow-md" />
            </a>
            <a href="https://www.youtube.com/@TheGreatAfricans" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-3  transition-transform w-full border rounded-full h-13 flex items-center justify-center">
              <Image src="/youtube-podcast1.png" alt="YouTube" width={100} height={100} className="object-contain drop-shadow-md" />
            </a>
          </div>
        </div>
        <div className="flex justify-center w-full">
          <DialogClose asChild>
            <Button className="w-full h-13 border-2 border-black/70 text-black hover:bg-black/90 px-6 text-white">Cancel</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
