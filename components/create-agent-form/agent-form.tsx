"use client"

import React from "react"
import Image from "next/image"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {useFormContext} from "react-hook-form";
import {Icons} from "@/components/icons";

export default function AgentForm() {
    const form = useFormContext();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* LEFT COLUMN: Agent Information */}
            <Card className="lg:col-span-2 border-[#DFE1E7] rounded-md shadow-sm">
                <CardContent className="p-6 py-3 space-y-3">
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-muted-foreground">Agent Information</h2>

                    {/* Avatar & Name Row */}
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="flex gap-4 items-center">
                            <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-zinc-100">
                                <Image
                                    src="/avatar-placeholder.jpg" // Replace with your image
                                    alt="Avatar"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="space-y-1">
                                <button type="button"
                                        className="text-sm font-medium text-zinc-500 hover:text-zinc-800 transition-colors">
                                    Update Avatar
                                </button>
                                <p className="text-xs text-zinc-400">
                                    Or import from <span className="text-zinc-500">Instagram</span> or <span
                                    className="text-zinc-500">Facebook</span>
                                </p>
                            </div>
                        </div>

                        <div className="flex-1 w-full">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-zinc-700 font-semibold">Agent Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ej. Sarah" {...field}
                                                   className="h-12 border-zinc-200 focus-visible:ring-yellow-400"/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-zinc-700 font-semibold">Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ej. Costumer Success" {...field}
                                           className="h-12 border-zinc-200 focus-visible:ring-yellow-400"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Internal Role */}
                    <FormField
                        control={form.control}
                        name="internalRole"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-zinc-700 font-semibold">Internal Role</FormLabel>
                                <FormControl>
                                    <Input placeholder="Short summary for you dashboard" {...field}
                                           className="h-12 border-zinc-200 focus-visible:ring-yellow-400"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </CardContent>
            </Card>

            {/* RIGHT COLUMN: Estimations */}
            <Card className="border-[#DFE1E7] rounded-md shadow-sm">
                <CardContent className="p-6 py-0 space-y-6 flex flex-col h-full">
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-muted-foreground">Estimations</h2>

                    <div className="space-y-4">
                        {/* Latency Info Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-zinc-400">Latency</label>
                            <div className="relative">
                                <Input readOnly value="~470ms" className="h-12 border-zinc-200 bg-white"/>
                                <div
                                    className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] text-green-500 font-bold">
                                    <Icons.arrowUp className="h-3 w-3"/> <span className="text-[#8A8A8F]">1.6%</span>
                                </div>
                            </div>
                        </div>

                        {/* Cost Info Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-zinc-400">Cost/Min</label>
                            <div className="relative">
                                <Input readOnly value="$0.05" className="h-12 border-zinc-200 bg-white"/>
                                <div
                                    className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] text-green-500 font-bold">
                                    <Icons.arrowUp className="h-3 w-3"/> <span className="text-[#8A8A8F]">1.6%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Buttons Row */}
                    <div className="mt-auto flex  gap-3">
                        <Button
                            type="submit"
                            className="w-1/2 h-10 bg-[#fdf027] hover:bg-[#e6d920] text-zinc-900  font-bold text-base rounded-md border-none"
                        >
                            Create Agent
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="w-1/2 h-10 border-2 border-yellow-600/50 text-zinc-700 font-bold text-base rounded-md hover:bg-zinc-50"
                        >
                            Cancel
                        </Button>
                    </div>
                </CardContent>
            </Card>

        </div>
    )
}