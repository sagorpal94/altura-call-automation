"use client"

import React from "react"
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts"
import { Card, CardContent } from "@/components/ui/card"

// --- DATA ---
const barData = [
    { name: "Billing Support", value: 85 },
    { name: "Integration Setup", value: 35 },
    { name: "API Rate Limits", value: 88 },
    { name: "Feature Request", value: 38 },
    { name: "Voice Latency", value: 78 },
]

const sentimentData = [
    { name: "Positive", value: 30, color: "#c0b000" },
    { name: "Neutral", value: 20, color: "#fdf027" },
    { name: "Negative", value: 35, color: "#8a7c00" },
    // { name: "Other", value: 15, color: "#e5e5e5" }, // Padding for the visual gap
]

const outcomeData = [
    { name: "Successful", value: 65, color: "#c0b000" },
    { name: "Errors", value: 15, color: "#fdf027" },
    { name: "Pending", value: 20, color: "#8a7c00" },
]

// --- CUSTOM COMPONENTS ---

// Custom Label for Donut Charts (White circles with percentages)
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, value }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.1;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    if (value === 0 || percent < 0.05) return null; // Don't show tiny values

    return (
        <g>
            <circle cx={x} cy={y} r="18" fill="white" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.1))" />
            <text x={x} y={y} fill="#18181b" textAnchor="middle" dominantBaseline="central" className="text-[11px] font-bold">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        </g>
    );
};

export default function AnalyticsCharts() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">

            {/* --- TRENDING TOPICS (BAR CHART) --- */}
            <Card className="border-[#DFE1E7] py-0 shadow-none rounded-md">
                <CardContent className="p-8">
                    <div className="mb-8">
                        <h2 className="text-[22px] font-medium text-zinc-900 dark:text-muted-foreground">Trending Topics</h2>
                        <p className="text-zinc-300 text-sm">Most frequently mentioned keywords in conversation</p>
                    </div>

                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                                <CartesianGrid vertical={false} stroke="#f0f0f0" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#18181b", fontSize: 10, fontWeight: 500 }}
                                    interval={0}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#9ca3af", fontSize: 13 }}
                                    ticks={[0, 20, 50, 80, 100]}
                                    tickFormatter={(val) => `${val}%`}
                                />
                                <Bar
                                    dataKey="value"
                                    fill="#c0b000"
                                    radius={[0, 0, 0, 0]}
                                    barSize={32}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* --- KEY INTERACTIONS (DONUT CHARTS) --- */}
            <Card className="border-[#DFE1E7] py-0 shadow-none rounded-md">
                <CardContent className="p-5">
                    <div className="mb-4">
                        <h2 className="text-[22px] font-medium text-zinc-900 dark:text-muted-foreground">Key Interactions</h2>
                        <p className="text-zinc-400 text-sm">Sentiment and Outcome Analysis</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-around h-[300px] mt-4">
                        {/* Sentiment Donut */}
                        <div className="relative h-full w-full max-w-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={sentimentData}
                                        innerRadius={60}
                                        outerRadius={85}
                                        paddingAngle={5}
                                        dataKey="value"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        stroke="none"
                                    >
                                        {sentimentData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            {/* Custom Legend for Sentiment */}
                            <div className="mt-4 flex flex-col gap-3">
                                <div className="flex items-center gap-3 text-sm font-bold text-[#2d3648] dark:text-muted-foreground">
                                    <div className="w-3 h-3 rounded-full bg-[#3d4760]" /> Positive
                                </div>
                                <div className="flex items-center gap-3 text-sm font-bold text-[#2d3648] dark:text-muted-foreground">
                                    <div className="w-3 h-3 rounded-full bg-[#3d4760]" /> Negative
                                </div>
                                <div className="flex items-center gap-3 text-sm font-bold text-[#2d3648] dark:text-muted-foreground">
                                    <div className="w-3 h-3 rounded-full bg-[#3d4760]" /> Neutral
                                </div>
                            </div>
                        </div>

                        {/* Outcome Donut */}
                        <div className="relative h-full w-full max-w-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={outcomeData}
                                        innerRadius={60}
                                        outerRadius={85}
                                        paddingAngle={5}
                                        dataKey="value"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        stroke="none"
                                    >
                                        {outcomeData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            {/* Custom Legend for Outcome */}
                            <div className="mt-4 flex flex-col gap-3 justify-center ">
                                <div className="flex items-center gap-3 text-base font-bold text-[#18181b] dark:text-muted-foreground">
                                    <div className="w-3 h-3 rounded-full bg-[#c0b000]" /> Successful
                                </div>
                                <div className="flex items-center gap-3 text-base font-bold text-[#18181b] dark:text-muted-foreground">
                                    <div className="w-3 h-3 rounded-full bg-[#c0b000]" /> Errors
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}