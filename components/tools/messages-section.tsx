"use client";

import React from "react";
import {
    FieldValues,
    Path,
    UseFormReturn,
    useFieldArray,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { ChevronDown } from "lucide-react";
import { Icons } from "../icons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Props<TForm extends FieldValues> = {
    form: UseFormReturn<TForm>;
};

export default function MessagesSection<TForm extends FieldValues>({ form }: Props<TForm>) {
    // ✅ typed paths
    const messagesName = "messages" as Path<TForm>;

    const { fields: messagesFields, append, remove } = useFieldArray({
        control: form.control,
        name: messagesName as any, // RHF limitation for generic fieldArray
    });

    return (
        <div className="w-full border border-[#DFE1E7] rounded-md">
            {/* Header */}
            <div className="p-6 flex items-center justify-between border-b border-[#DFE1E7]">
                <div className="flex items-center gap-4">
                    <Icons.menuIcon className="w-8 h-8 text-zinc-500 stroke-[1.5px]" />
                    <div>
                        <h2 className="text-lg font-semibold leading-tight">Messages</h2>
                        <p className="text-xs text-zinc-500 font-medium tracking-tight">
                            Configure messages to be spoken during different stages of tool execution
                        </p>
                    </div>
                </div>

                <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                        append({
                            type: "Request Start",
                            option: "default",
                            waitForMessage: false,
                            conditions: [{ parameter: "", operator: "equal", value: "" }],
                        } as any)
                    }
                    className="h-11 px-6 border-[#FDE047] font-bold text-[15px] rounded-md transition-all"
                >
                    Add Message
                </Button>
            </div>

            {/* Content */}
            <div className="divide-y divide-[#DFE1E7]">
                {messagesFields.map((field, index) => {
                    const typePath = `messages.${index}.type` as Path<TForm>;
                    const optionPath = `messages.${index}.option` as Path<TForm>;
                    const waitPath = `messages.${index}.waitForMessage` as Path<TForm>;

                    // NOTE: তোমার conditions UI এখন uncontrolled (Input/Select এ FormField নাই)
                    // চাইলে পরে conditions-ও fieldArray করে type-safe করে দেব।
                    return (
                        <div key={field.id} className="p-8 space-y-8 animate-in fade-in duration-300">
                            {/* Title */}
                            <div className="flex justify-between items-start">
                                <h3 className="text-[18px] font-bold">{String(form.watch(typePath as any) ?? "")}</h3>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => remove(index)}
                                    className="text-zinc-400 hover:text-red-500"
                                >
                                    <Icons.deleteIcon className="w-4 h-4" />
                                </Button>
                            </div>

                            {/* Option */}
                            <FormField
                                control={form.control}
                                name={optionPath}
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-[14px] font-bold">Message Option</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value as any}
                                                className="flex flex-col space-y-1"
                                            >
                                                <FormItem className="flex items-center space-x-1 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="default" className="border-[#BBAE00] text-[#BBAE00]" />
                                                    </FormControl>
                                                    <FormLabel className="font-medium text-[15px] text-zinc-600">
                                                        Default (server will use default message)
                                                    </FormLabel>
                                                </FormItem>

                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="none" className="border-[#BBAE00] text-[#BBAE00]" />
                                                    </FormControl>
                                                    <FormLabel className="font-medium text-[15px] text-zinc-600">
                                                        None (no message will be spoken)
                                                    </FormLabel>
                                                </FormItem>

                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="custom" className="border-[#BBAE00] text-[#BBAE00]" />
                                                    </FormControl>
                                                    <FormLabel className="font-medium text-[15px] text-zinc-600">Custom</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            {/* Wait For Message */}
                            <FormField
                                control={form.control}
                                name={waitPath}
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 border-t border-b border-[#DFE1E7] py-4">
                                        <FormControl>
                                            <Checkbox
                                                checked={!!field.value}
                                                onCheckedChange={field.onChange}
                                                className="border-zinc-300 data-[state=checked]:bg-[#BBAE00] data-[state=checked]:border-[#BBAE00]"
                                            />
                                        </FormControl>
                                        <FormLabel className="text-[14px] font-medium text-zinc-700">
                                            Wait for message to be spoken before triggering tool call
                                        </FormLabel>
                                    </FormItem>
                                )}
                            />

                            {/* Conditions (UI only as you had) */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h4 className="text-[15px] font-bold">Conditions</h4>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Input
                                        placeholder="Parameter"
                                        className="flex-1 h-11 border-[#FDE047] rounded-lg focus-visible:ring-0"
                                    />
                                    <Select defaultValue="equal">
                                        <SelectTrigger className="w-[180px] h-11 border-[#FDE047] rounded-lg focus-visible:ring-0">
                                            <SelectValue placeholder="Equal (==)" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="equal">Equal (==)</SelectItem>
                                            <SelectItem value="not-equal">Not Equal (!=)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <div className="flex-[1.5] relative">
                                        <Input
                                            placeholder="Value"
                                            className="w-full h-11 border-[#FDE047] rounded-lg focus-visible:ring-0 pr-10"
                                        />
                                        <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-zinc-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
