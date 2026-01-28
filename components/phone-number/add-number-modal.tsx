"use client"

import React, {useState} from "react"
import {X, Plus} from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {cn} from "@/lib/utils"

const CARRIERS = [
    {id: "twilio", name: "TWILIO"},
    {id: "vonage", name: "VONAGE"},
    {id: "telnyx", name: "TELNYX"},
    {id: "custom", name: "CUSTOM SIP"},
]

export function AddNumberModal() {
    const [selectedCarrier, setSelectedCarrier] = useState("twilio")

    return (
        <Dialog>
            <DialogContent
                className="max-w-[1166px] w-[calc(100%-2rem)] p-8 rounded-2xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-lg gap-0 [&>button]:hidden transition-colors duration-300">

                {/* --- HEADER --- */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-baseline gap-4">
                        <DialogTitle className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                            Add New Number
                        </DialogTitle>
                        <span className="text-xl font-medium text-zinc-400">
                          Phone Number Options
                        </span>
                    </div>

                    <DialogClose asChild>
                        <button
                            className="flex h-10 w-10 items-center justify-center rounded-lg border border-yellow-400 text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-500/10 transition-colors">
                            <X className="h-6 w-6 stroke-[2.5px]"/>
                        </button>
                    </DialogClose>
                </div>

                <p className="text-zinc-900 dark:text-zinc-300 font-bold text-sm mb-8">
                    Configure the basic settings for adding a new number
                </p>

                <div className="space-y-6">
                    {/* --- 1. CARRIER SELECTION --- */}
                    <Card className="border-zinc-200 dark:border-zinc-800 shadow-none bg-white dark:bg-zinc-900/50">
                        <CardContent className="p-6 space-y-4">
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">1. Select Carrier
                                Provider</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {CARRIERS.map((carrier) => (
                                    <button
                                        key={carrier.id}
                                        onClick={() => setSelectedCarrier(carrier.id)}
                                        className={cn(
                                            "flex items-center gap-4 p-4 rounded-xl border transition-all h-16",
                                            selectedCarrier === carrier.id
                                                ? "border-yellow-400 bg-yellow-50/10"
                                                : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300"
                                        )}
                                    >
                                        <div className="h-10 w-10 bg-zinc-200 dark:bg-zinc-700 rounded-sm shrink-0"/>
                                        <span className="font-bold text-zinc-800 dark:text-zinc-200 tracking-wide">
                      {carrier.name}
                    </span>
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* --- 2. LABEL INPUT --- */}
                    <Card className="border-zinc-200 dark:border-zinc-800 shadow-none bg-white dark:bg-zinc-900/50">
                        <CardContent className="p-6 space-y-4">
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">2. Label Your Line</h3>
                            <Input
                                placeholder="E.g Inbound Sales"
                                className="h-14 border-yellow-400 focus-visible:ring-0 text-lg text-zinc-600 dark:text-zinc-300 placeholder:text-zinc-400 bg-zinc-50/30 dark:bg-zinc-950/30 rounded-xl"
                            />
                        </CardContent>
                    </Card>

                    {/* --- 3. LINKED AGENT --- */}
                    <Card className="border-zinc-200 dark:border-zinc-800 shadow-none bg-white dark:bg-zinc-900/50">
                        <CardContent className="p-6 space-y-4">
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Linked AI Agent</h3>
                            <Input
                                placeholder="Unlinked (No automation)"
                                className="h-14 border-yellow-400 focus-visible:ring-0 text-lg text-zinc-600 dark:text-zinc-300 placeholder:text-zinc-400 bg-zinc-50/30 dark:bg-zinc-950/30 rounded-xl"
                            />
                        </CardContent>
                    </Card>

                    {/* --- FOOTER BUTTON --- */}
                    <Button
                        className="w-full h-16 bg-[#fdf027] hover:bg-[#e6d920] text-zinc-900 font-bold text-lg rounded-xl shadow-none transition-all uppercase tracking-tight">
                        Provision & Purchase Line
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}