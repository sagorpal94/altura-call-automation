import React from 'react';

export interface RevenueStatItem {
    id: string;
    label: string;
    value: string;
    subtext: string;
    iconColorClass: string; // e.g., "text-emerald-500"
    icon: React.ReactNode;
}

export interface MetricItem {
    id: string;
    title: string;
    mainValue: string | number;
    badgeText: string;
    badgeColorClass: string; // e.g. "text-emerald-500"

    // Optional props for the Progress Bar variation
    percentage?: number;
    progressBarColorClass?: string; // e.g. "bg-emerald-500"

    // Optional props for the Text Footer variation
    footerText?: string;
}

export type AccountStatus = 'Active' | 'Suspended' | 'Pending';

export interface Account {
    id: string;
    name: string;
    company: string;
    email: string;
    revenue: string;
    tier: 'Enterprise' | 'Pro';
    successRate: string;
    callCount: number;
    status: AccountStatus;
}

export interface AccountRowProps {
    data: Account;
    onStatusToggle: (id: string) => void;
}

// types.ts or inside lib/data.ts
export interface AccountProfile {
    id: string;
    name: string;
    email: string;
    company: string;
    initials: string;
    plan: "Pro" | "Enterprise";
    status: "Active" | "Suspended";
    joinedDate: string;
    stats: {
        mtdRevenue: string;
        successRate: string;
        totalUsage: string;
    };
    logs: {
        id: number;
        title: string;
        description: string;
        time: string;
    }[];
}

