'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  SendHorizontal,
  Receipt,
  UserPlus,
  QrCode,
  ArrowLeftRight,
  CreditCard,
} from 'lucide-react'

const actions = [
  {
    label: 'Send Money',
    href: '/transfers',
    icon: SendHorizontal,
    color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  },
  {
    label: 'Pay Bills',
    href: '/payments',
    icon: Receipt,
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  },
  {
    label: 'Add Beneficiary',
    href: '/beneficiaries',
    icon: UserPlus,
    color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  },
  {
    label: 'Transfer',
    href: '/transfers',
    icon: ArrowLeftRight,
    color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  },
]

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {actions.map((action) => {
        const Icon = action.icon
        return (
          <Link
            key={action.label}
            href={action.href}
            className="flex flex-col items-center gap-3 rounded-xl bg-card p-4 text-center transition-all hover:bg-accent/50 hover:shadow-md"
          >
            <div
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-xl',
                action.color
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium">{action.label}</span>
          </Link>
        )
      })}
    </div>
  )
}
