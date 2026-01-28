"use client"
import React from 'react';
import {Dialog, DialogClose, DialogContent, DialogTitle} from "@/components/ui/dialog";
import {Icons} from "@/components/icons";
import {Card, CardContent} from "@/components/ui/card";
import Image from "next/image";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    card_number: z.string().min(16, "Invalid card number").max(16),
    expiry_date: z.string().min(5, "MM/YY required"),
    cvv: z.string().min(3, "Required").max(4),
});

interface CardPreviewModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const CardPreviewModal = ({open, setOpen}: CardPreviewModalProps) => {

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            card_number: "",
            expiry_date: "",
            cvv: "",
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        setOpen(false); // Close modal on success
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <DialogContent
                className="font-[Space_Grotesk] !max-w-[1166px] w-[calc(100%-2rem)] max-h-[90vh] px-4 py-[30px] rounded-md border-[#DFE1E7] shadow-lg gap-0 [&>button]:hidden"
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <div className="flex items-center justify-between mb-3 border-b">
                    <DialogTitle className="text-[22px] font-semibold text-neutral-900 dark:text-muted-foreground">
                        Create new user
                    </DialogTitle>
                    <DialogClose asChild>
                        <Icons.modalClose className="cursor-pointer h-6 w-6 stroke-[2.5px] text-yellow-500"/>
                    </DialogClose>
                </div>

                <div className="max-h-[80vh] overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
                        <Card className=" border-[#DFE1E7] py-0 rounded-md shadow-none">
                            <CardContent className="p-4 md:px-[60px] md:py-[21px] space-y-4">
                                <div className="flex flex-col justify-center items-center">
                                    <Image
                                        src="/images/creadit-card.png"
                                        alt="creadit-card"
                                        width={312}
                                        height={219}
                                    />
                                    <p className="text-lg mt-6">
                                        * This is a simulation. For security, Altura never stores full card numbers in
                                        plaintext
                                        on our servers.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className=" border-[#DFE1E7] py-0 rounded-md shadow-none">
                            <CardContent className="p-4 md:px-[50px] md:py-[44px] space-y-4">
                                <h2 className="text-[22px] text-[#0D0D12] dark:text-muted-foreground">Card Details</h2>

                                <Form {...form}>
                                    <form className="space-y-5">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({field}) => (
                                                <FormItem className="space-y-0.5">
                                                    <FormLabel
                                                        className="text-sm text-[#191919] dark:text-muted-foreground">Card
                                                        Holder
                                                        Name</FormLabel>
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
                                            name="card_number"
                                            render={({field}) => (
                                                <FormItem className="space-y-0.5">
                                                    <FormLabel
                                                        className="text-sm text-[#191919] dark:text-muted-foreground capitalize">CARD
                                                        NUMBER</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Name" {...field}
                                                               className="h-11 border-yellow-400 focus-visible:ring-0 bg-zinc-50/30"/>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />

                                        <div className="grid md:grid-cols-2 gap-5">
                                            <FormField
                                                control={form.control}
                                                name="card_number"
                                                render={({field}) => (
                                                    <FormItem className="space-y-0.5">
                                                        <FormLabel
                                                            className="text-sm text-[#191919] dark:text-muted-foreground">Expiry
                                                            Date</FormLabel>
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
                                                name="card_number"
                                                render={({field}) => (
                                                    <FormItem className="space-y-0.5">
                                                        <FormLabel
                                                            className="text-sm text-[#191919] dark:text-muted-foreground">CVV</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Name" {...field}
                                                                   className="h-11 border-yellow-400 focus-visible:ring-0 bg-zinc-50/30"/>
                                                        </FormControl>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )}
                                            />

                                        </div>

                                        <Button type="submit"
                                                className="w-full h-11 px-8 bg-[#FCEC1A] hover:bg-[#e6d920] text-zinc-900 dark:text-muted-foreground font-bold text-base rounded-md shadow-none transition-all"
                                        >
                                            Save New Payment Method
                                        </Button>

                                    </form>
                                </Form>

                            </CardContent>
                        </Card>

                    </div>
                </div>

            </DialogContent>

        </Dialog>
    );
};

export default CardPreviewModal;