"use client";

import React from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { ToolFormValues } from "@/schemas/tool-schema";

import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus } from "lucide-react";

export default function McpSection({ form }: { form: UseFormReturn<ToolFormValues> }) {
    const headersFA = useFieldArray({ control: form.control, name: "headers" as any });
    const encFA = useFieldArray({ control: form.control, name: "encryptedPaths" as any });

    return (
        <div className="space-y-6">

            {/* Model */}
            <FormField
                control={form.control}
                name="toolModel"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Model</FormLabel>
                        <FormControl>
                            <Input {...field} className="border-[#FDE047] focus-visible:ring-0" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Description */}
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem className="relative">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Textarea
                                {...field}
                                placeholder="Describe the tool in a few sentences..."
                                className="min-h-[120px] border-[#FDE047] focus-visible:ring-0"
                            />
                        </FormControl>
                        <span className="absolute top-0 right-0 text-xs text-zinc-400">
              {(field.value?.length || 0)}/1000
            </span>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Server Settings */}
            <div className="border border-[#DFE1E7] rounded-md p-4 space-y-5">
                <div>
                    <h3 className="font-bold text-lg">Server Settings</h3>
                    <p className="text-xs text-zinc-500">Configure your server URL and connection settings</p>
                </div>

                <FormField
                    control={form.control}
                    name="serverUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Server URL</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="https://..." className="border-[#FDE047] focus-visible:ring-0" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="timeout"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Timeout (seconds)</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    value={(field.value as any) ?? 20}
                                    onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
                                    className="border-[#FDE047] focus-visible:ring-0"
                                />
                            </FormControl>
                            <FormDescription className="text-xs text-zinc-500">Must be between 1 and 300 seconds.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="credential.mode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Authorization</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value as any}>
                                <FormControl>
                                    <SelectTrigger className="border-[#FDE047] focus-visible:ring-0 w-full">
                                        <SelectValue placeholder="No authentication" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="no-auth">No authentication</SelectItem>
                                    <SelectItem value="bearer">Bearer Token</SelectItem>
                                    <SelectItem value="basic">Basic Auth</SelectItem>
                                    <SelectItem value="custom-credential">Custom credential</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription className="text-xs text-zinc-500">
                                Select a custom credential to authenticate API requests
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Credential empty state */}
                <div className="border border-[#FDE047] rounded-md py-12 flex flex-col items-center justify-center bg-[#FEFCE8]/40">
                    <h4 className="font-bold text-sm text-zinc-700">No custom credentials available</h4>
                    <p className="text-xs text-zinc-500 mt-1">Create a custom credential to authenticate your API requests</p>
                    <Button type="button" variant="outline" className="mt-5 border-[#FDE047] text-[#BBAE00] font-bold">
                        <Plus className="w-4 h-4 mr-2" /> Create Credential
                    </Button>
                </div>
            </div>

            {/* HTTP Headers */}
            <div className="border border-[#DFE1E7] rounded-md p-4 space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-bold">HTTP Headers</h3>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => headersFA.append({ key: "", value: "" } as any)}
                        className="border-[#BBAE00] text-[#BBAE00] font-bold"
                    >
                        <Plus className="w-4 h-4 mr-2" /> Add header
                    </Button>
                </div>

                {headersFA.fields.length === 0 ? (
                    <div className="border border-[#FDE047] rounded-md py-10 flex items-center justify-center bg-[#FEFCE8]/30">
                        <p className="text-xs text-zinc-400">No headers configured. Click "Add header" to add your first header.</p>
                    </div>
                ) : (
                    <div className="space-y-3 border border-[#FDE047] rounded-md p-4 bg-[#FEFCE8]/30">
                        {headersFA.fields.map((f, i) => (
                            <div key={f.id} className="flex gap-3">
                                <FormField
                                    control={form.control}
                                    name={`headers.${i}.key` as any}
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                                <Input {...field} placeholder="Key" className="border-[#FDE047]" />
                                            </FormControl>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`headers.${i}.value` as any}
                                    render={({ field }) => (
                                        <FormItem className="flex-[1.5]">
                                            <FormControl>
                                                <Input {...field} placeholder="Value" className="border-[#FDE047]" />
                                            </FormControl>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    )}
                                />
                                <button type="button" onClick={() => headersFA.remove(i)} className="h-11 w-11 text-zinc-400 hover:text-red-500">
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Encryption + Paths */}
            <div className="border border-[#DFE1E7] rounded-md p-4 space-y-4">
                <div>
                    <h3 className="font-bold">Encryption Settings</h3>
                    <div className="border border-[#FDE047] rounded-md p-4 bg-[#FEFCE3] mt-2">
                        <p className="text-xs text-zinc-500">
                            Specify JSON paths to encrypt in the request body before sending. This requires a credential with an encryption plan configured.
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <h3 className="font-bold">Encrypted Paths</h3>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => encFA.append({ path: "" } as any)}
                        className="border-[#BBAE00] text-[#BBAE00] font-bold"
                    >
                        <Plus className="w-4 h-4 mr-2" /> Add Path
                    </Button>
                </div>

                {encFA.fields.length === 0 ? (
                    <div className="border border-[#FDE047] rounded-md py-10 flex items-center justify-center bg-[#FEFCE3]">
                        <p className="text-xs text-zinc-400">No encrypted paths configured. Click "Add Path" to specify fields to encrypt.</p>
                    </div>
                ) : (
                    <div className="space-y-3 border border-[#FDE047] rounded-md p-4 bg-[#FEFCE8]/30">
                        {encFA.fields.map((f, i) => (
                            <div key={f.id} className="flex gap-3">
                                <FormField
                                    control={form.control}
                                    name={`encryptedPaths.${i}.path` as any}
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                                <Input {...field} placeholder="e.g. user.ssn" className="border-[#FDE047]" />
                                            </FormControl>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    )}
                                />
                                <button type="button" onClick={() => encFA.remove(i)} className="h-11 w-11 text-zinc-400 hover:text-red-500">
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* MCP Settings */}
            <div className="border border-[#DFE1E7] rounded-md p-4 space-y-3">
                <div>
                    <h3 className="font-bold text-lg">MCP Settings</h3>
                    <p className="text-xs text-zinc-500">Configure the Model Context Protocol connection settings</p>
                </div>

                <FormField
                    control={form.control}
                    name="mcpProtocol"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Protocol</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value as any}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                >
                                    <label className="flex items-start gap-3 border rounded-md p-4 cursor-pointer">
                                        <RadioGroupItem value="SHTTP" className="mt-1" />
                                        <div>
                                            <div className="font-semibold">Streamable HTTP (SHTTP)</div>
                                            <div className="text-xs text-zinc-500">Uses HTTP-based streaming for communication</div>
                                        </div>
                                    </label>

                                    <label className="flex items-start gap-3 border rounded-md p-4 cursor-pointer">
                                        <RadioGroupItem value="SSE" className="mt-1" />
                                        <div>
                                            <div className="font-semibold">Server Events (SSE)</div>
                                            <div className="text-xs text-zinc-500">Use event driven communication</div>
                                        </div>
                                    </label>
                                </RadioGroup>
                            </FormControl>
                            <FormDescription className="text-xs text-zinc-500 ">
                                Choose the communication protocol for MCP server connections. Streamable HTTP (SHTTP) is recommended for most use cases.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
}
