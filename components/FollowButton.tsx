"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'

export function FollowButton() {
    const scrollToJoinForm = () => {
        const form = document.getElementById('join-form');
        if (form) {
            form.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <Button onClick={scrollToJoinForm} variant="outline" className="w-full h-13 text-black border-2 border-black/70 px-6 hover:bg-black hover:text-white transition-colors">
            Follow the Movement <ArrowRight className="ml-2" />
        </Button>
    )
}
