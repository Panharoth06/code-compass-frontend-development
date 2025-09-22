"use client";

import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSignupMutation } from "@/lib/services/signUp/signUp";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import { DEFAULT_FORM_VALUES, formSchema, RegisterFormData } from '@/lib/types/auth/form-validation';
import { useRegistrationHandlers } from '@/lib/utils/register/handle-register';
import Loader from '../loader/LoaderComponent';
import { prefillFormWithOAuthData, shouldRedirectToHome, shouldStartOAuthFlow } from '@/lib/utils/register/auto-register';
import FormComponent from './FormComponent';

export type FormSchema = z.infer<typeof formSchema>;

const RegisterForm: React.FC = () => {

  const [registrationError, setRegistrationError] = useState<string>("");
  const [isOAuthFlow, setIsOAuthFlow] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const router = useRouter();
  const [, { isLoading }] = useSignupMutation();
  const { data: session, status } = useSession();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_FORM_VALUES,
    mode: "onSubmit",
  });

  const { submitRegistration, handleAutoRegistration } =
    useRegistrationHandlers({
      isOAuthFlow,
      isProcessing,
      setIsProcessing,
      setRegistrationError,
      form,
    });

  const onSubmit = async (data: RegisterFormData) => {
    if (isProcessing) return;
    await submitRegistration(data);
  };

  // OAuth pre-filling and auto-registration
  useEffect(() => {
    if (status === "loading") return;

    // Redirect if already registered
    if (shouldRedirectToHome(session)) {
      toast.success("Welcome back! Redirecting to home...");
      router.push("/");
      return;
    }

    // OAuth flow - add flag to prevent multiple executions
    if (shouldStartOAuthFlow(session) && !isOAuthFlow) {
      setIsOAuthFlow(true);

      if (session?.oauthData) {
        prefillFormWithOAuthData(form, session);

        // Auto-submit after form validation with debouncing
        const autoSubmit = async () => {
          await new Promise((resolve) => setTimeout(resolve, 500)); // Longer delay

          const isValid = await form.trigger();
          if (isValid && !isProcessing) {
            // Add additional check to prevent multiple submissions
            const formData = form.getValues();
            if (formData.email && formData.username) {
              handleAutoRegistration();
            }
          }
        };

        autoSubmit();
      }
    }
  }, [session, status, router, form, isProcessing, isOAuthFlow, handleAutoRegistration]);

  if (isOAuthFlow && isProcessing) {
    return <Loader />;
  }

  return (
    <div className="w-full max-w-lg mx-auto p-6">
      <div className="mb-6 text-center">
        <h1 className="text-2xl sm:text-4xl font-bold text-white/90 mb-2">Create Account</h1>
        <p className="text-lg sm:text-xl text-white/80">Fill in your information to get started</p>
      </div>

      <FormComponent
        form={form}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
      {registrationError && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {registrationError}
        </div>
      )}

      {/* Additional Info */}
      <div className="mt-6 text-center text-white/70 text-sm">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => signIn("keycloak")}
          className="text-white/90 underline font-medium hover:cursor-pointer"
        >
          Sign in here
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;