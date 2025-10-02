"use client"

import { useEffect, useState } from "react"
import { useForm, FormProvider } from "react-hook-form" // Import FormProvider
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { TerminalBackground } from "@/components/authComponentNewVersion/terminal-background"
import { OAuthButtons } from "@/components/authComponentNewVersion/oauth-button"
import { GlowingDivider } from "@/components/authComponentNewVersion/divider"
import { PasswordStrength } from "@/components/authComponentNewVersion/password-strength"
import { GenderSelect } from "@/components/authComponentNewVersion/gender-selection"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Terminal } from "lucide-react"
import { useOauthRegisterMutation, useSignupMutation } from "@/lib/services/signUp/signUp"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { DEFAULT_FORM_VALUES, formSchema } from "@/lib/types/auth/form-validation"
import Loader from "@/components/loader/LoaderComponent"
import toast from "react-hot-toast"

type RegisterFormData = z.infer<typeof formSchema>

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const router = useRouter();
  const { data: session, status } = useSession();
  const [register, { isLoading }] = useSignupMutation();
  const [oauthRegister] = useOauthRegisterMutation();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_FORM_VALUES,
    mode: "onSubmit",
  });

useEffect(() => {
  if (status === "authenticated" && session?.accessToken) {
    toast.promise(
      oauthRegister().unwrap(),
      {
        loading: "Processing...",
        success: "User registered successfully!",
        error: "Failed to register user"
      }
    ).then(() => {
      router.push("/");
    });
  }
}, [status, session, oauthRegister, router]);


  const password = form.watch("password")

  const onSubmit = async (data: RegisterFormData) => {
      toast.promise(
      register(data).unwrap(),
      {
        loading: "Processing...",
        success: "User registered successfully!",
        error: "Failed to register user"
      }
    ).then(() => {
      router.push("/");
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center p-4">
      <TerminalBackground />

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-card border border-terminal-green mb-4">
            <Terminal className="w-8 h-8 text-terminal-green" />
          </div>
          <h1 className="text-3xl font-bold text-white/90 mb-2 font-mono">{"<Register />"}</h1>
          <p className="text-sm text-gray-400 font-mono">{"// Join the competitive programming community"}</p>
        </div>

        {/* Registration Card */}
        <div className="border border-gray-600 rounded-lg p-6 shadow-2xl bg-background">
          {/* OAuth Buttons */}
          <OAuthButtons />

          {/* Divider */}
          <GlowingDivider />

          {/* Wrap form with FormProvider */}
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="first_name" className="text-xs font-mono text-white/90 ">
                    First Name
                  </Label>
                  <Input
                    id="first_name"
                    {...form.register("first_name")}
                    placeholder="Code"
                    disabled={isLoading}
                    className="terminal-input h-10 text-sm border border-gray-600 text-white/90  selection:text-background"
                  />
                  {form.formState.errors.first_name && (
                    <p className="text-xs text-destructive font-mono">{form.formState.errors.first_name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="last_name" className="text-xs font-mono text-white/90 ">
                    Last Name
                  </Label>
                  <Input
                    id="last_name"
                    {...form.register("last_name")}
                    placeholder="Compass"
                    disabled={isLoading}
                    className="terminal-input h-10 text-sm border border-gray-600 text-white/90 selection:text-background "
                  />
                  {form.formState.errors.last_name && (
                    <p className="text-xs text-destructive font-mono">{form.formState.errors.last_name.message}</p>
                  )}
                </div>
              </div>

              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-xs font-mono text-white/90 ">
                  Username
                </Label>
                <Input
                  id="username"
                  {...form.register("username")}
                  placeholder="johndoe_dev"
                  disabled={isLoading}
                  className="terminal-input h-10 text-sm border border-gray-600 text-white/90 selection:text-background "
                />
                {form.formState.errors.username && (
                  <p className="text-xs text-destructive font-mono">{form.formState.errors.username.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-mono text-white/90 ">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register("email")}
                  placeholder="john.doe@example.com"
                  disabled={isLoading}
                  className="terminal-input h-10 text-sm border border-gray-600 text-white/90 selection:text-background "
                />
                {form.formState.errors.email && (
                  <p className="text-xs text-destructive font-mono">{form.formState.errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-mono text-white/90 ">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...form.register("password")}
                    placeholder="••••••••"
                    disabled={isLoading}
                    className="terminal-input h-10 text-sm pr-10 border border-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-terminal-green transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {form.formState.errors.password && (
                  <p className="text-xs text-destructive font-mono">{form.formState.errors.password.message}</p>
                )}
                <PasswordStrength password={password} />
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmed_password" className="text-xs font-mono text-white/90 ">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmed_password"
                    type={showConfirmPassword ? "text" : "password"}
                    {...form.register("confirmed_password")}
                    placeholder="••••••••"
                    disabled={isLoading}
                    className="terminal-input h-10 text-sm pr-10 border border-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-terminal-green transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {form.formState.errors.confirmed_password && (
                  <p className="text-xs text-destructive font-mono">{form.formState.errors.confirmed_password.message}</p>
                )}
              </div>

              {/* Gender Selection */}
              <GenderSelect />

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading || !form.formState.isValid}
                className="w-full h-12 bg-terminal-green hover:bg-terminal-green/90 text-background font-mono font-semibold text-sm glow-button disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-background mr-2" />
                    Creating Account...
                  </>
                ) : (
                  "Initialize Account"
                )}
              </Button>
            </form>
          </FormProvider>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground font-mono">
              Already have an account?{" "}
              <a href="/login" className="text-terminal-green hover:underline">
                Login here
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Text */}
        <p className="text-center text-xs text-terminal-gray font-mono mt-6">© 2025 CodeArena. All rights reserved.</p>
      </div>
    </div>
  )
}