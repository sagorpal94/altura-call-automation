"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {EditToolFormValues} from "@/schemas/edit-tool-schema";

export default function KnowledgeQuerySection({ form }: { form: UseFormReturn<EditToolFormValues> }) {
    return (
        <div className="space-y-4">
            <FormField
                control={form.control}
                name="toolModel"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Model</FormLabel>
                        <FormControl>
                            <Input {...field} className="border-[#FDE047] h-11 focus-visible:ring-0" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Placeholder: file upload -> later replace with uploader */}
            <FormField
                control={form.control}
                name="files"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Files</FormLabel>
                        <FormControl>
                            <Input
                                value={Array.isArray(field.value) ? field.value.join(",") : ""}
                                onChange={(e) => field.onChange(e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
                                placeholder="file1.csv,file2.csv"
                                className="border-[#FDE047] h-11 focus-visible:ring-0"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
