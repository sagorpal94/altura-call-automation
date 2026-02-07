"use client";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ToolFormValues } from "@/schemas/tool-schema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function DtmfSection({ form }: { form: UseFormReturn<ToolFormValues> }) {
    return (
        <>
            {/*<div className="border border-[#DFE1E7] rounded-md p-4 space-y-4">*/}
            {/*    <h3 className="text-lg font-bold">DTMF</h3>*/}

            {/*    <FormField*/}
            {/*        control={form.control}*/}
            {/*        name="digits"*/}
            {/*        render={({ field }) => (*/}
            {/*            <FormItem>*/}
            {/*                <FormLabel>Digits</FormLabel>*/}
            {/*                <FormControl>*/}
            {/*                    <Input {...field} placeholder="123#*" className="border-[#FDE047]" />*/}
            {/*                </FormControl>*/}
            {/*                <FormMessage />*/}
            {/*            </FormItem>*/}
            {/*        )}*/}
            {/*    />*/}

            {/*    <FormField*/}
            {/*        control={form.control}*/}
            {/*        name="interDigitDelayMs"*/}
            {/*        render={({ field }) => (*/}
            {/*            <FormItem>*/}
            {/*                <FormLabel>Inter-digit delay (ms)</FormLabel>*/}
            {/*                <FormControl>*/}
            {/*                    <Input type="number" value={(field.value as any) ?? 250} onChange={(e) => field.onChange(Number(e.target.value))} className="border-[#FDE047]" />*/}
            {/*                </FormControl>*/}
            {/*                <FormMessage />*/}
            {/*            </FormItem>*/}
            {/*        )}*/}
            {/*    />*/}
            {/*</div>*/}
        </>
    );
}
