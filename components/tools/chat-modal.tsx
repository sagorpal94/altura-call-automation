"use client";

import React, {ReactElement} from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Image as ImageIcon, AudioLines, SendHorizontal, X} from "lucide-react";
import Image from "next/image";
import {Icons} from "@/components/icons";

interface ChatModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    agentName: string
    // agentTitle: string
    // agentIcon: ReactElement
}

export default function ChatModal({open, onOpenChange, agentName}: ChatModalProps) {

    const handleClose = () => {
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
                // className="sm:max-w-[580px] p-0 gap-0 overflow-hidden border-none bg-white !rounded-lg shadow-2xl [&>button.absolute]:hidden"
                className="p-0 gap-0 w-full sm:max-w-[580px] !rounded-lg overflow-hidden  border-gray-100 dark:border-zinc-800 shadow-2xl sm:rounded-3xl [&>button.absolute]:hidden"

            >

                {/* Custom Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b bg-[#FAFAFA] dark:bg-muted border-gray-50">
                    <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 overflow-hidden rounded-full bg-gray-100">
                            {/* Replace with your actual Memoji/Avatar source */}
                            <img
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                                alt="Sarah Support"
                                className="object-cover"
                            />
                        </div>
                        <h2 className="text-[32px] font-medium text-[#0E121B] dark:text-muted-foreground tracking-tight">
                            Chat Test: {agentName}
                        </h2>
                    </div>

                    {/* Custom Close Button Style */}
                    {/*<button className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">*/}
                        <Icons.modalClose onClick={handleClose} className="cursor-pointer w-8 h-8"/>
                    {/*</button>*/}
                </div>

                {/* Chat Body - Empty Space */}
                <div className="h-[450px] w-full"/>

                {/* Input Area Container */}
                <div className="px-5 pb-5 pt-2 ">
                    <div
                        className="flex items-center w-full px-4 py-3  border border-gray-100 rounded-[14px] shadow-sm">
                        <input
                            type="text"
                            placeholder="Write your message ..."
                            className="flex-1 text-[15px] outline-none placeholder:text-gray-300 text-gray-600"
                        />

                        <div className="flex items-center gap-3 ml-2">
                            <button className="cursor-pointer text-gray-400 hover:text-gray-600">
                                <Icons.imageIcon className="w-[20px] h-[20px] stroke-[1.5px]"/>
                            </button>
                            <button className="cursor-pointer text-gray-400 hover:text-gray-600">
                                <Icons.voiceIcon className="w-[20px] h-[20px] stroke-[1.5px]"/>
                            </button>

                            <div className="w-[1.5px] h-4 bg-gray-200 mx-1"/>

                            <button className="cursor-pointer text-[#FACC15] hover:scale-110 transition-transform">
                                <Icons.sendIcon className="w-[22px] h-[22px] fill-current"/>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Decorative Strip (Matching the screenshot's gray footer) */}
                <div className="h-10 bg-[#DFE1E7]/40 w-full"/>
            </DialogContent>
        </Dialog>
    );
}