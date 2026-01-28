import {Card, CardContent} from "@/components/ui/card"
import {cn} from "@/lib/utils"
import React from "react";

interface StatCardProps {
    label: string;
    value: string;
    subLabel: string;
    icon: React.ReactNode;
    trendColor?: string;
    footerText?: string;
}

export function StatCard({label, value, subLabel, icon, trendColor, footerText}: StatCardProps) {
    return (
        <Card
            className="py-0 border-[#DFE1E7] dark:border-zinc-800 shadow-none rounded-md bg-white dark:bg-zinc-900/50">
            <CardContent className="py-8 px-6 flex flex-col justify-between h-[153px]">
                <div className="flex justify-between flex-wrap items-start gap-3">
                    <span className="text-base xl:text-lg font-bold text-blacktracking-wider  uppercase">{label}</span>
                    <div className="flex items-center gap-3">
                        <span className={cn("text-[15px] font-bold text-[6D6D6D]", trendColor)}>{subLabel}</span>
                        {icon}
                    </div>
                </div>
                <div className="space-y-1">
                    <h3 className="text-3xl font-bold text-black dark:text-zinc-50 tracking-tight">{value}</h3>
                    {footerText &&
                        <p className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase">{footerText}</p>}
                </div>
            </CardContent>
        </Card>
    )
}