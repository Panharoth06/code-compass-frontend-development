import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import z from "zod";


export const formSchema = z
  .object({
    first_name: z
      .union([
        z.string().min(2, "First name must be at least 2 characters"),
        z.literal(""),
      ])
      .transform((val) => (val === "" ? null : val))
      .nullable(),
    last_name: z
      .union([
        z.string().min(2, "Last name must be at least 2 characters"),
        z.literal(""),
      ])
      .transform((val) => (val === "" ? null : val))
      .nullable(),
    username: z
      .string()
      .trim()
      .min(3, { message: "Username must be at least 3 characters" })
      .max(30, { message: "Username must be less than 30 characters" })
      .regex(/^[a-zA-Z0-9_-]+$/, { message: "Username can only contain letters, numbers, underscores, and hyphens" }),
    email: z
      .string()
      .trim()
      .min(1, { message: "Email is required" })
      .email({ message: "Please enter a valid email address" })
      .max(320, { message: "Email must be less than 320 characters" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(128, { message: "Password must be less than 128 characters" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&].*$/,
        {
          message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)",
        }
      ),
    confirmed_password: z
      .string()
      .min(1, { message: "Please confirm your password" }),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  })
  .refine((data) => data.password === data.confirmed_password, {
    message: "Passwords do not match",
    path: ["confirmed_password"],
  });

  export const DEFAULT_FORM_VALUES: Partial<RegisterFormData> = {
    first_name: null,
    last_name: null,
    username: "",
    email: "",
    password: "",
    confirmed_password: "",
    gender: undefined,
  };

  export type RegisterFormData = z.infer<typeof formSchema>;
  export type RegistrationError = FetchBaseQueryError | SerializedError | unknown;