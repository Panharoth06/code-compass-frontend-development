"use client"

import { Button } from "@/components/ui/button"
import { FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormControl } from "@/components/ui/form"
import { FormLabel } from "@/components/ui/form"
import { FormItem } from "@/components/ui/form"
import { FormField } from "@/components/ui/form"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { type UseFormReturn, FormProvider } from "react-hook-form"
import { Eye, EyeOff } from "lucide-react"
import { GenderSelect } from "@/components/authComponentNewVersion/gender-selection"

type RegisterFormData = {
  first_name: string
  last_name: string
  username: string
  email: string
  password: string
  confirmed_password: string
}

interface RegistrationFormProps {
  form: UseFormReturn<RegisterFormData>
  onSubmit: (data: RegisterFormData) => Promise<void>
  isLoading: boolean
}

const FormComponent = ({ form, onSubmit, isLoading }: RegistrationFormProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Fields Row */}
        <div className="grid grid-cols-2 gap-4 text-white">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base sm:text-lg">First Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => {
                      // clearServerError('first_name')
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
                <FormLabel className="text-base sm:text-lg">Last Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => {
                      // clearServerError('last_name')
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
              <FormLabel className="text-base sm:text-lg text-white">Username</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e) => {
                    //   clearServerError('username');
                    field.onChange(e)
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
              <FormLabel className="text-base sm:text-lg text-white">Email Address</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    //   clearServerError('email');
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
              <FormLabel className="text-base sm:text-lg text-white">Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    onChange={(e) => {
                      //   clearServerError('password')
                      field.onChange(e)
                    }}
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    disabled={isLoading}
                    className="transition-colors text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff size={14} className="sm:w-4 sm:h-4" />
                    ) : (
                      <Eye size={14} className="sm:w-4 sm:h-4" />
                    )}
                  </button>
                </div>
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
              <FormLabel className="text-base sm:text-lg text-white">Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    onChange={(e) => {
                      //   clearServerError('confirmed_password')
                      field.onChange(e)
                    }}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    disabled={isLoading}
                    className="transition-colors text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={14} className="sm:w-4 sm:h-4" />
                    ) : (
                      <Eye size={14} className="sm:w-4 sm:h-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Gender Selection */}
        <GenderSelect />

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
    </FormProvider>
  )
}

export default FormComponent
