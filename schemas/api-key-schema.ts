import * as z from "zod"

export const apiKeyFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
})

export type ApiKeyFormValues = z.infer<typeof apiKeyFormSchema>