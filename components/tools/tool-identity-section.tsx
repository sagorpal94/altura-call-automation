"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolFormValues } from "@/schemas/tool-schema";

const TOOL_TYPES = [
    { value: "custom-tool", label: "Custom tool" },
    { value: "DTMF", label: "DTMF" },
    { value: "Query", label: "Query" },
    { value: "end-call", label: "End call" },
    { value: "Voicemail", label: "Voicemail" },
    { value: "API-Request", label: "API Request" },
    { value: "Google-sheets", label: "Google sheets" },
    { value: "MCP", label: "MCP" },
] as const;

const ICONS = ["🛠️", "📞", "🔍", "🚪", "📼", "🌐", "🧩", "💬", "📊", "📅", "🏗️"];

export default function ToolIdentitySection({ form }: { form: UseFormReturn<ToolFormValues> }) {
    return (
        <div className="space-y-6">
            <FormField
                control={form.control}
                name="toolName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-xs font-bold tracking-widest">Tool Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Ej. Google Sheets Tool" {...field} className="h-12 text-lg focus-visible:ring-0 border-[#FCEC1A]" />
                        </FormControl>
                        <FormDescription className="text-zinc-500 text-xs">The tool name that will be used internally for this request.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="grid sm:grid-cols-2 gap-6 items-baseline">
                {/* Tool Type */}
                <FormField
                    control={form.control}
                    name="toolType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-xs font-bold tracking-widest">Tool Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="w-full border-[#FCEC1A]">
                                        <SelectValue placeholder="Select tool type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="z-[250]">
                                    <SelectGroup>
                                        {TOOL_TYPES.map((t) => (
                                            <SelectItem key={t.value} value={t.value}>
                                                {t.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FormMessage className="text-xs text-red-500" />
                        </FormItem>
                    )}
                />

                {/* Icon (simple select for now) */}
                <FormField
                    control={form.control}
                    name="icon"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-xs font-bold tracking-widest">Tool Icon</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value ?? "🛠️"}>
                                <FormControl>
                                    <SelectTrigger className="w-full border-[#FCEC1A]">
                                        <SelectValue placeholder="Select icon" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="z-[250]">
                                    <SelectGroup>
                                        {ICONS.map((ic) => (
                                            <SelectItem key={ic} value={ic}>
                                                {ic}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FormMessage className="text-xs text-red-500" />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
}
