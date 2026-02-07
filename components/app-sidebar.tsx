"use client"

import * as React from "react"

import {NavProjects} from "@/components/nav-projects"
import {NavUser} from "@/components/nav-user"
import {TeamSwitcher} from "@/components/team-switcher"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import {Icons} from "@/components/icons";

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Acme Inc",
            logo: Icons.logoIcon,
            plan: "Enterprise",
        },
    ],
}

const navItems = [
    {label: "Agents", url: "/", icon: Icons.agent, isActive: true,},
    {label: "Tools", url: "/tools", icon: Icons.toolsIcon},
    {label: "Phone Numbers", url: "/phone-numbers", icon: Icons.phoneNumberIcon},
    {label: "Voice Studio", url: "/voice-studio", icon: Icons.voiceStudio},
    {label: "API Keys", url: "/api-keys", icon: Icons.apiKeys},
    {label: "Integrations", url: "/integrations", icon: Icons.integrationIcon},
    {label: "Analytics", url: "/analytics", icon: Icons.analytics},
    {label: "Settings", url: "/settings", icon: Icons.settingsIcon},
    {label: "Admin", url: "/admin", icon: Icons.adminIcon},
];

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams}/>
            </SidebarHeader>
            <SidebarContent>
                {/*<NavMain items={data.navMain} />*/}
                <NavProjects projects={navItems}/>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user}/>
            </SidebarFooter>
            {/*<SidebarRail/>*/}
        </Sidebar>
    )
}
