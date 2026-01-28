"use client"

import * as React from "react"
import {
    DropdownMenu,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar"
import type {LucideIcon} from "lucide-react";
import {Icons} from "@/components/icons";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

interface TeamSwitcherTeams {
    name: string
    logo: LucideIcon | React.ComponentType
    plan: string
}

export function TeamSwitcher({teams}: { teams: TeamSwitcherTeams[] }) {
    const [activeTeam] = React.useState(teams[0])
    const {state} = useSidebar()
    const isCollapsed = state === "collapsed"

    if (!activeTeam) {
        return null
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground justify-center"
                        >
                            {isCollapsed && <div
                                className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                <activeTeam.logo className="text-sidebar-primary"/>
                            </div>}
                            {!isCollapsed && (
                                <div className="flex justify-center text-center text-sm leading-tight">
                                    <Icons.logo className="size-36"/>
                                </div>
                            )}
                            {/*<ChevronsUpDown className="ml-auto" />*/}
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                </DropdownMenu>

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

                <div className=" group-data-[collapsible=icon]:hidden">
                    <div
                        className="flex items-center gap-2 rounded-md bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700">
                        <span className="relative flex h-2 w-2">
                          <span
                              className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                        </span>
                        Activo
                    </div>
                </div>

            </SidebarMenuItem>
        </SidebarMenu>
    )
}
