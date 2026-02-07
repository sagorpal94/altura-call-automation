"use client";

import React from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { ToolFormValues } from "@/schemas/tool-schema";
import { Button } from "@/components/ui/button";

export default function MessagesSection({ form }: { form: UseFormReturn<ToolFormValues> }) {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "messages" as any,
    });

    return (
        <div className="w-full border border-[#DFE1E7] rounded-md p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-md border border-[#DFE1E7] flex items-center justify-center">
                        <span className="text-lg">≡</span>
                    </div>
                    <div>
                        <h2 className="text-[16px] font-bold">Messages</h2>
                        <p className="text-[12px] text-zinc-500 font-medium">
                            Configure messages to be spoken during different stages of tool execution
                        </p>
                    </div>
                </div>

                <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                        append({
                            type: "Request Start",
                            option: "default",
                            waitForMessage: false,
                            conditions: [{ parameter: "", operator: "equal", value: "" }],
                        } as any)
                    }
                    className="h-11 px-6 border-[#FDE047] font-bold text-[15px] rounded-md"
                >
                    Add Message
                </Button>
            </div>

            {/* Optional: list summary (minimal) */}
            {fields.length > 0 && (
                <div className="mt-4 space-y-2">
                    {fields.map((f, idx) => (
                        <div key={f.id} className="flex items-center justify-between border border-[#FDE047] rounded-md px-4 py-3 bg-[#FEFCE8]/30">
                            <div className="text-sm font-semibold text-zinc-700">
                                {form.watch(`messages.${idx}.type` as any) || "Message"}
                            </div>
                            <button
                                type="button"
                                onClick={() => remove(idx)}
                                className="text-xs text-zinc-400 hover:text-red-500"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
