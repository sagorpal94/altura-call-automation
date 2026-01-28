import React from 'react';
import {Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Icons} from "@/components/icons";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Card, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {DeleteConfirmFormValues, userDeleteConfirmSchema} from "@/schemas/admin-schema";

interface DeletingAccountModalProps {
    trigger: React.ReactNode // Pass the button that opens the modal
    onSubmit: (values: DeleteConfirmFormValues) => void
}

const DeletingAccountModal = ({trigger, onSubmit}: DeletingAccountModalProps) => {
    const form = useForm<DeleteConfirmFormValues>({
        resolver: zodResolver(userDeleteConfirmSchema),
        defaultValues: {
            name: "",
        },
    })

    const handleSubmit = (values: DeleteConfirmFormValues) => {
        onSubmit(values)
        form.reset()
    }

    const handleInteractOutside = (e: Event) => {
        e.preventDefault()
    }
    return (
        <>
            <Dialog onOpenChange={(open) => !open && form.reset()}>
                <DialogTrigger asChild>
                    {trigger}
                </DialogTrigger>

                <DialogContent
                    // Key: This prevents closing on backdrop click
                    onInteractOutside={handleInteractOutside}
                    // Optional: Prevent closing on Escape key if desired
                    onEscapeKeyDown={handleInteractOutside}
                    className="font-[Space_Grotesk] !max-w-5xl w-[calc(100%-2rem)] px-3 py-6 rounded-md border-[#DFE1E7] shadow-lg gap-0 [&>button]:hidden">

                    {/* --- DYNAMIC HEADER --- */}
                    <div className="flex items-center justify-between flex-wrap mb-3">
                        <DialogTitle className="text-[22px] font-semibold text-neutral-900 dark:text-muted-foreground">
                            Deleting Account
                        </DialogTitle>

                        <DialogClose asChild>
                            <Icons.modalClose className="h-8 w-8 stroke-[2.5px] text-[#BBAE00] cursor-pointer"/>
                        </DialogClose>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">

                            {/* --- INPUT AREA --- */}
                            <Card className="border-[#DFE1E7] py-0 shadow-none rounded-md ">
                                <CardContent className="p-3">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({field}) => (
                                            <FormItem className="space-y-1">
                                                <FormLabel
                                                    className="text-lg font-bold text-black dark:text-muted-foreground">
                                                    Deleting your account will remove all of your information from our
                                                    database. This cannot be undone.
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="To confirm this, type “DELETE”"
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

                            {/* --- FOOTER BUTTONS --- */}
                            <div className="flex  sm:justify-end items-center flex-wrap gap-4">
                                <DialogClose asChild>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full sm:w-auto h-10 px-10 bg-[#FF383C] text-[#DFE1E7] font-medium text-lg rounded-md transition-all"
                                    >
                                        Delete account
                                    </Button>
                                </DialogClose>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default DeletingAccountModal;