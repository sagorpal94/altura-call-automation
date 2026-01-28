import * as z from "zod"

export const profileSchema = z.object({
    fullName: z.string().min(2, "Full name is required"),
    nickName: z.string().min(2, "Nick name is required"),
    gender: z.string().min(1, "Please select gender"),
    country: z.string().min(1, "Please select country"),
    language: z.string().min(1, "Please select language"),
    timeZone: z.string().min(1, "Please select time zone"),

    companyName: z.string().min(2, "Company name is required"),
    taxId: z.string().min(2, "VAT / Tax ID is required"),
    billingEmail: z.string().email("Invalid billing email"),
    address: z.string().min(5, "Full address is required"),
})

export type ProfileValues = z.infer<typeof profileSchema>