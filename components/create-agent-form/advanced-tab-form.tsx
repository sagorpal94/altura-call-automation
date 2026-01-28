"use client"

import React from "react"
import {useFormContext} from "react-hook-form"
import {Menu} from "lucide-react"

import {
    FormControl,
    FormField,
} from "@/components/ui/form"
import {Card, CardContent} from "@/components/ui/card"
import {Switch} from "@/components/ui/switch"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {cn} from "@/lib/utils"

const ADVANCED_SETTINGS = [
    {
        id: "hipaaCompliance",
        title: "HIPPA Compliance",
        description: "When this is enabled, no logs, recording, or transcriptions will be restored unless custom storage and credentials are configured.",
        type: "toggle"
    },
    {
        id: "audioRecording",
        title: "Audio Recording",
        description: "Record the conversation. Disable on this assistant to keep its portion of squad conversations private.",
        type: "toggle"
    },
    {
        id: "logging",
        title: "Logging",
        description: "Enable or disable logging during a call. Disable on this assistant to keep its portion of squad conversations private.",
        type: "toggle"
    },
    {
        id: "transcript",
        title: "Transcript",
        description: "Enable or disable transcription during a call. Disable on this assistant to keep its portion of squad conversations private.",
        type: "toggle"
    },
    {
        id: "audioRecordingFormat",
        title: "Audio Recording Format",
        description: "Choose the format for call recordings.",
        type: "select"
    },
    {
        id: "videoRecording",
        title: "Video Recording",
        description: "Enable or disable video recording during a web call. This will record the video of your user.",
        type: "toggle"
    }
]

export default function AdvancedTabForm() {

    const form = useFormContext()

    return (
        <Card className="border-[#DFE1E7] py-2 !rounded-md shadow-none">
            <CardContent className="px-2">
                <div className="space-y-4 max-w-full">
                    {ADVANCED_SETTINGS.map((setting) => (
                        <FormField
                            key={setting.id}
                            control={form.control}
                            name={setting.id as any}
                            render={({field}) => (
                                <Card className={cn(
                                    "border-[#DFE1E7] py-2 !rounded-md shadow-none transition-all duration-200",
                                    setting.type === "toggle" && field.value === true && "border-yellow-400 ring-1 ring-yellow-400"
                                )}>
                                    <CardContent className="px-3">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="space-y-4 flex-1">
                                                {/* Top Left Icon */}
                                                <div className="border border-[#DFE1E7] rounded p-1.5 w-fit text-zinc-400">
                                                    <Menu className="h-4 w-4"/>
                                                </div>

                                                {/* Content Section */}
                                                <div className="space-y-1">
                                                    <h3 className="text-lg font-bold text-zinc-900 dark:text-muted-foreground tracking-tight">
                                                        {setting.title}
                                                    </h3>
                                                    <p className="text-sm text-zinc-400 leading-normal max-w-3xl">
                                                        {setting.description}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Right Side Control */}
                                            <div className="pt-1">
                                                {setting.type === "toggle" ? (
                                                    <FormControl>
                                                        <Switch
                                                            checked={field.value as boolean}
                                                            onCheckedChange={field.onChange}
                                                            className="data-[state=checked]:bg-yellow-400 data-[state=unchecked]:bg-zinc-200"
                                                        />
                                                    </FormControl>
                                                ) : (
                                                    <Select onValueChange={field.onChange} defaultValue={field.value as string}>
                                                        <FormControl>
                                                            <SelectTrigger
                                                                className="w-[120px] h-10 border-zinc-200 rounded-lg font-medium text-zinc-700">
                                                                <SelectValue placeholder="Format"/>
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="mp3">MP3</SelectItem>
                                                            <SelectItem value="wav">WAV</SelectItem>
                                                            <SelectItem value="aac">AAC</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}