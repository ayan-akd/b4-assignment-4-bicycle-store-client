import { z } from "zod";

export const loginSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email(),
  password: z.string({ required_error: "Password is required" }).min(6),
});

export const registerSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z.string({ required_error: "Email is required" }).email(),
  password: z.string({ required_error: "Password is required" }).min(6),
});

export const changePasswordSchema = z.object({
  oldPassword: z.string({ required_error: "Old Password is required" }).min(6),
  newPassword: z.string({ required_error: "New Password is required" }).min(6),
});
