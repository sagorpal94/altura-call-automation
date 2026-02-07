"use client";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ToolFormValues } from "@/schemas/tool-schema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function VoicemailSection({ form }: { form: UseFormReturn<ToolFormValues> }) {
    return (
        <div className="border border-[#DFE1E7] rounded-md p-4 space-y-4">
            <h3 className="text-lg font-bold">Voicemail</h3>

            <FormField
                control={form.control}
                name="maxDurationSeconds"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Max duration (seconds)</FormLabel>
                        <FormControl>
                            <Input type="number" value={(field.value as any) ?? 120} onChange={(e) => field.onChange(Number(e.target.value))} className="border-[#FDE047]" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="beep"
                render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                        <FormLabel>Beep</FormLabel>
                        <FormControl>
                            <Switch checked={!!field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-[#fdf027]" />
                        </FormControl>
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="transcription"
                render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                        <FormLabel>Transcription</FormLabel>
                        <FormControl>
                            <Switch checked={!!field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-[#fdf027]" />
                        </FormControl>
                    </FormItem>
                )}
            />
            <FormMessage />
        </div>
    );
}
