import { z } from "zod";

/**
 * Shared types for Edit
 */
const MessageConditionSchema = z.object({
    parameter: z.string().optional().default(""),
    operator: z.enum(["equal", "not-equal"]).optional().default("equal"),
    value: z.string().optional().default(""),
});

const MessageSchema = z.object({
    type: z.string().optional().default("Request Start"),
    option: z.enum(["default", "none", "custom"]).optional().default("default"),
    waitForMessage: z.boolean().optional().default(false),
    conditions: z.array(MessageConditionSchema).optional().default([{ parameter: "", operator: "equal", value: "" }]),
});

const BaseEditToolSchema = z.object({
    toolId: z.string().optional(), // edit context (optional)
    toolName: z.string().min(1, "Tool Name is required"),
    toolType: z.string().min(1, "Tool Type is required"),
    icon: z.string().optional().default("🛠️"),
    description: z.string().max(1000).optional().default(""),
    messages: z.array(MessageSchema).optional().default([]),
});

/**
 * 1) Google Sheets Edit Schema
 */
const EditGoogleSheetsSchema = BaseEditToolSchema.extend({
    toolType: z.literal("Google-sheets"),
    spreadsheetId: z.string().min(1, "Spreadsheet ID is required"),
    range: z.string().min(1, "Range is required"),
});

/**
 * 2) G-Calendar Edit Schema
 */
const EditGCalendarSchema = BaseEditToolSchema.extend({
    toolType: z.literal("G-Calendar"),
    calendarId: z.string().min(1, "Calendar ID is required"),
    timezone: z.string().min(1, "Timezone is required").default("UTC"),
});

/**
 * 3) GoHighLevel Edit Schema
 */
const EditGoHighLevelSchema = BaseEditToolSchema.extend({
    toolType: z.literal("Go-High-Level"),
    calendarId: z.string().min(1, "Calendar ID is required"),
});

/**
 * 4) Hangup / End Call Edit Schema
 */
const EditHangupSchema = BaseEditToolSchema.extend({
    toolType: z.literal("end-call"),
    // no extra fields
});

/**
 * 5) Knowledge Query Edit Schema
 * Screenshot এ model + files আছে
 */
const EditKnowledgeQuerySchema = BaseEditToolSchema.extend({
    toolType: z.literal("Query"),
    toolModel: z.string().min(1, "Model is required").default("gemini-2.0-flash"),
    files: z.array(z.string()).optional().default([]), // file ids / filenames
});

/**
 * 6) Slack Alert Edit Schema
 */
const EditSlackAlertSchema = BaseEditToolSchema.extend({
    toolType: z.literal("Slack-Alert"),
    channelId: z.string().min(1, "Channel ID is required"),
    actionType: z.enum(["send-message", "send-summary"]).default("send-message"),
});

/**
 * ✅ Main Edit Schema
 */
export const editToolFormSchema = z.discriminatedUnion("toolType", [
    EditGoogleSheetsSchema,
    EditGCalendarSchema,
    EditGoHighLevelSchema,
    EditHangupSchema,
    EditKnowledgeQuerySchema,
    EditSlackAlertSchema,
]);

export type EditToolFormValues = z.infer<typeof editToolFormSchema>;
