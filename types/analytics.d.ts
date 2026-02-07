import React from "react";

export interface PageProps {
    searchParams: {
        startDate?: string;
        endDate?: string;
    }
}

export interface StatItem {
    id: string;
    title: string;
    value: string;
    icon: React.ReactNode;
    iconColorClass: string;  // e.g., "text-blue-500"
    trend: string;           // e.g., "+12%"
    trendColorClass: string; // e.g., "bg-emerald-500/10 text-emerald-500"
}

export interface TopicData {
    label: string;
    percentage: number;
    width: string; // Used for the CSS width property
}

export interface LegendItemProps {
    color: string;
    label: string;
    percentage: number;
}

export interface AiInsightsCardProps {
    title?: string;
    badgeText?: string;
    content: React.ReactNode;
    recommendation?: string;
}