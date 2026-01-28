"use client"

import React from "react"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {createUserSchema, type CreateUserValues} from "@/schemas/admin-schema"
import {Icons} from "@/components/icons";

export function CreateUserModal({trigger}: { trigger: React.ReactNode }) {
    const form = useForm<CreateUserValues>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            name: "",
            company: "",
            email: "",
            status: "",
            role: "superadmin",
        },
    })

    function onSubmit(values: CreateUserValues) {
        console.log("Submitting User:", values)
        // এখানে আপনি Server Action কল করতে পারেন
    }

    const handleInteractOutside = (e: Event) => {
        e.preventDefault()
    }

    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>

            <DialogContent
                // className="font-[Space_Grotesk] !max-w-[1166px] w-[calc(100%-2rem)] h-[calc(100vh-6rem)] px-4 py-[30px] rounded-md border-[#DFE1E7] shadow-lg gap-0 [&>button]:hidden"
                // Key: This prevents closing on backdrop click
                onInteractOutside={handleInteractOutside}
                // Optional: Prevent closing on Escape key if desired
                onEscapeKeyDown={handleInteractOutside}
                className="max-w-[95vw] md:max-w-[1166px] w-[calc(100%-2rem)]  px-4 py-[30px] gap-0 border-none rounded-xl overflow-hidden bg-white shadow-2xl [&>button]:hidden flex flex-col max-h-[92vh]"

            >
                {/* --- HEADER --- */}
                <div className="flex items-center justify-between mb-3 border-b">
                    <DialogTitle className="text-[22px] font-semibold text-neutral-900 dark:text-muted-foreground">
                        Create new user
                    </DialogTitle>
                    <DialogClose asChild>
                        <Icons.modalClose className="cursor-pointer h-6 w-6 stroke-[2.5px] text-yellow-500"/>
                    </DialogClose>
                </div>
                <p className="text-zinc-900 dark:text-zinc-300 font-medium text-base mb-[18px]">
                    Configure the basic settings for creating a new user
                </p>

                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white scrollbar-hide">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[18px]">
                        <div className="rounded-xl border border-zinc-100 dark:border-zinc-800 p-2 space-y-3">

                            {/* Row 1: Name & Company */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({field}) => (
                                        <FormItem className="space-y-0.5">
                                            <FormLabel className="text-lg font-semibold">Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Name" {...field}
                                                       className="h-11 border-yellow-400 focus-visible:ring-0 bg-zinc-50/30"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="company"
                                    render={({field}) => (
                                        <FormItem className="space-y-0.5">
                                            <FormLabel className="text-lg font-semibold">Company</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Company Name" {...field}
                                                       className="h-11 border-yellow-400 focus-visible:ring-0 bg-zinc-50/30"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Row 2: Email */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem className="space-y-0.5">
                                        <FormLabel className="text-lg font-bold">Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="john@altura.ai" {...field}
                                                   className="h-11 border-yellow-400 focus-visible:ring-0 bg-zinc-50/30"/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            {/* Row 3: Status & Role */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({field}) => (
                                        <FormItem className="space-y-0.5">
                                            <FormLabel className="text-lg font-semibold">Status</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger
                                                        className="h-11 border-yellow-400 focus:ring-0 bg-zinc-50/30 shadow-none w-full">
                                                        <SelectValue placeholder="Select status"/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="active">Active</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({field}) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel className="text-lg font-semibold">Role</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger
                                                        className="h-11 border-yellow-400 focus:ring-0 bg-zinc-50/30 shadow-none w-full">
                                                        <SelectValue placeholder="Select role"/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="superadmin">
                                                        SuperAdmin
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* --- FOOTER BUTTONS --- */}

                    </form>
                </Form>
                </div>

                <div className="px-6 py-4 border-t border-zinc-100 bg-white sticky bottom-0 z-30">
                    <div className="flex flex-col sm:flex-row justify-end gap-4">
                        <Button type="submit"
                                className="h-10 px-8 bg-[#fdf027] hover:bg-[#e6d920] text-zinc-900 font-bold text-base rounded-md shadow-none transition-all w-full sm:w-auto"
                        >
                            Add New User
                        </Button>
                        <DialogClose asChild>
                            <Button type="button" variant="outline"
                                    className="w-full sm:w-auto h-10 px-10 border-[#FF453A] text-[#FF453A] font-bold text-base rounded-md hover:bg-red-50 hover:text-red-600 transition-all"
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}