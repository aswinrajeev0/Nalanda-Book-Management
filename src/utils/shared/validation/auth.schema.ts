import { z } from 'zod';

export const RegisterSchema = z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    email: z.email("Invalid email address"),
    password: z.string().trim().min(6, "Password must be at least 6 characters"),
});

export type RegisterDto = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().trim().min(1, "Password is required"),
});

export type LoginDto = z.infer<typeof LoginSchema>;
