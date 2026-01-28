"use client"

import React, {useEffect, useState} from "react"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import PhoneInput, {isValidPhoneNumber} from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import {X, ChevronDown} from "lucide-react"

import {Dialog, DialogContent} from "@/components/ui/dialog"
import {Form, FormField, FormItem, FormLabel, FormMessage, FormControl} from "@/components/ui/form"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Switch} from "@/components/ui/switch"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {cn} from "@/lib/utils"
import {Icons} from "@/components/icons";

// --- Updated Schema ---
const formSchema = z.object({
    carrier: z.string().min(1, "Please select a carrier"),
    lineLabel: z.string().min(2, "Label is required"), // Step 1 ফিল্ড
    aiAgent: z.string().optional(),                  // Step 1 ফিল্ড
    phoneNumber: z.string().refine((val) => step === 1 || isValidPhoneNumber(val || ""), {
        message: "Invalid phone number",
    }),
    // Carrier Specifics
    accountSid: z.string().optional(),
    authToken: z.string().optional(),
    vonageApiKey: z.string().optional(),
    vonageApiSecret: z.string().optional(),
    telnyxApiKey: z.string().optional(),
    sipTrunkCredential: z.string().optional(),
    smsEnabled: z.boolean().default(true),
})
type FormValues = z.infer<typeof formSchema>;

let step = 1; // Validation logic এর জন্য গ্লোবাল বা রেফারেন্স হিসেবে রাখা ভালো

