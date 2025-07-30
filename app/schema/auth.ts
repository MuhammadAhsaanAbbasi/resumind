import { z } from "zod";

export const RegisterSchema = z.object({
    username: z.string().min(2, "Username must be at least 2 characters long")
    .max(50, "Username must be at most 50 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long")
    .max(50, "Password must be at most 50 characters long")
})

export const LoginSchema = z.object({
    email: z.string().email("Invalid email address").min(2, "Email must be at least 2 characters long")
    .max(50, "Email must be at most 50 characters long"),
    password: z.string().min(8, "Password must be at least 8 characters long")
    .max(50, "Password must be at most 50 characters long"),
})