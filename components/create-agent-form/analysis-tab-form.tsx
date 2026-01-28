"use client"

import React from "react"
import {useFormContext} from "react-hook-form"
import {FormField} from "@/components/ui/form"
import {Card, CardContent} from "@/components/ui/card"
import {Switch} from "@/components/ui/switch"
import {cn} from "@/lib/utils"
import {Menu} from "lucide-react";

const ANALYSIS_OPTIONS = [
    {id: "call_summary", title: "Call Summary", description: "Generate a concise 2-3 sentence of the call"},
    {
        id: "success_eval_pf",
        title: "Success Evaluation - Pass/Fail",
        description: "Simple binary evaluation of call success"
    },
    {
        id: "success_eval_numeric",
        title: "Success Evaluation - Numeric Scale",
        description: "Rate call success on a scale of 1-10"
    },
    {
        id: "success_eval_desc",
        title: "Success Evaluation - Description",
        description: "Qualitative assessment of a call performance"
    },
    {id: "appt_booked", title: "Appointment Booked", description: "Tracks if a costumer booked an appointment"},
    {
        id: "appt_cancelled",
        title: "Appointment Cancelled",
        description: "Track when appointment are cancelled by the costumer"
    },
    {
        id: "appt_rescheduled",
        title: "Appointment Rescheduled",
        description: "Track when appointments are moved to a different time"
    },
    {id: "appt_time", title: "Appointment Time", description: "Capture the scheduled appointment time"},
    {
        id: "booking_details",
        title: "Booking Details",
        description: "Capture complete booking information in structured format"
    },
    {id: "csat", title: "CSAT", description: "Numerical rating of costumer satisfaction"},
    {
        id: "sentiment",
        title: "Costumer Sentiment",
        description: "Overall emotional tone of the costumer during the call"
    },
    {id: "nps", title: "NPS Score", description: "Net Promoter Score - likelihood to recommend"},
    {id: "feedback", title: "Costumer Feedback", description: "Wether costumer gave specific feedback or suggestions"},
    {
        id: "effort_score",
        title: "Costumer Effort Score",
        description: "How easy it was for the costumer to get their issue resolved"
    },
    {id: "recommend", title: "Would Recommend", description: "Wether the costumer would recommend your service"},
    {id: "feedback_summary", title: "Feedback Summary", description: "Detailed costumer feedback or suggestions"},
]

export default function AnalysisTabForm() {
    const form = useFormContext()

    const onToggle = (id: string, checked: boolean) => {
        const current = form.getValues("enabledAnalyses") || []
        if (checked) {
            form.setValue("enabledAnalyses", [...current, id])
        } else {
            form.setValue("enabledAnalyses", current.filter((item: any) => item !== id))
        }
    }

    return (
        <div className="space-y-6">
            <Card className="border-[#DFE1E7] py-2 !rounded-md shadow-none">
                <CardContent className="px-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="enabledAnalyses"
                            render={({field}) => (
                                <>
                                    {ANALYSIS_OPTIONS.map((item) => {
                                        const isActive = (field.value || []).includes(item.id)

                                        return (
                                            <Card
                                                key={item.id}
                                                className={cn(
                                                    "border-[#DFE1E7] py-2 !rounded-md shadow-none transition-all duration-200",
                                                    isActive && "border-yellow-400 ring-1 ring-yellow-400"
                                                )}
                                            >
                                                <CardContent className="px-3 flex flex-col gap-3">
                                                    <div className="flex items-center justify-between">
                                                        {/* Top-left Icon */}
                                                        <div
                                                            className="border border-[#DFE1E7] rounded p-1.5 w-fit text-zinc-400">
                                                            <Menu className="h-4 w-4"/>
                                                        </div>

                                                        {/* Top-right Toggle */}
                                                        <Switch
                                                            checked={isActive}
                                                            onCheckedChange={(checked: any) => onToggle(item.id, checked)}
                                                            className="data-[state=checked]:bg-yellow-400 data-[state=unchecked]:bg-zinc-200"
                                                        />
                                                    </div>

                                                    <div className="space-y-1">
                                                        <h3 className="text-base font-bold text-zinc-900 dark:text-muted-foreground tracking-tight">
                                                            {item.title}
                                                        </h3>
                                                        <p className="text-xs text-zinc-400 leading-normal">
                                                            {item.description}
                                                        </p>
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
    )
}