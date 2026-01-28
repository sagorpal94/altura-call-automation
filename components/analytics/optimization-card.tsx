import React from "react";
import {AudioWaveform, Sparkles} from "lucide-react";
import {Card, CardContent} from "@/components/ui/card";
import {cn} from "@/lib/utils";

export default function OptimizationCard() {
    return (
        <Card className="border-[#DFE1E7] py-7 shadow-none rounded-md overflow-hidden ">
            <CardContent className="px-[24px] space-y-6">

                {/* --- HEADER SECTION --- */}
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        {/* Yellow Waveform Icon */}
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#b6b000] text-white">
                            <AudioWaveform className="h-6 w-6"/>
                        </div>
                        <h2 className="text-[32px] font-bold text-neutral-900 dark:text-muted-foreground tracking-tight">
                            Optimization Suggestions
                        </h2>
                    </div>

                    {/* "Updated Just Now" Badge */}
                    <div
                        className="hidden sm:block px-[17px] py-2 rounded-sm border border-[#BBAE00] bg-[#FEF8AB] text-[16px] font-semibold text-[#BBAE00]">
                        Updated Just Now
                    </div>
                </div>

                {/* --- MAIN INSIGHT TEXT --- */}
                <p className="text-[22px] font-medium text-zinc-900 dark:text-muted-foreground leading-relaxed">
                    Based on the 4,529 interactions analyzed in this period, we&apos;ve detected a{" "}
                    <span className="text-[#FF383C]">15% increase</span> in mentions related to{" "}
                    <span className="text-[#BBAE00]">&quot;API Rate Limits&quot;</span>.
                </p>

                {/* --- ACTION RECOMMENDATION BOX --- */}
                <div className="rounded-md border border-[#DFE1E7] bg-zinc-50/30 p-4 space-y-2">
                    <div className="flex items-center gap-2 text-[#BBAE00]">
                        <Sparkles className="h-5 w-5"/>
                        <h4 className="text-2xl font-bold">Action Recommendation</h4>
                    </div>
                    <p className="text-[#0E121B] dark:text-muted-foreground text-xl leading-snug">
                        Consider reviewing your enterprise tier throughput settings or updating your agent instructions
                        to handle temporary delays with specific troubleshooting steps.
                    </p>
                </div>

            </CardContent>
        </Card>
    );
}