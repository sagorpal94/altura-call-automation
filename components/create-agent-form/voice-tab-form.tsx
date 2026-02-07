import React from 'react';
import {useFormContext} from "react-hook-form"
import {TrendingUp} from "lucide-react"

import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Slider} from "@/components/ui/slider"
import {Checkbox} from "@/components/ui/checkbox"
import {Card, CardContent} from "@/components/ui/card"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"

const TrendValue = () => (
    <div className="flex items-center gap-1 text-[10px] text-green-500 font-bold ml-auto opacity-60">
        <TrendingUp className="h-3 w-3"/> 1.6%
    </div>
)

const VoiceTabForm = () => {
    const form = useFormContext()
    const isManualVoiceChecked = form.watch("manualVoiceId")

    return (
        <div className="animate-in fade-in duration-300 space-y-4">
            <Card className="border-[#DFE1E7] rounded-md shadow-none ">
                <CardContent className="p-6 py-3 space-y-4">
                    <div className="grid grid-cols-2 gap-8">
                        <FormField
                            control={form.control}
                            name="voiceProvider"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="font-bold text-sm">Voice Provider</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger
                                                className="border-yellow-400/30 focus-visible:ring-yellow-400 w-full">
                                                <SelectValue placeholder="Select Provider"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="ElevenLabs">ElevenLabs</SelectItem>
                                            <SelectItem value="GoogleCloud">Google Cloud</SelectItem>
                                            <SelectItem value="Azure">Azure</SelectItem>
                                            <SelectItem value="PlayHT">PlayHT</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="voiceSelection"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="font-bold text-sm">Voice Selection</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger
                                                className="border-yellow-400/30 focus-visible:ring-yellow-400 w-full">
                                                <SelectValue placeholder="Select Voice"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="zephyr-01">Zephyr (Male, Deep)</SelectItem>
                                            <SelectItem value="kore-01">Kore (Female, Soft)</SelectItem>
                                            <SelectItem value="puck-01">Puck (Male, Energetic)</SelectItem>
                                            <SelectItem value="charon-01">Charon (Male, Authoritative)</SelectItem>
                                            <SelectItem value="fenrir-01">Fenrir (Male, Intense)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="space-y-4 grid grid-cols-2 gap-8 items-baseline">
                        <FormField
                            control={form.control}
                            name="manualVoiceId"
                            render={({field}) => (
                                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                                    <FormControl>
                                        <Checkbox checked={field.value} onCheckedChange={field.onChange}
                                                  className="data-[state=checked]:bg-zinc-800 rounded-[4px]"/>
                                    </FormControl>
                                    <FormLabel className="text-sm font-bold leading-none">Add Voice ID
                                        Manually</FormLabel>
                                </FormItem>
                            )}
                        />
                        {/* কন্ডিশনাল ইনপুট ফিল্ড */}
                        {isManualVoiceChecked && (
                            <FormField
                                control={form.control}
                                name="voiceId"
                                render={({ field }) => (
                                    <FormItem className="animate-in slide-in-from-top-2 duration-200">
                                        <FormLabel className="font-bold text-sm">Voice ID</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Enter Voice ID"
                                                className="border-yellow-400/30 focus-visible:ring-yellow-400"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Model Selection */}
            <Card className="border-[#DFE1E7] rounded-md shadow-none">
                <CardContent className="p-6 py-3 space-y-3">
                    <div className="space-y-0.5">
                        <h4 className="font-bold text-sm">Model</h4>
                        <p className="text-[11px] text-zinc-500">This is the model that will be used.</p>
                    </div>
                    <FormField
                        control={form.control}
                        name="model"
                        render={({field}) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger
                                        className="border-yellow-400/30 focus-visible:ring-yellow-400 w-full">
                                        <SelectValue placeholder="Select Model"/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="zephyr-01">Zephyr (Male, Deep)</SelectItem>
                                    <SelectItem value="kore-01">Kore (Female, Soft)</SelectItem>
                                    <SelectItem value="puck-01">Puck (Male, Energetic)</SelectItem>
                                    <SelectItem value="charon-01">Charon (Male, Authoritative)</SelectItem>
                                    <SelectItem value="fenrir-01">Fenrir (Male, Intense)</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                </CardContent>
            </Card>

            {/* Sound & Characters Row */}
            <Card className="border-[#DFE1E7] rounded-md shadow-none">
                <CardContent className="p-6 py-3 grid grid-cols-3 gap-6">
                    <FormField
                        control={form.control}
                        name="backgroundSound"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="font-bold text-sm">Background Sound</FormLabel>

                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger
                                            className="border-yellow-400/30 focus-visible:ring-yellow-400 w-full">
                                            <SelectValue placeholder="None"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="zephyr-01">Zephyr (Male, Deep)</SelectItem>
                                        <SelectItem value="kore-01">Kore (Female, Soft)</SelectItem>
                                        <SelectItem value="puck-01">Puck (Male, Energetic)</SelectItem>
                                        <SelectItem value="charon-01">Charon (Male, Authoritative)</SelectItem>
                                        <SelectItem value="fenrir-01">Fenrir (Male, Intense)</SelectItem>
                                    </SelectContent>
                                </Select>

                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="backgroundSoundUrl"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="font-bold text-sm">Background Sound URL</FormLabel>
                                <FormControl><Input {...field} placeholder="https://sound.com"
                                                    className="h-11 border-yellow-400/30 focus-visible:ring-yellow-400"/></FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="mainCharacters"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="font-bold text-sm">Input Main Characters</FormLabel>
                                <FormControl><Input {...field} placeholder="30"
                                                    className="h-11 border-yellow-400/30 focus-visible:ring-yellow-400"/></FormControl>
                            </FormItem>
                        )}
                    />
                </CardContent>
            </Card>

            {/* Voice Parameters Card (Stability, Clarity, etc.) */}
            <Card className="border-[#DFE1E7] rounded-md shadow-none">
                <CardContent className="p-6 py-3 space-y-10">

                    {/* Punction Boundaries */}
                    <div className="space-y-2">
                        <div className="space-y-0.5">
                            <h4 className="font-bold text-sm">Punction Boundaries</h4>
                            <p className="text-[11px] text-zinc-500 leading-tight">
                                These are the punction boundaries that are considered valid boundaries or delimiters.
                                This
                                helps decide the chunks that are sent to the voice provider for the voice generation as
                                the
                                LLM tokens are steaming in.
                            </p>
                        </div>
                        <FormField
                            control={form.control}
                            name="punctionBoundaries"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl><Input {...field} placeholder="No punction added"
                                                        className="h-11 border-yellow-400/30 focus-visible:ring-yellow-400"/></FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    {[
                        {id: "stability", label: "Stability", left: "More variable", right: "More Stable"},
                        {id: "clarity", label: "Clarity", left: "Low", right: "High"},
                        {id: "speed", label: "Speed", left: "Slower", right: "Faster"},
                        {
                            id: "styleExaggeration",
                            label: "Style Exaggeration",
                            left: "None (Fastest)",
                            right: "Exaggerated"
                        },
                        {
                            id: "optimizeLatency",
                            label: "Optimize Streaming Latency",
                            left: "More Latency",
                            right: "Less Latency"
                        },
                    ].map((param) => (
                        <FormField
                            key={param.id}
                            control={form.control}
                            name={param.id as any}
                            render={({field}) => (
                                <FormItem className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <FormLabel
                                            className="font-bold text-sm text-zinc-900 dark:text-muted-foreground">{param.label}</FormLabel>
                                        <TrendValue/>
                                    </div>
                                    <FormControl>
                                        <div className="space-y-2">
                                            <Slider
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                max={1}
                                                step={0.01}
                                                className="[&_[role=slider]]:bg-yellow-500 [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&_[role=slider]]:shadow-md [&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:cursor-grab"
                                            />
                                            <div
                                                className="flex justify-between text-[9px] font-medium text-zinc-400 px-0.5">
                                                <span>{param.left}</span>
                                                <span>{param.right}</span>
                                            </div>
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    ))}

                </CardContent>
            </Card>

        </div>
    );
};

export default VoiceTabForm;