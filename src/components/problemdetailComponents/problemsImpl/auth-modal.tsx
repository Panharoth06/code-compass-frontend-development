"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Github, Chrome } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { setCredentials, setLoading } from "@/lib/features/auth/authSlice"

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector((state) => state.auth)

  const handleGithubLogin = async () => {
    dispatch(setLoading(true))

    // Mock GitHub OAuth flow - replace with actual implementation
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock successful login
      const mockUser = {
        id: "github_123",
        email: "user@github.com",
        name: "GitHub User",
        avatar: "https://github.com/github.png",
        provider: "github" as const,
      }

      const mockToken = "mock_github_token_" + Date.now()

      dispatch(setCredentials({ user: mockUser, token: mockToken }))
      onOpenChange(false)
    } catch (error) {
      console.error("GitHub login failed:", error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleGoogleLogin = async () => {
    dispatch(setLoading(true))

    // Mock Google OAuth flow - replace with actual implementation
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock successful login
      const mockUser = {
        id: "google_456",
        email: "user@gmail.com",
        name: "Google User",
        avatar: "https://lh3.googleusercontent.com/a/default-user",
        provider: "google" as const,
      }

      const mockToken = "mock_google_token_" + Date.now()

      dispatch(setCredentials({ user: mockUser, token: mockToken }))
      onOpenChange(false)
    } catch (error) {
      console.error("Google login failed:", error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sign in to CodeCraft</DialogTitle>
          <DialogDescription>Choose your preferred sign-in method to continue coding.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Button variant="outline" className="w-full bg-transparent" onClick={handleGithubLogin} disabled={isLoading}>
            <Github className="mr-2 h-4 w-4" />
            {isLoading ? "Signing in..." : "Continue with GitHub"}
          </Button>
          <Button variant="outline" className="w-full bg-transparent" onClick={handleGoogleLogin} disabled={isLoading}>
            <Chrome className="mr-2 h-4 w-4" />
            {isLoading ? "Signing in..." : "Continue with Google"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
