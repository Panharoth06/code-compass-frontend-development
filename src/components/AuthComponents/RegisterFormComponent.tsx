"use client";

import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "@/components/ui/input";
import { GenderOption } from "./GenderOption";
import { useSignupMutation } from "@/lib/services/signUp/signUp";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

const formSchema = z
  .object({
    first_name: z
      .string()
      .trim()
      .min(2, { message: "First name must be at least 2 characters" })
      .max(50, { message: "First name must be less than 50 characters" })
      .regex(/^[a-zA-Z\s'-]+$/, { message: "First name can only contain letters, spaces, hyphens, and apostrophes" }),
    last_name: z
      .string()
      .trim()
      .min(2, { message: "Last name must be at least 2 characters" })
      .max(50, { message: "Last name must be less than 50 characters" })
      .regex(/^[a-zA-Z\s'-]+$/, { message: "Last name can only contain letters, spaces, hyphens, and apostrophes" }),
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

export type FormSchema = z.infer<typeof formSchema>;

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [signup, { isLoading, isError, error }] = useSignupMutation();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      confirmed_password: "",
      gender: undefined,
    },
    mode: "onChange", // Real-time validation
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
  signup(data)
    .unwrap()
    .then((res) => {
      console.log("✅ Registered successfully:", res);
      toast.success("Registered successfully");
      signIn("keycloak");
    })
    .catch((err) => {
      console.error("❌ Registration failed:", err);
      
      // Handle different error scenarios based on your backend ErrorResponse structure
      if (err?.status === 400 || err?.status === 409) {
        // Get the error details from your backend's ErrorResponse
        const errorDetails = err?.data?.details;
        
        if (errorDetails) {
          const details = errorDetails.toLowerCase();
          
          // Check if the error is about username
          if (details.includes('username') && details.includes('already')) {
            form.setError("username", {
              type: "server",
              message: "Username already exists"
            });
          } 
          // Check if the error is about email
          else if (details.includes('email') && details.includes('already')) {
            form.setError("email", {
              type: "server",
              message: "Email already exists"
            });
          }
          // Check for other specific cases you might have
          else if (details.includes('username') && details.includes('taken')) {
            form.setError("username", {
              type: "server",
              message: "Username is already taken"
            });
          }
          else if (details.includes('email') && details.includes('registered')) {
            form.setError("email", {
              type: "server",
              message: "Email is already registered"
            });
          }
          else {
            // If it's a validation error but not username/email specific
            toast.error(errorDetails);
          }
        } else {
          // Fallback if no details are provided
          toast.error("Registration failed. Please check your information.");
        }
      } else if (err?.status === 500) {
        toast.error("Server error. Please try again later.");
      } else {
        // Handle network errors or other unexpected errors
        toast.error("Something went wrong. Please try again.");
      }
    });
}

// Enhanced clearServerError function to handle all server errors
const clearServerError = (fieldName: keyof FormSchema) => {
  const fieldState = form.getFieldState(fieldName);
  if (fieldState.error?.type === 'server') {
    form.clearErrors(fieldName);
  }
};

// You might also want to clear server errors on field change
const handleFieldChange = (fieldName: keyof FormSchema, value: any) => {
  clearServerError(fieldName);
  form.setValue(fieldName, value);
};


  return (
    <div className="w-full max-w-lg mx-auto p-6">
      <div className="mb-6 text-center">
        <h1 className="text-2xl sm:text-4xl font-bold text-white/90 mb-2">Create Account</h1>
        <p className="text-lg sm:text-xl text-white/80">Fill in your information to get started</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Fields Row */}
          <div className="grid grid-cols-2 gap-4 text-white">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base sm:text-lg'>First Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        clearServerError('first_name')
                        field.onChange(e)
                      }}
                      placeholder="Enter your first name"
                      disabled={isLoading}
                      className="transition-colors"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base sm:text-lg'>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        clearServerError('last_name')
                        field.onChange(e)
                      }}
                      placeholder="Enter your last name"
                      disabled={isLoading}
                      className="transition-colors"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-base sm:text-lg text-white'>Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => {
                      clearServerError('username');
                      field.onChange(e);
                    }}
                    placeholder="Choose a unique username"
                    disabled={isLoading}
                    className="transition-colors text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-base sm:text-lg text-white'>Email Address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      clearServerError('email');
                    }}
                    type="email"
                    placeholder="Enter your email address"
                    disabled={isLoading}
                    className="transition-colors text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-base sm:text-lg text-white'>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => {
                      clearServerError('password')
                      field.onChange(e)
                    }}
                    type="password"
                    placeholder="Create a strong password"
                    disabled={isLoading}
                    className="transition-colors text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmed_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className= 'text-base sm:text-lg text-white'>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => {
                      clearServerError('confirmed_password')
                      field.onChange(e)
                    }}
                    type="password"
                    placeholder="Confirm your password"
                    disabled={isLoading}
                    className="transition-colors text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Gender Selection */}
          <GenderOption />

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isLoading}
              className="flex-1 hover:cursor-pointer rounded-full"
            >
              Go Back
            </Button>
            
            <Button
              type="submit"
              variant="outline"
              disabled={isLoading || !form.formState.isValid}
              className="flex-1 bg-white hover:cursor-pointer rounded-full"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2" />
                  Creating Account...
                </>
              ) : (
                "Sign Up" 
              )}
            </Button>
          </div>
        </form>
      </Form>

      {/* Additional Info */}
      <div className="mt-6 text-center text-white/70 text-sm">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="text-white/90 underline font-medium hover:cursor-pointer"
        >
          Sign in here
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;