import React from "react";

export interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export interface TabItem {
    id: string;
    label: string;
    icon: React.ReactNode;
}

export interface TabNavigationProps {
    tabs: TabItem[];
    activeTab: string;
    onTabChange: (id: string) => void;
}

export interface User {
    id: number;
    initials: string;
    name: string;
    email: string;
    role: "Admin" | "Member" | "Viewer";
    status: "Active" | "Pending";
}

export type InvoiceStatus = "Paid" | "Processing" | "Overdue";

export interface Invoice {
    id: string;
    date: string;
    amount: string;
    status: InvoiceStatus;
}