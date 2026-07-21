// auth/auth.schema.js
import { z } from "zod";

export const RegisterSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  password: z.string().min(8),
  // role intentionally omitted: it must not be settable by the client.
  birthDay: z.string(), // ISO string từ FE
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
