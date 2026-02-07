"use client";

import React from "react";
import {UseFormReturn, useFieldArray} from "react-hook-form";
import {ToolFormValues} from "@/schemas/tool-schema";

import {FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {Plus} from "lucide-react";

export default function ApiRequestSection({form}: { form: UseFormReturn<ToolFormValues> }) {
    // field arrays
    const headersFA = useFieldArray({control: form.control, name: "headers" as any});
    const encFA = useFieldArray({control: form.control, name: "encryptedPaths" as any});
    const reqPropsFA = useFieldArray({control: form.control, name: "requestBody.properties" as any});
    const respVarsFA = useFieldArray({control: form.control, name: "responseBody.variables" as any});
    const aliasesFA = useFieldArray({control: form.control, name: "aliases" as any});

    return (
        <div className="space-y-6">

            {/* 1) Request URL + Method */}
            <div className="border border-[#DFE1E7] rounded-md p-4 space-y-4">
                <FormField
                    control={form.control}
                    name="requestUrl"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Request URL*</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="https://www.vapi.ai"
                                       className="border-[#FDE047] focus-visible:ring-0"/>
                            </FormControl>
                            <FormDescription className="text-xs text-zinc-500">
                                The end point URL where the API request will be sent. Must use HTTPS
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="httpMethod"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Request HTTP Method*</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value as any}>
                                <FormControl>
                                    <SelectTrigger className="border-[#FDE047] focus-visible:ring-0 w-full">
                                        <SelectValue placeholder="GET"/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {["GET", "POST", "PUT", "PATCH", "DELETE"].map((m) => (
                                        <SelectItem key={m} value={m}>{m}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription className="text-xs text-zinc-500">
                                The HTTP method to use for the request.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            </div>

            {/* 2) Authorization */}
            <div className="border border-[#DFE1E7] rounded-md overflow-hidden">
                <div className="px-4 py-3 border-b flex items-center justify-between">
                    <div>
                        <h3 className="font-bold">Authorization</h3>
                        <p className="text-xs text-zinc-500">Configure authorization for API request</p>
                    </div>
                    <button type="button" className="text-[#BBAE00] text-sm font-semibold">+ Add New</button>
                </div>

                <div className="p-4 space-y-4">
                    <FormField
                        control={form.control}
                        name="credential.mode"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Credential</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value as any}>
                                    <FormControl>
                                        <SelectTrigger className="border-[#FDE047] focus-visible:ring-0 w-full">
                                            <SelectValue placeholder="No authentication"/>
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
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Empty-state for credentials */}
                    <div
                        className="border border-[#FDE047] rounded-md py-10 flex flex-col items-center justify-center bg-[#FEFCE8]/40">
                        <h4 className="font-bold text-sm text-zinc-700">No custom credentials available</h4>
                        <p className="text-xs text-zinc-500 mt-1">Create a custom credential to authenticate your API
                            requests</p>
                        <Button type="button" variant="outline"
                                className="mt-5 border-[#FDE047] text-[#BBAE00] font-bold">
                            <Plus className="w-4 h-4 mr-2"/> Create Credential
                        </Button>
                    </div>
                </div>
            </div>

            {/* 3) HTTP Headers */}
            <div className="border border-[#DFE1E7] rounded-md p-4 space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-bold">HTTP Headers</h3>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => headersFA.append({key: "", value: ""} as any)}
                        className="border-[#BBAE00] text-[#BBAE00] font-bold"
                    >
                        <Plus className="w-4 h-4 mr-2"/> Add header
                    </Button>
                </div>

                {headersFA.fields.length === 0 ? (
                    <div
                        className="border border-[#FDE047] rounded-md py-10 flex items-center justify-center bg-[#FEFCE8]/30">
                        <p className="text-xs text-zinc-400">
                            No headers configured. Click "Add header" to add your first header.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3 border border-[#FDE047] rounded-md p-4 bg-[#FEFCE8]/30">
                        {headersFA.fields.map((f, i) => (
                            <div key={f.id} className="flex gap-3">
                                <FormField
                                    control={form.control}
                                    name={`headers.${i}.key` as any}
                                    render={({field}) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                                <Input {...field} placeholder="Key"
                                                       className="border-[#FDE047] focus-visible:ring-0"/>
                                            </FormControl>
                                            <FormMessage className="text-xs"/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`headers.${i}.value` as any}
                                    render={({field}) => (
                                        <FormItem className="flex-[1.5]">
                                            <FormControl>
                                                <Input {...field} placeholder="Value"
                                                       className="border-[#FDE047] focus-visible:ring-0"/>
                                            </FormControl>
                                            <FormMessage className="text-xs"/>
                                        </FormItem>
                                    )}
                                />
                                <button type="button" onClick={() => headersFA.remove(i)}
                                        className="h-11 w-11 text-zinc-400 hover:text-red-500">
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 4) Request Body */}
            <div className="border border-[#DFE1E7] rounded-md overflow-hidden">
                <div className="px-4 py-3 border-b flex items-center justify-between">
                    <div>
                        <h3 className="font-bold">Request Body</h3>
                        <p className="text-xs text-zinc-500">Define the structure of your request body using the schema
                            builder.</p>
                    </div>
                    {/* collapse icon placeholder */}
                    <span className="text-zinc-400">⌃</span>
                </div>

                <div className="p-4 space-y-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => reqPropsFA.append({name: "", type: "string", required: false} as any)}
                        className="w-full border-[#BBAE00] text-[#BBAE00] font-bold"
                    >
                        <Plus className="w-4 h-4 mr-2"/> Add Property
                    </Button>

                    {reqPropsFA.fields.length === 0 ? (
                        <div
                            className="border border-[#BBAE00] rounded-md py-10 flex flex-col items-center justify-center">
                            <h4 className="font-bold text-sm">No parameters defined</h4>
                            <p className="text-xs text-zinc-500">Click "Add Property" to define tool parameters.</p>
                        </div>
                    ) : (
                        <div className="space-y-3 border border-[#FDE047] rounded-md p-4 bg-[#FEFCE8]/30">
                            {reqPropsFA.fields.map((f, i) => (
                                <div key={f.id} className="grid grid-cols-12 gap-3 items-start">
                                    <FormField
                                        control={form.control}
                                        name={`requestBody.properties.${i}.name` as any}
                                        render={({field}) => (
                                            <FormItem className="col-span-5">
                                                <FormControl>
                                                    <Input {...field} placeholder="Field name"
                                                           className="border-[#FDE047]"/>
                                                </FormControl>
                                                <FormMessage className="text-xs"/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`requestBody.properties.${i}.type` as any}
                                        render={({field}) => (
                                            <FormItem className="col-span-4">
                                                <Select onValueChange={field.onChange}
                                                        defaultValue={field.value as any}>
                                                    <FormControl>
                                                        <SelectTrigger className="border-[#FDE047] w-full">
                                                            <SelectValue placeholder="Type"/>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {["string", "number", "boolean", "object", "array"].map((t) => (
                                                            <SelectItem key={t} value={t}>{t}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage className="text-xs"/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`requestBody.properties.${i}.required` as any}
                                        render={({field}) => (
                                            <FormItem className="col-span-2 flex items-center gap-2 pt-2">
                                                <FormControl>
                                                    <Checkbox checked={!!field.value} onCheckedChange={field.onChange}/>
                                                </FormControl>
                                                <span className="text-sm">Required</span>
                                            </FormItem>
                                        )}
                                    />
                                    <div className="col-span-1 flex justify-end">
                                        <button type="button" onClick={() => reqPropsFA.remove(i)}
                                                className="text-zinc-400 hover:text-red-500">
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* 5) Encryption Settings + Encrypted Paths */}
            <div className="border border-[#DFE1E7] rounded-md p-4 space-y-4">
                <div>
                    <h3 className="font-bold">Encryption Settings</h3>
                    <div className="border border-[#FDE047] rounded-md p-4 bg-[#FEFCE3] mt-2">
                        <p className="text-xs text-zinc-500">
                            Specify JSON paths to encrypt in the request body before sending. This requires a credential
                            with an encryption plan configured.
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <h3 className="font-bold">Encrypted Paths</h3>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => encFA.append({path: ""} as any)}
                        className="border-[#BBAE00] text-[#BBAE00] font-bold"
                    >
                        <Plus className="w-4 h-4 mr-2"/> Add Path
                    </Button>
                </div>

                {encFA.fields.length === 0 ? (
                    <div
                        className="border border-[#FDE047] rounded-md py-10 flex items-center justify-center bg-[#FEFCE3]">
                        <p className="text-xs text-zinc-400">No encrypted paths configured.</p>
                    </div>
                ) : (
                    <div className="space-y-3 border border-[#FDE047] rounded-md p-4 bg-[#FEFCE8]/30">
                        {encFA.fields.map((f, i) => (
                            <div key={f.id} className="flex gap-3">
                                <FormField
                                    control={form.control}
                                    name={`encryptedPaths.${i}.path` as any}
                                    render={({field}) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                                <Input {...field} placeholder="e.g. user.ssn"
                                                       className="border-[#FDE047]"/>
                                            </FormControl>
                                            <FormMessage className="text-xs"/>
                                        </FormItem>
                                    )}
                                />
                                <button type="button" onClick={() => encFA.remove(i)}
                                        className="h-11 w-11 text-zinc-400 hover:text-red-500">
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 6) Response body table */}
            <div className="border border-[#DFE1E7] rounded-md overflow-hidden">
                <div className="px-4 py-3 border-b flex items-center justify-between">
                    <div>
                        <h3 className="font-bold">Response body</h3>
                        <p className="text-xs text-zinc-500">Assign dynamic variables extracted from the API response
                            data.</p>
                    </div>
                    <span className="text-zinc-400">⌃</span>
                </div>

                <div className="p-4">
                    <div className="border rounded-md overflow-hidden">
                        <div className="grid grid-cols-12 bg-white text-xs font-semibold border-b">
                            <div className="col-span-6 p-3">Variable</div>
                            <div className="col-span-3 p-3 border-l">Type</div>
                            <div className="col-span-2 p-3 border-l">Required</div>
                            <div className="col-span-1 p-3 border-l">Actions</div>
                        </div>

                        {respVarsFA.fields.length === 0 ? (
                            <div className="p-3 text-sm text-[#BBAE00] font-semibold cursor-pointer"
                                 onClick={() => respVarsFA.append({name: "", type: "string", required: false} as any)}>
                                + Add Property
                            </div>
                        ) : (
                            <div className="divide-y">
                                {respVarsFA.fields.map((v, i) => (
                                    <div key={v.id} className="grid grid-cols-12 items-center">
                                        <div className="col-span-6 p-2">
                                            <FormField
                                                control={form.control}
                                                name={`responseBody.variables.${i}.name` as any}
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input {...field} placeholder="variable_name"
                                                                   className="border-[#FDE047]"/>
                                                        </FormControl>
                                                        <FormMessage className="text-xs"/>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="col-span-3 p-2 border-l">
                                            <FormField
                                                control={form.control}
                                                name={`responseBody.variables.${i}.type` as any}
                                                render={({field}) => (
                                                    <FormItem>
                                                        <Select onValueChange={field.onChange}
                                                                defaultValue={field.value as any}>
                                                            <FormControl>
                                                                <SelectTrigger className="border-[#FDE047] w-full">
                                                                    <SelectValue placeholder="Type"/>
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {["string", "number", "boolean", "object", "array"].map((t) => (
                                                                    <SelectItem key={t} value={t}>{t}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage className="text-xs"/>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="col-span-2 p-2 border-l">
                                            <FormField
                                                control={form.control}
                                                name={`responseBody.variables.${i}.required` as any}
                                                render={({field}) => (
                                                    <FormItem className="flex items-center gap-2">
                                                        <FormControl>
                                                            <Checkbox checked={!!field.value}
                                                                      onCheckedChange={field.onChange}/>
                                                        </FormControl>
                                                        <span className="text-sm">Yes</span>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="col-span-1 p-2 border-l flex justify-center">
                                            <button type="button" onClick={() => respVarsFA.remove(i)}
                                                    className="text-zinc-400 hover:text-red-500">
                                                ✕
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <div className="p-3 text-sm text-[#BBAE00] font-semibold cursor-pointer"
                                     onClick={() => respVarsFA.append({
                                         name: "",
                                         type: "string",
                                         required: false
                                     } as any)}>
                                    + Add Property
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 7) Aliases */}
            <div className="border border-[#DFE1E7] rounded-md p-4 space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-bold">Aliases</h3>
                        <p className="text-xs text-zinc-500">Define aliases for response fields to map them to different
                            in the workflow</p>
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => aliasesFA.append({from: "", to: ""} as any)}
                        className="border-[#BBAE00] text-[#BBAE00] font-bold"
                    >
                        <Plus className="w-4 h-4 mr-2"/> Add Alias
                    </Button>
                </div>

                {aliasesFA.fields.length === 0 ? (
                    <div
                        className="border border-[#FDE047] rounded-md py-10 flex items-center justify-center bg-[#FEFCE8]/30">
                        <p className="text-xs text-zinc-400">No aliases configured.</p>
                    </div>
                ) : (
                    <div className="space-y-3 border border-[#FDE047] rounded-md p-4 bg-[#FEFCE8]/30">
                        {aliasesFA.fields.map((a, i) => (
                            <div key={a.id} className="grid grid-cols-12 gap-3">
                                <FormField
                                    control={form.control}
                                    name={`aliases.${i}.from` as any}
                                    render={({field}) => (
                                        <FormItem className="col-span-5">
                                            <FormControl>
                                                <Input {...field} placeholder="From (response field)"
                                                       className="border-[#FDE047]"/>
                                            </FormControl>
                                            <FormMessage className="text-xs"/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`aliases.${i}.to` as any}
                                    render={({field}) => (
                                        <FormItem className="col-span-6">
                                            <FormControl>
                                                <Input {...field} placeholder="To (alias name)"
                                                       className="border-[#FDE047]"/>
                                            </FormControl>
                                            <FormMessage className="text-xs"/>
                                        </FormItem>
                                    )}
                                />
                                <div className="col-span-1 flex justify-end">
                                    <button type="button" onClick={() => aliasesFA.remove(i)}
                                            className="text-zinc-400 hover:text-red-500">
                                        ✕
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}
