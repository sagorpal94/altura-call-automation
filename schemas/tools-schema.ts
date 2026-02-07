// schemas/tool-schema.ts
import { z } from "zod";

/** Common sub-schemas */
const HeaderSchema = z.object({
    key: z.string().min(1, "Header key required"),
    value: z.string().min(1, "Header value required"),
});

const EncryptedPathSchema = z.object({
    path: z.string().min(1, "Path required"),
});

const ConditionSchema = z.object({
    parameter: z.string().min(1, "Parameter required"),
    operator: z.enum(["equal", "not-equal"]),
    value: z.string().min(1, "Value required"),
});

const MessageSchema = z.object({
    type: z.enum(["Request Start", "Request End", "Error", "Custom"]),
    option: z.enum(["default", "none", "custom"]),
    text: z.string().optional(), // when option === custom
    waitForMessage: z.boolean().default(false),
    conditions: z.array(ConditionSchema).default([]),
});

/** Parameters schema for custom-tool (simple version: key/type/required/desc) */
const ToolParameterSchema = z.object({
    name: z.string().min(1, "Parameter name required"),
    type: z.enum(["string", "number", "boolean", "object", "array"]).default("string"),
    required: z.boolean().default(false),
    description: z.string().optional(),
});

const KnowledgeBaseSchema = z.object({
    name: z.string().regex(/^[A-Za-z][A-Za-z0-9_]*$/, "Must start with letter; only letters/numbers/_"),
    description: z.string().min(1, "KB description required"),
    model: z.string().default("gemini-2.0-flash"),
    fileIds: z.array(z.string()).min(1, "At least one file ID is required"),
});

/** Base */
const BaseToolSchema = z.object({
    toolName: z.string().min(1, "Tool name required"),
    toolType: z.enum([
        "custom-tool",
        "DTMF",
        "Query",
        "end-call",
        "Voicemail",
        "API-Request",
        "Google-sheets",
    ]),
    icon: z.string().optional(),
    description: z.string().max(1000).optional(),
    messages: z.array(MessageSchema).default([]),
});

/** Custom Tool */
const CustomToolSchema = BaseToolSchema.extend({
    toolType: z.literal("custom-tool"),
    toolModel: z.string().default("gemini-2.0-flash"),
    isAsync: z.boolean().default(false),
    isStrict: z.boolean().default(true),

    viewMode: z.enum(["visual", "json"]).default("visual"),
    parameters: z.array(ToolParameterSchema).default([]),

    // optional knowledge bases (from your screenshot)
    knowledgeBases: z.array(KnowledgeBaseSchema).default([]),
});

/** API Request Tool */
const RequestBodyPropertySchema = z.object({
    name: z.string().min(1, "Variable required"),
    type: z.enum(["string", "number", "boolean", "object", "array"]).default("string"),
    required: z.boolean().default(false),
});

const ResponseVarSchema = z.object({
    name: z.string().min(1, "Variable required"),
    type: z.enum(["string", "number", "boolean", "object", "array"]).default("string"),
    required: z.boolean().default(false),
});

const AliasSchema = z.object({
    from: z.string().min(1, "From required"),
    to: z.string().min(1, "To required"),
});
const ApiRequestSchema = BaseToolSchema.extend({
    toolType: z.literal("API-Request"),

    requestUrl: z.string().url("Valid HTTPS URL required"),
    httpMethod: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]).default("GET"),

    credential: z.object({
        mode: z.enum(["no-auth", "bearer", "basic", "custom-credential"]).default("no-auth"),
        credentialId: z.string().optional(),
    }).default({ mode: "no-auth" }),

    headers: z.array(HeaderSchema).default([]),

    requestBody: z.object({
        properties: z.array(RequestBodyPropertySchema).default([]),
    }).default({ properties: [] }),

    encryptedPaths: z.array(EncryptedPathSchema).default([]),

    responseBody: z.object({
        variables: z.array(ResponseVarSchema).default([]),
    }).default({ variables: [] }),

    aliases: z.array(AliasSchema).default([]),
});

/** Google Sheets Tool (common minimal fields) */
const GoogleSheetsSchema = BaseToolSchema.extend({
    toolType: z.literal("Google-sheets"),

    // Typical actions
    description: z.string().max(1000).optional(),

    // ✅ Google Sheets settings
    spreadsheetId: z.string().min(1, "Spreadsheet ID is required"),
    range: z.string().min(1, "Range is required"),
});

/** DTMF Tool */
const DtmfSchema = BaseToolSchema.extend({
    toolType: z.literal("DTMF"),
    digits: z.string().min(1, "Digits required"), // e.g. 123#*
    interDigitDelayMs: z.number().min(0).max(10000).default(250),
});

/** Query Tool (search/lookup style) */
const QuerySchema = BaseToolSchema.extend({
    toolType: z.literal("Query"),
    // queryText: z.string().min(1, "Query required"),
    // topK: z.number().min(1).max(50).default(5),
    // optionally: data source selector
    toolModel: z.string().default("gemini-2.0-flash"),
    source: z.enum(["knowledge-base", "api", "internal"]).default("knowledge-base"),
    knowledgeBases: z.array(KnowledgeBaseSchema).default([]),
});

/** Voicemail Tool */
const VoicemailSchema = BaseToolSchema.extend({
    toolType: z.literal("Voicemail"),
    maxDurationSeconds: z.number().min(5).max(600).default(120),
    beep: z.boolean().default(true),
    transcription: z.boolean().default(true),
});

/** End Call Tool */
const EndCallSchema = BaseToolSchema.extend({
    toolType: z.literal("end-call"),
    reason: z.string().optional(),
});

const CredentialSchema = z.object({
    mode: z.enum(["no-auth", "bearer", "basic", "custom-credential"]).default("no-auth"),
    credentialId: z.string().optional(),
});

const McpToolSchema = BaseToolSchema.extend({
    toolType: z.literal("MCP"),

    // top
    toolModel: z.string().default("gemini-2.0-flash"),
    description: z.string().max(1000).optional(),

    // server settings
    serverUrl: z.string().min(1, "Server URL required"),
    timeout: z.number().min(1).max(300).default(20),
    credential: CredentialSchema.default({ mode: "no-auth" }),

    // headers + encryption
    headers: z.array(HeaderSchema).default([]),
    encryptedPaths: z.array(EncryptedPathSchema).default([]),

    // ✅ MCP settings
    mcpProtocol: z.enum(["SHTTP", "SSE"]).default("SHTTP"),
});


/** Final union */
export const toolFormSchema = z.discriminatedUnion("toolType", [
    CustomToolSchema,
    ApiRequestSchema,
    GoogleSheetsSchema,
    DtmfSchema,
    QuerySchema,
    VoicemailSchema,
    EndCallSchema,
    McpToolSchema,
]);

export type ToolFormValues = z.infer<typeof toolFormSchema>;
