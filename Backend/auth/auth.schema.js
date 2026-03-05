// auth/auth.schema.js
import { z } from "zod";

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["TEACHER", "STUDENT", "PARENT"]),
  birthDay: z.string(), // ISO string từ FE
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
