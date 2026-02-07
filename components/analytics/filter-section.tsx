"use client"

import * as React from "react"
import { format, subDays, subMonths, startOfYear, parseISO } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { useRouter, usePathname, useSearchParams } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export type PresetKey = "XTD" | "6M" | "3M" | "30D" | "7D" | "CUSTOM"

const getRangeFromPreset = (key: Exclude<PresetKey, "CUSTOM">): DateRange => {
    const to = new Date()
    let from = new Date()
    switch (key) {
        case "7D": from = subDays(to, 7); break
        case "30D": from = subDays(to, 30); break
        case "3M": from = subMonths(to, 3); break
        case "6M": from = subMonths(to, 6); break
        case "XTD": from = startOfYear(to); break
    }
    return { from, to }
}

type FilterSectionProps = {
    defaultPreset?: string
    defaultFrom?: string
    defaultTo?: string
    className?: string
}

export default function FilterSection({
                                          defaultPreset = "XTD",
                                          defaultFrom,
                                          defaultTo,
                                          className,
                                      }: FilterSectionProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [range, setRange] = React.useState<DateRange | undefined>(() => {
        if (defaultFrom && defaultTo) {
            return { from: parseISO(defaultFrom), to: parseISO(defaultTo) }
        }
        return getRangeFromPreset(defaultPreset as any)
    })
    const [activePreset, setActivePreset] = React.useState<string>(defaultPreset)
    const [open, setOpen] = React.useState(false)

    const updateURL = (newRange: DateRange | undefined, newPreset: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (newPreset) params.set("preset", newPreset)
        if (newRange?.from) params.set("from", newRange.from.toISOString())
        if (newRange?.to) params.set("to", newRange.to.toISOString())
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }

    const rangeLabel = React.useMemo(() => {
        if (!range?.from) return "Select date"
        if (!range.to) return format(range.from, "MMM d, yyyy")
        return `${format(range.from, "MMM d")} - ${format(range.to, "MMM d, yyyy")}`
    }, [range])

    const handlePresetChange = (key: string) => {
        if (!key || key === "CUSTOM") return
        const newPreset = key as Exclude<PresetKey, "CUSTOM">
        const newRange = getRangeFromPreset(newPreset)
        setRange(newRange)
        setActivePreset(newPreset)
        updateURL(newRange, newPreset)
    }

    return (
        <div className={cn("flex items-center justify-end gap-2", className)}>

            {/* Left: Selected Date Display (Black Background) */}
            <div className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-lg">
                <CalendarIcon className="h-4 w-4" />
                <span className="text-sm font-medium whitespace-nowrap">{rangeLabel}</span>
            </div>

            {/* Middle: Presets (White with Border, Active is Black) */}
            <ToggleGroup
                type="single"
                value={activePreset}
                onValueChange={handlePresetChange}
                className="flex gap-2"
            >
                {(["XTD", "6M", "3M", "30D", "7D"] as const).map((k, index,array) => (
                    <ToggleGroupItem
                        key={k}
                        value={k}
                        className={cn(
                            "h-10 px-4 text-sm font-semibold rounded-xl border border-gray-200 bg-white transition-all",
                            "data-[state=on]:bg-black data-[state=on]:text-white data-[state=on]:border-black",
                            "hover:bg-gray-50",
                            // প্রথম বাটন
                            index === 0 && "rounded-l-xl rounded-r-md",

                            // মাঝখানের বাটনগুলো
                            index > 0 && index < array.length - 1 && "!rounded-md",

                            // শেষ বাটন
                            index === array.length - 1 && "rounded-r-xl rounded-l-md"
                        )}
                    >
                        {k}
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>

            {/* Right: Custom Date Range Button */}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="h-10 px-4 bg-white border-gray-200 text-black font-semibold rounded-lg hover:bg-gray-50 flex gap-2"
                    >
                        <CalendarIcon className="h-4 w-4" />
                        Date range
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-auto p-0 rounded-xl overflow-hidden shadow-2xl border-gray-200">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={range?.from}
                        selected={range}
                        onSelect={(r) => {
                            setRange(r)
                            setActivePreset("CUSTOM")
                        }}
                        numberOfMonths={2}
                        className="p-3"
                    />
                    <div className="p-3 border-t flex justify-end">
                        <Button
                            size="sm"
                            onClick={() => {
                                updateURL(range, "CUSTOM")
                                setOpen(false)
                            }}
                            className="bg-black text-white rounded-md px-6 hover:bg-zinc-800"
                        >
                            Apply
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}