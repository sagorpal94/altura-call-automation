"use client"

import {
    type LucideIcon,
} from "lucide-react"

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link";
import React from "react";
import {Collapsible} from "@/components/ui/collapsible";
import {usePathname} from "next/navigation";

interface NavItem {
    label: string
    url: string,
    isActive?: boolean,
    icon: LucideIcon | React.ComponentType
}

export function NavProjects({projects}: { projects: NavItem[] }) {
    const pathname = usePathname();

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarMenu>
                {projects.map((item) => {
                    const isActive = item.url === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.url);
                    return (
                        <Collapsible
                            key={item.label}
                            asChild
                            defaultOpen={isActive}
                            className="group/collapsible"
                        >
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    tooltip={item.label}
                                    isActive={isActive}
                                >
                                    <Link href={item.url}>
                                        <item.icon/>
                                        <span>{item.label}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </Collapsible>
                    )
                })}
            </SidebarMenu>
        </SidebarGroup>
    )
}
