"use client"

import React from "react"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {Plus, X} from "lucide-react"

import {
    Dialog,
    DialogContent,
    DialogHeader,
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
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {apiKeyFormSchema, ApiKeyFormValues} from "@/schemas/api-key-schema";
import {Icons} from "@/components/icons";

interface CreateKeyModalProps {
    type: "private" | "public"
    trigger: React.ReactNode // Pass the button that opens the modal
    onSubmit: (values: ApiKeyFormValues) => void
}

export function CreateKeyModal({type, trigger, onSubmit}: CreateKeyModalProps) {
    const isPrivate = type === "private"

    const form = useForm<ApiKeyFormValues>({
        resolver: zodResolver(apiKeyFormSchema),
        defaultValues: {
            name: "",
        },
    })

    const handleSubmit = (values: ApiKeyFormValues) => {
        onSubmit(values)
        form.reset()
    }

    const handleInteractOutside = (e: Event) => {
        e.preventDefault()
    }

    return (
        <Dialog onOpenChange={(open) => !open && form.reset()}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>

            {/* ১. max-h-[90vh] এবং flex flex-col যোগ করা হয়েছে */}
            <DialogContent
                onInteractOutside={handleInteractOutside}
                onEscapeKeyDown={handleInteractOutside}
                className="font-[Space_Grotesk] !max-w-5xl w-[calc(100%-2rem)] max-h-[90vh] p-0 rounded-md border-[#DFE1E7] shadow-lg flex flex-col gap-0 [&>button]:hidden">

                {/* --- DYNAMIC HEADER (Fixed) --- */}
                <div className="flex items-center justify-between flex-wrap px-6 py-4 border-b">
                    <DialogTitle className="text-[22px] font-semibold text-neutral-900 dark:text-muted-foreground">
                        Create {isPrivate ? "Private" : "Public"} Key
                    </DialogTitle>

                    <DialogClose asChild>
                        <Icons.modalClose className="h-8 w-8 stroke-[2.5px] text-[#BBAE00] cursor-pointer"/>
                    </DialogClose>
                </div>

                {/* ২. Form-কে flex-1 এবং overflow-hidden করে ফুটার আলাদা করা হয়েছে */}
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="flex flex-col flex-1 overflow-hidden"
                    >

                        {/* --- SCROLLABLE INPUT AREA --- */}
                        <div className="flex-1 overflow-y-auto p-6">
                            <Card className="border-[#DFE1E7] py-0 shadow-none rounded-md ">
                                <CardContent className="p-3">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({field}) => (
                                            <FormItem className="space-y-1">
                                                <FormLabel className="text-lg font-bold text-black dark:text-muted-foreground">
                                                    Key Internal Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder={isPrivate ? "E.g Inbound Sales" : "E.g. Public Widget Key"}
                                                        {...field}
                                                        className="w-full h-10 border-yellow-400 focus-visible:ring-0 text-lg text-zinc-600 placeholder:text-zinc-400 bg-zinc-50/30"
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>
                        </div>

                        {/* --- FIXED FOOTER BUTTONS --- */}
                        <div className="flex sm:justify-end items-center flex-wrap gap-4 px-6 py-4 border-t border-zinc-100 sticky bottom-0 z-30">
                            <DialogClose asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full sm:w-auto h-10 px-10 border-[#FF453A] text-[#FF453A] font-medium text-lg rounded-md hover:bg-red-50 hover:text-red-600 transition-all"
                                >
                                    Cancel
                                </Button>
                            </DialogClose>

                            <Button
                                type="submit"
                                className="w-full sm:w-auto h-10 px-6 bg-[#FCEC1A] hover:bg-[#FCEC1A] text-black dark:text-muted font-bold rounded-md gap-3 shadow-none transition-all"
                            >
                                <div className="flex h-6 w-6 items-center justify-center rounded-sm border border-black">
                                    <Plus className="h-4 w-4 stroke-[3px]"/>
                                </div>
                                Create Key
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}