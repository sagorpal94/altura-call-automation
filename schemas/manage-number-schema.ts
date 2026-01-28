import * as z from "zod"

export const manageNumberSchema = z.object({
    friendlyLabel: z.string().min(2, "Label must be at least 2 characters."),
    linkedAgent: z.string().min(1, "Please select an agent to link."),
})

export type ManageNumberValues = z.infer<typeof manageNumberSchema>