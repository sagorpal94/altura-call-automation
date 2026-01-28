"use client"

import React, {useState} from "react"
import {useFormContext} from "react-hook-form"
import {Plus} from "lucide-react"

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import Image from "next/image";
import InvoiceTable from "@/components/settings/invoice-table";
import CardPreviewModal from "@/components/settings/card-preview-modal";
import ConfirmChangesModal from "@/components/settings/confirm-changes-modal";

const BillingPayments = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const form = useFormContext()
    const handleFinalSave = () => {
        // এখানে আপনার ফর্ম সাবমিট লজিক লিখুন
        console.log("Form Submitted Successfully");
        setIsOpen(false);
    };
    return (
        <div className="mt-8 space-y-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">

                {/* --- LEFT COLUMN: MY CARD --- */}
                <Card className=" border-[#DFE1E7] py-0 rounded-md shadow-none">
                    <CardContent className="px-4 py-[21px] space-y-4">
                        <div className="flex flex-wrap justify-between items-center">
                            <h2 className="text-lg font-semibold text-[#232323] dark:text-zinc-100 tracking-tight">
                                My Card
                            </h2>
                            <button
                                type="button"
                                className="text-[#c0b000] font-bold text-lg hover:underline decoration-2"
                                onClick={() => setIsModalOpen(true)}
                            >
                                Update Card
                            </button>
                        </div>

                        {/* STYLIZED CREDIT CARD */}
                        <div className="relative w-full flex justify-center  py-10">
                            <Image
                                src="/images/creadit-card.png"
                                alt="creadit-card"
                                width={312}
                                height={219}
                            />
                        </div>

                        {/* ADD CARD BUTTON */}
                        <Button
                            type="button"
                            variant="secondary"
                            className="w-full h-[50px] bg-[#EFEFEF] dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-base rounded-md transition-all"
                        >
                            <Plus className="h-4 w-4 mr-2"/> Add card
                        </Button>
                    </CardContent>
                </Card>

                {/* --- RIGHT COLUMN: BILLING INFO --- */}
                <Card className=" border-[#DFE1E7] py-0 rounded-md shadow-none">
                    <CardContent className="px-4 py-[21px] space-y-4">
                        <h2 className="text-[22px] text-[#0D0D12] dark:text-zinc-100 mb-8 tracking-tight">
                            Billing Info
                        </h2>


                        <FormField
                            control={form.control}
                            name="companyName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="font-bold text-zinc-600 dark:text-zinc-400">
                                        Company Name <span className="text-blue-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field}
                                               className="h-12 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus-visible:ring-zinc-400 rounded-lg"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="taxId"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="font-bold text-zinc-600 dark:text-zinc-400">
                                        VAT / Tax ID <span className="text-blue-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field}
                                               className="h-12 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus-visible:ring-zinc-400 rounded-lg"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="billingEmail"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="font-bold text-zinc-600 dark:text-zinc-400">
                                        Billing Email <span className="text-blue-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field}
                                               className="h-12 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus-visible:ring-zinc-400 rounded-lg"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="font-bold text-zinc-600 dark:text-zinc-400">
                                        Address <span className="text-blue-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field}
                                               className="h-12 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus-visible:ring-zinc-400 rounded-lg"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                    </CardContent>
                </Card>
            </div>

            <Card className="py-0 shadow-none rounded-md">
                <CardContent className="p-6">
                    <InvoiceTable/>
                </CardContent>
            </Card>

            <div className="flex justify-end gap-5">
                <Button
                    type="button"
                    variant="outline"
                    className="w-full sm:w-auto h-10 px-10 border-[#FF453A] text-[#FF453A] font-bold text-base rounded-md hover:bg-red-50 hover:text-red-600 transition-all"
                    onClick={() => setIsOpen(true)}
                >
                    Discard Changes
                </Button>

                <Button
                    type="submit"
                    className="h-10 px-8 bg-[#fdf027] hover:bg-[#e6d920] text-zinc-900 font-bold text-base rounded-md shadow-none transition-all w-full sm:w-auto"
                >
                    Save Settings
                </Button>
            </div>

            <CardPreviewModal
                open={isModalOpen}
                setOpen={setIsModalOpen}
            />

            <ConfirmChangesModal
                open={isOpen}
                setOpen={setIsOpen}
                onConfirm={handleFinalSave}
            />

        </div>
    );
};

export default BillingPayments;