"use client"
import React, {useState} from 'react';
import {Calendar} from "lucide-react";
import {cn} from "@/lib/utils";

const filters = ["7D", "30D", "3M", "6M", "YTD"]
const FilterSection = () => {
    const [activeFilter, setActiveFilter] = useState("YTD")
    return (
        <>
            <div className="flex flex-col md:flex-row-reverse items-start md:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                    {/* Active Date Range Display */}
                    <div
                        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl text-sm  cursor-pointer">
                        <Calendar className="h-4 w-4"/>
                        <span>May 1 - May 31, 2025</span>
                    </div>

                    {/* Quick Filters */}
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={cn(
                                "px-4 py-2 rounded-lg text-sm transition-all border",
                                activeFilter === filter
                                    ? "bg-black text-white border-black"
                                    : "bg-white text-zinc-900 border-zinc-200 hover:bg-zinc-50"
                            )}
                        >
                            {filter}
                        </button>
                    ))}

                    {/* Custom Date Range Picker Button */}
                    <button
                        className="flex items-center gap-2 bg-white text-zinc-900 border border-zinc-200 px-4 py-2 rounded-xl text-sm hover:bg-zinc-50">
                        <Calendar className="h-4 w-4"/>
                        <span>Date range</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default FilterSection;