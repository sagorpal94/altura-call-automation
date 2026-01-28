"use client"

import React from "react"
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"
import {Card, CardContent} from "@/components/ui/card"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

// Mock data to match the visual curve in the image
const data = [
    {name: "Jan", value: 45000},
    {name: "Feb", value: 25000},
    {name: "Mar", value: 32000},
    {name: "Apr", value: 31000},
    {name: "May", value: 30000},
    {name: "Jun", value: 40000},
    {name: "Jul", value: 28000},
    {name: "Ago", value: 42000},
    {name: "Sep", value: 50000},
    {name: "Oct", value: 55000},
    {name: "Nov", value: 40000},
    {name: "Dec", value: 35000},
]

// Custom Tooltip Component - Matches the image exactly
const CustomTooltip = ({active, payload}: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-4 rounded-2xl shadow-xl border border-zinc-100 min-w-[180px]">
                <p className="text-zinc-400 text-sm mb-2 font-medium">March 10, 2025</p>
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-400 rounded-sm"/>
                        <span className="text-zinc-500 font-medium">Income</span>
                    </div>
                    <span className="text-zinc-900 font-bold">: $28,520.20</span>
                </div>
            </div>
        )
    }
    return null
}

export default function CallVolumeChart() {
    return (
        <Card className="border-[#DFE1E7] shadow-none py-0 rounded-md bg-white overflow-hidden">
            <CardContent className="p-6">

                {/* --- HEADER SECTION --- */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                    <div>
                        <h2 className="text-[22px] font-bold text-[#1E1E1E] dark:text-muted-foreground">Call Volume
                            History</h2>
                        <p className="text-zinc-400 text-sm">Global call traffic over the selected timeline</p>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* The Legend Item */}
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-[#e2dc00] rounded-sm"/>
                            <span className="text-sm font-medium text-zinc-500">Interval: Daily</span>
                        </div>

                        {/* The New Select Component */}
                        <Select defaultValue="monthly">
                            <SelectTrigger
                                className="w-[110px] h-9 border-zinc-300 rounded-lg text-sm font-medium focus:ring-0 shadow-none">
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* --- CHART SECTION --- */}
                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{top: 10, right: 10, left: -20, bottom: 0}}>
                            <defs>
                                {/* Gradient Fill under the line */}
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#fdf027" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#fdf027" stopOpacity={0}/>
                                </linearGradient>
                            </defs>

                            {/* Horizontal Grid Lines only */}
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="#e5e5e5"
                            />

                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{fill: "#9ca3af", fontSize: 12}}
                                dy={15}
                            />

                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{fill: "#9ca3af", fontSize: 12}}
                                ticks={[0, 10000, 20000, 30000, 40000, 50000]}
                                tickFormatter={(value) => (value === 0 ? "0" : `${value / 1000}k`)}
                            />

                            <Tooltip
                                content={<CustomTooltip/>}
                                cursor={{stroke: '#71717a', strokeWidth: 1, strokeDasharray: '4 4'}}
                            />

                            <Area
                                type="monotone" // Creates the smooth curve
                                dataKey="value"
                                stroke="#fdf027" // Brand Yellow
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorValue)"
                                activeDot={{r: 6, fill: "#fdf027", stroke: "#fff", strokeWidth: 2}}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}