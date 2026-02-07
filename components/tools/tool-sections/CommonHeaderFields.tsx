"use client";

import React, { useState } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS = ["🛠️","📞","🔍","🚪","📼","🌐","🧩","💬","📊","📅","🏗️"];

type Props<TForm extends FieldValues> = {
    form: UseFormReturn<TForm>;
    lockToolType?: boolean;
    forcedToolType?: string;
};

export default function CommonHeaderFields<TForm extends FieldValues>({
                                                                          form,
                                                                          lockToolType = false,
                                                                          forcedToolType,
                                                                      }: Props<TForm>) {
    const [iconOpen, setIconOpen] = useState(false);

    // ✅ field names typed safely (schema must contain these keys)
    const toolNameKey = "toolName" as Path<TForm>;
    const toolTypeKey = "toolType" as Path<TForm>;
    const iconKey = "icon" as Path<TForm>;
    const descriptionKey = "description" as Path<TForm>;

    return (
        <div className="space-y-6">
            <FormField
                control={form.control}
                name={toolNameKey}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-xs font-bold tracking-widest dark:text-muted-foreground">
                            Tool Name
                        </FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Ej. Google Sheets Tool"
                                {...field}
                                className="h-12 text-lg focus-visible:ring-0 border-[#FCEC1A]"
                            />
                        </FormControl>
                        <FormDescription className="text-zinc-500 text-xs">
                            The tool name that will be used internally for this request.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="grid sm:grid-cols-2 gap-6 items-baseline">
                <FormField
                    control={form.control}
                    name={toolTypeKey}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-xs font-bold tracking-widest dark:text-muted-foreground">
                                Tool Type
                            </FormLabel>

                            <Select
                                onValueChange={field.onChange}
                                value={(forcedToolType ?? (field.value as any)) as any}
                                disabled={lockToolType}
                            >
                                <FormControl>
                                    <SelectTrigger className="w-full flex items-center justify-between border-[#FCEC1A]">
                                        <SelectValue placeholder="Select tool type" />
                                    </SelectTrigger>
                                </FormControl>

                                <SelectContent className="z-[250]">
                                    <SelectGroup>
                                        <SelectItem value="custom-tool">Custom tool</SelectItem>
                                        <SelectItem value="DTMF">DTMF</SelectItem>
                                        <SelectItem value="Query">Query</SelectItem>
                                        <SelectItem value="end-call">End call</SelectItem>
                                        <SelectItem value="Voicemail">Voicemail</SelectItem>
                                        <SelectItem value="API-Request">API Request</SelectItem>
                                        <SelectItem value="Google-sheets">Google sheets</SelectItem>
                                        <SelectItem value="G-Calendar">G-Calendar</SelectItem>
                                        <SelectItem value="Go-High-Level">GoHighLevel</SelectItem>
                                        <SelectItem value="Slack-Alert">Slack Alert</SelectItem>
                                        <SelectItem value="MCP">MCP</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <FormMessage className="text-xs text-red-500" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={iconKey}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-xs font-bold tracking-widest dark:text-muted-foreground">
                                Tool Icon
                            </FormLabel>

                            <Popover open={iconOpen} onOpenChange={setIconOpen}>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <button
                                            type="button"
                                            role="combobox"
                                            aria-expanded={iconOpen}
                                            className={cn(
                                                "w-full flex items-center justify-between border rounded-md border-[#FCEC1A] px-3 py-0.5",
                                                "focus:outline-none"
                                            )}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">{(field.value as any) || "🛠️"}</span>
                                            </div>
                                            {iconOpen ? (
                                                <ChevronUp className="w-4 h-4 text-slate-400" />
                                            ) : (
                                                <ChevronDown className="w-4 h-4 text-slate-400" />
                                            )}
                                        </button>
                                    </FormControl>
                                </PopoverTrigger>

                                <PopoverContent
                                    className="w-[--radix-popover-trigger-width] p-3 rounded-2xl shadow-xl z-[250]"
                                    align="start"
                                    sideOffset={5}
                                >
                                    <div className="grid grid-cols-5 sm:grid-cols-5 lg:grid-cols-7 gap-2">
                                        {ICONS.map((emoji) => (
                                            <button
                                                key={emoji}
                                                type="button"
                                                onClick={() => {
                                                    field.onChange(emoji as any);
                                                    setIconOpen(false);
                                                }}
                                                className={cn(
                                                    "w-10 h-10 flex items-center justify-center text-xl rounded-xl transition-all",
                                                    field.value === emoji
                                                        ? "bg-blue-600 text-white shadow-md scale-110"
                                                        : "hover:bg-slate-100 text-slate-900"
                                                )}
                                            >
                                                {emoji}
                                            </button>
                                        ))}
                                    </div>
                                </PopoverContent>
                            </Popover>

                            <FormMessage className="text-xs text-red-500" />
                        </FormItem>
                    )}
                />
            </div>

            <FormField
                control={form.control}
                name={descriptionKey}
                render={({ field }) => (
                    <FormItem className="relative">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="Describe the tool in a few sentences..."
                                className="min-h-[120px] resize-none focus-visible:ring-0 text-base border-[#FCEC1A]"
                                {...field}
                            />
                        </FormControl>
                        <span className="absolute bottom-3 right-3 text-[10px] text-zinc-400 font-mono">
              {((field.value as any)?.length || 0)}/1000
            </span>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
