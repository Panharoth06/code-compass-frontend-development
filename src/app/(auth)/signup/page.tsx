"use client"

import { useEffect, useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
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
import { Eye, EyeOff, User, UserCircle, AtSign, Lock, CheckCircle } from "lucide-react"
import { useOauthRegisterMutation, useSignupMutation } from "@/lib/services/signUp/signUp"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { DEFAULT_FORM_VALUES, formSchema } from "@/lib/types/auth/form-validation"
import toast from "react-hot-toast"
import { CodeEditorPanel } from "@/components/authComponentNewVersion/code-editor-panel"

type RegisterFormData = z.infer<typeof formSchema>

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const router = useRouter()
  const { data: session, status } = useSession()
  const [register, { isLoading }] = useSignupMutation()
  const [oauthRegister] = useOauthRegisterMutation()

  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_FORM_VALUES,
    mode: "onChange",        // validate in real-time
    reValidateMode: "onBlur" // re-validate after leaving the field
  })

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
        router.push("/")
      })
    }
  }, [status, session, oauthRegister, router])

  const password = form.watch("password")

  const onSubmit = async (data: RegisterFormData) => {
    toast.promise(
      register(data).unwrap(),
      {
        loading: "Processing...",
        success: "User registered successfully!",
        error: "Failed to register user"
      }
    ).then(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    signIn("keycloak");
  })
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center dark:bg-background">
      <TerminalBackground />
      <div className="w-full min-w-xs max-w-xl lg:max-w-6xl mx-4 lg:mx-0 relative z-10">
        <div className="grid lg:grid-cols-2  gap-4 items-center">
          {/* right side */}
          <CodeEditorPanel />

          {/* Registration Card */}
          <div className="px-6 shadow-2xl">
            {/* OAuth Buttons */}
            <OAuthButtons />

            {/* Divider */}
            <GlowingDivider />

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
                      placeholder="Enter your first name"
                      disabled={isLoading}
                      className={`terminal-input h-10 text-sm border ${form.formState.errors.first_name ? "border-red-500" : "border-gray-800"
                        } text-white/90 selection:text-background selection:bg-white/90`}
                    />
                    {form.formState.errors.first_name ? (
                      <p className="text-xs text-destructive font-mono flex items-center gap-1">
                        <User className="w-3 h-3" /> {form.formState.errors.first_name.message}
                      </p>
                    ) : !form.watch("first_name") ? (
                      <p className="text-xs text-terminal-gray font-mono flex items-center gap-1">
                        <User className="w-3 h-3" /> What’s your first name?
                      </p>
                    ) : null}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="last_name" className="text-xs font-mono text-white/90 ">
                      Last Name
                    </Label>
                    <Input
                      id="last_name"
                      {...form.register("last_name")}
                      placeholder="Enter your last name"
                      disabled={isLoading}
                      className={`terminal-input h-10 text-sm border ${form.formState.errors.last_name ? "border-red-500" : "border-gray-800"
                        } text-white/90 selection:text-background selection:bg-white/90`}
                    />
                    {form.formState.errors.last_name ? (
                      <p className="text-xs text-destructive font-mono flex items-center gap-1">
                        <User className="w-3 h-3" /> {form.formState.errors.last_name.message}
                      </p>
                    ) : !form.watch("last_name") ? (
                      <p className="text-xs text-terminal-gray font-mono flex items-center gap-1">
                        <User className="w-3 h-3" /> And your last name?
                      </p>
                    ) : null}
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
                    placeholder="Enter a unique username"
                    disabled={isLoading}
                    className={`terminal-input h-10 text-sm border ${form.formState.errors.username ? "border-red-500" : "border-gray-800"
                      } text-white/90 selection:text-background selection:bg-white/90`}
                  />
                  {form.formState.errors.username ? (
                    <p className="text-xs text-destructive font-mono flex items-center gap-1">
                      <UserCircle className="w-3 h-3" /> {form.formState.errors.username.message}
                    </p>
                  ) : !form.watch("username") ? (
                    <p className="text-xs text-terminal-gray font-mono flex items-center gap-1">
                      <UserCircle className="w-3 h-3" /> Pick a unique username.
                    </p>
                  ) : null}
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
                    placeholder="Enter your email"
                    disabled={isLoading}
                    className={`terminal-input h-10 text-sm border ${form.formState.errors.email ? "border-red-500" : "border-gray-800"
                      } text-white/90 selection:text-background selection:bg-white/90`}
                  />
                  {form.formState.errors.email ? (
                    <p className="text-xs text-destructive font-mono flex items-center gap-1">
                      <AtSign className="w-3 h-3" /> {form.formState.errors.email.message}
                    </p>
                  ) : !form.watch("email") ? (
                    <p className="text-xs text-terminal-gray font-mono flex items-center gap-1">
                      <AtSign className="w-3 h-3" /> We’ll need your email address.
                    </p>
                  ) : null}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-xs font-mono text-white/90">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      {...form.register("password")}
                      placeholder="••••••••"
                      disabled={isLoading}
                      className={`terminal-input h-10 text-sm pr-10 border ${form.formState.errors.password ? "border-red-500" : "border-gray-800"
                        } text-white/90 selection:text-background selection:bg-white/90`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-terminal-green cursor-pointer transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {form.formState.errors.password ? (
                    <p className="text-xs text-destructive font-mono flex items-center gap-1">
                      <Lock className="w-3 h-3" /> {form.formState.errors.password.message}
                    </p>
                  ) : !form.watch("password") ? (
                    <p className="text-xs text-terminal-gray font-mono flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Choose a strong password.
                    </p>
                  ) : null}
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
                      className={`terminal-input h-10 text-sm pr-10 border ${form.formState.errors.confirmed_password ? "border-red-500" : "border-gray-800"
                        } text-white/90 selection:text-background selection:bg-white/90`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-terminal-green cursor-pointer transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {form.formState.errors.confirmed_password ? (
                    <p className="text-xs text-destructive font-mono flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> {form.formState.errors.confirmed_password.message}
                    </p>
                  ) : !form.watch("confirmed_password") ? (
                    <p className="text-xs text-terminal-gray font-mono flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Please confirm your password.
                    </p>
                  ) : null}
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
                <span onClick={() => signIn("keycloak")} className="text-terminal-green hover:underline cursor-pointer">
                  Login here
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
