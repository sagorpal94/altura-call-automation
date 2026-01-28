import React from "react";
import {AppSidebar} from "@/components/app-sidebar"

import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import {cookies} from "next/headers";
import Header from "@/components/header";

export default async function DashboardLayout({children}: { children: React.ReactNode }) {
    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

    return (
        <SidebarProvider defaultOpen={defaultOpen} className="h-screen overflow-hidden transition-colors duration-300 ">
            <AppSidebar/>
            <SidebarInset className="overflow-y-auto overflow-x-hidden">
                <Header/>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {children}
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
