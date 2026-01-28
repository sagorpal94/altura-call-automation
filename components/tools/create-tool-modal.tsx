"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { X, Plus, Info, Settings2, SlidersHorizontal, Lock, Mail, MessageSquare, ChevronDown, Code2 } from "lucide-react"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

const formSchema = z.object({
    toolName: z.string().min(1, "Tool name is required"),
    model: z.string().default("Gemini 2.0 Flash"),
    isAsync: z.boolean().default(false),
    isStrict: z.boolean().default(false),
    description: z.string().max(1000),
    serverUrl: z.string().default(""),
    timeout: z.string().default("20"),
    authorization: z.string().default("no-auth"),
})

export default function CreateToolModal({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (o: boolean) => void }) {
    const [paramView, setParamView] = useState<"visual" | "json">("visual");

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            toolName: "",
            model: "Gemini 2.0 Flash",
            isAsync: false,
            isStrict: false,
            description: "",
            serverUrl: "Gemini 2.0 Flash",
            timeout: "20",
            authorization: "no-auth",
        },
    })

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-w-[850px] p-0 overflow-hidden bg-white border-none rounded-xl max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b sticky top-0 bg-white z-10">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Tool Settings</h2>
                        <p className="text-sm text-gray-500 font-medium">Configure the basic settings for this tool</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-md border h-8 w-8">
                        <X className="h-4 w-4 text-yellow-500" />
                    </Button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    <Form {...form}>
                        <form className="space-y-8">
                            {/* --- Tool Name Section --- */}
                            <div className="space-y-4">
                                <FormField control={form.control} name="toolName" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold text-gray-800">Tool Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ej. Google Sheets Tool" {...field} className="border-yellow-200 h-11 focus-visible:ring-yellow-400" />
                                        </FormControl>
                                        <p className="text-[11px] text-gray-400 font-medium">The tool name that will be used internally for this request.</p>
                                    </FormItem>
                                )} />

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-800">Tool Type</label>
                                        <div className="h-11 flex items-center px-3 border border-transparent italic text-gray-400">Select Type...</div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-800">Tool Icon</label>
                                        <div className="h-11 flex items-center px-3 border border-transparent italic text-gray-400">Select Icon...</div>
                                    </div>
                                </div>

                                <FormField control={form.control} name="model" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold text-gray-800">Model</FormLabel>
                                        <FormControl>
                                            <Input {...field} className="border-yellow-200 h-11 focus-visible:ring-yellow-400" />
                                        </FormControl>
                                    </FormItem>
                                )} />
                            </div>

                            {/* --- Options Section --- */}
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-gray-800">Options</label>
                                <div className="border border-yellow-200 rounded-lg overflow-hidden">
                                    <div className="flex items-center justify-between p-4 border-b border-yellow-100">
                                        <div>
                                            <p className="text-sm font-bold">Async</p>
                                            <p className="text-xs text-gray-500">Tool executes asynchronously</p>
                                        </div>
                                        <Switch className="data-[state=checked]:bg-[#E9D502]" />
                                    </div>
                                    <div className="flex items-center justify-between p-4">
                                        <div>
                                            <p className="text-sm font-bold">Strict</p>
                                            <p className="text-xs text-gray-500">Enforces strict parameter validation</p>
                                        </div>
                                        <Switch className="data-[state=checked]:bg-[#E9D502]" />
                                    </div>
                                </div>
                            </div>

                            {/* --- Parameters Section --- */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <SlidersHorizontal className="h-5 w-5" />
                                        <div>
                                            <h3 className="text-sm font-bold">Parameters</h3>
                                            <p className="text-[11px] text-gray-400">Define the parameters your tool accepts</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-md border">
                                        <span className={cn("text-[11px] font-bold px-2 py-1 rounded cursor-pointer", paramView === 'visual' ? "bg-white shadow-sm text-yellow-600" : "text-gray-400")} onClick={() => setParamView('visual')}>Visual</span>
                                        <Switch checked={paramView === 'json'} onCheckedChange={(v) => setParamView(v ? 'json' : 'visual')} className="scale-75 data-[state=checked]:bg-[#E9D502]" />
                                        <span className={cn("text-[11px] font-bold px-2 py-1 rounded cursor-pointer", paramView === 'json' ? "bg-white shadow-sm text-yellow-600" : "text-gray-400")} onClick={() => setParamView('json')}>JSON</span>
                                    </div>
                                </div>

                                <Button type="button" variant="outline" className="w-full border-yellow-400 text-yellow-600 border-dashed h-12 gap-2 hover:bg-yellow-50">
                                    <Plus className="h-4 w-4" /> Add Property
                                </Button>

                                <div className="border border-yellow-200 rounded-lg p-10 flex flex-col items-center justify-center bg-yellow-50/10 border-dashed">
                                    <SlidersHorizontal className="h-8 w-8 text-gray-300 mb-2" />
                                    <p className="text-sm font-bold text-gray-800">No parameters defined</p>
                                    <p className="text-[11px] text-gray-400">Click "Add Property" to define tool parameters.</p>
                                </div>
                            </div>

                            {/* --- Description --- */}
                            <FormField control={form.control} name="description" render={({ field }) => (
                                <FormItem>
                                    <div className="flex justify-between items-center">
                                        <FormLabel className="font-bold">Description</FormLabel>
                                        <span className="text-[10px] text-gray-400">65/1000</span>
                                    </div>
                                    <FormControl>
                                        <Textarea placeholder="Describe the tool in a few sentences..." className="min-h-[100px] border-yellow-200 focus-visible:ring-yellow-400" {...field} />
                                    </FormControl>
                                </FormItem>
                            )} />

                            {/* --- Server Settings --- */}
                            <div className="space-y-6 pt-4 border-t">
                                <div>
                                    <h3 className="font-bold text-gray-900">Server Settings</h3>
                                    <p className="text-xs text-gray-400">Configure your server URL and connection settings</p>
                                </div>

                                <FormField control={form.control} name="serverUrl" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold">Server URL</FormLabel>
                                        <FormControl><Input {...field} className="border-yellow-200 h-11" /></FormControl>
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="timeout" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold">Timeout (seconds)</FormLabel>
                                        <FormControl><Input {...field} className="border-yellow-200 h-11" /></FormControl>
                                        <p className="text-[11px] text-gray-400">Must be between 1 and 300 seconds.</p>
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="authorization" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold">Authorization</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="border-yellow-200 h-11 w-full"><SelectValue /></SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="no-auth">No authentication</SelectItem>
                                                <SelectItem value="bearer">Bearer Token</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <p className="text-[11px] text-gray-400 font-medium">Select a custom credential to authenticate API requests</p>
                                    </FormItem>
                                )} />

                                {/* Credential Box */}
                                <div className="space-y-3">
                                    <label className="text-sm font-bold">Credential</label>
                                    <div className="border border-yellow-200 rounded-lg p-8 flex flex-col items-center justify-center bg-yellow-50/20">
                                        <p className="text-sm font-bold text-gray-800">No custom credentials available</p>
                                        <p className="text-[11px] text-gray-400 mb-4">Create a custom credential to authenticate your API requests</p>
                                        <Button type="button" variant="outline" className="border-yellow-400 text-yellow-600 gap-2 h-10 px-6">
                                            <Plus className="h-4 w-4" /> Create Credential
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* --- HTTP Headers --- */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-bold text-sm">HTTP Headers</h3>
                                    <Button type="button" variant="outline" size="sm" className="border-yellow-400 text-yellow-600 h-8 gap-1">
                                        <Plus className="h-3 w-3" /> Add header
                                    </Button>
                                </div>
                                <div className="border border-yellow-200 rounded-lg p-6 bg-yellow-50/10 text-center">
                                    <p className="text-[11px] text-gray-400">No headers configured. Click "Add Header" to add your first header.</p>
                                </div>
                            </div>

                            {/* --- Encryption Settings --- */}
                            <div className="space-y-4 pt-4 border-t">
                                <h3 className="font-bold text-sm">Encryption Settings</h3>
                                <div className="bg-yellow-50/30 border border-yellow-200 rounded-lg p-4 flex gap-3 items-start">
                                    <Info className="h-4 w-4 text-gray-400 mt-0.5" />
                                    <p className="text-[11px] text-gray-500 leading-relaxed">
                                        Specify JSON paths to encrypt in the request body before sending. This requires a credential with an encryption plan configured.
                                    </p>
                                </div>

                                <div className="flex justify-between items-center">
                                    <h3 className="font-bold text-sm">Encrypted Paths</h3>
                                    <Button type="button" variant="outline" size="sm" className="border-yellow-400 text-yellow-600 h-8 gap-1">
                                        <Plus className="h-3 w-3" /> Add Path
                                    </Button>
                                </div>
                                <div className="border border-yellow-200 rounded-lg p-6 bg-yellow-50/10 text-center">
                                    <p className="text-[11px] text-gray-400">No encrypted paths configured. Click "Add Path" to specify fields to encrypt.</p>
                                </div>
                            </div>

                            {/* --- Messages Section --- */}
                            <div className="p-4 border border-gray-100 rounded-xl flex items-center justify-between bg-gray-50/30">
                                <div className="flex items-center gap-3">
                                    <div className="bg-white p-2 border rounded-md shadow-sm"><MessageSquare className="h-5 w-5 text-gray-400" /></div>
                                    <div>
                                        <h4 className="text-sm font-bold">Messages</h4>
                                        <p className="text-[10px] text-gray-400">Configure messages to be spoken during different stages of tool execution</p>
                                    </div>
                                </div>
                                <Button type="button" variant="outline" className="border-gray-200 h-10 px-6 text-sm">Add Message</Button>
                            </div>

                        </form>
                    </Form>
                </div>

                {/* Footer */}
                <div className="p-4 border-t flex justify-end gap-3 bg-white">
                    <Button variant="outline" onClick={() => setIsOpen(false)} className="px-10 h-11 border-red-200 text-red-400 hover:bg-red-50 hover:text-red-500 transition-all">
                        Cancel
                    </Button>
                    <Button className="px-10 h-11 bg-[#FAEF32] hover:bg-[#E9D502] text-black font-bold gap-2 shadow-none">
                        <Plus className="h-4 w-4 stroke-[3px]" /> Save Tool
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}