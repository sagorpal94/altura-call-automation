"use client"

import React from "react"
import {useForm, useFieldArray} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import {X, Trash2, Plus} from "lucide-react"

import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Checkbox} from "@/components/ui/checkbox"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Icons} from "@/components/icons";

// Full Validation Schema
const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    gateways: z.array(z.object({
        ip: z.string().min(1, "IP/Domain is required"),
        port: z.string().min(1, "Port is required"),
        netmask: z.string().min(1, "Netmask is required"),
        protocol: z.string().min(1, "Protocol is required"),
        allowInbound: z.boolean(),
        allowOutbound: z.boolean(),
        enablePing: z.boolean(),
    })),
    username: z.string().default(""),
    password: z.string().default(""),
    useSipRegistration: z.boolean().default(false),

    registrationDomain: z.string().optional(),
    registrationUsername: z.string().optional(),
    registrationRealm: z.string().optional(),
    usePublicIpInContact: z.boolean().default(false),

    enableLeadingPlus: z.boolean().default(false),
    useClusterSip: z.boolean().default(false),
    techPrefix: z.string().default(""),
    sipDiversionHeader: z.string().default(""),
}).superRefine((data, ctx) => {
    // যদি SIP Registration চেক করা থাকে, তবে এই ফিল্ডগুলো Required হবে
    if (data.useSipRegistration) {
        if (!data.registrationDomain) {
            ctx.addIssue({code: z.ZodIssueCode.custom, message: "Required", path: ["registrationDomain"]});
        }
        if (!data.registrationUsername) {
            ctx.addIssue({code: z.ZodIssueCode.custom, message: "Required", path: ["registrationUsername"]});
        }
    }
});

// Schema থেকে টাইপ ইনফার করা
type SipTrunkFormValues = z.infer<typeof formSchema>;

interface SipTrunkModalProps {
    open: boolean
    setOpen: (open: boolean) => void
    onConnect: (data: any) => void
}

