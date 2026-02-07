"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {EditToolFormValues} from "@/schemas/edit-tool-schema";

export default function GoogleSheetsSection({ form }: { form: UseFormReturn<EditToolFormValues> }) {
    return (
        <div className="w-full border border-[#DFE1E7] rounded-md p-5 space-y-5">
            <div>
                <h2 className="text-[18px] font-bold">Google Sheets Settings</h2>
                <p className="text-[13px] text-zinc-500 font-medium">
                    Configure the Google Sheet and range for this tool
                </p>
            </div>

            <FormField
                control={form.control}
                name="spreadsheetId"
                render={({ field }) => (
                    <FormItem className="space-y-1.5">
                        <FormLabel className="text-[14px] font-bold">Spreadsheet ID *</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="Enter Spreadsheet ID" className="h-11 border-[#FDE047] focus-visible:ring-0 rounded-lg" />
                        </FormControl>
                        <FormDescription className="text-[11.5px] text-zinc-500 font-medium">
                            The ID of the Google Sheet to append data to
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="range"
                render={({ field }) => (
                    <FormItem className="space-y-1.5">
                        <FormLabel className="text-[14px] font-bold">Range *</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="Enter Range (e.g., Sheet1, Sheet1!A:Z)" className="h-11 border-[#FDE047] focus-visible:ring-0 rounded-lg" />
                        </FormControl>
                        <FormDescription className="text-[11.5px] text-zinc-500 font-medium">
                            The range where the data should be appended (e.g., Sheet1, Sheet1!A:Z)
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
