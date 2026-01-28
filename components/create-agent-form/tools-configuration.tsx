import React from "react";
import {useFormContext} from "react-hook-form";
import {cn} from "@/lib/utils";
import {
    FormField,
} from "@/components/ui/form";
import {Card, CardContent} from "@/components/ui/card";
import {AreaChart, Check} from "lucide-react";
import {Icons} from "@/components/icons";

const AVAILABLE_TOOLS = [
    {
        id: "knowledge_query",
        category: "QUERY",
        title: "Knowledge Query",
    },
    {
        id: "hang_up",
        category: "END CALL",
        title: "Hang up",
    },
    {
        id: "g_calendar",
        category: "GOOGLE CALENDAR",
        title: "G-Calendar",
    },
    {
        id: "slack_alert",
        category: "SLACK",
        title: "Slack alert",
    },
]

export default function ToolsConfiguration() {
    const form = useFormContext();

    const toggleTool = (toolId: string, currentValues: string[]) => {
        const isSelected = currentValues.includes(toolId)
        if (isSelected) {
            form.setValue("enabledTools", currentValues.filter(id => id !== toolId))
        } else {
            form.setValue("enabledTools", [...currentValues, toolId])
        }
    }

    return (
        <div className="animate-in fade-in duration-300">
            <Card className="border-[#DFE1E7] shadow-sm !py-2 !rounded-md">
                <CardContent className="!px-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="enabledTools"
                            render={({field}) => (
                                <>
                                    {AVAILABLE_TOOLS.map((tool) => {
                                        const isActive = field?.value?.includes(tool.id)

                                        return (
                                            <Card
                                                key={tool.id}
                                                onClick={() => toggleTool(tool.id, field.value)}
                                                className={cn(
                                                    "relative py-3 !rounded-md cursor-pointer transition-all duration-200 border-zinc-200 shadow-none hover:border-zinc-300",
                                                    isActive && "border-yellow-400 ring-1 ring-yellow-400"
                                                )}
                                            >
                                                <CardContent
                                                    className="px-6 py-0 space-y-1 flex flex-col justify-between">
                                                    <div className="space-y-1">
                                                        <p className="text-[10px] font-bold text-zinc-500 tracking-wider uppercase">
                                                            {tool.category}
                                                        </p>
                                                        <h3 className="text-xl font-bold text-zinc-900 dark:text-muted-foreground tracking-tight">
                                                            {tool.title}
                                                        </h3>
                                                    </div>

                                                    <div className="flex items-end justify-between">
                                                        {/* The specific icon from your design */}
                                                        <div
                                                            className="">
                                                            <Icons.chartIcon className="h-4 w-4"/>
                                                        </div>

                                                        {/* Visual feedback for selection */}
                                                        {isActive && (
                                                            <div className="bg-yellow-400 rounded-full p-1">
                                                                <Check className="h-3 w-3 text-black font-bold"/>
                                                            </div>
                                                        )}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        )
                                    })}
                                </>
                            )}
                        />
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}