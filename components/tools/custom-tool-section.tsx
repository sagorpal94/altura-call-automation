// components/tool-sections/CustomToolSection.tsx
"use client";

import React, {useState} from "react";
import {useFieldArray, UseFormReturn} from "react-hook-form";
import { ToolFormValues } from "@/schemas/tool-schema";
import {FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {ChevronUp, Plus, Settings2, Sun} from "lucide-react";
import {cn} from "@/lib/utils";
import { Icons } from "../icons";
import {Input} from "@/components/ui/input";

export default function CustomToolSection({ form }: { form: UseFormReturn<ToolFormValues> }) {
    const [viewMode, setViewMode] = useState<"visual" | "json">("visual")
    const {fields, append, remove} = useFieldArray({
        control: form.control,
        name: "headers",
    })
    const {fields: pathFields, append: appendPath, remove: removePath} =
        useFieldArray({control: form.control, name: "encryptedPaths"});
    return (
        <div className="space-y-6">
            <FormField
                control={form.control}
                name="toolModel"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Model</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value as any}>
                            <FormControl>
                                <SelectTrigger className="border border-[#FCEC1A] h-12 text-lg focus-visible:ring-0 w-full">
                                    <SelectValue placeholder="Select Model" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="gemini-2.0-flash">Gemini 2.0 Flash</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="border border-[#FCEC1A] rounded-md px-6 py-4 space-y-3">
                <p className="font-semibold text-lg">Options</p>

                <FormField
                    control={form.control}
                    name="isAsync"
                    render={({ field }) => (
                        <FormItem className="flex items-center justify-between space-y-0 border border-[#FCEC1A] rounded-md p-2">
                            <div>
                                <FormLabel className="font-bold text-base">Async</FormLabel>
                                <p className="text-xs text-zinc-500">Tool executes asynchronously</p>
                            </div>
                            <FormControl>
                                <Switch checked={!!field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-[#fdf027]" />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="isStrict"
                    render={({ field }) => (
                        <FormItem className="flex items-center justify-between space-y-0 border border-[#FCEC1A] rounded-md p-2">
                            <div>
                                <FormLabel className="font-bold text-base">Strict</FormLabel>
                                <p className="text-xs text-zinc-500">Enforces strict parameter validation</p>
                            </div>
                            <FormControl>
                                <Switch checked={!!field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-[#fdf027]" />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>

            {/* Parameters placeholder (you can replace with your builder UI) */}
            {/*<div className="border border-[#DFE1E7] rounded-md p-4">*/}
            {/*    <div className="flex items-center justify-between">*/}
            {/*        <div>*/}
            {/*            <h3 className="font-bold">Parameters</h3>*/}
            {/*            <p className="text-xs text-zinc-500">Define the parameters your tool accepts</p>*/}
            {/*        </div>*/}
            {/*        <Button type="button" variant="outline" className="border-[#BBAE00] text-[#BBAE00]">*/}
            {/*            <Plus className="w-4 h-4 mr-2" /> Add Property*/}
            {/*        </Button>*/}
            {/*    </div>*/}
            {/*    <p className="text-xs text-zinc-500 mt-3">Hook this up to `parameters` field (array) when you’re ready.</p>*/}
            {/*</div>*/}

            <div className="w-full border border-[#DFE1E7] rounded-md overflow-hidden">

                <div className="flex items-center justify-between px-5 py-4">
                    <div className="flex items-center gap-4">
                        {/* Icon Box */}
                        <div
                            className="flex items-center justify-center w-10 h-10 border border-[#DFE1E7] rounded-lg  shadow-sm">
                            <Settings2 className="w-6 h-6 text-zinc-600 stroke-[1.5px]"/>
                        </div>

                        {/* Title & Subtitle */}
                        <div className="flex flex-col">
                            <h3 className="text-[17px] font-bold  leading-tight">
                                Parameters
                            </h3>
                            <p className="text-[13px] text-zinc-500 font-medium tracking-tight">
                                Define the parameters your tool accepts
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Toggle & Collapse */}
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                                        <span className={cn(
                                            "text-[14px] font-medium transition-colors",
                                            viewMode === "visual" ? "text-zinc-400" : "text-zinc-300"
                                        )}>
                                            Visual
                                        </span>

                            <Switch
                                checked={viewMode === "json"}
                                onCheckedChange={(checked) => setViewMode(checked ? "json" : "visual")}
                                className="data-[state=checked]:bg-[#BBAE00] data-[state=unchecked]:bg-[#BBAE00] scale-110"
                            />

                            <span className={cn(
                                "text-[14px] font-medium transition-colors",
                                viewMode === "json" ? "text-zinc-600" : "text-zinc-400"
                            )}>
                            {`</> JSON`}
                        </span>
                        </div>

                        <button type="button"
                                className="text-zinc-400 hover: transition-colors">
                            <ChevronUp className="w-6 h-6 stroke-[2.5px]"/>
                        </button>
                    </div>
                </div>

                {/* --- DIVIDER --- */}
                <div className="h-[1px] w-full bg-[#DFE1E7]"/>

                {/* --- CONTENT AREA --- */}
                <div className="p-5 space-y-4">

                    {/* Add Property Button */}
                    <button
                        type="button"
                        className="w-full h-14 border border-[#BBAE00] rounded-lg flex items-center justify-center gap-4 group hover:bg-yellow-50/30 transition-all duration-200">
                        <div
                            className="flex items-center justify-center w-6 h-6 border border-[#BBAE00] rounded-sm ">
                            <Plus className="w-4 h-4 text-[#BBAE00] stroke-[3px]"/>
                        </div>
                        <span className="text-[15px] font-bold text-[#BBAE00]">
                                        Add Property
                                    </span>
                    </button>

                    {/* Empty State Box */}
                    <div
                        className="w-full border border-[#BBAE00] rounded-lg py-10 flex flex-col items-center justify-center bg-transparent">
                        <div
                            className="flex items-center justify-center w-10 h-10 border border-zinc-300 rounded-lg  mb-3">
                            <Settings2 className="w-6 h-6 text-zinc-400 stroke-[1.5px]"/>
                        </div>
                        <h4 className="text-[16px] font-bold  mb-1">
                            No parameters defined
                        </h4>
                        <p className="text-[13px] text-zinc-500 font-medium">
                            Click "Add Property" to define tool parameters.
                        </p>
                    </div>

                </div>
            </div>

            <div className="w-full border border-[#DFE1E7] rounded-md px-3 py-4">
                {/* --- HEADER --- */}
                <div className="mb-8">
                    <h2 className="text-[19px] font-bold  mb-1">Server Settings</h2>
                    <p className="text-[13px] text-zinc-500 font-medium">
                        Configure your server URL and connection settings
                    </p>
                </div>

                <div className="space-y-5">
                    {/* --- SERVER URL --- */}
                    <FormField
                        control={form.control}
                        name="serverUrl"
                        render={({field}) => (
                            <FormItem className="space-y-1.5">
                                <FormLabel className="text-[15px] font-bold ">
                                    Server URL
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Gemini 2.0 Flash"
                                        {...field}
                                        className="h-11 border-[#FDE047] focus-visible:ring-0 rounded-lg text-zinc-500 text-[15px] placeholder:text-zinc-400"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* --- TIMEOUT --- */}
                    <FormField
                        control={form.control}
                        name="timeout"
                        render={({field: {value, onChange, ...rest}}) => (
                            <FormItem className="space-y-1.5">
                                <FormLabel className="text-[15px] font-bold ">
                                    Timeout (seconds)
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        {...rest}
                                        value={value as number ?? ""}
                                        onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
                                        className="h-11 border-[#FDE047] focus-visible:ring-0 rounded-lg text-zinc-500 text-[15px]"
                                    />
                                </FormControl>
                                <FormDescription className="text-[11.5px] text-zinc-600 font-medium">
                                    Must be between 1 and 300 seconds.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* --- AUTHORIZATION --- */}
                    <FormField
                        control={form.control}
                        name="authType"
                        render={({field}) => (
                            <FormItem className="space-y-1.5">
                                <FormLabel className="text-[15px] font-bold ">
                                    Authorization
                                </FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger
                                            className="h-11 border-[#FDE047] focus-visible:ring-0 rounded-lg text-zinc-500 text-[15px] w-full">
                                            <SelectValue placeholder="No authentication"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="font-[Space_Grotesk]">
                                        <SelectItem value="no-auth">No authentication</SelectItem>
                                        <SelectItem value="bearer">Bearer Token</SelectItem>
                                        <SelectItem value="basic">Basic Auth</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription
                                    className="text-[11.5px] text-zinc-600 font-medium pt-1">
                                    Select a custom credential to authenticate API requests
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* --- CREDENTIAL EMPTY STATE --- */}
                    <div className="pt-2">
                        <FormLabel className="text-[15px] font-bold  mb-2 block">
                            Credential
                        </FormLabel>
                        <div
                            className="w-full border border-[#FDE047] rounded-md py-12 flex flex-col items-center justify-center bg-[#FEFCE8]/30">
                            <h4 className="text-[15px] font-bold text-zinc-800 mb-1.5">
                                No custom credentials available
                            </h4>
                            <p className="text-[12px] text-zinc-500 font-medium mb-6 text-center">
                                Create a custom credential to authenticate your API requests
                            </p>

                            <Button
                                type="button"
                                variant="outline"
                                className="h-11 px-6 border-[#FDE047] bg-[#FEFCE8]/50 text-[#BBAE00] hover:bg-[#FEFCE8] hover:text-[#BBAE00] rounded-md flex items-center gap-3 transition-all"
                            >
                                <div className="flex items-center justify-center w-6 h-6">
                                    <Icons.addIcon className="w-4 h-4 stroke-[3px]"/>
                                </div>
                                <span className="font-bold text-[14px]">Create Credential</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full  border border-[#DFE1E7] rounded-md p-4">

                {/* --- HEADER PART --- */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold">HTTP Headers</h2>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => append({key: "", value: ""})}
                        className="h-10 px-4 border-[#BBAE00]  text-[#BBAE00] hover:bg-yellow-50 hover:text-[#BBAE00] rounded-md flex items-center gap-3 transition-all"
                    >
                        <div className="flex items-center justify-center w-5 h-5">
                            <Icons.addIcon className="w-3.5 h-3.5 stroke-[3px]"/>
                        </div>
                        <span className="font-bold text-[14px]">Add header</span>
                    </Button>
                </div>

                {/* --- CONTENT PART --- */}
                <div className="space-y-4">
                    {fields.length === 0 ? (
                        /* --- EMPTY STATE (IMAGE 1) --- */
                        <div
                            className="w-full border border-[#FDE047] rounded-md py-10 flex items-center justify-center bg-[#FEFCE8]/30">
                            <p className="text-[13px] text-zinc-400 font-medium">
                                No headers configured. Click &#34;Add Header&#34; to add your first
                                header.
                            </p>
                        </div>
                    ) : (
                        /* --- DYNAMIC ROWS (IMAGE 2 STYLE) --- */
                        <div className="w-full border border-[#FDE047] rounded-md p-4 bg-[#FEFCE8]/30">

                            <div className="space-y-3">
                                {fields.map((item, index) => (
                                    <div key={item.id}
                                         className="flex items-start gap-3 animate-in fade-in slide-in-from-top-1 duration-200">
                                        {/* Key Input */}
                                        <FormField
                                            control={form.control}
                                            name={`headers.${index}.key`}
                                            render={({field}) => (
                                                <FormItem className="flex-1">
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            placeholder="Key"
                                                            className="h-11 border-[#FDE047] focus-visible:ring-0 rounded-lg text-zinc-600 text-[15px] "
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-[11px]"/>
                                                </FormItem>
                                            )}
                                        />

                                        {/* Value Input */}
                                        <FormField
                                            control={form.control}
                                            name={`headers.${index}.value`}
                                            render={({field}) => (
                                                <FormItem className="flex-[1.5]">
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            placeholder="Value"
                                                            className="h-11 border-[#FDE047] focus-visible:ring-0 rounded-lg text-zinc-600 text-[15px] "
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-[11px]"/>
                                                </FormItem>
                                            )}
                                        />

                                        {/* Delete Button */}
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={() => remove(index)}
                                            className="h-11 w-11 p-0 text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                        >
                                            <Icons.deleteIcon className="w-5 h-5 stroke-[1.5px]"/>
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="w-full border border-[#DFE1E7] rounded-md p-4 space-y-4 ">

                {/* --- ENCRYPTION SETTINGS INFO BOX --- */}
                <div className="space-y-3">
                    <h2 className="text-lg font-semibold">Encryption Settings</h2>
                    <div
                        className="w-full  border border-[#FDE047] rounded-md p-5 bg-[#FEFCE3] dark:bg-muted">
                        <div className="w-full max-w-2xl  flex items-start gap-4 ">
                            <div className="mt-1">
                                <Sun
                                    className="w-5 h-5 text-zinc-600 stroke-[1.5px] animate-spin-slow"/>
                            </div>
                            <p className="text-[13px]  text-zinc-500 font-medium leading-relaxed max-w-2xl ">
                                Specify JSON paths to encrypt in the request body before sending. This
                                requires a
                                credential with an encryption plan configured.
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- ENCRYPTED PATHS SECTION --- */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Encrypted Paths</h2>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => appendPath({path: ""})}
                            className="h-10 px-4 text-[#BBAE00] border-[#BBAE00]/40 rounded-md hover:bg-yellow-50 hover:text-[#BBAE00] flex items-center gap-3 transition-all"
                        >
                            <div
                                className="flex items-center justify-center w-5 h-5">
                                <Icons.addIcon className="w-3.5 h-3.5 stroke-[3px]"/>
                            </div>
                            <span className="font-bold text-[14px]">Add Path</span>
                        </Button>
                    </div>

                    {/* --- CONTENT AREA --- */}
                    <div className="space-y-4">
                        {pathFields.length === 0 ? (
                            /* EMPTY STATE */
                            <div
                                className="w-full border border-[#FDE047] rounded-md py-10 flex items-center justify-center bg-[#FEFCE3] dark:bg-muted">
                                <p className="text-[13px] text-zinc-400 font-medium">
                                    No encrypted paths configured. Click &#34;Add Path&#34; to specify
                                    fields to encrypt.
                                </p>
                            </div>
                        ) : (
                            <div
                                className="w-full border border-[#FDE047] rounded-md p-4 bg-[#FEFCE8]/30 dark:bg-muted">
                                <div className="space-y-3">
                                    {pathFields.map((item, index) => (
                                        <div key={item.id}
                                             className="flex items-start gap-3 animate-in fade-in slide-in-from-top-1">
                                            <FormField
                                                control={form.control}
                                                name={`encryptedPaths.${index}.path`}
                                                render={({field}) => (
                                                    <FormItem className="flex-1">
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                placeholder="e.g. user.ssn"
                                                                className="h-11 border-[#FDE047] focus-visible:ring-0 rounded-lg text-zinc-600 text-[15px] "
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="text-[11px]"/>
                                                    </FormItem>
                                                )}
                                            />

                                            <Button
                                                type="button"
                                                variant="ghost"
                                                onClick={() => removePath(index)}
                                                className="h-11 w-11 p-0 text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                            >
                                                <Icons.deleteIcon className="w-5 h-5 stroke-[1.5px]"/>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* KnowledgeBase placeholder */}
            <div className="border border-[#DFE1E7] rounded-md p-4">
                <h3 className="font-bold">Knowledge Bases</h3>
                <p className="text-xs text-zinc-500 mt-1">Optional for custom tool. Map to `knowledgeBases`.</p>
            </div>
        </div>
    );
}
