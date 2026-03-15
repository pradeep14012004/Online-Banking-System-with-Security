'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Loader2, Mail, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitted(true)
    setIsLoading(false)
  }

  if (isSubmitted) {
    return (
      <div className="space-y-8">
        {/* Mobile Logo */}
        <div className="flex items-center justify-center gap-2 lg:hidden">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">N</span>
          </div>
          <span className="text-xl font-semibold">NexusBank</span>
        </div>

        <div className="flex flex-col items-center text-center space-y-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Check your email</h1>
          <p className="text-muted-foreground max-w-sm">
            We sent a password reset link to <span className="font-medium text-foreground">{email}</span>
          </p>
        </div>

        <div className="space-y-4">
          <Button asChild className="w-full h-11">
            <Link href="/login">Back to login</Link>
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Didn&apos;t receive the email?{' '}
            <button
              onClick={() => setIsSubmitted(false)}
              className="font-medium text-primary hover:underline"
            >
              Click to resend
            </button>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Mobile Logo */}
      <div className="flex items-center justify-center gap-2 lg:hidden">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
          <span className="text-lg font-bold text-primary-foreground">N</span>
        </div>
        <span className="text-xl font-semibold">NexusBank</span>
      </div>

      <div className="space-y-2 text-center lg:text-left">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted mx-auto lg:mx-0">
          <Mail className="h-6 w-6 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight mt-4">Forgot password?</h1>
        <p className="text-muted-foreground">
          No worries, we&apos;ll send you reset instructions.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="h-11"
          />
        </div>

        <Button type="submit" className="w-full h-11" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            'Reset password'
          )}
        </Button>
      </form>

      <Link
        href="/login"
        className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to login
      </Link>
    </div>
  )
}
