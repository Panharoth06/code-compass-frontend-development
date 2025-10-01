import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { signIn, useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

import {
  ERROR_MESSAGES,
  SignUpRequest,
} from "@/lib/types/auth/signUp";
import { useSignupMutation } from "@/lib/services/signUp/signUp";
import { RegisterFormData, RegistrationError } from "@/lib/types/auth/form-validation";

interface UseRegistrationHandlersProps {
  isOAuthFlow: boolean;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
  setRegistrationError: (error: string) => void;
  form: UseFormReturn<RegisterFormData>;
}

export const useRegistrationHandlers = ({
  isOAuthFlow,
  isProcessing,
  setIsProcessing,
  setRegistrationError,
  form,
}: UseRegistrationHandlersProps) => {
  const { data: session, update } = useSession();
  const [signup] = useSignupMutation();
  const [hasHandledDuplicate, setHasHandledDuplicate] = useState(false);

  const handleExistingUserOAuth = useCallback(async () => {
    try {
      toast.loading("Completing your login...");

      await update({
        clearOAuthData: true,
        isRegistered: true,
        requireRegistration: false,
        user: {
          id: session?.user?.id || "",
          email: session?.oauthData?.email || "",
          name: session?.oauthData?.name || "",
        },
      });

      // Redirect to break the loop
      toast.success("Welcome back!");
      window.location.href = "/"; // Use window.location to break React state
    } catch {
      toast.error("Unable to complete login");
      setRegistrationError(ERROR_MESSAGES.UNABLE_TO_COMPLETE);
      setHasHandledDuplicate(false);
    } finally {
      setIsProcessing(false);
    }
  }, [
    session,
    update,
    setRegistrationError,
    setIsProcessing,
    setHasHandledDuplicate,
  ]);

  const handleRegistrationError = useCallback(
    (error: RegistrationError) => {
      if (hasHandledDuplicate) return;

      let errorMessage: string = ERROR_MESSAGES.REGISTRATION_FAILED;

      if (typeof error === "object" && error && "status" in error) {
        const status = (error as FetchBaseQueryError).status;

        if (status === 409) {
          if (isOAuthFlow && session?.isRegistered) {
            setHasHandledDuplicate(true);
            handleExistingUserOAuth();
            return;
          }
          errorMessage = ERROR_MESSAGES.DUPLICATE_USER;
          setHasHandledDuplicate(true); // Mark as handled for non-OAuth too
          toast.error("Account already exists");
        } else if (status === 400) {
          errorMessage = ERROR_MESSAGES.INVALID_DATA;
          toast.error("Invalid form data");
        } else if (status === 500) {
          errorMessage = ERROR_MESSAGES.SERVER_ERROR;
          toast.error("Server error. Please try again.");
        }

        if ("data" in error && error.data) {
          const errorData = error.data as { message?: string; error?: string };
          if (errorData.message) {
            errorMessage = errorData.message;
            toast.error(errorData.message);
          } else if (errorData.error) {
            errorMessage = errorData.error;
            toast.error(errorData.error);
          }
        }
      } else {
        toast.error("Registration failed");
      }

      setRegistrationError(errorMessage);
    },
    [
      isOAuthFlow,
      session?.isRegistered,
      setRegistrationError,
      hasHandledDuplicate,
      handleExistingUserOAuth,
    ]
  );

  const handlePostRegistrationLogin = useCallback(
    async (data: RegisterFormData) => {
      try {
        toast.loading("Logging you in...");

        await signIn("keycloak", {
          username: data.email,
          password: data.password,
          redirect: true,
          callbackUrl: "/", // go after login
        });
      } catch {
        await signIn("keycloak", {
          redirect: true,
          callbackUrl: "/", // go after login
        });
      }
    },
    []
  );

  const submitRegistration = useCallback(
    async (data: RegisterFormData) => {
      if (hasHandledDuplicate) {
        setIsProcessing(false);
        return;
      }

      setRegistrationError("");
      setIsProcessing(true);
      toast.loading("Creating your account...");

      try {
        const signUpData: SignUpRequest = {
          ...data,
        };

        const result = await signup(signUpData);

        if ("error" in result && result.error) {
          handleRegistrationError(result.error);
          setIsProcessing(false);
          return;
        }

        if ("data" in result && result.data) {
          toast.success("Account created successfully!");

          if (isOAuthFlow && session?.isRegistered) {
            try {
              await update({
                clearOAuthData: true,
                isRegistered: true,
                requireRegistration: false,
                user: {
                  id: session.user.id,
                  email: data.email,
                  name: `${data.first_name} ${data.last_name}`,
                },
              });

              setHasHandledDuplicate(true); // Mark as completed
              await new Promise((resolve) => setTimeout(resolve, 500));
              toast.success("Welcome to CodeCompass!");

              // Redirect after successful registration
              window.location.href = "/"; // Use window.location to break React state
            } catch {
              toast.error("Failed to complete registration");
              setRegistrationError(
                "Failed to complete registration. Please try logging in."
              );
              setHasHandledDuplicate(false); // Reset on error
            }
          } else {
            await handlePostRegistrationLogin(data);
          }
        }
      } catch {
        toast.error(ERROR_MESSAGES.UNEXPECTED_ERROR);
        setRegistrationError(ERROR_MESSAGES.UNEXPECTED_ERROR);
        setHasHandledDuplicate(false); // Reset on error
      } finally {
        setIsProcessing(false);
      }
    },
    [
      isOAuthFlow,
      session,
      signup,
      handleRegistrationError,
      handlePostRegistrationLogin,
      update,
      setIsProcessing,
      setRegistrationError,
      hasHandledDuplicate,
      setHasHandledDuplicate, 
    ]
  );

  const handleAutoRegistration = useCallback(async () => {
    if (isProcessing || !session?.oauthData || hasHandledDuplicate) return;

    setIsProcessing(true);
    toast.loading("Completing your registration...");

    const isValid = await form.trigger();
    if (!isValid) {
      toast.error("Please fix the form errors");
      setIsProcessing(false);
      return;
    }

    const formData = form.getValues();
    await submitRegistration(formData);
  }, [
    isProcessing,
    session,
    form,
    submitRegistration,
    setIsProcessing,
    hasHandledDuplicate,
  ]);

  return {
    handleRegistrationError,
    handleExistingUserOAuth,
    handlePostRegistrationLogin,
    submitRegistration,
    handleAutoRegistration,
  };
};