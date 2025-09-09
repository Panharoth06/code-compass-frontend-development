"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "@/components/ui/input";
import { GenderOption } from "./GenderOption";
import { useSignupMutation } from "@/lib/services/signUp/signUp";
import { Button } from "../ui/button";
import {useRouter} from "next/navigation";

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

  const router = useRouter();

  return (
    <div className="w-full max-w-md p-8 space-y-6 rounded shadow mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex gap-2"> 
            {/* first name */}
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="First Name"
                    {...field}
                    className="w-full text-white rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 selection:bg-blue-500 selection:text-white"
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
                <FormLabel className="text-white">Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Last Name"
                    {...field}
                    className="w-full text-white rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 selection:bg-blue-500 selection:text-white"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          </div>
          

          {/* username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Username"
                    {...field}
                    className="w-full text-white rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 selection:bg-blue-500 selection:text-white"
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
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="codecompass@example.com"
                    type="email"
                    {...field}
                    className="w-full text-white rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 selection:bg-blue-500 selection:text-white"
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
                <FormLabel className="text-white">Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="CodeComass@123"
                    type="password"
                    {...field}
                    className="w-full text-white rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 selection:bg-blue-500 selection:text-white"
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
                <FormLabel className="text-white">Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="CodeComass@123"
                    type="password"
                    {...field}
                    className="w-full text-white rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 selection:bg-blue-500 selection:text-white"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* gender option] */}

          <div className="w-full">
            <GenderOption />
          </div>

          <div className="flex gap-2 justify-center">
            <Button
            type="button" 
            className="bg-gray-800/50 text-gray-100 border-gray-600 hover:bg-gray-700/50 hover:text-white py-2 px-4 rounded-md cursor-pointer"
            onClick={() => router.back()}
            > go back </Button>
          <Button
            type="submit"
            className="bg-gray-800/50 text-gray-100 border-gray-600 hover:bg-gray-700/50 hover:text-white py-2 px-4 rounded-md cursor-pointer"
          >
            Sign up
          </Button>

          </div>

        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
export type FormSchema = z.infer<typeof formSchema>;
