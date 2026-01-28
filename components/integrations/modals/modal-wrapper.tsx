"use client"

import React from "react"
import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {Icons} from "@/components/icons";

interface WrapperProps {
    open: boolean;
    setOpen: (v: boolean) => void;
    title: string;
    children: React.ReactNode;
    formId: string;
}

export const ModalWrapper = ({open, setOpen, title, children, formId}: WrapperProps) => (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
            onInteractOutside={(e) => e.preventDefault()}
            onEscapeKeyDown={(e) => e.preventDefault()}
            className="max-w-[95vw] md:max-w-[850px] p-0 gap-0 border-none rounded-xl overflow-hidden bg-white shadow-2xl [&>button]:hidden flex flex-col max-h-[92vh]"
        >

            {/* HEADER (Fixed) */}
            <div
                className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 bg-white sticky top-0 z-30">
                <DialogTitle className="text-xl font-bold text-zinc-900 tracking-tight">{title}</DialogTitle>

                <Icons.modalClose
                    onClick={() => setOpen(false)}
                    className="h-8 w-8 stroke-[2.5px] text-[#BBAE00] cursor-pointer"
                />
                {/*<button onClick={() => setOpen(false)}*/}
                {/*        className="cursor-pointer w-8 h-8 flex items-center justify-center  text-yellow-50">*/}
                {/*    <Icons.modalClose size={20} strokeWidth={2.5} fill="text-yellow-500"/>*/}
                {/*</button>*/}
            </div>

            {/* BODY (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white scrollbar-hide">
                <p className="text-zinc-900 font-medium -mt-2">Provide your authentication credentials.</p>

                {children}

                {/* Encryption Notice */}
                <div className="border border-yellow-400/60 text-center rounded-md px-4 py-2 ">
                    <p className="text-[#BBAE00] text-base font-medium leading-relaxed">
                        Credentials are encrypted and stored locally. Altura does not relay sensitive keys
                        to third-party tracking services.
                    </p>
                </div>
            </div>

            {/* FOOTER (Fixed) */}
            <div className="px-6 py-4 border-t border-zinc-100 bg-white sticky bottom-0 z-30">
                <div className="flex flex-row justify-end gap-3">
                    <Button type="submit" form={formId}
                            className="h-11 px-8 bg-[#FDF027] hover:bg-[#e6d920] text-zinc-900 font-bold text-sm rounded-lg shadow-none transition-all">
                        Establish Connection
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setOpen(false)}
                            className="h-11 px-10 border-[#FF453A]/40 text-[#FF453A] font-medium text-sm rounded-lg hover:bg-red-50 hover:text-red-600 shadow-none transition-all">
                        Cancel
                    </Button>
                </div>
            </div>
        </DialogContent>
    </Dialog>
);