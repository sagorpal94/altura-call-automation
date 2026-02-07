import {
    Calendar,
    DollarSign,
    AreaChart,
    Clock,
    ChevronDown,
    TrendingUp,
    BarChart3
} from "lucide-react"
import {Card, CardContent} from "@/components/ui/card"
import {cn} from "@/lib/utils"
import FilterSection from "@/components/analytics/filter-section";
import OptimizationCard from "@/components/analytics/optimization-card";
import CallVolumeChart from "@/components/analytics/call-volume-chart";
import AnalyticsCharts from "@/components/analytics/analytics-charts";

const stats = [
    {
        label: "TOTAL CALLS",
        value: "12",
        change: null, // No change shown in image
        icon: <DollarSign className="h-4 w-4"/>,
        trendColor: ""
    },
    {
        label: "SUCCESS RATE",
        labelColor: "text-[#929EAE]",
        value: "58%",
        change: "+0.8%",
        icon: <BarChart3 className="h-4 w-4"/>,
        trendColor: "text-[#7DD1AF]"
    },
    {
        label: "AVG DURATION",
        value: "00:10",
        change: "+12.5%",
        icon: <AreaChart className="h-4 w-4"/>,
        trendColor: "text-[#FEEC04]"
    },
    {
        label: "TOTAL COST",
        value: "$809.65",
        change: "-2%",
        icon: <TrendingUp className="h-4 w-4"/>,
        trendColor: "text-[#F11818]"
    }
]
export default async function AnalyticsPage({
                                          searchParams,
                                      }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    // URL থেকে বর্তমান preset এবং range এর ভ্যালুগুলো নিন
    const params = await searchParams;
    const preset = (params.preset as string) || "6M";
    const from = params.from as string;
    const to = params.to as string;

    // এখানে আপনি চাইলে API call করতে পারেন এই ডেটগুলো দিয়ে
    // const data = await getAnalyticsData(from, to, preset);
    return (
        <div className="flex flex-col gap-5 font-[Space_Grotesk]">

            {/* --- HEADER SECTION --- */}
            <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                    Hola, Carlos <span className="text-3xl">👋🏼</span>
                </h1>
                <p className="mt-2 max-w-2xl text-lg text-gray-500 dark:text-gray-400">
                    Deep insights into your call performance, customer sentiment, and ROI metrics.
                </p>
            </div>

            <FilterSection
                defaultPreset={preset}
                defaultFrom={from}
                defaultTo={to}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <Card key={index} className="border-[#DFE1E7] py-8 rounded-md shadow-none overflow-hidden">
                        <CardContent className="px-8 flex flex-col justify-between">

                            {/* Card Header: Label + Icon */}
                            <div className="flex justify-between items-start">
                                <span
                                    className={`text-lg  tracking-wider ${stat.labelColor ? stat.labelColor : "text-black dark:text-muted-foreground"}`}>
                                  {stat.label}
                                </span>
                                <div className="border border-zinc-200 rounded-lg p-1.5">
                                    {stat.icon}
                                </div>
                            </div>

                            {/* Card Body: Value + Trend */}
                            <div className="space-y-1">
                                <h2 className="text-3xl font-bold text-black dark:text-muted-foreground tracking-tight">
                                    {stat.value}
                                </h2>
                                {stat.change && (
                                    <p className={cn("text-[15px] font-bold", stat.trendColor)}>
                                        {stat.change}
                                    </p>
                                )}
                            </div>

                        </CardContent>
                    </Card>
                ))}
            </div>

            <OptimizationCard/>

            <CallVolumeChart/>

            <AnalyticsCharts/>

        </div>
    )
}