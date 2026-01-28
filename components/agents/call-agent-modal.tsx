'use client'

import React, {ReactElement} from "react"

import {useState, useEffect} from 'react'
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from '@/components/ui/dialog'
import {Volume2} from 'lucide-react'
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Icons} from "@/components/icons";
import ControlButton from "@/components/agents/control-button";
import Image from "next/image";

interface CallAgentModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    agentName: string
    agentTitle: string
    agentIcon: ReactElement
}


export default function CallAgentModal({
                                           open,
                                           onOpenChange,
                                           agentName,
                                           agentTitle,
                                           agentIcon,
                                       }: CallAgentModalProps) {
    const [callTime, setCallTime] = useState('00:00')
    const [isConnecting, setIsConnecting] = useState(true)
    const [isMuted, setIsMuted] = useState(false)
    const [isRecording, setIsRecording] = useState(false)

    // Common Icon Classes
    const iconClass = "cursor-pointer h-6 w-6 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform"

    const handleInteractOutside = (e: Event) => {
        e.preventDefault()
    }
    const handleClose = () => {
        onOpenChange(false)
        setCallTime('00:00')
        setIsConnecting(true)
    }

    useEffect(() => {
        if (!open) return

        let seconds = 0
        const interval = setInterval(() => {
            seconds += 1
            const mins = Math.floor(seconds / 60)
            const secs = seconds % 60
            setCallTime(
                `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
            )
        }, 1000)

        // Simulate connection after 2 seconds
        const timeout = setTimeout(() => setIsConnecting(false), 2000)

        return () => {
            clearInterval(interval)
            clearTimeout(timeout)
        }
    }, [open])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="p-0 gap-0 w-full sm:!max-w-3xl !rounded-lg overflow-hidden bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 shadow-2xl sm:rounded-3xl [&>button.absolute]:hidden"
                // Key: This prevents closing on backdrop click
                onInteractOutside={handleInteractOutside}
                // Optional: Prevent closing on Escape key if desired
                onEscapeKeyDown={handleInteractOutside}
            >
                {/* Hidden Title for Accessibility */}
                <DialogTitle className="sr-only">Voice Call Interface</DialogTitle>

                {/* --- Header --- */}
                <div className="flex items-center justify-between px-6 py-3 bg-gray-50/50 dark:bg-zinc-900/50">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 border-2 border-white dark:border-zinc-800 shadow-sm">
                            <AvatarImage src="/images/avatar.png" alt="Sarah"/>
                            <AvatarFallback>SA</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white leading-none">
                                Voice Test: {agentName}
                            </h3>
                            <div className="flex items-center gap-2 mt-1.5">
                                <span className="relative flex h-3 w-3">
                                  <span
                                      className="absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75 animate-pulse"></span>
                                  <span
                                      className="relative inline-flex h-3 w-3 rounded-full bg-yellow-400 border-2 border-white dark:border-zinc-900"></span>
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                    {isConnecting ? 'connecting...' : 'connected'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div
                            className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm font-mono font-medium text-gray-700 dark:text-gray-200">
                            {callTime}
                        </div>
                        {/* CLOSE BUTTON (Header) */}
                        <Icons.modalClose onClick={handleClose} className="cursor-pointer w-8 h-8"/>
                    </div>
                </div>

                {/* --- Main Body --- */}
                <div className="flex flex-col items-center justify-center py-12 px-6 bg-white dark:bg-zinc-950">

                    {/* Central Yellow Icon */}
                    <div className="mb-6 relative">
                        <div
                            className="h-24 w-24 rounded-full bg-yellow-400/20 dark:bg-yellow-400/10 flex items-center justify-center">
                            <Image src="/images/warning.png" alt="warning" width={114} height={114}/>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Call Error</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                        Please wait while we connect to the Gemini Live API.
                    </p>

                    {/* Controls Row */}
                    <div className="flex items-center flex-wrap gap-6 mt-12 mb-8 ">
                        <ControlButton
                            icon={<Icons.scriptIcon className={iconClass}/>}
                            label="Script"
                        />

                        {/* 2. Mute / Unmute Button */}
                        <ControlButton
                            onClick={() => setIsMuted(!isMuted)}
                            label={isMuted ? "Unmute" : "Mute"}
                            icon={
                                isMuted ? (
                                    // Show Unmute Icon when state is true
                                    <Icons.unMuteIcon className={iconClass}/>
                                ) : (
                                    // Show Mute Icon when state is false
                                    <Icons.muteIcon className={iconClass}/>
                                )
                            }
                        />

                        {/* 3. Record / Stop Button */}
                        <ControlButton
                            onClick={() => setIsRecording(!isRecording)}
                            // Change text based on state
                            label={isRecording ? "Stop" : "Record"}
                            isActive={isRecording} // Optional: Pass active state for styling
                            icon={
                                <Icons.recordIcon
                                    className={`${iconClass} ${isRecording ? "text-red-500 animate-pulse" : ""}`}
                                />
                            }
                        />

                        {/* END BUTTON (Red) */}
                        <div className="flex flex-col items-center gap-2 ">
                            <button
                                onClick={handleClose}
                                className="cursor-pointer flex h-14 w-14 items-center justify-center rounded-full bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/20 transition-transform active:scale-95 group"
                            >
                                <Icons.close className="h-6 w-6 text-white"/>
                            </button>
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">End</span>
                        </div>
                    </div>

                    {/* Speaker Toggle */}
                    <div className="mb-6">
                        <div
                            className="w-[296px] justify-center flex items-center gap-2 px-6 py-3 rounded-full bg-[#fafafa] dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800">
                            <Volume2 className="h-5 w-5 text-gray-900 dark:text-white"/>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Speaker</span>
                        </div>
                    </div>

                </div>

                {/* --- Footer (Latency) --- */}
                <div
                    className="bg-gray-200/50 dark:bg-zinc-900 py-3 flex items-center justify-center border-t border-gray-100 dark:border-zinc-800">
                    <p className="text-[10px] md:text-xs font-bold tracking-widest text-gray-500 dark:text-gray-400 uppercase">
                        Real-time Audio Latency: ~450ms
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    )
}


