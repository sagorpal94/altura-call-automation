"use client";
import React from "react";
import {useFieldArray, UseFormReturn} from "react-hook-form";
import { ToolFormValues } from "@/schemas/tool-schema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {Textarea} from "@/components/ui/textarea";

export default function QuerySection({ form }: { form: UseFormReturn<ToolFormValues> }) {
    const kbFA = useFieldArray({ control: form.control, name: "knowledgeBases" as any });

    return (
        <>
            <FormField
                control={form.control}
                name="toolModel"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Model</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value as any}>
                            <FormControl>
                                <SelectTrigger className="border border-[#FCEC1A] h-12 text-lg focus-visible:ring-0 w-full">
                                    <SelectValue placeholder="Select Model" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="gemini-2.0-flash">Gemini 2.0 Flash</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="w-full border border-[#DFE1E7] rounded-md overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b">
                    <div>
                        <h3 className="font-bold">Parameters</h3>
                        <p className="text-xs text-zinc-500">Define the parameters your tool accepts</p>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                            kbFA.append({
                                name: "new_knowledge_base",
                                description: "",
                                model: "gemini-2.0-flash",
                                fileIds: [],
                            } as any)
                        }
                        className="border-[#FDE047] font-bold"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Knowledge Base
                    </Button>
                </div>

                <div className="p-4 space-y-4">
                    {kbFA.fields.length === 0 ? (
                        <div className="border border-[#FDE047] rounded-md py-10 flex items-center justify-center bg-[#FEFCE8]/30">
                            <p className="text-xs text-zinc-400">No knowledge base added yet.</p>
                        </div>
                    ) : (
                        kbFA.fields.map((kb, i) => (
                            <div key={kb.id} className="border border-[#FDE047] rounded-md p-4 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-bold">Knowledge Base #{i + 1}</h4>
                                    <button type="button" onClick={() => kbFA.remove(i)} className="text-zinc-400 hover:text-red-500">
                                        ✕
                                    </button>
                                </div>

                                {/* Name */}
                                <FormField
                                    control={form.control}
                                    name={`knowledgeBases.${i}.name` as any}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} className="border-[#FDE047]" />
                                            </FormControl>
                                            <p className="text-xs text-zinc-500 mt-1">
                                                Must start with a letter and contain only letters, numbers and underscores.
                                            </p>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    )}
                                />

                                {/* Description */}
                                <FormField
                                    control={form.control}
                                    name={`knowledgeBases.${i}.description` as any}
                                    render={({ field }) => (
                                        <FormItem className="relative">
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    {...field}
                                                    placeholder="Describe when this knowledge base should be used"
                                                    className="border-[#FDE047] min-h-[90px]"
                                                />
                                            </FormControl>
                                            <span className="absolute top-0 right-0 text-xs text-zinc-400">
                        {(field.value?.length || 0)}/999
                      </span>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    )}
                                />

                                {/* Model */}
                                <FormField
                                    control={form.control}
                                    name={`knowledgeBases.${i}.model` as any}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Model</FormLabel>
                                            <FormControl>
                                                <Input {...field} className="border-[#FDE047]" />
                                            </FormControl>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    )}
                                />

                                {/* Files (simple placeholder) */}
                                <FormField
                                    control={form.control}
                                    name={`knowledgeBases.${i}.fileIds` as any}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Files</FormLabel>
                                            {/* তোমার app-এ যেভাবে file picker আছে সেটাতে bind করবে */}
                                            <FormControl>
                                                <Input
                                                    value={(field.value || []).join(",")}
                                                    onChange={(e) => field.onChange(e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
                                                    placeholder="fileId1,fileId2"
                                                    className="border-[#FDE047]"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-xs" />
                                            <p className="text-xs text-red-500 mt-1">At least one file ID is required</p>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
