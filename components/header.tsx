"use client"
import React from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import {Separator} from "@/components/ui/separator"
import {SidebarTrigger} from "@/components/ui/sidebar";
import {Icons} from "@/components/icons";
import {usePathname} from "next/navigation";
import {ModeToggle} from "@/components/mode-toggle";
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {ScrollArea} from "@/components/ui/scroll-area";

const pageTitles: Record<string, string> = {
    "/": "Agents Workshop",
    "/create-agent": "Agents Workshop",
    "/tools": "Tools",
    "/phone-numbers": "Phone Numbers",
    "/voice-studio": "Voice Studio",
    "/api-keys": "API Keys",
    "/integrations": "Integrations",
    "/analytics": "Analytics",
    "/settings": "Settings",
    "/admin": "Admin Panel",
};

const notifications = [
    {
        id: 1,
        title: "Call Completed",
        description: "Sarah Support finished a 5m call. Sentiment: Positive.",
        time: "2m ago",
        color: "bg-emerald-500",
    },
    {
        id: 2,
        title: "Appointment Booked",
        description: "Max Market scheduled a demo for Tomorrow at 10 AM.",
        time: "15m ago",
        color: "bg-blue-500",
    },
    {
        id: 3,
        title: "System Update",
        description: "Gemini 2.5 Flash is now faster in your region.",
        time: "1h ago",
        color: "bg-blue-500",
    },
    {
        id: 4,
        title: "Line Alert",
        description: "High latency detected on +1 (800) line.",
        time: "3h ago",
        color: "bg-amber-500",
    },
];


const Header = () => {
    const pathname = usePathname();
    const currentTitle = pageTitles[pathname];

    return (
        <header
            className="w-full sticky top-0 z-10 flex justify-between items-center h-16 shrink-0 gap-2 border-b  px-4 bg-background dark:bg-zinc-950 dark:border-zinc-800 transition-colors transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
            // className="px-4 flex justify-between sticky top-0 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
        >
            <div className="flex items-center gap-2 ">
                <div className="flex items-center gap-1 md:hidden">
                    <SidebarTrigger className="-ml-1"/>
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                </div>
                <Icons.headerHome/>
                <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-muted-foreground">
                                {currentTitle}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            {/* Right side Header Icons */}
            <div className="ml-auto flex items-center gap-4">
                <ModeToggle/>
                <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                    <Icons.web className="h-4 w-4 text-gray-500"/>
                    <span>EN</span>
                    <span
                        className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-400 px-1 rounded text-xs">
                            ES
                        </span>
                </div>
                {/**/}
                <div className="relative">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                className="cursor-pointer p-2 rounded-lg transition-colors relative text-slate-600 hover:text-slate-900 hover:bg-slate-100">
                                <Icons.notificationIcon className="cursor-pointer  text-foreground"/>
                                <span
                                    className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                            </button>
                        </DropdownMenuTrigger>

                        {/* Dropdown Content */}
                        <DropdownMenuContent
                            align="end"
                            className="w-80 p-0 rounded-2xl overflow-hidden bg-white border-slate-200 shadow-2xl"
                        >
                            {/* Header */}
                            <div className="px-4 py-3 border-b flex justify-between items-center bg-slate-50">
                                <h4 className="font-bold text-sm text-slate-900">Notifications</h4>
                                <button
                                    className="cursor-pointer text-[10px] uppercase font-black text-blue-500 hover:underline transition-all">
                                    Mark all read
                                </button>
                            </div>

                            {/* Scrollable List */}
                            <ScrollArea className="max-h-[400px] overflow-y-auto custom-scrollbar">
                                <div className="flex flex-col">
                                    {notifications.map((item) => (
                                        <div
                                            key={item.id}
                                            className="p-4 border-b border-slate-100 bg-white hover:bg-slate-50 transition-colors relative group cursor-pointer"
                                        >
                                            <div className="flex gap-3">
                                                {/* Status Dot */}
                                                <div
                                                    className={`w-2 h-2 mt-1.5 shrink-0 rounded-full ${item.color}`}
                                                />

                                                {/* Content */}
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start gap-2">
                                                        <h5 className="text-xs font-black leading-tight text-slate-900">
                                                            {item.title}
                                                        </h5>
                                                        <span className="text-[9px] text-slate-500 whitespace-nowrap">
                        {item.time}
                      </span>
                                                    </div>
                                                    <p className="text-[11px] leading-relaxed mt-0.5 text-slate-600">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
};

export default Header;