"use client";

import { UseFormReturn } from "react-hook-form";
import { ToolFormValues } from "@/schemas/tool-schema";

export default function HangupSection({ form }: { form: UseFormReturn<ToolFormValues> }) {
    // no extra fields (screenshot অনুযায়ী)
    return null;
}
