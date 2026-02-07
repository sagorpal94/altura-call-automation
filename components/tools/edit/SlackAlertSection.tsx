"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {EditToolFormValues} from "@/schemas/edit-tool-schema";

export default function SlackAlertSection({ form }: { form: UseFormReturn<EditToolFormValues> }) {
    return (
        <div className="w-full border border-[#DFE1E7] rounded-md p-5 space-y-5">
            <div>
                <h2 className="text-[18px] font-bold">Slack Settings</h2>
                <p className="text-[13px] text-zinc-500 font-medium">
                    Configure the destination for this Slack tool
                </p>
            </div>

            <FormField
                control={form.control}
                name="channelId"
                render={({ field }) => (
                    <FormItem className="space-y-1.5">
                        <FormLabel className="text-[14px] font-bold">Channel ID</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="e.g. 1245t4645" className="h-11 border-[#FDE047] focus-visible:ring-0 rounded-lg" />
                        </FormControl>
                        <FormDescription className="text-[11.5px] text-zinc-500 font-medium">
                            The Slack channel ID where messages will be posted.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="actionType"
                render={({ field }) => (
                    <FormItem className="space-y-1.5">
                        <FormLabel className="text-[14px] font-bold">Action Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value as any}>
                            <FormControl>
                                <SelectTrigger className="h-11 border-[#FDE047] focus-visible:ring-0 rounded-lg">
                                    <SelectValue placeholder="Send Chat Message" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="send-message">Send Chat Message</SelectItem>
                                <SelectItem value="send-summary">Send Summary</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
