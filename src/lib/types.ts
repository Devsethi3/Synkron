import { z } from "zod";

export const FormSchema = z.object({
    email: z.string().describe('Email').email({message: "Inavalid Email"}),
    password: z.string().describe('Password').min(1, "Password is required")
})