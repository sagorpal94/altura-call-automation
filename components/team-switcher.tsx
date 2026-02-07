"use client"

import * as React from "react"
import {
    SidebarMenu,
    SidebarMenuItem,
    SidebarTrigger,
    useSidebar,
} from "@/components/ui/sidebar"
import type {LucideIcon} from "lucide-react"
import {Icons} from "@/components/icons"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"

interface TeamSwitcherTeams {
    name: string
    logo: LucideIcon | React.ComponentType<any>
    plan: string
}

export function TeamSwitcher({teams}: { teams: TeamSwitcherTeams[] }) {
    const [activeTeam] = React.useState(teams[0])
    const {state} = useSidebar()
    const isCollapsed = state === "collapsed"

    if (!activeTeam) return null

    return (
        <SidebarMenu>
            <SidebarMenuItem className="relative flex flex-col">
                {/* Logo + Trigger Row */}
                <div
                    className="relative flex items-center justify-between w-full h-12 mb-6 transition-all duration-300">
                    {isCollapsed && <div
                        className="text-sidebar-primary-foreground hidden md:flex aspect-square size-8 items-center justify-center rounded-lg">
                        <activeTeam.logo className="text-sidebar-primary"/>
                    </div>}
                    {!isCollapsed && (
                        <div className="flex justify-center text-center text-sm leading-tight">
                            <Icons.logo className="size-36"/>
                        </div>
                    )}

                    <div className="flex md:hidden justify-center text-center text-sm leading-tight">
                        <Icons.logo className="size-36"/>
                    </div>


                    <div className={`absolute hidden md:block  right-[-14px] ${isCollapsed ? "top-9.5" : "top-1"} `}>
                        <SidebarTrigger
                            className="h-7 w-7 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all"/>
                    </div>
                </div>

                {/* User Info */}
                <div className="flex items-center gap-3 my-8">
                    <Avatar className="h-8 w-8 rounded-md border">
                        <AvatarImage src="/images/user-image.png" alt="Admin"/>
                        <AvatarFallback className="rounded-md">CA</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col text-sm leading-tight group-data-[collapsible=icon]:hidden">
                        <span className="font-semibold">E-commerce Admin</span>
                        <span className="text-xs text-muted-foreground">Carlos</span>
                    </div>
                </div>

                {/* Status */}
                <div className="group-data-[collapsible=icon]:hidden">
                    <div
                        className="flex items-center gap-2 rounded-md bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700">
                        <span className="relative flex h-2 w-2">
                          <span
                              className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"/>
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"/>
                        </span>
                        Activo
                    </div>
                </div>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
