"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "@/components/ui/input";
import { GnederOption } from "./GenderOption";
import { useSignupMutation } from "@/lib/services/signUp/signUp";

const formSchema = z
  .object({
    first_name: z
      .string()
      .min(2, { message: "First Name must be at least 2 characters" })
      .max(50, { message: "First Name must be less than 50 characters" }),
    last_name: z
      .string()
      .min(2, { message: "Last Name must be at least 2 characters" })
      .max(50, { message: "Last Name must be less than 50 characters" }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" })
      .max(30, { message: "Username must be less than 30 characters" }),
    email: z.email({
      pattern: z.regexes.rfc5322Email,
      message: "Invalid email address",
    }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(100, { message: "Password must be less than 100 characters" })
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }),

    confirmed_password: z
      .string()
      .min(6, { message: "Confirm Password must be at least 6 characters" })
      .max(100, {
        message: "Confirm Password must be less than 100 characters",
      }),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  })
  .refine((data) => data.password === data.confirmed_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

const RegisterForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      confirmed_password: "",
      gender: "MALE",
    },
    mode: "onSubmit",
  });

  const [signup, { isLoading, isError, error }] = useSignupMutation();

  function onSubmit(data: z.infer<typeof formSchema>) {
    signup(data)
      .unwrap()
      .then((res) => {
        console.log("✅ Registered successfully:", res);
      })
      .catch((err) => {
        console.error("❌ Registration failed:", err);
      });
  }

  if (isError) {
    console.error("Error during registration:", error);
  }
  if (isLoading) {
    console.log("Loading...");
  }

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* first name */}
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="First Name"
                    {...field}
                    className="w-full text-black rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* last name */}
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Last Name"
                    {...field}
                    className="w-full text-black rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Username"
                    {...field}
                    className="w-full text-black rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="codecompass@example.com"
                    type="email"
                    {...field}
                    className="w-full text-black rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="CodeComass@123"
                    type="password"
                    {...field}
                    className="w-full text-black rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* confirm password */}
          <FormField
            control={form.control}
            name="confirmed_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="CodeComass@123"
                    type="password"
                    {...field}
                    className="w-full text-black rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* gender option] */}

          <div className="w-full">
            <GnederOption />
          </div>

          <button
            type="submit"
            className="bg-black/90 text-white py-2 px-4 rounded-md hover:bg-black/85 cursor-pointer"
          >
            Sign up
          </button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
export type FormSchema = z.infer<typeof formSchema>;
