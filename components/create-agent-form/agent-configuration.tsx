"use client"

import React from "react"
import {useFormContext} from "react-hook-form"
import {UploadCloud, X} from "lucide-react"
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Slider} from "@/components/ui/slider"
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Progress} from "@/components/ui/progress"

export default function AgentConfiguration() {
    const form = useFormContext()

    return (
        <div className="animate-in fade-in duration-300 w-full max-w-5xl mx-auto space-y-4">
            {/* Row 1: Provider & Selection */}
            <Card className="border-[#DFE1E7] rounded-md shadow-none">
                <CardContent className="p-6 py-3 grid grid-cols-2 items-baseline gap-8">
                    <FormField
                        control={form.control}
                        name="llmProvider"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-slate-700 dark:text-muted-foreground font-semibold">LLM
                                    Provider</FormLabel>
                                <Select onValueChange={field.onChange}
                                        defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger
                                            className=" border-yellow-400/30 focus-visible:ring-yellow-400 w-full">
                                            <SelectValue placeholder="Select provider"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="GoogleGenAI">
                                            Google GenAI
                                        </SelectItem>
                                        <SelectItem value="OpenAI">OpenAI</SelectItem>
                                        <SelectItem value="Anthropic">Anthropic</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="modelSelection"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-slate-700 dark:text-muted-foreground font-semibold">
                                    Model Selection
                                </FormLabel>

                                <Select onValueChange={field.onChange}
                                        defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger
                                            className=" border-yellow-400/30 focus-visible:ring-yellow-400 w-full">
                                            <SelectValue placeholder="Select a model"/>
                                        </SelectTrigger>
                                    </FormControl>

                                    <SelectContent
                                        className="p-2 rounded-xl shadow-xl  border-slate-100">
                                        <SelectItem value="gemini-2.5">
                                            Gemini 2.5 Flash
                                        </SelectItem>
                                        <SelectItem value="gemini-3">Gemini 3 Pro</SelectItem>
                                        <SelectItem value="gpt-4">GPT-4 Turbo</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </CardContent>
            </Card>

            {/* System Instruction */}
            <Card className="border-[#DFE1E7] rounded-md shadow-none">
                <CardContent className="p-6 py-3 space-y-2">
                    <FormLabel className="font-bold text-sm">System Instruction</FormLabel>
                    <FormField
                        control={form.control}
                        name="systemInstruction"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="Define Agent's personality and goals..."
                                        className="min-h-[120px] bg-transparent border-yellow-400/30 focus-visible:ring-yellow-400"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </CardContent>
            </Card>

            {/* First Message */}
            <Card className="border-[#DFE1E7] rounded-md shadow-none">
                <CardContent className="p-6 py-3 space-y-2">
                    <FormLabel className="font-bold text-sm">First Message</FormLabel>
                    <FormField
                        control={form.control}
                        name="firstMessage"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field}
                                        placeholder="Hello, how can I help you today?"
                                           className="h-12 border-yellow-400/30 focus-visible:ring-yellow-400"/>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </CardContent>
            </Card>

            {/* Max Tokens & Temperature */}
            <Card className="border-[#DFE1E7] rounded-md shadow-none">
                <CardContent className="p-6 py-3 grid grid-cols-2 gap-12 items-center">
                    <FormField
                        control={form.control}
                        name="maxTokens"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="font-bold text-sm">Max Tokens</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} placeholder="250"
                                           className="h-12 border-yellow-400/30 focus-visible:ring-yellow-400"/>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="temperature"
                        render={({field}) => (
                            <FormItem className="space-y-4">
                                <FormLabel className="font-bold text-sm">Temperature</FormLabel>
                                <FormControl>
                                    <Slider
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        max={1}
                                        step={0.1}
                                        className="[&_[role=slider]]:bg-yellow-500 [&_[role=slider]]:border-white"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </CardContent>
            </Card>

            {/* --- FILES UPLOAD SECTION --- */}
            <Card className="border-[#DFE1E7] rounded-md shadow-none">
                <CardContent className="p-6 py-3 space-y-4">
                    <FormLabel className="font-bold text-sm">Files</FormLabel>

                    {/* Dropzone */}
                    <div
                        className="border-2 border-dashed border-yellow-400/40  rounded-xl p-10 flex flex-col items-center justify-center text-center space-y-2 cursor-pointer  transition-colors">
                        <UploadCloud className="h-10 w-10 text-zinc-600 mb-2"/>
                        <p className="text-sm font-bold">
                            Drag & drop files or <span className="underline text-zinc-900 dark:text-muted-foreground">Browse</span>
                        </p>
                        <p className="text-xs text-zinc-400 font-medium">CSV file</p>
                    </div>

                    {/* Upload Progress */}
                    <div className="space-y-2">
                        <p className="text-[10px] font-bold text-zinc-500">Uploading - 3/3 files</p>
                        <div className="relative group">
                            <Input
                                value="your-file-here.csv"
                                readOnly
                                className="h-10 bg-white border-zinc-100 pr-10 text-sm"
                            />
                            <X className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-300 cursor-pointer"/>
                            <Progress value={66}
                                      className="h-[2px] absolute bottom-0 left-0 bg-transparent rounded-none [&>div]:bg-yellow-500"/>
                        </div>
                    </div>

                    <Button
                        className="w-full h-12 bg-[#fdf027] hover:bg-[#e6d920] text-zinc-900 font-bold rounded-lg shadow-none">
                        Upload Files
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}