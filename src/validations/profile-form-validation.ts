import { z } from "zod"

export const profileFormScheme = z.object({
    username: z.string()
        .min(1, { message: "Required" }).max(225)
        .regex(/^\S*$/, { message: "Whitespace not allowed" }).optional(),
    email: z.string().email().max(100).optional(),
    password: z.string().optional(),
    confirmPassword: z.string().optional()
})

export type ProfileFormType = z.infer<typeof profileFormScheme>