import * as z from "zod"

export const createUserSchema = z.object({
    name: z.string().min(2, "Name is required"),
    company: z.string().min(2, "Company is required"),
    email: z.string().email("Invalid email address"),
    status: z.string().min(1, "Select status"),
    role: z.string().min(1, "Select role"),
})

export type CreateUserValues = z.infer<typeof createUserSchema>


export const userProfileSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    company: z.string().min(2, "Company name is required"),
})

export type UserProfileValues = z.infer<typeof userProfileSchema>

export const userDeleteConfirmSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
})

export type DeleteConfirmFormValues = z.infer<typeof userDeleteConfirmSchema>
