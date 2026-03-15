'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Monitor, Smartphone, Mail, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { OTPInput } from '@/components/banking/otp-input'

export default function DeviceVerifyPage() {
  const router = useRouter()
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [verificationSent, setVerificationSent] = useState(false)

  // Mock device info
  const deviceInfo = {
    device: 'Chrome on Windows',
    location: 'New York, NY',
    ip: '192.168.1.100',
    time: 'Just now',
  }

  const handleSendCode = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setVerificationSent(true)
    setIsLoading(false)
  }

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError('Please enter the complete verification code')
      return
    }

    setError('')
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Demo: accept any 6-digit code
    router.push('/dashboard')
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
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30">
          <Monitor className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight mt-4">New device detected</h1>
        <p className="text-muted-foreground">
          We noticed you&apos;re signing in from a new device. Please verify your identity.
        </p>
      </div>

      {/* Device Info Card */}
      <div className="rounded-xl border bg-card p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
            <Monitor className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium">{deviceInfo.device}</p>
            <p className="text-sm text-muted-foreground">{deviceInfo.location}</p>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">IP Address</span>
          <span className="font-mono">{deviceInfo.ip}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Time</span>
          <span>{deviceInfo.time}</span>
        </div>
      </div>

      {!verificationSent ? (
        <div className="space-y-4">
          <p className="text-sm text-center text-muted-foreground">
            We&apos;ll send a verification code to your registered email address.
          </p>
          <Button onClick={handleSendCode} className="w-full h-11" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Send verification code
              </>
            )}
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center gap-2 justify-center text-sm text-green-600 dark:text-green-400">
            <CheckCircle2 className="h-4 w-4" />
            <span>Verification code sent to your email</span>
          </div>

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
              'Verify device'
            )}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Didn&apos;t receive a code?{' '}
            <button
              onClick={handleSendCode}
              disabled={isLoading}
              className="font-medium text-primary hover:underline disabled:opacity-50"
            >
              Resend
            </button>
          </p>
        </div>
      )}

      <Button variant="outline" className="w-full" onClick={() => router.push('/login')}>
        This wasn&apos;t me
      </Button>
    </div>
  )
}
