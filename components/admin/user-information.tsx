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
import {Wifi} from "lucide-react";

export default function UserInformation() {
    const form = useFormContext();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* LEFT COLUMN: Agent Information */}
            <Card className="lg:col-span-2 border-[#DFE1E7] py-0 rounded-md shadow-none">
                <CardContent className="px-6 py-2 space-y-3">
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-muted-foreground">User Information</h2>

                    {/* Avatar & Name Row */}
                    <div className="flex flex-col md:flex-row flex-wrap gap-6 items-start">
                        <div className="flex gap-4 items-center">
                            <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-zinc-100">
                                <Image
                                    src="/images/avatar.png" // Replace with your image
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
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-zinc-700 font-semibold">Description</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="alice@globex.com"
                                        {...field}
                                        className="h-12 border-zinc-200 focus-visible:ring-yellow-400"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Internal Role */}
                    <FormField
                        control={form.control}
                        name="company"
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
            <Card className="border-[#DFE1E7] py-0 rounded-md shadow-none">
                <CardContent className="p-6 py-2 space-y-6 flex flex-col h-full">
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-muted-foreground">Estimations</h2>

                    <div className="w-full flex justify-center">
                        <div
                            className="relative overflow-hidden w-full max-w-sm h-48 bg-[#FCEC1A] rounded-lg p-4 flex flex-col justify-between shadow-sm transition-transform hover:scale-[1.02]">

                            {/* Organic Background Patterns (Blobs) */}
                            <div
                                className="absolute top-[-20%] left-[-10%] w-48 h-48 bg-white/20 rounded-full blur-3xl"/>
                            <div
                                className="absolute bottom-[-30%] right-[-5%] w-64 h-64 bg-yellow-400/30 rounded-full blur-3xl"/>

                            {/* Top Row: Title and Signal Icon */}
                            <div className="flex justify-between items-start relative z-10">
                                <h2 className="text-base font-medium text-zinc-900 dark:text-muted-foreground tracking-tight">
                                    Enterprise
                                </h2>

                                {/* Glassmorphism Icon Container */}
                                <div
                                    className="border border-white/50 bg-white/20 backdrop-blur-md py-1 px-3 rounded-2xl shadow-inner">
                                    <Wifi className="h-6 w-6 text-zinc-900 stroke-[2.5px] rotate-90"/>
                                </div>
                            </div>

                            {/* Bottom Row: Customer Info */}
                            <div className="space-y-1 relative z-10">
                                <p className="text-sm text-zinc-900 dark:text-muted-foreground  uppercase tracking-tight">
                                    Customer Since
                                </p>
                                <p className="text-base text-zinc-900 dark:text-muted-foreground  tracking-tighter">
                                    2024-01-15
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Buttons Row */}
                    <div className="mt-auto flex  gap-3">
                        <Button
                            type="submit"
                            className="w-full xl:w-1/2 h-10 bg-[#fdf027] hover:bg-[#e6d920] text-zinc-900  font-bold text-base rounded-md border-none"
                        >
                            Manage Plan
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full xl:w-1/2 h-10 border-2 border-[#BBAE00] text-[#BBAE00] font-bold text-base rounded-md hover:bg-zinc-50"
                        >
                            Transfer
                        </Button>
                    </div>
                </CardContent>
            </Card>

        </div>
    )
}