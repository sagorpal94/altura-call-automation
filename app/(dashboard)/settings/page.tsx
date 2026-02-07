"use client"
import {Form} from "@/components/ui/form"
import {zodResolver} from "@hookform/resolvers/zod"
import {profileSchema, ProfileValues} from "@/schemas/settings-schema";
import {useForm} from "react-hook-form";
import {cn} from "@/lib/utils";
import {useState} from "react";
import GeneralProfile from "@/components/settings/general-profile";
import UserManagement from "@/components/settings/user-management";
import BillingPayments from "@/components/settings/billing-payments";

const tabs = [
    {label: "General Profile", id: "general-profile"},
    {label: "User Management", id: "user-management"},
    {label: "Billing & Payments", id: "billing-payments"},
]

export default function Page() {
    const [activeTab, setActiveTab] = useState("general-profile")
    const form = useForm<ProfileValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            fullName: "",
            nickName: "",
            gender: "",
            country: "",
            language: "",
            timeZone: "",
            companyName:"",
            taxId:"",
            billingEmail:"",
            address:""
        },
    })

    function onSubmit(values: ProfileValues) {
        console.log("Form Submitted:", values)
    }

    return (
        <div className="flex flex-col gap-5 transition-colors duration-300 ">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                    Hola, Carlos <span className="text-3xl">👋🏼</span>
                </h1>
            </div>

            <div className="space-y-1">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">System Administration</h1>
                <p className="text-zinc-400 text-sm">Manage your organization, billing, and team collaboration
                    settings.</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                    <div className="w-full  ">
                        <div
                            role="tablist"
                            className="flex gap-8 border-b border-[#DFE1E7] dark:border-zinc-800 justify-start overflow-x-auto no-scrollbar scroll-smooth"
                            // flex gap-6 justify-center border rounded-md border-[#D4D4D4] overflow-x-auto no-scrollbar
                        >
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    role="tab"
                                    aria-selected={activeTab === tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    className={cn(
                                        "cursor-pointer py-4 text-sm font-bold capitalize transition-all relative whitespace-nowrap",
                                        activeTab === tab.id
                                            ? "text-[#0D0D12]"
                                            : "text-slate-400 hover:text-slate-600 dark:text-zinc-500"
                                    )}
                                >
                                    {tab.label}

                                    {/* Active Indicator Line */}
                                    {activeTab === tab.id && (
                                        <div
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0D0D12] rounded-full"/>
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="">
                            {activeTab === "general-profile" && (
                                <GeneralProfile/>
                            )}
                            {activeTab === "user-management" && (
                                <UserManagement/>
                            )}
                            {activeTab === "billing-payments" && (
                                <BillingPayments/>
                            )}
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}