import { generateRandomPassword } from "@/lib/utils/register/generate-password";
import { Session } from "next-auth";
import { UseFormReturn } from "react-hook-form";
import {
  OAUTH_DEFAULT_VALUES,
} from "@/lib/types/auth/signUp";
import { RegisterFormData } from "@/lib/types/auth/form-validation";

export const prefillFormWithOAuthData = (
  form: UseFormReturn<RegisterFormData>,
  session: Session
) => {
  if (!session.oauthData) return;

  const { oauthData } = session;
  const nameParts = oauthData.name?.split(" ") ?? [];
  const firstName = oauthData.given_name || nameParts[0] || "";
  const lastName = oauthData.family_name || nameParts.slice(1).join(" ") || "";

  const username = oauthData.login || oauthData.email.split("@")[0];
  const generatedPassword = generateRandomPassword();

  form.setValue("email", oauthData.email);
  form.setValue("first_name", firstName);
  form.setValue("last_name", lastName);
  form.setValue("username", username);
  form.setValue("gender", OAUTH_DEFAULT_VALUES.gender);
  form.setValue("password", generatedPassword);
  form.setValue("confirmed_password", generatedPassword);
};

export const shouldRedirectToHome = (session: Session | null): boolean => {
  return Boolean(
    session?.expires && session?.isRegistered && !session?.requireRegistration
  );
};

export const shouldStartOAuthFlow = (session: Session | null): boolean => {
  return Boolean(session?.requireRegistration && session?.oauthData);
};