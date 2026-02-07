import * as z from "zod"

export const toolFormSchema = z.object({
    toolName: z.string().min(1, "Tool name is required"),
    toolType: z.string().default("Custom tool"),
    icon: z.string().default("🛠️"),
    toolModel: z.string().default("gemini-2.0-flash"),
    isAsync: z.boolean().default(false),
    isStrict: z.boolean().default(true),
    viewType: z.enum(["visual", "json"]).default("visual"),
    description: z.string().max(1000).optional(),
    serverUrl: z.string().url("Invalid URL").or(z.string().min(1)),
    timeout: z.coerce.number().min(1).max(300).default(20),

    requestUrl: z.string().url("Invalid URL").or(z.string().min(1, "URL is required")),
    httpMethod: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]).default("GET"),
    credential: z.object({
        mode: z.string().default("no-auth"),
    }).default({ mode: "no-auth" }),

    // --- Add Google Sheets Fields ---
    spreadsheetId: z.string().optional().or(z.literal("")),
    range: z.string().optional().or(z.literal("")),

    maxDurationSeconds: z.coerce.number().min(1).max(600).default(120),
    beep: z.boolean().default(true),
    transcription: z.boolean().default(true),
    reason: z.string().optional().or(z.literal("")),
    mcpProtocol: z.enum(["SHTTP", "SSE"]).default("SHTTP"),

    authType: z.string().default("no-auth"),
    // dynamic fields examples
    properties: z.array(z.any()).default([]),
    headers: z.array(z.object({
        key: z.string().min(1, "Key is required"),
        value: z.string().min(1, "Value is required")
    })).default([]),
    encryptedPaths: z.array(z.object({
        path: z.string().min(1, "Path is required")
    })).default([]),
    messages: z.array(z.object({
        type: z.string().default("Request Start"),
        option: z.enum(["default", "none", "custom"]).default("default"),
        waitForMessage: z.boolean().default(false),
        conditions: z.array(z.object({
            parameter: z.string(),
            operator: z.string().default("equal"),
            value: z.string()
        })).default([])
    })).default([]),
})

export type ToolFormValues = z.infer<typeof toolFormSchema>