"use client";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ToolFormValues } from "@/schemas/tool-schema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function EndCallSection({ form }: { form: UseFormReturn<ToolFormValues> }) {
    return (
        <div className="border border-[#DFE1E7] rounded-md p-4 space-y-4">
            <h3 className="text-lg font-bold">End Call</h3>
            <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Reason (optional)</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="e.g. User requested to end call" className="border-[#FDE047]" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
