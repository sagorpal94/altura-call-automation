"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { toolFormSchema, ToolFormValues } from "@/schemas/tool-schema";

// ✅ Sections (you'll create these files)
import ToolIdentitySection from "@/components/tools/tool-identity-section";
import DescriptionSection from "@/components/tools/description-section";
import MessagesSection from "@/components/tools/messages-section";

import CustomToolSection from "@/components/tools/custom-tool-section";
import ApiRequestSection from "@/components/tools/api-request-section";
import GoogleSheetsSection from "@/components/tools/google-sheets-section";
import DtmfSection from "@/components/tools/dtmf-section";
import QuerySection from "@/components/tools/query-section";
import VoicemailSection from "@/components/tools/voicemail-section";
import EndCallSection from "@/components/tools/end-call-section";
import McpSection from "@/components/tools/mcp-section";
import { Icons } from "../icons";

export default function CreateToolModal({
                                            isOpen,
                                            setIsOpen,
                                        }: {
    isOpen: boolean;
    setIsOpen: (o: boolean) => void;
}) {
    const form = useForm({
        resolver: zodResolver(toolFormSchema),
        shouldUnregister: true, // ✅ IMPORTANT
        defaultValues: {
            toolName: "",
            toolType: "custom-tool",
            icon: "🛠️",
            description: "",
            messages: [],
            // custom-tool defaults:
            toolModel: "gemini-2.0-flash",
            isAsync: false,
            isStrict: true,
            viewMode: "visual",
            parameters: [],
            knowledgeBases: [],
        } as any,
    });

    const toolType = useWatch({ control: form.control, name: "toolType" });

    // ✅ default sets when switching types (keeps UX clean)
    useEffect(() => {
        if (!toolType) return;

        if (toolType === "API-Request") {
            form.setValue("httpMethod", "GET" as any);
            form.setValue("credential", { mode: "no-auth" } as any);
            form.setValue("headers", [] as any);
            form.setValue("requestBody", { properties: [] } as any);
            form.setValue("encryptedPaths", [] as any);
            form.setValue("responseBody", { variables: [] } as any);
            form.setValue("aliases", [] as any);
        }


        if (toolType === "Google-sheets") {
            form.setValue("spreadsheetId", "" as any);
            form.setValue("range", "" as any);
        }

        if (toolType === "DTMF") {
            form.setValue("interDigitDelayMs", 250 as any);
        }

        if (toolType === "Query") {
            form.setValue("topK", 5 as any);
            form.setValue("source", "knowledge-base" as any);
        }

        if (toolType === "Voicemail") {
            form.setValue("maxDurationSeconds", 120 as any);
            form.setValue("beep", true as any);
            form.setValue("transcription", true as any);
        }

        if (toolType === "MCP") {
            form.setValue("toolModel", "gemini-2.0-flash" as any);
            form.setValue("serverUrl", "" as any);
            form.setValue("timeout", 20 as any);
            form.setValue("credential", { mode: "no-auth" } as any);
            form.setValue("headers", [] as any);
            form.setValue("encryptedPaths", [] as any);
            form.setValue("mcpProtocol", "SHTTP" as any);
        }


    }, [toolType]);

    function onSubmit(data: ToolFormValues) {
        console.log("SUBMIT:", data);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-w-[95vw] md:max-w-[1100px] p-0 gap-0 rounded-xl overflow-hidden shadow-md [&>button]:hidden flex flex-col max-h-[92vh]">
                {/* header */}
                <div className="flex items-baseline justify-between p-5 border-b sticky top-0 z-10">
                    <div>
                        <h2 className="text-xl font-bold">Tool Settings</h2>
                        <p className="text-sm text-gray-500 font-medium">Configure the basic settings for this tool</p>
                    </div>
                    <Icons.modalClose onClick={() => setIsOpen(false)} className="h-6 w-6 text-yellow-500 cursor-pointer"/>
                </div>

                {/* body */}
                <div className="flex-1 overflow-y-auto pt-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-5xl mx-auto space-y-6 mb-10 px-4">
                            {/* Shared section */}
                            <ToolIdentitySection form={form} />

                            {/* Tool-specific */}
                            {toolType === "custom-tool" && <CustomToolSection form={form} />}
                            {toolType === "API-Request" && <ApiRequestSection form={form} />}
                            {toolType === "Google-sheets" && <GoogleSheetsSection form={form} />}
                            {toolType === "DTMF" && <DtmfSection form={form} />}
                            {toolType === "Query" && <QuerySection form={form} />}
                            {toolType === "Voicemail" && <VoicemailSection form={form} />}
                            {toolType === "end-call" && <EndCallSection form={form} />}
                            {toolType === "MCP" && <McpSection form={form} />}

                            {/* Common optional */}
                            <DescriptionSection form={form} />
                            <MessagesSection form={form} />
                        </form>
                    </Form>
                </div>

                {/* footer */}
                <div className="p-4 border-t flex justify-end gap-3 bg-white">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                        className="px-10 h-11 border-red-200 text-red-400 hover:bg-red-50 hover:text-red-500"
                    >
                        Cancel
                    </Button>
                    <Button type="submit" onClick={form.handleSubmit(onSubmit)} className="px-10 h-11 bg-[#FAEF32] hover:bg-[#E9D502] font-bold gap-2 shadow-none">
                        <Plus className="h-4 w-4 stroke-[3px]" /> Save Tool
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}


// "use client"
//
// import React, {useState} from "react"
// import {useFieldArray, useForm} from "react-hook-form"
// import {zodResolver} from "@hookform/resolvers/zod"
// import {Plus, Settings2, ChevronDown, ChevronUp, Trash2, Sun, Menu} from "lucide-react"
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover";
// import {Dialog, DialogContent} from "@/components/ui/dialog"
// import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
// import {Input} from "@/components/ui/input"
// import {Button} from "@/components/ui/button"
// import {Switch} from "@/components/ui/switch"
// import {Textarea} from "@/components/ui/textarea"
// import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import {cn} from "@/lib/utils"
// import {toolFormSchema, ToolFormValues} from "@/schemas/tool-schema";
// import {Icons} from "@/components/icons";
// import {Checkbox} from "@/components/ui/checkbox";
//
// const ICONS = [
//     "🛠️", "📞", "🔍", "🚪", "📼", "🌐", "🧩", "💬",
//     "📊", "📅", "🏗️"
// ];
//
// export default function CreateToolModal({isOpen, setIsOpen}: { isOpen: boolean; setIsOpen: (o: boolean) => void }) {
//     const [viewMode, setViewMode] = useState<"visual" | "json">("visual")
//     const [open, setOpen] = useState(false);
//
//     const form = useForm({
//         resolver: zodResolver(toolFormSchema),
//         defaultValues: {
//             toolName: "",
//             toolType: "",
//             icon: "🛠️",
//             toolModel: "gemini-2.0-flash",
//             isAsync: false,
//             isStrict: true,
//             viewType: "visual",
//             description: "",
//             timeout: 20,
//             authType: "no-auth",
//         },
//     })
//
//     const {fields, append, remove} = useFieldArray({
//         control: form.control,
//         name: "headers",
//     })
//     const {fields: pathFields, append: appendPath, remove: removePath} =
//         useFieldArray({control: form.control, name: "encryptedPaths"});
//
//     const { fields:messagesFields, append:appendMessages, remove:removeMessages } = useFieldArray({
//         control: form.control,
//         name: "messages",
//     })
//
//     function onSubmit(data: ToolFormValues) {
//         console.log(data)
//     }
//
//     return (
//         <Dialog open={isOpen} onOpenChange={setIsOpen}>
//             <DialogContent
//                 onInteractOutside={(e) => e.preventDefault()}
//                 onEscapeKeyDown={(e) => e.preventDefault()}
//                 className="max-w-[95vw] md:max-w-[1100px] p-0 gap-0  rounded-xl overflow-hidden  shadow-md [&>button]:hidden flex flex-col max-h-[92vh]"
//             >
//                 {/* Header */}
//                 <div className="flex items-baseline justify-between p-5 border-b sticky top-0 z-10">
//                     <div>
//                         <h2 className="text-xl font-bold">Tool Settings</h2>
//                         <p className="text-sm text-gray-500 font-medium">Configure the basic settings for this tool</p>
//                     </div>
//                     <Icons.modalClose onClick={() => setIsOpen(false)} className="h-6 w-6 text-yellow-500 cursor-pointer"/>
//                 </div>
//
//                 {/* Scrollable Content */}
//                 <div className="flex-1 overflow-y-auto pt-6 space-y-8">
//                     <Form {...form}>
//                         <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-5xl mx-auto space-y-6 mb-10">
//
//                             {/* --- SECTION 1: TOOL IDENTITY --- */}
//                             <div className="space-y-6">
//                                 <FormField
//                                     control={form.control}
//                                     name="toolName"
//                                     render={({field}) => (
//                                         <FormItem>
//                                             <FormLabel
//                                                 className="text-xs font-bold tracking-widest  dark:text-muted-foreground">Tool
//                                                 Name</FormLabel>
//                                             <FormControl>
//                                                 <Input placeholder="Ej. Google Sheets Tool" {...field}
//                                                        className="  h-12 text-lg  focus-visible:ring-0 border-[#FCEC1A]"/>
//                                             </FormControl>
//                                             <FormDescription className="text-zinc-500 text-xs">
//                                                 The tool name that will be used internally for this request.
//                                             </FormDescription>
//                                             <FormMessage/>
//                                         </FormItem>
//                                     )}
//                                 />
//
//                                 <div className="grid sm:grid-cols-2 gap-6 items-baseline">
//                                     {/* Tool Type */}
//                                     <FormField
//                                         control={form.control}
//                                         name="toolType"
//                                         render={({field}) => (
//                                             <FormItem>
//                                                 <FormLabel
//                                                     className="text-xs font-bold tracking-widest  dark:text-muted-foreground">
//                                                     Tool Type
//                                                 </FormLabel>
//                                                 <Select
//                                                     onValueChange={field.onChange}
//                                                     defaultValue={field.value}
//                                                 >
//                                                     <FormControl>
//                                                         <SelectTrigger
//                                                             className="w-full flex items-center justify-between border-[#FCEC1A]"
//                                                         >
//                                                             <SelectValue placeholder="Select tool type"/>
//                                                         </SelectTrigger>
//                                                     </FormControl>
//
//                                                     <SelectContent className="z-[250]">
//                                                         <SelectGroup>
//                                                             <SelectItem value="custom-tool">Custom tool</SelectItem>
//                                                             <SelectItem value="DTMF">DTMF</SelectItem>
//                                                             <SelectItem value="Query">Query</SelectItem>
//                                                             <SelectItem value="end-call">End call</SelectItem>
//                                                             <SelectItem value="Voicemail">Voicemail</SelectItem>
//                                                             <SelectItem value="API-Request">API Request</SelectItem>
//                                                             <SelectItem value="Google-sheets">Google sheets</SelectItem>
//                                                         </SelectGroup>
//                                                     </SelectContent>
//                                                 </Select>
//
//                                                 {/* ৩. এরর মেসেজ দেখানোর জন্য এটা জরুরি */}
//                                                 <FormMessage className="text-xs text-red-500"/>
//                                             </FormItem>
//                                         )}
//                                     />
//
//                                     {/* Tool Icon (Visual Only for now) */}
//                                     <FormField
//                                         control={form.control}
//                                         name="icon" // আপনার zod schema তে 'icon' ফিল্ড থাকতে হবে
//                                         render={({field}) => (
//                                             <FormItem>
//                                                 <FormLabel
//                                                     className="text-xs font-bold tracking-widest   dark:text-muted-foreground ">
//                                                     Tool Icon
//                                                 </FormLabel>
//
//                                                 <Popover open={open} onOpenChange={setOpen}>
//                                                     <PopoverTrigger asChild>
//                                                         <FormControl>
//                                                             <button
//                                                                 type="button"
//                                                                 role="combobox"
//                                                                 aria-expanded={open}
//                                                                 className={cn(
//                                                                     "w-full flex items-center justify-between border rounded-md border-[#FCEC1A]",
//                                                                     "focus:outline-none focus:border-blue-500",
//                                                                 )}
//                                                             >
//                                                                 <div className="flex items-center gap-3">
//                                                                     <span
//                                                                         className="text-2xl">{field.value || "🛠️"}</span>
//                                                                     <span
//                                                                         className={cn("text-sm font-medium", !field.value && "text-slate-500")}>
//                                                               </span>
//                                                                 </div>
//                                                                 {open ?
//                                                                     <ChevronUp className="w-4 h-4 text-slate-400"/> :
//                                                                     <ChevronDown className="w-4 h-4 text-slate-400"/>}
//                                                             </button>
//                                                         </FormControl>
//                                                     </PopoverTrigger>
//                                                     <PopoverContent
//                                                         className="w-[--radix-popover-trigger-width]  p-3 rounded-2xl shadow-xl  z-[250]"
//                                                         align="start"
//                                                         sideOffset={5}
//                                                     >
//                                                         <div
//                                                             className="grid grid-cols-5 sm:grid-cols-5 lg:grid-cols-7 gap-2">
//                                                             {ICONS.map((emoji) => (
//                                                                 <button
//                                                                     key={emoji}
//                                                                     type="button"
//                                                                     onClick={() => {
//                                                                         field.onChange(emoji);
//                                                                         setOpen(false);
//                                                                     }}
//                                                                     className={cn(
//                                                                         "w-10 h-10 flex items-center justify-center text-xl rounded-xl transition-all",
//                                                                         field.value === emoji
//                                                                             ? "bg-blue-600 text-white shadow-md scale-110" // সিলেক্টেড স্টাইল
//                                                                             : "hover:bg-slate-100 text-slate-900" // সাধারণ স্টাইল
//                                                                     )}
//                                                                 >
//                                                                     {emoji}
//                                                                 </button>
//                                                             ))}
//                                                         </div>
//                                                     </PopoverContent>
//                                                 </Popover>
//                                                 <FormMessage className="text-xs text-red-500"/>
//                                             </FormItem>
//                                         )}
//                                     />
//                                 </div>
//
//                                 <FormField
//                                     control={form.control}
//                                     name="toolModel"
//                                     render={({field}) => (
//                                         <FormItem>
//                                             <FormLabel className="">Model</FormLabel>
//                                             <Select onValueChange={field.onChange} defaultValue={field.value}>
//                                                 <FormControl>
//                                                     <SelectTrigger
//                                                         className=" border border-[#FCEC1A] h-12 text-lg  focus-visible:ring-0 w-full">
//                                                         <SelectValue placeholder="Select Model"/>
//                                                     </SelectTrigger>
//                                                 </FormControl>
//                                                 <SelectContent>
//                                                     <SelectItem value="gemini-2.0-flash">Gemini 2.0 Flash</SelectItem>
//                                                 </SelectContent>
//                                             </Select>
//                                             <FormMessage/>
//                                         </FormItem>
//                                     )}
//                                 />
//                             </div>
//
//                             <div className="border border-[#FCEC1A] rounded-md px-6 py-4 space-y-1">
//                                 <p className="font-semibold text-lg">Options</p>
//                                 <div className="rounded-md p-0.5 border border-[#FCEC1A]">
//                                     {/* Async Toggle */}
//                                     <FormField
//                                         control={form.control}
//                                         name="isAsync"
//                                         render={({field}) => (
//                                             <FormItem
//                                                 className="flex items-center justify-between p-1 space-y-0">
//                                                 <div>
//                                                     <FormLabel
//                                                         className="font-bold  dark:text-muted-foreground text-base">
//                                                         Async
//                                                     </FormLabel>
//                                                     <p className="text-xs text-zinc-500">
//                                                         Tool executes asynchronously
//                                                     </p>
//                                                 </div>
//                                                 <FormControl>
//                                                     <Switch checked={field.value} onCheckedChange={field.onChange}
//                                                             className="data-[state=checked]:bg-[#fdf027]"/>
//                                                 </FormControl>
//                                             </FormItem>
//                                         )}
//                                     />
//                                 </div>
//                                 <div className="rounded-md p-0.5 border border-[#FCEC1A]">
//                                     {/* Strict Toggle */}
//                                     <FormField
//                                         control={form.control}
//                                         name="isStrict"
//                                         render={({field}) => (
//                                             <FormItem className="flex items-center justify-between p-1 space-y-0">
//                                                 <div>
//                                                     <FormLabel
//                                                         className="font-bold  dark:text-muted-foreground text-base">Strict</FormLabel>
//                                                     <p className="text-xs text-zinc-500">Enforces strict parameter
//                                                         validation</p>
//                                                 </div>
//                                                 <FormControl>
//                                                     <Switch checked={field.value} onCheckedChange={field.onChange}
//                                                             className="data-[state=checked]:bg-[#fdf027]"/>
//                                                 </FormControl>
//                                             </FormItem>
//                                         )}
//                                     />
//                                 </div>
//                             </div>
//
//                             <div className="w-full border border-[#DFE1E7] rounded-md overflow-hidden">
//
//                                 <div className="flex items-center justify-between px-5 py-4">
//                                     <div className="flex items-center gap-4">
//                                         {/* Icon Box */}
//                                         <div
//                                             className="flex items-center justify-center w-10 h-10 border border-[#DFE1E7] rounded-lg  shadow-sm">
//                                             <Settings2 className="w-6 h-6 text-zinc-600 stroke-[1.5px]"/>
//                                         </div>
//
//                                         {/* Title & Subtitle */}
//                                         <div className="flex flex-col">
//                                             <h3 className="text-[17px] font-bold  leading-tight">
//                                                 Parameters
//                                             </h3>
//                                             <p className="text-[13px] text-zinc-500 font-medium tracking-tight">
//                                                 Define the parameters your tool accepts
//                                             </p>
//                                         </div>
//                                     </div>
//
//                                     {/* Right Side: Toggle & Collapse */}
//                                     <div className="flex items-center gap-6">
//                                         <div className="flex items-center gap-3">
//                                         <span className={cn(
//                                             "text-[14px] font-medium transition-colors",
//                                             viewMode === "visual" ? "text-zinc-400" : "text-zinc-300"
//                                         )}>
//                                             Visual
//                                         </span>
//
//                                             <Switch
//                                                 checked={viewMode === "json"}
//                                                 onCheckedChange={(checked) => setViewMode(checked ? "json" : "visual")}
//                                                 className="data-[state=checked]:bg-[#BBAE00] data-[state=unchecked]:bg-[#BBAE00] scale-110"
//                                             />
//
//                                             <span className={cn(
//                                                 "text-[14px] font-medium transition-colors",
//                                                 viewMode === "json" ? "text-zinc-600" : "text-zinc-400"
//                                             )}>
//                             {`</> JSON`}
//                         </span>
//                                         </div>
//
//                                         <button type="button"
//                                                 className="text-zinc-400 hover: transition-colors">
//                                             <ChevronUp className="w-6 h-6 stroke-[2.5px]"/>
//                                         </button>
//                                     </div>
//                                 </div>
//
//                                 {/* --- DIVIDER --- */}
//                                 <div className="h-[1px] w-full bg-[#DFE1E7]"/>
//
//                                 {/* --- CONTENT AREA --- */}
//                                 <div className="p-5 space-y-4">
//
//                                     {/* Add Property Button */}
//                                     <button
//                                         type="button"
//                                         className="w-full h-14 border border-[#BBAE00] rounded-lg flex items-center justify-center gap-4 group hover:bg-yellow-50/30 transition-all duration-200">
//                                         <div
//                                             className="flex items-center justify-center w-6 h-6 border border-[#BBAE00] rounded-sm ">
//                                             <Plus className="w-4 h-4 text-[#BBAE00] stroke-[3px]"/>
//                                         </div>
//                                         <span className="text-[15px] font-bold text-[#BBAE00]">
//                                         Add Property
//                                     </span>
//                                     </button>
//
//                                     {/* Empty State Box */}
//                                     <div
//                                         className="w-full border border-[#BBAE00] rounded-lg py-10 flex flex-col items-center justify-center bg-transparent">
//                                         <div
//                                             className="flex items-center justify-center w-10 h-10 border border-zinc-300 rounded-lg  mb-3">
//                                             <Settings2 className="w-6 h-6 text-zinc-400 stroke-[1.5px]"/>
//                                         </div>
//                                         <h4 className="text-[16px] font-bold  mb-1">
//                                             No parameters defined
//                                         </h4>
//                                         <p className="text-[13px] text-zinc-500 font-medium">
//                                             Click "Add Property" to define tool parameters.
//                                         </p>
//                                     </div>
//
//                                 </div>
//                             </div>
//
//                             <FormField
//                                 control={form.control}
//                                 name="description"
//                                 render={({field}) => (
//                                     <FormItem className="relative">
//                                         <FormLabel className="">Description</FormLabel>
//                                         <FormControl>
//                                             <Textarea
//                                                 placeholder="Describe the tool in a few sentences..."
//                                                 className=" min-h-[120px] resize-none  focus-visible:ring-0 text-base border-[#FCEC1A]"
//                                                 {...field}
//                                             />
//                                         </FormControl>
//                                         <span
//                                             className="absolute bottom-3 right-3 text-[10px] text-zinc-400 font-mono">
//                                         {field.value?.length || 0}/1000
//                                     </span>
//                                         <FormMessage/>
//                                     </FormItem>
//                                 )}
//                             />
//
//                             <div className="w-full border border-[#DFE1E7] rounded-md px-3 py-4">
//                                 {/* --- HEADER --- */}
//                                 <div className="mb-8">
//                                     <h2 className="text-[19px] font-bold  mb-1">Server Settings</h2>
//                                     <p className="text-[13px] text-zinc-500 font-medium">
//                                         Configure your server URL and connection settings
//                                     </p>
//                                 </div>
//
//                                 <div className="space-y-5">
//                                     {/* --- SERVER URL --- */}
//                                     <FormField
//                                         control={form.control}
//                                         name="serverUrl"
//                                         render={({field}) => (
//                                             <FormItem className="space-y-1.5">
//                                                 <FormLabel className="text-[15px] font-bold ">
//                                                     Server URL
//                                                 </FormLabel>
//                                                 <FormControl>
//                                                     <Input
//                                                         placeholder="Gemini 2.0 Flash"
//                                                         {...field}
//                                                         className="h-11 border-[#FDE047] focus-visible:ring-0 rounded-lg text-zinc-500 text-[15px] placeholder:text-zinc-400"
//                                                     />
//                                                 </FormControl>
//                                                 <FormMessage/>
//                                             </FormItem>
//                                         )}
//                                     />
//
//                                     {/* --- TIMEOUT --- */}
//                                     <FormField
//                                         control={form.control}
//                                         name="timeout"
//                                         render={({field: {value, onChange, ...rest}}) => (
//                                             <FormItem className="space-y-1.5">
//                                                 <FormLabel className="text-[15px] font-bold ">
//                                                     Timeout (seconds)
//                                                 </FormLabel>
//                                                 <FormControl>
//                                                     <Input
//                                                         type="number"
//                                                         {...rest}
//                                                         value={value as number ?? ""}
//                                                         onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
//                                                         className="h-11 border-[#FDE047] focus-visible:ring-0 rounded-lg text-zinc-500 text-[15px]"
//                                                     />
//                                                 </FormControl>
//                                                 <FormDescription className="text-[11.5px] text-zinc-600 font-medium">
//                                                     Must be between 1 and 300 seconds.
//                                                 </FormDescription>
//                                                 <FormMessage/>
//                                             </FormItem>
//                                         )}
//                                     />
//
//                                     {/* --- AUTHORIZATION --- */}
//                                     <FormField
//                                         control={form.control}
//                                         name="authType"
//                                         render={({field}) => (
//                                             <FormItem className="space-y-1.5">
//                                                 <FormLabel className="text-[15px] font-bold ">
//                                                     Authorization
//                                                 </FormLabel>
//                                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
//                                                     <FormControl>
//                                                         <SelectTrigger
//                                                             className="h-11 border-[#FDE047] focus-visible:ring-0 rounded-lg text-zinc-500 text-[15px] w-full">
//                                                             <SelectValue placeholder="No authentication"/>
//                                                         </SelectTrigger>
//                                                     </FormControl>
//                                                     <SelectContent className="font-[Space_Grotesk]">
//                                                         <SelectItem value="no-auth">No authentication</SelectItem>
//                                                         <SelectItem value="bearer">Bearer Token</SelectItem>
//                                                         <SelectItem value="basic">Basic Auth</SelectItem>
//                                                     </SelectContent>
//                                                 </Select>
//                                                 <FormDescription
//                                                     className="text-[11.5px] text-zinc-600 font-medium pt-1">
//                                                     Select a custom credential to authenticate API requests
//                                                 </FormDescription>
//                                                 <FormMessage/>
//                                             </FormItem>
//                                         )}
//                                     />
//
//                                     {/* --- CREDENTIAL EMPTY STATE --- */}
//                                     <div className="pt-2">
//                                         <FormLabel className="text-[15px] font-bold  mb-2 block">
//                                             Credential
//                                         </FormLabel>
//                                         <div
//                                             className="w-full border border-[#FDE047] rounded-md py-12 flex flex-col items-center justify-center bg-[#FEFCE8]/30">
//                                             <h4 className="text-[15px] font-bold text-zinc-800 mb-1.5">
//                                                 No custom credentials available
//                                             </h4>
//                                             <p className="text-[12px] text-zinc-500 font-medium mb-6 text-center">
//                                                 Create a custom credential to authenticate your API requests
//                                             </p>
//
//                                             <Button
//                                                 type="button"
//                                                 variant="outline"
//                                                 className="h-11 px-6 border-[#FDE047] bg-[#FEFCE8]/50 text-[#BBAE00] hover:bg-[#FEFCE8] hover:text-[#BBAE00] rounded-md flex items-center gap-3 transition-all"
//                                             >
//                                                 <div className="flex items-center justify-center w-6 h-6">
//                                                     <Icons.addIcon className="w-4 h-4 stroke-[3px]"/>
//                                                 </div>
//                                                 <span className="font-bold text-[14px]">Create Credential</span>
//                                             </Button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//
//                             <div className="w-full  border border-[#DFE1E7] rounded-md p-4">
//
//                                 {/* --- HEADER PART --- */}
//                                 <div className="flex items-center justify-between mb-6">
//                                     <h2 className="text-lg font-semibold">HTTP Headers</h2>
//
//                                     <Button
//                                         type="button"
//                                         variant="outline"
//                                         onClick={() => append({key: "", value: ""})}
//                                         className="h-10 px-4 border-[#BBAE00]  text-[#BBAE00] hover:bg-yellow-50 hover:text-[#BBAE00] rounded-md flex items-center gap-3 transition-all"
//                                     >
//                                         <div className="flex items-center justify-center w-5 h-5">
//                                             <Icons.addIcon className="w-3.5 h-3.5 stroke-[3px]"/>
//                                         </div>
//                                         <span className="font-bold text-[14px]">Add header</span>
//                                     </Button>
//                                 </div>
//
//                                 {/* --- CONTENT PART --- */}
//                                 <div className="space-y-4">
//                                     {fields.length === 0 ? (
//                                         /* --- EMPTY STATE (IMAGE 1) --- */
//                                         <div
//                                             className="w-full border border-[#FDE047] rounded-md py-10 flex items-center justify-center bg-[#FEFCE8]/30">
//                                             <p className="text-[13px] text-zinc-400 font-medium">
//                                                 No headers configured. Click &#34;Add Header&#34; to add your first
//                                                 header.
//                                             </p>
//                                         </div>
//                                     ) : (
//                                         /* --- DYNAMIC ROWS (IMAGE 2 STYLE) --- */
//                                         <div className="w-full border border-[#FDE047] rounded-md p-4 bg-[#FEFCE8]/30">
//
//                                             <div className="space-y-3">
//                                                 {fields.map((item, index) => (
//                                                     <div key={item.id}
//                                                          className="flex items-start gap-3 animate-in fade-in slide-in-from-top-1 duration-200">
//                                                         {/* Key Input */}
//                                                         <FormField
//                                                             control={form.control}
//                                                             name={`headers.${index}.key`}
//                                                             render={({field}) => (
//                                                                 <FormItem className="flex-1">
//                                                                     <FormControl>
//                                                                         <Input
//                                                                             {...field}
//                                                                             placeholder="Key"
//                                                                             className="h-11 border-[#FDE047] focus-visible:ring-0 rounded-lg text-zinc-600 text-[15px] "
//                                                                         />
//                                                                     </FormControl>
//                                                                     <FormMessage className="text-[11px]"/>
//                                                                 </FormItem>
//                                                             )}
//                                                         />
//
//                                                         {/* Value Input */}
//                                                         <FormField
//                                                             control={form.control}
//                                                             name={`headers.${index}.value`}
//                                                             render={({field}) => (
//                                                                 <FormItem className="flex-[1.5]">
//                                                                     <FormControl>
//                                                                         <Input
//                                                                             {...field}
//                                                                             placeholder="Value"
//                                                                             className="h-11 border-[#FDE047] focus-visible:ring-0 rounded-lg text-zinc-600 text-[15px] "
//                                                                         />
//                                                                     </FormControl>
//                                                                     <FormMessage className="text-[11px]"/>
//                                                                 </FormItem>
//                                                             )}
//                                                         />
//
//                                                         {/* Delete Button */}
//                                                         <Button
//                                                             type="button"
//                                                             variant="ghost"
//                                                             onClick={() => remove(index)}
//                                                             className="h-11 w-11 p-0 text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-colors"
//                                                         >
//                                                             <Icons.deleteIcon className="w-5 h-5 stroke-[1.5px]"/>
//                                                         </Button>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//
//                             <div className="w-full border border-[#DFE1E7] rounded-md p-4 space-y-4 ">
//
//                                 {/* --- ENCRYPTION SETTINGS INFO BOX --- */}
//                                 <div className="space-y-3">
//                                     <h2 className="text-lg font-semibold">Encryption Settings</h2>
//                                     <div
//                                         className="w-full  border border-[#FDE047] rounded-md p-5 bg-[#FEFCE3] dark:bg-muted">
//                                         <div className="w-full max-w-2xl  flex items-start gap-4 ">
//                                             <div className="mt-1">
//                                                 <Sun
//                                                     className="w-5 h-5 text-zinc-600 stroke-[1.5px] animate-spin-slow"/>
//                                             </div>
//                                             <p className="text-[13px]  text-zinc-500 font-medium leading-relaxed max-w-2xl ">
//                                                 Specify JSON paths to encrypt in the request body before sending. This
//                                                 requires a
//                                                 credential with an encryption plan configured.
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </div>
//
//                                 {/* --- ENCRYPTED PATHS SECTION --- */}
//                                 <div className="space-y-4">
//                                     <div className="flex items-center justify-between">
//                                         <h2 className="text-lg font-semibold">Encrypted Paths</h2>
//
//                                         <Button
//                                             type="button"
//                                             variant="outline"
//                                             onClick={() => appendPath({path: ""})}
//                                             className="h-10 px-4 text-[#BBAE00] border-[#BBAE00]/40 rounded-md hover:bg-yellow-50 hover:text-[#BBAE00] flex items-center gap-3 transition-all"
//                                         >
//                                             <div
//                                                 className="flex items-center justify-center w-5 h-5">
//                                                 <Icons.addIcon className="w-3.5 h-3.5 stroke-[3px]"/>
//                                             </div>
//                                             <span className="font-bold text-[14px]">Add Path</span>
//                                         </Button>
//                                     </div>
//
//                                     {/* --- CONTENT AREA --- */}
//                                     <div className="space-y-4">
//                                         {pathFields.length === 0 ? (
//                                             /* EMPTY STATE */
//                                             <div
//                                                 className="w-full border border-[#FDE047] rounded-md py-10 flex items-center justify-center bg-[#FEFCE3] dark:bg-muted">
//                                                 <p className="text-[13px] text-zinc-400 font-medium">
//                                                     No encrypted paths configured. Click &#34;Add Path&#34; to specify
//                                                     fields to encrypt.
//                                                 </p>
//                                             </div>
//                                         ) : (
//                                             <div
//                                                 className="w-full border border-[#FDE047] rounded-md p-4 bg-[#FEFCE8]/30 dark:bg-muted">
//                                                 <div className="space-y-3">
//                                                     {pathFields.map((item, index) => (
//                                                         <div key={item.id}
//                                                              className="flex items-start gap-3 animate-in fade-in slide-in-from-top-1">
//                                                             <FormField
//                                                                 control={form.control}
//                                                                 name={`encryptedPaths.${index}.path`}
//                                                                 render={({field}) => (
//                                                                     <FormItem className="flex-1">
//                                                                         <FormControl>
//                                                                             <Input
//                                                                                 {...field}
//                                                                                 placeholder="e.g. user.ssn"
//                                                                                 className="h-11 border-[#FDE047] focus-visible:ring-0 rounded-lg text-zinc-600 text-[15px] "
//                                                                             />
//                                                                         </FormControl>
//                                                                         <FormMessage className="text-[11px]"/>
//                                                                     </FormItem>
//                                                                 )}
//                                                             />
//
//                                                             <Button
//                                                                 type="button"
//                                                                 variant="ghost"
//                                                                 onClick={() => removePath(index)}
//                                                                 className="h-11 w-11 p-0 text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-colors"
//                                                             >
//                                                                 <Icons.deleteIcon className="w-5 h-5 stroke-[1.5px]"/>
//                                                             </Button>
//                                                         </div>
//                                                     ))}
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//
//                             <div className="w-full  border border-[#DFE1E7] rounded-md">
//
//                                 {/* --- HEADER (IMAGE 1 STYLE) --- */}
//                                 <div className="p-6 flex items-center justify-between border-b border-[#DFE1E7]">
//                                     <div className="flex items-center gap-4">
//                                             <Icons.menuIcon className="w-8 h-8 text-zinc-500  stroke-[1.5px]" />
//                                         <div>
//                                             <h2 className="text-lg font-semibold leading-tight">Messages</h2>
//                                             <p className="text-xs text-zinc-500 font-medium tracking-tight">
//                                                 Configure messages to be spoken during different stages of tool execution
//                                             </p>
//                                         </div>
//                                     </div>
//
//                                     <Button
//                                         type="button"
//                                         variant="outline"
//                                         onClick={() => appendMessages({ type: "Request Start", option: "default", waitForMessage: false, conditions: [{ parameter: "", operator: "equal", value: "" }] })}
//                                         className="h-11 px-6 border-[#FDE047]  font-bold text-[15px] rounded-md transition-all"
//                                     >
//                                         Add Message
//                                     </Button>
//                                 </div>
//
//                                 {/* --- EXPANDED CONTENT (IMAGE 2 STYLE) --- */}
//                                 <div className="divide-y divide-[#DFE1E7]">
//                                     {messagesFields.map((field, index) => (
//                                         <div key={field.id} className="p-8 space-y-8 animate-in fade-in duration-300">
//
//                                             {/* Message Title & Global Trash */}
//                                             <div className="flex justify-between items-start">
//                                                 <h3 className="text-[18px] font-bold ">{form.watch(`messages.${index}.type`)}</h3>
//                                                 <Button variant="ghost" size="sm" onClick={() => removeMessages(index)} className="text-zinc-400 hover:text-red-500">
//                                                     <Icons.deleteIcon className="w-4 h-4" />
//                                                 </Button>
//                                             </div>
//
//                                             {/* Message Option Radio Group */}
//                                             <FormField
//                                                 control={form.control}
//                                                 name={`messages.${index}.option`}
//                                                 render={({ field }) => (
//                                                     <FormItem className="space-y-2">
//                                                         <FormLabel className="text-[14px] font-bold ">Message Option</FormLabel>
//                                                         <FormControl>
//                                                             <RadioGroup
//                                                                 onValueChange={field.onChange}
//                                                                 defaultValue={field.value}
//                                                                 className="flex flex-col space-y-1"
//                                                             >
//                                                                 <FormItem className="flex items-center space-x-1 space-y-0">
//                                                                     <FormControl>
//                                                                         <RadioGroupItem value="default" className="border-[#BBAE00] text-[#BBAE00]" />
//                                                                     </FormControl>
//                                                                     <FormLabel className="font-medium text-[15px] text-zinc-600">Default (server will use default message)</FormLabel>
//                                                                 </FormItem>
//                                                                 <FormItem className="flex items-center space-x-3 space-y-0">
//                                                                     <FormControl>
//                                                                         <RadioGroupItem value="none" className="border-[#BBAE00] text-[#BBAE00]" />
//                                                                     </FormControl>
//                                                                     <FormLabel className="font-medium text-[15px] text-zinc-600">None (no message will be spoken)</FormLabel>
//                                                                 </FormItem>
//                                                                 <FormItem className="flex items-center space-x-3 space-y-0">
//                                                                     <FormControl>
//                                                                         <RadioGroupItem value="custom" className="border-[#BBAE00] text-[#BBAE00]" />
//                                                                     </FormControl>
//                                                                     <FormLabel className="font-medium text-[15px] text-zinc-600">Custom</FormLabel>
//                                                                 </FormItem>
//                                                             </RadioGroup>
//                                                         </FormControl>
//                                                     </FormItem>
//                                                 )}
//                                             />
//
//                                             {/* Wait For Message Checkbox */}
//                                             <FormField
//                                                 control={form.control}
//                                                 name={`messages.${index}.waitForMessage`}
//                                                 render={({ field }) => (
//                                                     <FormItem className="flex flex-row items-center space-x-3 space-y-0 border-t border-b border-[#DFE1E7] py-4">
//                                                         <FormControl>
//                                                             <Checkbox
//                                                                 checked={field.value}
//                                                                 onCheckedChange={field.onChange}
//                                                                 className="border-zinc-300 data-[state=checked]:bg-[#BBAE00] data-[state=checked]:border-[#BBAE00]"
//                                                             />
//                                                         </FormControl>
//                                                         <FormLabel className="text-[14px] font-medium text-zinc-700">
//                                                             Wait for message to be spoken before triggering tool call
//                                                         </FormLabel>
//                                                     </FormItem>
//                                                 )}
//                                             />
//
//                                             {/* --- CONDITIONS SUB-SECTION --- */}
//                                             <div className="space-y-4">
//                                                 <div className="flex justify-between items-center">
//                                                     <h4 className="text-[15px] font-bold">Conditions</h4>
//                                                     {/*<Trash2 className="w-4 h-4 text-zinc-300 cursor-pointer" />*/}
//                                                 </div>
//
//                                                 {/* Condition Row */}
//                                                 <div className="flex items-center gap-3">
//                                                     <Input
//                                                         placeholder="Parameter"
//                                                         className="flex-1 h-11 border-[#FDE047] rounded-lg focus-visible:ring-0"
//                                                     />
//                                                     <Select defaultValue="equal">
//                                                         <SelectTrigger className="w-[180px] h-11 border-[#FDE047] rounded-lg focus-visible:ring-0">
//                                                             <SelectValue placeholder="Equal (==)" />
//                                                         </SelectTrigger>
//                                                         <SelectContent>
//                                                             <SelectItem value="equal">Equal (==)</SelectItem>
//                                                             <SelectItem value="not-equal">Not Equal (!=)</SelectItem>
//                                                         </SelectContent>
//                                                     </Select>
//                                                     <div className="flex-[1.5] relative">
//                                                         <Input
//                                                             placeholder="Value"
//                                                             className="w-full h-11 border-[#FDE047] rounded-lg focus-visible:ring-0 pr-10"
//                                                         />
//                                                         <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-zinc-400" />
//                                                     </div>
//                                                     {/*<Trash2 className="w-4 h-4 text-zinc-300 cursor-pointer" />*/}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//
//
//                         </form>
//                     </Form>
//                 </div>
//
//                 {/* Footer */}
//                 <div className="p-4 border-t flex justify-end gap-3 ">
//                     <Button variant="outline" onClick={() => setIsOpen(false)}
//                             className="px-10 h-11 border-red-200 text-red-400 hover:bg-red-50 hover:text-red-500 transition-all">
//                         Cancel
//                     </Button>
//                     <Button
//                         className="px-10 h-11 bg-[#FAEF32] hover:bg-[#E9D502]  font-bold gap-2 shadow-none">
//                         <Plus className="h-4 w-4 stroke-[3px]"/> Save Tool
//                     </Button>
//                 </div>
//             </DialogContent>
//         </Dialog>
//     )
// }