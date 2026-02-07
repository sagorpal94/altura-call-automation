"use client";

import React, { useEffect, useMemo } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import {useForm, SubmitHandler, Resolver} from "react-hook-form"; // ✅ SubmitHandler ইম্পোর্ট করুন
import { zodResolver } from "@hookform/resolvers/zod";
import { TOOL_REGISTRY, ToolType } from "@/types/tool-registry";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Icons } from "@/components/icons";
import CommonHeaderFields from "@/components/tools/tool-sections/CommonHeaderFields";
import MessagesSection from "@/components/tools/messages-section";
import { editToolFormSchema, EditToolFormValues } from "@/schemas/edit-tool-schema";

type EditToolModalProps = {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    tool: any | null;
    toolType: ToolType | null;
    onSave: (toolId: string, payload: any) => Promise<void> | void;
};

export default function EditToolModal({ open, onOpenChange, tool, toolType, onSave }: EditToolModalProps) {
    const registryItem = useMemo(() => {
        if (!toolType) return null;
        return TOOL_REGISTRY[toolType];
    }, [toolType]);

    const form = useForm<EditToolFormValues>({
        resolver: zodResolver(editToolFormSchema) as unknown as Resolver<EditToolFormValues>,
        shouldUnregister: true,
        defaultValues: {} as Partial<EditToolFormValues>,
    });

    // useEffect(() => {
    //     if (!open || !tool || !registryItem) return;
    //     const mapped = registryItem.toForm(tool);
    //     form.reset(mapped);
    // }, [open, tool, registryItem, form]);

    useEffect(() => {
        if (!open || !tool || !registryItem) return;
        const mapped = registryItem.toForm(tool);
        form.reset(mapped as EditToolFormValues); // ✅ add this cast
    }, [open, tool, registryItem, form]);


    // ✅ handleSubmit কে টাইপ সেফ করুন
    const onSubmit: SubmitHandler<EditToolFormValues> = async (values) => {
        if (!registryItem || !tool?.id) return; // ✅ Null safety check
        const payload = registryItem.fromForm(values);
        await onSave(tool.id, payload);
        onOpenChange(false);
    };

    if (!registryItem) return null;
    const Section = registryItem.Section;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
                className="max-w-[95vw] md:max-w-[900px] p-0 gap-0 rounded-xl overflow-hidden [&>button]:hidden flex flex-col max-h-[92vh]"
            >
                <div className="flex items-baseline justify-between p-5 border-b sticky top-0 z-10 bg-white">
                    <div>
                        <h2 className="text-xl font-bold">Tool Settings</h2>
                        <p className="text-sm text-gray-500 font-medium">Configure the basic settings for this tool</p>
                    </div>
                    <Icons.modalClose onClick={() => onOpenChange(false)} className="h-6 w-6 text-yellow-500 cursor-pointer" />
                </div>

                <div className="flex-1 overflow-y-auto pt-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-5xl mx-auto space-y-6 mb-10 px-4">
                            <CommonHeaderFields
                                form={form}
                                lockToolType={registryItem.lockType}
                                forcedToolType={registryItem.type as any}
                            />

                            {/* ✅ registryItem এর টাইপ ইনফারেন্স ঠিক রাখতে হবে */}
                            {Section && <Section form={form as any} />}

                            <MessagesSection form={form} />
                        </form>
                    </Form>
                </div>

                <div className="p-4 border-t flex justify-end gap-3 bg-white">
                    <Button variant="outline" onClick={() => onOpenChange(false)}
                            className="px-10 h-11 border-red-200 text-red-400 hover:bg-red-50">
                        Cancel
                    </Button>
                    {/* ✅ Submit button এর ভেতর handleSubmit সরাসরি কল না করে টাইপ ঠিক রাখুন */}
                    <Button type="submit"
                            className="px-10 h-11 bg-[#FAEF32] hover:bg-[#E9D502] font-bold gap-2 shadow-none">
                        <Plus className="h-4 w-4 stroke-[3px]" /> Save Tool
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}