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