"use client";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ToolFormValues } from "@/schemas/tool-schema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

export default function DescriptionSection({ form }: { form: UseFormReturn<ToolFormValues> }) {
    return (
        <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
                <FormItem className="relative">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                        <Textarea {...field} placeholder="Describe the tool in a few sentences..." className="min-h-[120px] resize-none focus-visible:ring-0 text-base border-[#FCEC1A]" />
                    </FormControl>
                    <span className="absolute bottom-3 right-3 text-[10px] text-zinc-400 font-mono">{(field.value?.length || 0)}/1000</span>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