const SipTrunkModal = ({open, setOpen, onConnect}: SipTrunkModalProps) => {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "My SIP Trunk",
            gateways: [{
                ip: "",
                port: "5060",
                netmask: "32",
                protocol: "UDP",
                allowInbound: true,
                allowOutbound: true,
                enablePing: false
            }],
            username: "",
            password: "",
            useSipRegistration: false,
            registrationDomain: "",
            registrationUsername: "",
            registrationRealm: "",
            usePublicIpInContact: false,
            enableLeadingPlus: false,
            useClusterSip: false,
            techPrefix: "",
            sipDiversionHeader: "",
        },
    })

    const {fields, append, remove} = useFieldArray({
        control: form.control,
        name: "gateways",
    })

    const watchSipReg = form.watch("useSipRegistration")

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        onConnect(values)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
                className="max-w-[95vw] md:max-w-[900px] p-0 gap-0 border-none rounded-md overflow-hidden  shadow-2xl [&>button]:hidden font-[Inter,sans-serif] flex flex-col max-h-[92vh]"
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >

                {/* --- FIXED HEADER --- */}
                <div
                    className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 bg-white sticky top-0 z-30">
                    <DialogTitle className="text-xl font-bold text-zinc-900 tracking-tight">Connect SIP
                        Trunk</DialogTitle>
                    <button
                        onClick={() => setOpen(false)}
                        className="cursor-pointer w-8 h-8 flex items-center justify-center border border-yellow-400 rounded-md text-yellow-500 hover:bg-yellow-50 transition-colors"
                    >
                        <Icons.modalClose size={20} strokeWidth={2.5}/>
                    </button>
                </div>

                {/* --- SCROLLABLE BODY --- */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
                    <p className="text-zinc-900 font-medium -mt-2">Provide your authentication credentials.</p>

                    <Form {...form}>
                        <form id="sip-trunk-form-id" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                            {/* Name Section */}
                            <div className="space-y-2">
                                <FormLabel className="text-[15px] font-bold text-zinc-900">Name*</FormLabel>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="My SIP Trunk" {...field}
                                                       className="h-11 border-yellow-400 focus-visible:ring-0 bg-white rounded-lg shadow-none"/>
                                            </FormControl>
                                            <p className="text-[11px] text-zinc-500">A descriptive name for this SIP
                                                trunk</p>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Gateway Configuration Section */}
                            <div className="space-y-4">
                                <h3 className="text-base font-bold text-zinc-900">Gateway Configuration</h3>
                                <p className="text-[12px] text-zinc-600 -mt-3 leading-relaxed">
                                    Configure at least one SIP gateway where your trunk provider accepts connections.
                                </p>
                                <button type="button"
                                        className="text-xs text-[#BBAE00] font-bold hover:underline -mt-2 block">Read
                                    the docs
                                </button>

                                {fields.map((field, index) => (
                                    <div key={field.id}
                                         className="p-5 border border-yellow-400/50 rounded-md space-y-5 relative bg-white shadow-sm">
                                        <div className="flex justify-between items-center">
                                            <h4 className="text-[15px] font-bold text-zinc-900">Gateway
                                                #{index + 1}</h4>
                                            {fields.length > 1 && (
                                                <button type="button" onClick={() => remove(index)}
                                                        className="text-red-400 hover:text-red-600 transition-colors">
                                                    <Trash2 size={18}/>
                                                </button>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <FormLabel className="text-sm font-bold text-zinc-900">IP
                                                Address/Domain*</FormLabel>
                                            <Input placeholder="e.g. 192.168.1.1 or sip.example.com"
                                                   className="h-11 border-zinc-200 focus-visible:ring-0 bg-zinc-50/30 shadow-none" {...form.register(`gateways.${index}.ip`)} />
                                            <p className="text-[11px] text-zinc-500">IPv4 address or domain name</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <FormLabel className="text-sm font-bold text-zinc-900">Port</FormLabel>
                                                <Input
                                                    className="h-11 border-zinc-200 bg-zinc-50/30 shadow-none" {...form.register(`gateways.${index}.port`)} />
                                            </div>
                                            <div className="space-y-2">
                                                <FormLabel
                                                    className="text-sm font-bold text-zinc-900">Netmask</FormLabel>
                                                <Input
                                                    className="h-11 border-zinc-200 bg-zinc-50/30 shadow-none" {...form.register(`gateways.${index}.netmask`)} />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <FormLabel className="text-sm font-bold text-zinc-900">Outbound
                                                Protocol</FormLabel>
                                            <Select defaultValue="UDP">
                                                <SelectTrigger
                                                    className="h-11 border-zinc-200 bg-zinc-50/30 shadow-none w-full">
                                                    <SelectValue/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="UDP">UDP</SelectItem>
                                                    <SelectItem value="TCP">TCP</SelectItem>
                                                    <SelectItem value="TLS">TLS</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-3 pt-2">
                                            <div className="flex items-center space-x-3">
                                                <Checkbox id={`inbound-${index}`}
                                                          className="border-yellow-500 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
                                                          defaultChecked/>
                                                <label htmlFor={`inbound-${index}`}
                                                       className="text-sm font-medium text-zinc-900 cursor-pointer">Allow
                                                    inbound calls</label>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <Checkbox id={`outbound-${index}`}
                                                          className="border-yellow-500 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
                                                          defaultChecked/>
                                                <label htmlFor={`outbound-${index}`}
                                                       className="text-sm font-medium text-zinc-900 cursor-pointer">Allow
                                                    outbound calls</label>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <Checkbox id={`ping-${index}`} className="border-zinc-300"/>
                                                <label htmlFor={`ping-${index}`}
                                                       className="text-sm font-medium text-zinc-900 cursor-pointer">Enable
                                                    options ping</label>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => append({
                                        ip: "",
                                        port: "5060",
                                        netmask: "32",
                                        protocol: "UDP",
                                        allowInbound: true,
                                        allowOutbound: true,
                                        enablePing: false
                                    })}
                                    className="w-full h-12 border-yellow-400 text-yellow-600 font-bold bg-white hover:bg-yellow-50 shadow-none transition-all"
                                >
                                    <Icons.addIcon className="mr-2 w-5 h-5 stroke-[#fdc700] "/> Add Another Gateway
                                </Button>
                            </div>

                            {/* Authentication (Optional) Section */}
                            <div className="p-6 border border-yellow-400 rounded-md space-y-5">
                                <h3 className="text-base font-bold text-zinc-900">Authentication (Optional)</h3>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <FormLabel className="text-sm font-bold text-zinc-900">Username</FormLabel>
                                        <Select>
                                            <SelectTrigger
                                                className="h-11 border-zinc-200 bg-zinc-50/30 shadow-none text-zinc-400 w-full">
                                                <SelectValue placeholder="Authentication Username"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="UDP">UDP</SelectItem>
                                                <SelectItem value="TCP">TCP</SelectItem>
                                                <SelectItem value="TLS">TLS</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <FormLabel className="text-sm font-bold text-zinc-900">Password</FormLabel>
                                        <Select>
                                            <SelectTrigger
                                                className="h-11 border-zinc-200 bg-zinc-50/30 shadow-none text-zinc-400 w-full">
                                                <SelectValue placeholder="Authentication password"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="UDP">UDP</SelectItem>
                                                <SelectItem value="TCP">TCP</SelectItem>
                                                <SelectItem value="TLS">TLS</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <FormField
                                            control={form.control}
                                            name="useSipRegistration"
                                            render={({field}) => (
                                                <FormItem
                                                    className="flex flex-row items-center space-x-1.5 space-y-0 gap-0">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            // onCheckedChange={field.onChange}
                                                            onCheckedChange={(checked) => {
                                                                field.onChange(checked);
                                                                if (checked) {
                                                                    form.setValue("usePublicIpInContact", true);
                                                                } else {
                                                                    form.setValue("usePublicIpInContact", false);
                                                                }
                                                            }}
                                                            className="border-zinc-300 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                                                        />
                                                    </FormControl>
                                                    <FormLabel
                                                        className="text-sm font-bold text-zinc-900 dark:text-zinc-200 cursor-pointer">Use
                                                        SIP Registration</FormLabel>
                                                </FormItem>
                                            )}
                                        />

                                        {/* Conditional Rendering with Vertical Line Look */}
                                        {watchSipReg && (
                                            <div
                                                className="ml-6 pl-5 border-l-2 border-zinc-300 dark:border-zinc-700 space-y-4 animate-in fade-in slide-in-from-left-2 duration-300">
                                                <FormField
                                                    control={form.control}
                                                    name="registrationDomain"
                                                    render={({field}) => (
                                                        <FormItem className="space-y-1">
                                                            <FormLabel
                                                                className="text-xs font-bold uppercase text-zinc-500">Domain</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Registration domain" {...field}
                                                                       className="h-10 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"/>
                                                            </FormControl>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="registrationUsername"
                                                    render={({field}) => (
                                                        <FormItem className="space-y-1">
                                                            <FormLabel
                                                                className="text-xs font-bold uppercase text-zinc-500">Username</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Registration username" {...field}
                                                                       className="h-10 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"/>
                                                            </FormControl>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="registrationRealm"
                                                    render={({field}) => (
                                                        <FormItem className="space-y-1">
                                                            <FormLabel
                                                                className="text-xs font-bold uppercase text-zinc-500">Realm</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Registration realm" {...field}
                                                                       className="h-10 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"/>
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="usePublicIpInContact"
                                                    render={({field}) => (
                                                        <FormItem
                                                            className="flex flex-row items-center space-x-1.5 space-y-0 pt-2 gap-0">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                    className="border-zinc-300 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                                                                />
                                                            </FormControl>
                                                            <FormLabel
                                                                className="text-sm font-medium text-zinc-900 dark:text-zinc-200 cursor-pointer">Use
                                                                public IP in Contact header</FormLabel>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        )}
                                    </div>

                                </div>
                            </div>

                            {/* Advanced Settings (Optional) Section */}
                            <div className="p-6 border border-yellow-400 rounded-md space-y-5">
                                <h3 className="text-base font-bold text-zinc-900">Advancen Settings (Optional)</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <Checkbox id="plus-check" className="border-zinc-300"/>
                                        <label htmlFor="plus-check"
                                               className="text-sm font-medium text-zinc-900 cursor-pointer">Enable
                                            Leading plus for outbound calls</label>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Checkbox id="cluster-check" className="border-zinc-300"/>
                                        <label htmlFor="cluster-check"
                                               className="text-sm font-medium text-zinc-900 cursor-pointer">Use Cluster
                                            SIP</label>
                                    </div>
                                    <div className="space-y-2">
                                        <FormLabel className="text-sm font-bold text-zinc-900">Tech Prefix</FormLabel>
                                        <Select>
                                            <SelectTrigger
                                                className="h-11 border-zinc-200 bg-zinc-50/30 shadow-none text-zinc-400 w-full">
                                                <SelectValue placeholder="Tech prefix for outbound calls"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="UDP">UDP</SelectItem>
                                                <SelectItem value="TCP">TCP</SelectItem>
                                                <SelectItem value="TLS">TLS</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <FormLabel className="text-sm font-bold text-zinc-900">SIP Diversion
                                            Header</FormLabel>
                                        <Select>
                                            <SelectTrigger
                                                className="h-11 border-zinc-200 bg-zinc-50/30 shadow-none text-zinc-400 w-full">
                                                <SelectValue placeholder="SIP diversion header"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="UDP">UDP</SelectItem>
                                                <SelectItem value="TCP">TCP</SelectItem>
                                                <SelectItem value="TLS">TLS</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Encryption Notice */}
                            <div className="border border-yellow-400/60 text-center rounded-md px-4 py-2 ">
                                <p className="text-[#BBAE00] text-base font-medium leading-relaxed">
                                    Credentials are encrypted and stored locally. Altura does not relay sensitive keys
                                    to third-party tracking services.
                                </p>
                            </div>

                        </form>
                    </Form>
                </div>

                {/* --- FIXED FOOTER --- */}
                <div className="px-6 py-4 border-t border-zinc-100 bg-white sticky bottom-0 z-30">
                    <div className="flex flex-row justify-end gap-3">
                        <Button
                            type="submit"
                            form="sip-trunk-form-id"
                            className="h-11 px-8 bg-[#FDF027] hover:bg-[#e6d920] text-zinc-900 font-bold text-sm rounded-lg shadow-none transition-all"
                        >
                            Establish Connection
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="h-11 px-10 border-[#FF453A]/40 text-[#FF453A] font-medium text-sm rounded-lg hover:bg-red-50 hover:text-red-600 transition-all shadow-none"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    )
}

export default SipTrunkModal


// "use client"
//
// import React from "react"
// import { useForm, useFieldArray } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import * as z from "zod"
// import { X, Trash2, Plus, ChevronDown } from "lucide-react"
//
// import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
//
// const formSchema = z.object({
//     name: z.string().min(1, "Name is required"),
//     gateways: z.array(z.object({
//         ip: z.string().min(1, "IP/Domain is required"),
//         port: z.string().default("5060"),
//         netmask: z.string().default("32"),
//         protocol: z.string().default("UDP"),
//         allowInbound: z.boolean().default(true),
//         allowOutbound: z.boolean().default(true),
//         enablePing: z.boolean().default(false),
//     })),
//     username: z.string().optional(),
//     password: z.string().optional(),
//     useSipRegistration: z.boolean().default(false),
//     enableLeadingPlus: z.boolean().default(false),
//     useClusterSip: z.boolean().default(false),
//     techPrefix: z.string().optional(),
//     sipDiversionHeader: z.string().optional(),
// })
//
// interface SipTrunkModalProps {
//     open: boolean
//     setOpen: (open: boolean) => void
//     onConnect: (data: any) => void
// }
// // <z.infer<typeof formSchema>>
// const SipTrunkModal = ({ open, setOpen, onConnect }: SipTrunkModalProps) => {
//     const form = useForm({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             name: "My SIP Trunk",
//             gateways: [{ ip: "", port: "5060", netmask: "32", protocol: "UDP", allowInbound: true, allowOutbound: true, enablePing: false }],
//             username: "",
//             password: "",
//             useSipRegistration: false,
//             enableLeadingPlus: false,
//             useClusterSip: false,
//             techPrefix: "",
//             sipDiversionHeader: "",
//         },
//     })
//
//     const { fields, append, remove } = useFieldArray({
//         control: form.control,
//         name: "gateways",
//     })
//
//     const onSubmit = (values: z.infer<typeof formSchema>) => {
//         onConnect(values)
//         setOpen(false)
//     }
//
//     return (
//         <Dialog open={open} onOpenChange={setOpen}>
//             <DialogContent className="max-w-[95vw] md:max-w-[900px] p-0 gap-0 border-none rounded-xl overflow-hidden bg-white shadow-2xl [&>button]:hidden font-[Inter,sans-serif]">
//
//                 {/* Header */}
//                 <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
//                     <DialogTitle className="text-xl font-bold text-zinc-900">Connect SIP Trunk</DialogTitle>
//                     <button onClick={() => setOpen(false)} className="w-8 h-8 flex items-center justify-center border border-yellow-400 rounded-md text-yellow-500 hover:bg-yellow-50">
//                         <X size={20} strokeWidth={2.5} />
//                     </button>
//                 </div>
//
//                 <div className="p-6 space-y-6 max-h-[85vh] overflow-y-auto scrollbar-hide">
//                     <p className="text-zinc-900 font-medium -mt-2">Provide your authentication credentials.</p>
//
//                     <Form {...form}>
//                         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//
//                             {/* Main Name Field */}
//                             <div className="space-y-2">
//                                 <FormLabel className="text-base font-bold text-zinc-900">Name*</FormLabel>
//                                 <FormField
//                                     control={form.control}
//                                     name="name"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormControl>
//                                                 <Input placeholder="My SIP Trunk" {...field} className="h-11 border-yellow-400 focus-visible:ring-0 bg-white rounded-lg" />
//                                             </FormControl>
//                                             <p className="text-[11px] text-zinc-500">A descriptive name for this SIP trunk</p>
//                                         </FormItem>
//                                     )}
//                                 />
//                             </div>
//
//                             {/* Gateway Configuration */}
//                             <div className="space-y-4">
//                                 <h3 className="text-base font-bold text-zinc-900">Gateway Configuration</h3>
//                                 <p className="text-[12px] text-zinc-600 -mt-3">Configure at least one SIP gateway where your trunk provider accepts connections.</p>
//                                 <button type="button" className="text-xs text-yellow-600 font-bold hover:underline">Read the docs</button>
//
//                                 {fields.map((field, index) => (
//                                     <div key={field.id} className="p-5 border border-yellow-400/50 rounded-xl space-y-5 relative bg-white">
//                                         <div className="flex justify-between items-center">
//                                             <h4 className="text-base font-bold text-zinc-800">Gateway #{index + 1}</h4>
//                                             {fields.length > 1 && (
//                                                 <button type="button" onClick={() => remove(index)} className="text-red-400 hover:text-red-600">
//                                                     <Trash2 size={18} />
//                                                 </button>
//                                             )}
//                                         </div>
//
//                                         <div className="space-y-2">
//                                             <FormLabel className="text-sm font-bold text-zinc-900">IP Address/Domain*</FormLabel>
//                                             <Input placeholder="e.g. 192.168.1.1 or sip.example.com" className="h-11 border-zinc-200 focus-visible:ring-0 bg-zinc-50/30" {...form.register(`gateways.${index}.ip`)} />
//                                             <p className="text-[11px] text-zinc-500">IPv4 address or domain name</p>
//                                         </div>
//
//                                         <div className="grid grid-cols-2 gap-4">
//                                             <div className="space-y-2">
//                                                 <FormLabel className="text-sm font-bold text-zinc-900">Port</FormLabel>
//                                                 <Input className="h-11 border-zinc-200 bg-zinc-50/30" {...form.register(`gateways.${index}.port`)} />
//                                             </div>
//                                             <div className="space-y-2">
//                                                 <FormLabel className="text-sm font-bold text-zinc-900">Netmask</FormLabel>
//                                                 <Input className="h-11 border-zinc-200 bg-zinc-50/30" {...form.register(`gateways.${index}.netmask`)} />
//                                             </div>
//                                         </div>
//
//                                         <div className="space-y-2">
//                                             <FormLabel className="text-sm font-bold text-zinc-900">Outbound Protocol</FormLabel>
//                                             <Select defaultValue="UDP">
//                                                 <SelectTrigger className="h-11 border-zinc-200 bg-zinc-50/30">
//                                                     <SelectValue />
//                                                 </SelectTrigger>
//                                                 <SelectContent>
//                                                     <SelectItem value="UDP">UDP</SelectItem>
//                                                     <SelectItem value="TCP">TCP</SelectItem>
//                                                     <SelectItem value="TLS">TLS</SelectItem>
//                                                 </SelectContent>
//                                             </Select>
//                                         </div>
//
//                                         <div className="space-y-3 pt-2">
//                                             <div className="flex items-center space-x-3">
//                                                 <Checkbox id={`inbound-${index}`} className="border-yellow-500 data-[state=checked]:bg-yellow-500" defaultChecked />
//                                                 <label htmlFor={`inbound-${index}`} className="text-sm font-medium text-zinc-900">Allow inbound calls</label>
//                                             </div>
//                                             <div className="flex items-center space-x-3">
//                                                 <Checkbox id={`outbound-${index}`} className="border-yellow-500 data-[state=checked]:bg-yellow-500" defaultChecked />
//                                                 <label htmlFor={`outbound-${index}`} className="text-sm font-medium text-zinc-900">Allow outbound calls</label>
//                                             </div>
//                                             <div className="flex items-center space-x-3">
//                                                 <Checkbox id={`ping-${index}`} className="border-yellow-500 data-[state=checked]:bg-yellow-500" />
//                                                 <label htmlFor={`ping-${index}`} className="text-sm font-medium text-zinc-900">Enable options ping</label>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//
//                                 <Button
//                                     type="button"
//                                     variant="outline"
//                                     onClick={() => append({ ip: "", port: "5060", netmask: "32", protocol: "UDP", allowInbound: true, allowOutbound: true, enablePing: false })}
//                                     className="w-full h-12 border-yellow-400 text-yellow-600 font-bold bg-white hover:bg-yellow-50"
//                                 >
//                                     <Plus size={18} className="mr-2" /> Add Another Gateway
//                                 </Button>
//                             </div>
//
//                             {/* Authentication Section */}
//                             <div className="p-6 border border-zinc-200 rounded-xl space-y-5">
//                                 <h3 className="text-base font-bold text-zinc-900">Authentication (Optional)</h3>
//                                 <div className="space-y-4">
//                                     <div className="space-y-2">
//                                         <FormLabel className="text-sm font-bold text-zinc-900">Username</FormLabel>
//                                         <Select><SelectTrigger className="h-11 border-zinc-200 bg-zinc-50/30"><SelectValue placeholder="Authentication Username" /></SelectTrigger></Select>
//                                     </div>
//                                     <div className="space-y-2">
//                                         <FormLabel className="text-sm font-bold text-zinc-900">Password</FormLabel>
//                                         <Select><SelectTrigger className="h-11 border-zinc-200 bg-zinc-50/30"><SelectValue placeholder="Authentication password" /></SelectTrigger></Select>
//                                     </div>
//                                     <div className="flex items-center space-x-3">
//                                         <Checkbox id="sip-reg" className="border-zinc-300" />
//                                         <label htmlFor="sip-reg" className="text-sm font-medium text-zinc-900">Use SIP Registration</label>
//                                     </div>
//                                 </div>
//                             </div>
//
//                             {/* Advanced Settings */}
//                             <div className="p-6 border border-zinc-200 rounded-xl space-y-5">
//                                 <h3 className="text-base font-bold text-zinc-900">Advancen Settings (Optional)</h3>
//                                 <div className="space-y-4">
//                                     <div className="flex items-center space-x-3">
//                                         <Checkbox id="plus" className="border-zinc-300" />
//                                         <label htmlFor="plus" className="text-sm font-medium text-zinc-900">Enable Leading plus for outbound calls</label>
//                                     </div>
//                                     <div className="flex items-center space-x-3">
//                                         <Checkbox id="cluster" className="border-zinc-300" />
//                                         <label htmlFor="cluster" className="text-sm font-medium text-zinc-900">Use Cluster SIP</label>
//                                     </div>
//                                     <div className="space-y-2">
//                                         <FormLabel className="text-sm font-bold text-zinc-900">Tech Prefix</FormLabel>
//                                         <Select><SelectTrigger className="h-11 border-zinc-200 bg-zinc-50/30"><SelectValue placeholder="Tech prefix for outbound calls" /></SelectTrigger></Select>
//                                     </div>
//                                     <div className="space-y-2">
//                                         <FormLabel className="text-sm font-bold text-zinc-900">SIP Diversion Header</FormLabel>
//                                         <Select><SelectTrigger className="h-11 border-zinc-200 bg-zinc-50/30"><SelectValue placeholder="SIP diversion header" /></SelectTrigger></Select>
//                                     </div>
//                                 </div>
//                             </div>
//
//                             {/* Bottom Encryption Notice */}
//                             <div className="border border-yellow-400/60 rounded-xl p-8 bg-white">
//                                 <p className="text-[#BBAE00] text-[15px] font-medium text-center leading-relaxed">
//                                     Credentials are encrypted and stored locally. Altura does not relay sensitive keys to third-party tracking services.
//                                 </p>
//                             </div>
//
//                             {/* Footer Buttons */}
//                             <div className="flex justify-end gap-3 pb-4">
//                                 <Button type="submit" className="h-11 px-8 bg-[#FDF027] hover:bg-[#e6d920] text-zinc-900 font-bold rounded-lg shadow-none">
//                                     Establish Connection
//                                 </Button>
//                                 <Button type="button" variant="outline" onClick={() => setOpen(false)} className="h-11 px-10 border-[#FF453A]/40 text-[#FF453A] font-medium rounded-lg hover:bg-red-50">
//                                     Cancel
//                                 </Button>
//                             </div>
//
//                         </form>
//                     </Form>
//                 </div>
//             </DialogContent>
//         </Dialog>
//     )
// }
//
// export default SipTrunkModal