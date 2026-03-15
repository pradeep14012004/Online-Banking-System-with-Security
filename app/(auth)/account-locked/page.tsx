'use client'

import Link from 'next/link'
import { Lock, Phone, Mail, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AccountLockedPage() {
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
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
          <Lock className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight mt-4">Account locked</h1>
        <p className="text-muted-foreground max-w-sm mx-auto">
          Your account has been temporarily locked due to multiple failed login attempts or suspicious activity.
        </p>
      </div>

      <div className="rounded-xl border bg-card p-6 space-y-4">
        <h2 className="font-semibold">What you can do:</h2>
        <ul className="space-y-3 text-sm">
          <li className="flex items-start gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
              1
            </div>
            <span>Wait 30 minutes and try logging in again with the correct credentials.</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
              2
            </div>
            <span>Reset your password if you&apos;ve forgotten your login details.</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
              3
            </div>
            <span>Contact our support team for immediate assistance.</span>
          </li>
        </ul>
      </div>

      <div className="space-y-3">
        <Button asChild className="w-full h-11">
          <Link href="/forgot-password">Reset password</Link>
        </Button>
        <Button variant="outline" className="w-full h-11" asChild>
          <Link href="/login">Try again</Link>
        </Button>
      </div>

      <div className="rounded-xl border bg-muted/50 p-4">
        <h3 className="font-semibold mb-3">Need help?</h3>
        <div className="space-y-2">
          <a
            href="tel:1-800-NEXUS-BANK"
            className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground"
          >
            <Phone className="h-4 w-4" />
            <span>1-800-NEXUS-BANK (24/7)</span>
          </a>
          <a
            href="mailto:support@nexusbank.com"
            className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground"
          >
            <Mail className="h-4 w-4" />
            <span>support@nexusbank.com</span>
          </a>
          <Link
            href="/help"
            className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground"
          >
            <HelpCircle className="h-4 w-4" />
            <span>Help Center</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