interface PhoneWizardProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export default function PhoneWizard({isOpen, setIsOpen}: PhoneWizardProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedCarrier, setSelectedCarrier] = useState<string>("");

    const form = useForm({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            carrier: "",
            lineLabel: "",
            aiAgent: "",
            phoneNumber: "",
            smsEnabled: true,
        },
    })

    // মোডাল বন্ধ হলে ফর্ম রিসেট করার জন্য useEffect
    useEffect(() => {
        if (!isOpen) {
            setCurrentStep(1);
            form.reset();
        }
    }, [isOpen, form]);

    const handleNext = async () => {
        if (currentStep === 1) {
            const isValid = await form.trigger(["carrier", "lineLabel"]);
            if (isValid) setCurrentStep(2);
        } else {
            // ফোন নম্বর ভ্যালিডেশন
            const phone = form.getValues("phoneNumber");
            if (phone && !isValidPhoneNumber(phone)) {
                form.setError("phoneNumber", {message: "Invalid phone number"});
                return;
            }
            form.handleSubmit(onSubmit)();
        }
    };

    function onSubmit(values: FormValues) {
        console.log("Form Data:", values);
        setIsOpen(false); // সাবমিট সফল হলে মোডাল বন্ধ হবে
    }

    const getDisplayName = (id: string) => {
        if (id === 'sip') return 'Custom SIP';
        return id.charAt(0).toUpperCase() + id.slice(1);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
                className="max-w-[95vw] md:max-w-[850px] p-0 gap-0 border-none rounded-xl overflow-hidden bg-white shadow-2xl [&>button]:hidden font-[Inter,sans-serif] flex flex-col max-h-[92vh]"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-baseline gap-2">
                        {/* Step 1 Title */}
                        <h2
                            onClick={() => setCurrentStep(1)}
                            className={cn(
                                "text-xl font-bold cursor-pointer transition-colors",
                                currentStep === 1 ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
                            )}
                        >
                            Add New Number
                        </h2>

                        {/* Step 2 Title */}
                        <span
                            onClick={async () => {
                                const isValid = await form.trigger(["carrier", "lineLabel"]);
                                if (isValid) setCurrentStep(2);
                            }}
                            className={cn(
                                "font-medium cursor-pointer transition-colors",
                                currentStep === 2 ? "text-gray-900 text-xl font-bold" : "text-gray-400"
                            )}
                        >
                            Phone Number Options
                        </span>
                    </div>
                        <Icons.modalClose onClick={() => setIsOpen(false)} className="h-6 w-6 text-yellow-500 cursor-pointer"/>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-2 space-y-6 bg-white scrollbar-hide">
                    <p className="text-sm text-gray-600 mb-3 font-medium">
                        Configure the basic settings for adding a new number
                    </p>
                    <Form {...form}>
                        <form id="phone-form-id" onSubmit={(e) => e.preventDefault()} className="space-y-6">

                            {/* --- STEP 1: Main Config --- */}
                            {currentStep === 1 && (
                                <div className="space-y-6  animate-in slide-in-from-left duration-500">
                                    {/* 1. Select Carrier */}
                                    <div className="p-4 border rounded-lg">
                                        <h3 className="font-semibold text-sm mb-4">1. Select Carrier Provider</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            {['TWILIO', 'VONAGE', 'TELNYX', 'CUSTOM SIP'].map((c) => {
                                                const id = c.toLowerCase() === 'custom sip' ? 'sip' : c.toLowerCase();
                                                return (
                                                    <div
                                                        key={c}
                                                        onClick={() => {
                                                            setSelectedCarrier(id);
                                                            form.setValue("carrier", id, { shouldValidate: true });
                                                        }}
                                                        className={cn(
                                                            "flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all",
                                                            form.watch("carrier") === id ? "border-yellow-400 bg-yellow-50/50" : "hover:border-gray-300"
                                                        )}
                                                    >
                                                        <div className="w-8 h-8 bg-gray-200 rounded"/>
                                                        <span className="font-bold text-sm text-gray-700">{c}</span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        {form.formState.errors.carrier &&
                                            <p className="text-xs text-red-500 mt-2">{form.formState.errors.carrier.message}</p>}
                                    </div>

                                    {/* 2. Label Your Line */}
                                    <div className="p-4 border rounded-lg">
                                        <FormField
                                            control={form.control}
                                            name="lineLabel"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel className="font-semibold text-sm text-black">2. Label
                                                        Your Line</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="E.g Inbound Sales" {...field}
                                                               className="border-yellow-200 focus-visible:ring-yellow-400 h-11"/>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    {/* Linked AI Agent */}
                                    <div className="p-4 border rounded-lg">
                                        <FormField
                                            control={form.control}
                                            name="aiAgent"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel className="font-semibold text-sm text-black">Linked
                                                        AI Agent</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Unlinked (No automation)" {...field}
                                                               className="border-yellow-200 focus-visible:ring-yellow-400 h-11"/>
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* --- STEP 2: Carrier-Specific Config --- */}
                            {currentStep === 2 && (
                                <div
                                    className="flex gap-6 border rounded-xl overflow-hidden min-h-[480px] animate-in slide-in-from-right duration-500">
                                    {/* Left Sidebar */}
                                    <div className="w-64 bg-[#F9FAFB] p-4 border-r space-y-4">
                                        <div
                                            className="bg-white border rounded-lg p-2 flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-sm font-medium">
                                                <div
                                                    className="w-6 h-6 bg-gray-200 rounded text-[10px] flex items-center justify-center font-bold">P
                                                </div>
                                                {getDisplayName(selectedCarrier)}
                                            </div>
                                            <ChevronDown className="h-4 w-4 text-gray-400"/>
                                        </div>
                                        <div
                                            className="flex items-center gap-2 p-2 px-3 bg-gray-100 rounded-lg text-gray-600 text-sm">
                                            {/*<div*/}
                                            {/*    className="w-4 h-4 rounded-full border-2 border-black flex items-center justify-center">*/}
                                            {/*    <div className="w-1.5 h-1.5 bg-black rounded-full"/>*/}
                                            {/*</div>*/}
                                            <Icons.createAgentIcon className="w-6 h-6 text-black"/>
                                            Import {getDisplayName(selectedCarrier)}
                                        </div>
                                    </div>

                                    {/* Right Form Fields */}
                                    <div className="flex-1 p-4 space-y-5">
                                        <FormField
                                            control={form.control}
                                            name="phoneNumber"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel
                                                        className="font-bold">{getDisplayName(selectedCarrier)} Phone
                                                        Number</FormLabel>
                                                    <FormControl>
                                                        <PhoneInput
                                                            international
                                                            defaultCountry="US"
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                            className="flex h-11 w-full rounded-md border border-yellow-200 bg-white px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-yellow-400"
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />

                                        {/* Carrier Specifics (Twilio/Vonage/Telnyx/SIP) */}
                                        {selectedCarrier === 'twilio' && (
                                            <>
                                                <FormField control={form.control} name="accountSid"
                                                           render={({field}) => (
                                                               <FormItem>
                                                                   <FormLabel className="font-bold">
                                                                       Twilio Account SID
                                                                   </FormLabel>
                                                                   <FormControl>
                                                                       <Input
                                                                           {...field}
                                                                           className="border-yellow-200 h-11"
                                                                           placeholder="Twilio Account SID"
                                                                       />
                                                                   </FormControl>
                                                               </FormItem>
                                                           )}/>

                                                <FormField
                                                    control={form.control}
                                                    name="authToken"
                                                    render={({field}) => (
                                                        <FormItem>
                                                            <FormLabel className="font-bold">
                                                                Twilio Auth Token
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="password"
                                                                    {...field}
                                                                    className="border-yellow-200 h-11"
                                                                    placeholder="Twilio Auth Token"
                                                                />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}/>
                                            </>
                                        )}

                                        {/* (অন্যান্য প্রোভাইডারের কোড আগের মতোই থাকবে...) */}
                                        {selectedCarrier === 'vonage' && (
                                            <>
                                                <FormField control={form.control} name="vonageApiKey"
                                                           render={({field}) => (
                                                               <FormItem>
                                                                   <FormLabel className="font-bold">
                                                                       Vonage API Key
                                                                   </FormLabel>
                                                                   <FormControl>
                                                                       <Input
                                                                           {...field}
                                                                           className="border-yellow-200 h-11"
                                                                           placeholder="Vonage API Key"
                                                                       />
                                                                   </FormControl>
                                                               </FormItem>
                                                           )}
                                                />

                                                <FormField control={form.control} name="vonageApiSecret"
                                                           render={({field}) => (
                                                               <FormItem>
                                                                   <FormLabel className="font-bold">
                                                                       Vonage API Secret
                                                                   </FormLabel>
                                                                   <FormControl>
                                                                       <Input
                                                                           {...field}
                                                                           className="border-yellow-200 h-11"
                                                                           placeholder="Vonage API Secret"
                                                                       />
                                                                   </FormControl>
                                                               </FormItem>
                                                           )}
                                                />
                                            </>
                                        )}

                                        {selectedCarrier === 'sip' && (
                                            <>
                                                <FormField control={form.control} name="sipTrunkCredential"
                                                           render={({field}) => (
                                                               <FormItem>
                                                                   <FormLabel className="font-bold">
                                                                       Select SIP Trunk Credential
                                                                   </FormLabel>
                                                                   <Select onValueChange={field.onChange}
                                                                           defaultValue={field.value}>
                                                                       <FormControl>
                                                                           <SelectTrigger
                                                                               className="h-12 border-yellow-400 bg-zinc-50/30 rounded-md shadow-none text-zinc-600 w-full">
                                                                               <SelectValue
                                                                                   placeholder="Select SIP Trunk Credential"/>
                                                                           </SelectTrigger>
                                                                       </FormControl>
                                                                       <SelectContent>
                                                                           <SelectItem
                                                                               value="australia">australia</SelectItem>
                                                                           <SelectItem
                                                                               value="us-east">us-east</SelectItem>
                                                                       </SelectContent>
                                                                   </Select>
                                                               </FormItem>
                                                           )}
                                                />
                                            </>
                                        )}
                                        {/*telnyxApiKey*/}
                                        {selectedCarrier === 'telnyx' && (
                                            <>
                                                <FormField control={form.control} name="telnyxApiKey"
                                                           render={({field}) => (
                                                               <FormItem>
                                                                   <FormLabel className="font-bold">
                                                                       Telnyx API Key
                                                                   </FormLabel>
                                                                   <FormControl>
                                                                       <Input
                                                                           {...field}
                                                                           className="border-yellow-200 h-11"
                                                                           placeholder="Telnyx API Key"
                                                                       />
                                                                   </FormControl>
                                                               </FormItem>
                                                           )}
                                                />
                                            </>
                                        )}

                                        {/* SMS Toggle */}
                                        <div
                                            className="p-4 border border-yellow-200 rounded-xl flex flex-row-reverse items-start justify-end gap-4">
                                            <div className="space-y-0.5">
                                                <p className="text-sm font-bold">SMS Enabled</p>
                                                <p className="text-xs text-gray-500">Enabled SMS messaging for this
                                                    phone number</p>
                                            </div>
                                            <FormField
                                                control={form.control}
                                                name="smsEnabled"
                                                render={({field}) => (
                                                    <FormControl>
                                                        <Switch checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                                className="data-[state=checked]:bg-yellow-500"/>
                                                    </FormControl>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Bottom Button */}

                        </form>
                    </Form>
                </div>

                <div className="px-6 py-4 border-t border-zinc-100 bg-white sticky bottom-0 z-30">
                    <div className="">
                        <Button
                            type="button"
                            onClick={handleNext}
                            className="w-full bg-[#FAEF32] hover:bg-[#e6db2e] text-black font-bold py-6 text-base rounded-lg"
                        >
                            {currentStep === 1 ? "Provision & Purchase Line" : "Complete Configuration"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}