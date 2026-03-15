'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Loader2, Shield, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { OTPInput } from '@/components/banking/otp-input'

export default function MFAVerifyPage() {
  const router = useRouter()
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError('Please enter the complete verification code')
      return
    }

    setError('')
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Demo: accept any 6-digit code
    router.push('/dashboard')
  }

  const handleResend = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    // Show success message
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

      <div className="space-y-2 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight mt-4">Two-factor authentication</h1>
        <p className="text-muted-foreground">
          Enter the 6-digit code from your authenticator app
        </p>
      </div>

      <div className="space-y-6">
        {error && (
          <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive text-center">
            {error}
          </div>
        )}

        <div className="flex justify-center">
          <OTPInput
            length={6}
            onChange={setOtp}
            onComplete={handleVerify}
            error={!!error}
          />
        </div>

        <Button
          onClick={handleVerify}
          className="w-full h-11"
          disabled={isLoading || otp.length !== 6}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            'Verify'
          )}
        </Button>

        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Didn&apos;t receive a code?{' '}
            <button
              onClick={handleResend}
              disabled={isLoading}
              className="font-medium text-primary hover:underline disabled:opacity-50"
            >
              Resend code
            </button>
          </p>

          <div className="flex items-center gap-2 justify-center text-sm text-muted-foreground">
            <Smartphone className="h-4 w-4" />
            <span>Using SMS verification?</span>
            <button className="font-medium text-primary hover:underline">
              Switch method
            </button>
          </div>
        </div>
      </div>

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
