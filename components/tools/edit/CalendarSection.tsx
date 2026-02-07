"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {EditToolFormValues} from "@/schemas/edit-tool-schema";

export default function CalendarSection({ form }: { form: UseFormReturn<EditToolFormValues> }) {
    return (
        <div className="w-full border border-[#DFE1E7] rounded-md p-5 space-y-5">
            <div>
                <h2 className="text-[18px] font-bold">Calendar Settings</h2>
                <p className="text-[13px] text-zinc-500 font-medium">
                    Configure the Google Calendar availability check
                </p>
            </div>

            <FormField
                control={form.control}
                name="calendarId"
                render={({ field }) => (
                    <FormItem className="space-y-1.5">
                        <FormLabel className="text-[14px] font-bold">Calendar ID</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="Enter Calendar ID" className="h-11 border-[#FDE047] focus-visible:ring-0 rounded-lg" />
                        </FormControl>
                        <FormDescription className="text-[11.5px] text-zinc-500 font-medium">
                            Configure the Google Calendar availability check
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="timezone"
                render={({ field }) => (
                    <FormItem className="space-y-1.5">
                        <FormLabel className="text-[14px] font-bold">Timezone</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="America/New_York" className="h-11 border-[#FDE047] focus-visible:ring-0 rounded-lg" />
                        </FormControl>
                        <FormDescription className="text-[11.5px] text-zinc-500 font-medium">
                            The time zone for the availability check (e.g., America/New_York). Defaults to UTC if not specified.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
