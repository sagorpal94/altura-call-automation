import * as z from "zod"

export const agentFormSchema = z.object({
    // Top Section
    name: z.string().min(2, "Name is required"),
    description: z.string().min(2, "Description is required"),
    internalRole: z.string().optional(),
    // Estimations are often read-only, but we'll include them if needed
    latency: z.string(),
    costPerMin: z.string(),

    // Model Tab
    llmProvider: z.string().min(1, "Select a provider"),
    modelSelection: z.string().min(1, "Select a model"),
    systemInstruction: z.string().min(10, "Instruction is too short"),
    firstMessage: z.string().min(2, "First message is required"),
    maxTokens: z.coerce.number().min(1).max(4096),
    temperature: z.array(z.number()).default([0.7]),

    //voice Tab
    voiceProvider: z.string().min(1, "Required"),
    voiceSelection: z.string().min(1, "Required"),
    manualVoiceId: z.boolean().default(false),
    voiceId: z.string().optional(),
    model: z.string().min(1, "Required"),
    backgroundSound: z.string().optional(),
    backgroundSoundUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
    mainCharacters: z.string().optional(),
    punctionBoundaries: z.string().optional(),
    stability: z.array(z.number()),
    clarity: z.array(z.number()),
    speed: z.array(z.number()),
    styleExaggeration: z.array(z.number()),
    optimizeLatency: z.array(z.number()),

    // tools Tab
    enabledTools: z.array(z.string()).default([]),

    // Analysis
    enabledAnalyses: z.array(z.string()).default([]),

    hipaaCompliance: z.boolean().default(false),
    audioRecording: z.boolean().default(false),
    logging: z.boolean().default(false),
    transcript: z.boolean().default(false),
    audioRecordingFormat: z.string().default("mp3"),
    videoRecording: z.boolean().default(false),
})

export type AgentFormValues = z.infer<typeof agentFormSchema>