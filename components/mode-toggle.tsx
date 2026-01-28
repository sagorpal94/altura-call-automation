"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Icons } from "@/components/icons"

export function ModeToggle() {
    const { setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    // 1. Wait until the component is mounted on the client
    React.useEffect(() => {
        setMounted(true)
    }, [])

    // 2. Prevent hydration mismatch by returning a placeholder or null
    // until we are sure we are on the client
    if (!mounted) {
        // Return an empty div with the same size to prevent layout shift
        return <div className="h-4 w-4" />
    }

    return (
        <div
            className="flex items-center gap-1 text-sm font-medium text-gray-500 "
            // Toggle based on current state
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
            {/* 3. Use 'resolvedTheme' to handle 'system' preference correctly */}
            {resolvedTheme === "dark" ? (
                <Icons.darkIcon className="h-4 w-4 cursor-pointer"/>
            ) : (
                <Icons.moonIcon className="h-4 w-4 cursor-pointer"/>
            )}
        </div>
    )
}