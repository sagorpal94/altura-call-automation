"use client"

import * as React from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { FileUp } from "lucide-react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
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
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"

// --- Zod Validation Schema ---
const formSchema = z.object({
    voiceName: z.string().min(2, "Voice name is required"),
    // File validation refinement
    audioFiles: z
        .custom<FileList>()
        .refine((files) => files?.length > 0, "Please upload at least one audio file")
        .refine(
            (files) => Array.from(files || []).every((file) => file.size <= 10 * 1024 * 1024),
            "Each file must be less than 10MB"
        ),
    description: z.string().min(10, "Description should be at least 10 characters"),
})

type FormValues = z.infer<typeof formSchema>

export function CloneVoiceModal() {
    const [open, setOpen] = React.useState(false)

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            voiceName: "",
            description: "",
        },
    })

    const onSubmit = (values: FormValues) => {
        console.log("Submitted Values:", values)
        // API Call logic here
        setOpen(false)
        form.reset()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="text-zinc-500 border border-zinc-300 dark:border-zinc-700 px-4 py-2 gap-2 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                >
                    Clone
                    <Icons.cloneIcon />
                </Button>
            </DialogTrigger>

            <DialogContent
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
                className="sm:max-w-[500px] p-0 gap-0 rounded-xl overflow-hidden [&>button]:hidden flex flex-col max-h-[92vh] bg-background border-border"
            >
                {/* Header Section */}
                <DialogHeader className="flex flex-row items-start justify-between p-5 border-b sticky top-0 z-10 bg-background/95 backdrop-blur">
                    <div className="flex flex-col items-start gap-1">
                        <DialogTitle className="text-2xl font-bold text-foreground">Clone Voice</DialogTitle>
                        <DialogDescription className="text-muted-foreground text-sm text-left">
                            Clone a voice to your library and use it for any assistant.
                        </DialogDescription>
                    </div>
                    <Icons.modalClose
                        onClick={() => {
                            setOpen(false)
                            form.reset()
                        }}
                        className="h-6 w-6 text-yellow-500 cursor-pointer transition-colors"
                    />
                </DialogHeader>

                {/* Scrollable Content Section */}
                <div className="flex-1 overflow-y-auto pt-6 px-5 pb-10">
                    <Form {...form}>
                        <form
                            id="clone-voice-form" // Linked to the footer button
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            {/* Voice Name */}
                            <FormField
                                control={form.control}
                                name="voiceName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-muted-foreground text-xs font-bold uppercase tracking-wider">
                                            Voice Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="e.g. My Custom Voice"
                                                {...field}
                                                className="bg-transparent border-input focus:ring-1 focus:ring-primary h-11"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-destructive text-xs" />
                                    </FormItem>
                                )}
                            />

                            {/* Audio Files Upload */}
                            <FormField
                                control={form.control}
                                name="audioFiles"
                                render={({ field: { onChange, value } }) => (
                                    <FormItem>
                                        <FormLabel className="text-muted-foreground text-xs font-bold uppercase tracking-wider">
                                            Audio Files
                                        </FormLabel>
                                        <FormControl>
                                            <div className="group relative border-2 border-dashed border-input rounded-lg p-8 flex flex-col items-center justify-center gap-3 bg-muted/30 hover:bg-muted/50 cursor-pointer transition-all">
                                                <input
                                                    type="file"
                                                    multiple
                                                    accept="audio/*"
                                                    className="absolute inset-0 opacity-0 cursor-pointer z-20"
                                                    onChange={(e) => onChange(e.target.files)}
                                                />
                                                <div className="p-2 rounded-lg bg-background border border-border shadow-sm group-hover:scale-110 transition-transform">
                                                    <FileUp className="w-6 h-6 text-primary" />
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-sm font-medium text-foreground">
                                                        Click or drag to upload audio
                                                    </p>
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        Supported formats: MP3, WAV (Max 10MB per file)
                                                    </p>
                                                </div>
                                                {value && value.length > 0 && (
                                                    <div className="mt-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                                                        <p className="text-xs text-primary font-bold">
                                                            {value.length} file(s) selected
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-destructive text-xs" />
                                    </FormItem>
                                )}
                            />

                            {/* Voice Description */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-muted-foreground text-xs font-bold uppercase tracking-wider">
                                            Voice Description
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Describe the voice's tone, pitch, and style..."
                                                className="bg-transparent border-input focus:ring-1 focus:ring-primary min-h-[120px] resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-destructive text-xs" />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </div>

                {/* Footer Section */}
                <div className="p-4 border-t bg-background/95 backdrop-blur flex justify-end gap-3">
                    <Button
                        type="submit"
                        form="clone-voice-form" // This triggers the form's onSubmit
                        className="w-full bg-[#2d5a52] hover:bg-[#244a43] text-emerald-100 font-bold h-12 rounded-lg text-lg shadow-lg active:scale-[0.98] transition-all"
                    >
                        Clone Voice
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}