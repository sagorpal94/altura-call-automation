"use client"

import React, {useState} from "react"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"

import {
    Dialog, DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle, DialogTrigger,
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
import {manageNumberSchema, type ManageNumberValues} from "@/schemas/manage-number-schema"
import {Icons} from "@/components/icons";

export function ManageNumberModal({phoneNumber}: { phoneNumber: any }) {
    const [open, setOpen] = useState(false)

    const form = useForm<ManageNumberValues>({
        resolver: zodResolver(manageNumberSchema),
        defaultValues: {
            friendlyLabel: phoneNumber.label,
            linkedAgent: phoneNumber.agentValue,
        },
    })

    function onSubmit(values: ManageNumberValues) {
        console.log("Updated Settings:", values)
        setOpen(false)
        form.reset(values)
    }

    const handleInteractOutside = (e: Event) => {
        e.preventDefault()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button
                    className="cursor-pointer text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                    <Icons.filterSliderIcon className="h-5 w-5 text-muted-foreground"/>
                </button>
            </DialogTrigger>

            <DialogContent
                className="font-[Space_Grotesk] !max-w-2xl w-[calc(100%-2rem)] max-h-[90vh] p-0 rounded-md border-[#DFE1E7] shadow-lg flex flex-col gap-0 [&>button]:hidden"
                onInteractOutside={handleInteractOutside}
                onEscapeKeyDown={handleInteractOutside}
            >
                {/* --- FIXED HEADER --- */}
                <div className="px-6 py-5 border-b border-[#DFE1E7]">
                    <DialogTitle className="text-[22px] font-semibold text-neutral-900 dark:text-muted-foreground">
                        Manage Phone Number
                    </DialogTitle>
                </div>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col flex-1 overflow-hidden"
                    >
                        {/* --- SCROLLABLE CONTENT AREA --- */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {/* --- FRIENDLY LABEL --- */}
                            <FormField
                                control={form.control}
                                name="friendlyLabel"
                                render={({field}) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                            Friendly Label
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="w-full h-10 border-yellow-400 focus-visible:ring-0 text-lg text-zinc-600 placeholder:text-zinc-400 bg-zinc-50/30"
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            {/* --- LINKED AI AGENT --- */}
                            <FormField
                                control={form.control}
                                name="linkedAgent"
                                render={({field}) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                            Linked AI Agent
                                        </FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger
                                                    className="w-full h-10 border-yellow-400 focus-visible:ring-0 text-lg text-zinc-600 placeholder:text-zinc-400 bg-zinc-50/30">
                                                    <SelectValue placeholder="Select an agent"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="dark:bg-zinc-900 dark:border-zinc-800">
                                                <SelectItem value="sarah" className="text-lg">Sarah Support</SelectItem>
                                                <SelectItem value="max" className="text-lg">Max Market</SelectItem>
                                                <SelectItem value="twilio" className="text-lg">Twilio Line</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* --- FIXED FOOTER BUTTONS --- */}
                        {/*<div className="flex flex-col sm:flex-row justify-end items-center gap-4 p-6 border-t border-[#DFE1E7] bg-white dark:bg-zinc-950">*/}
                            <div className="flex sm:justify-end items-center flex-wrap gap-4 px-6 py-4 border-t border-zinc-100 sticky bottom-0 z-30">

                            <DialogClose asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full sm:w-auto h-10 px-10 border-[#FF453A] text-[#FF453A] font-bold text-base rounded-md hover:bg-red-50 hover:text-red-600 transition-all"
                                    onClick={() => console.log("Releasing number...")}
                                >
                                    Release Number
                                </Button>
                            </DialogClose>

                            <Button
                                type="submit"
                                className="h-10 px-8 bg-[#fdf027] hover:bg-[#e6d920] text-zinc-900 font-bold text-base rounded-md shadow-none transition-all w-full sm:w-auto"
                            >
                                Update Number Settings
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}