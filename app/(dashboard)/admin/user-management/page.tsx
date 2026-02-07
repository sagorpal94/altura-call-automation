"use client"

import React, {useState} from "react"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {
    ChevronDown, Check,
} from "lucide-react"

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Card, CardContent} from "@/components/ui/card"
import {userProfileSchema, type UserProfileValues} from "@/schemas/admin-schema"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Icons} from "@/components/icons";
import UserInformation from "@/components/admin/user-information";
import {Button} from "@/components/ui/button";
import DeletingAccountModal from "@/components/admin/deleting-account-modal";

const agents = [
    {id: "1", name: "My Agents", initial: "P"},
    {id: "2", name: "Sales Bot", initial: "S"},
    {id: "3", name: "Support AI", initial: "A"},
]

const data = [
    {
        id: 1,
        title: "Plan Renewed",
        description: "Successfully charged for Enterprise subscription.",
        time: "2 days ago"
    },
    {
        id: 2,
        title: "API Key Rotated",
        description: "Successfully charged for Enterprise subscription.",
        time: "5 days ago"
    },
    {
        id: 3,
        title: "Agent Deployed",
        description: "New voice agent \"Support Pro\" went live.",
        time: "1 week ago"
    }
]

const stats = [
    {
        label: "MTD REVENUE",
        value: "$1,624.00",
        icon: <Icons.dolar className="h-4 w-4 text-muted-foreground"/>,
    },
    {
        label: "SUCCESS RATE",
        value: "95.2%",
        icon: <Icons.chartIcon className="h-4 w-4 text-muted-foreground"/>,
    },
    {
        label: "TOTAL USAGE",
        value: "4,500m",
        icon: <Icons.revenue className="h-4 w-4 text-muted-foreground"/>,
    },
];

export default function UserManagementPage() {
    const [selected, setSelected] = useState(agents[0])

    const form = useForm<UserProfileValues>({
        resolver: zodResolver(userProfileSchema),
        defaultValues: {
            name: "Alice Cooper",
            email: "alice@globex.com",
            company: "Globex Corp • Account Profile",
        },
    })

    function onSubmit(values: any) {
        console.log(values)
    }

    return (
        <div className="flex flex-col gap-5 transition-colors duration-300 ">

            <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                    Hola, Carlos <span className="text-3xl">👋🏼</span>
                </h1>
                <p className="mt-2 max-w-2xl text-lg text-gray-500 dark:text-gray-400">
                    Let&#39;s Create New Agent
                </p>
            </div>

            <div className="flex flex-col md:flex-row items-baseline gap-5">
                <div className="w-64">
                    <div className="space-y-5">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                {/* মেইন কন্টেইনার ডিজাইন */}
                                <div
                                    className="flex items-center gap-4 p-2 pl-3 pr-4 rounded-lg bg-white dark:bg-muted border border-zinc-100 cursor-pointer hover:bg-zinc-50 transition-all w-fit min-w-[240px]">

                                    {/* বাম পাশের আইকন বক্স (P) */}
                                    <div
                                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-zinc-50 dark:bg-muted text-lg font-semibold text-zinc-900 dark:text-muted-foreground border border-zinc-100">
                                        {selected.initial}
                                    </div>

                                    {/* টেক্সট */}
                                    <span className="flex-1 text-md font-bold text-zinc-900 dark:text-muted-foreground">
                                        {selected.name}
                                      </span>

                                    {/* ডাউন অ্যারো */}
                                    <ChevronDown
                                        className="h-5 w-5 text-zinc-900 dark:text-muted-foreground stroke-[2.5px]"/>
                                </div>
                            </DropdownMenuTrigger>

                            {/* ড্রপডাউন লিস্ট */}
                            <DropdownMenuContent align="start" className="w-[240px] rounded-xl p-2">
                                {agents.map((agent) => (
                                    <DropdownMenuItem
                                        key={agent.id}
                                        onClick={() => setSelected(agent)}
                                        className="flex items-center gap-3 p-2 rounded-lg cursor-pointer"
                                    >
                                        <div
                                            className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-100 dark:bg-muted text-sm font-bold">
                                            {agent.initial}
                                        </div>
                                        <span className="flex-1 font-medium">{agent.name}</span>
                                        {selected.id === agent.id && <Check className="h-4 w-4"/>}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <button
                            className="flex w-full items-center gap-3 rounded-lg bg-gray-100 dark:bg-muted px-3 py-2 text-sm font-bold text-gray-900 dark:text-muted-foreground">
                            {/*<Icons.createAgentIcon className="h-4 w-4"/>*/}
                            Alice Cooper
                        </button>
                        <button
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <Icons.clockIcon className="h-4 w-4"/>
                            All my agents
                        </button>
                    </div>
                </div>
                <div className="w-full">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <UserInformation/>
                            <Card className="lg:col-span-2 border-[#DFE1E7] py-0 rounded-md shadow-none">
                                <CardContent className="px-4 py-[21px] overflow-x-auto no-scrollbar w-full">
                                    <div
                                        className="grid grid-cols-1 lg:grid-cols-3 gap-6  overflow-x-auto no-scrollbar w-full">
                                        {stats.map((stat, index) => (
                                            <div
                                                key={index}
                                                className=" border border-[#DFE1E7] rounded-md p-8 flex flex-col justify-between h-36  shadow-none transition-all hover:border-zinc-200"
                                            >
                                                {/* Top Row: Label and Icon */}
                                                <div className="flex justify-between items-start">
                                                    <span
                                                        className="text-lg text-zinc-400 tracking-wider uppercase">
                                                      {stat.label}
                                                    </span>
                                                    <div>
                                                        {stat.icon}
                                                    </div>
                                                </div>

                                                {/* Bottom Row: Main Value */}
                                                <h3 className="text-3xl font-bold text-zinc-900 dark:text-muted-foreground tracking-tight">
                                                    {stat.value}
                                                </h3>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="lg:col-span-2 border-[#DFE1E7] py-0 rounded-md shadow-none">
                                <CardContent className="px-4 py-[21px] space-y-4">
                                    {
                                        data.map((item) => (
                                            <Card key={item.id}
                                                  className="lg:col-span-2 border-[#DFE1E7] py-0 rounded-md shadow-none">
                                                <CardContent className="p-4 space-y-4">
                                                    <div className="flex flex-wrap gap-4 items-center justify-between">
                                                        <div className="space-y-1">
                                                            <h4 className="text-base md:text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                                                                {item.title}
                                                            </h4>
                                                            <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-400">
                                                                {item.description}
                                                            </p>
                                                        </div>
                                                        <span
                                                            className="text-base md:text-lg text-zinc-900 dark:text-zinc-50 uppercase tracking-tighter uppercase">
                                                            {item.time}
                                                  </span>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))
                                    }


                                </CardContent>
                            </Card>
                            <div className="flex justify-end">
                                <DeletingAccountModal trigger={
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full sm:w-auto h-10 px-10 border-[#FF453A] text-[#FF453A] font-bold text-base rounded-md hover:bg-red-50 hover:text-red-600 transition-all"
                                    >
                                        Delete
                                    </Button>
                                } onSubmit={() => console.log("Delete User")}
                                />
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}