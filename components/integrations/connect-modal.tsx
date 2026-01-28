"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { X } from "lucide-react"

import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {Icons} from "@/components/icons";

// Validation Schema
const formSchema = z.object({
    apiKey: z.string().min(1, "API Key is required"),
})

interface ConnectModalProps {
    open: boolean
    setOpen: (open: boolean) => void
    onConnect: (data: z.infer<typeof formSchema>) => void
}

const ConnectModal = ({ open, setOpen, onConnect }: ConnectModalProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            apiKey: "",
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        onConnect(values)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
                className="max-w-[95vw] md:max-w-[850px] p-0 gap-0 border-none rounded-xl overflow-hidden bg-white shadow-2xl [&>button]:hidden"
            >
                {/* Custom Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
                    <DialogTitle className="text-xl font-semibold text-zinc-900">
                        Connect
                    </DialogTitle>
                    {/* Custom Close Button from Image */}
                    <button
                        onClick={() => setOpen(false)}
                        className="w-8 h-8 flex items-center justify-center border border-yellow-400 rounded-md text-yellow-500 hover:bg-yellow-50 transition-colors"
                    >
                        <Icons.modalClose size={20} strokeWidth={2.5} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <p className="text-zinc-900 font-medium -mt-2">
                        Provide your authentication credentials.
                    </p>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                            {/* API Key Input Section */}
                            <div className="p-5 border border-zinc-200 rounded-xl space-y-4">
                                <FormField
                                    control={form.control}
                                    name="apiKey"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel className="text-xs font-bold tracking-widest text-zinc-900 uppercase">
                                                API KEY
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="api-key"
                                                    {...field}
                                                    className="h-12 border-yellow-400 focus-visible:ring-0 focus-visible:ring-offset-0 bg-white rounded-lg placeholder:text-zinc-400"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Encryption Info Box */}
                            <div className="border border-yellow-400/60 rounded-xl p-8 bg-white">
                                <p className="text-[#BBAE00] text-[15px] font-medium text-center leading-relaxed">
                                    Credentials are encrypted and stored locally. Altura does not relay sensitive keys to third-party tracking services.
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3 pt-2">
                                <Button
                                    type="submit"
                                    className="h-11 px-8 bg-[#FDF027] hover:bg-[#e6d920] text-zinc-900 font-bold text-sm rounded-lg shadow-none"
                                >
                                    Establish Connection
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setOpen(false)}
                                    className="h-11 px-10 border-[#FF453A]/50 text-[#FF453A] font-medium text-sm rounded-lg hover:bg-red-50 hover:text-red-600 transition-all"
                                >
                                    Cancel
                                </Button>
                            </div>

                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ConnectModal