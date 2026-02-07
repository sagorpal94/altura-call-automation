import GoogleSheetsSection from "@/components/tools/edit/GoogleSheetsSection";
import CalendarSection from "@/components/tools/edit/CalendarSection";
import GoHighLevelSection from "@/components/tools/edit/GoHighLevelSection";
import HangupSection from "@/components/tools/edit/HangupSection";
import KnowledgeQuerySection from "@/components/tools/edit/KnowledgeQuerySection";
import SlackAlertSection from "@/components/tools/edit/SlackAlertSection";
import {FieldValues, UseFormReturn} from "react-hook-form";
import {JSX} from "react";

// type ToolSectionComponent = <TForm extends FieldValues>(props: { form: UseFormReturn<TForm> }) => JSX.Element | null;

type RegistryItem = {
    type: string;
    title: string;
    Section: any;
    // Section: ToolSectionComponent;
    toForm: (tool: any) => any;
    fromForm: (values: any) => any;
    lockType?: boolean;
};

export const TOOL_REGISTRY = {
    "Google-sheets": {
        type: "Google-sheets",
        title: "Google Sheets",
        Section: GoogleSheetsSection,
        lockType: true,
        toForm: (tool: any) => ({
            toolType: "Google-sheets",
            toolName: tool.name ?? "",
            icon: tool.icon ?? "🛠️",
            description: tool.description ?? "",
            spreadsheetId: tool.spreadsheetId ?? "",
            range: tool.range ?? "",
            messages: tool.messages ?? [],
        }),
        fromForm: (v: any) => ({
            name: v.toolName,
            icon: v.icon,
            description: v.description,
            spreadsheetId: v.spreadsheetId,
            range: v.range,
            messages: v.messages,
        }),
    },

    "G-Calendar": {
        type: "G-Calendar",
        title: "Google Calendar",
        Section: CalendarSection,
        lockType: true,
        toForm: (tool: any) => ({
            toolType: "G-Calendar",
            toolName: tool.name ?? "",
            icon: tool.icon ?? "🛠️",
            description: tool.description ?? "",
            calendarId: tool.calendarId ?? "",
            timezone: tool.timezone ?? "UTC",
            messages: tool.messages ?? [],
        }),
        fromForm: (v: any) => ({
            name: v.toolName,
            icon: v.icon,
            description: v.description,
            calendarId: v.calendarId,
            timezone: v.timezone,
            messages: v.messages,
        }),
    },

    "Go-High-Level": {
        type: "Go-High-Level",
        title: "GoHighLevel",
        Section: GoHighLevelSection,
        lockType: true,
        toForm: (tool: any) => ({
            toolType: "Go-High-Level",
            toolName: tool.name ?? "",
            icon: tool.icon ?? "🛠️",
            description: tool.description ?? "",
            calendarId: tool.calendarId ?? "",
            messages: tool.messages ?? [],
        }),
        fromForm: (v: any) => ({
            name: v.toolName,
            icon: v.icon,
            description: v.description,
            calendarId: v.calendarId,
            messages: v.messages,
        }),
    },

    "end-call": {
        type: "end-call",
        title: "Hang Up",
        Section: HangupSection,
        lockType: true,
        toForm: (tool: any) => ({
            toolType: "end-call",
            toolName: tool.name ?? "",
            icon: tool.icon ?? "🛠️",
            description: tool.description ?? "",
            messages: tool.messages ?? [],
        }),
        fromForm: (v: any) => ({
            name: v.toolName,
            icon: v.icon,
            description: v.description,
            messages: v.messages,
        }),
    },

    "Query": {
        type: "Query",
        title: "Knowledge Query",
        Section: KnowledgeQuerySection,
        lockType: true,
        toForm: (tool: any) => ({
            toolType: "Query",
            toolName: tool.name ?? "",
            icon: tool.icon ?? "🛠️",
            description: tool.description ?? "",
            toolModel: tool.model ?? "gemini-2.0-flash",
            files: tool.files ?? [],
            messages: tool.messages ?? [],
        }),
        fromForm: (v: any) => ({
            name: v.toolName,
            icon: v.icon,
            description: v.description,
            model: v.toolModel,
            files: v.files,
            messages: v.messages,
        }),
    },

    "Slack-Alert": {
        type: "Slack-Alert",
        title: "Slack Alert",
        Section: SlackAlertSection,
        lockType: true,
        toForm: (tool: any) => ({
            toolType: "Slack-Alert",
            toolName: tool.name ?? "",
            icon: tool.icon ?? "🛠️",
            description: tool.description ?? "",
            channelId: tool.channelId ?? "",
            actionType: tool.actionType ?? "send-message",
            messages: tool.messages ?? [],
        }),
        fromForm: (v: any) => ({
            name: v.toolName,
            icon: v.icon,
            description: v.description,
            channelId: v.channelId,
            actionType: v.actionType,
            messages: v.messages,
        }),
    },
} satisfies Record<string, RegistryItem>;

export type ToolType = keyof typeof TOOL_REGISTRY;
