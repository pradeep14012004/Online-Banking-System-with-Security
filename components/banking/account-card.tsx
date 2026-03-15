'use client'

import { cn } from '@/lib/utils'
import { Wallet, PiggyBank, CreditCard, TrendingUp, TrendingDown } from 'lucide-react'
import type { Account } from '@/lib/types/banking'

interface AccountCardProps {
  account: Account
  onClick?: () => void
  isSelected?: boolean
}

const accountTypeConfig = {
  checking: {
    icon: Wallet,
    gradient: 'from-emerald-500 to-teal-600',
    bgPattern: 'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))]',
  },
  savings: {
    icon: PiggyBank,
    gradient: 'from-blue-500 to-indigo-600',
    bgPattern: 'bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))]',
  },
  credit: {
    icon: CreditCard,
    gradient: 'from-slate-700 to-slate-900',
    bgPattern: 'bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))]',
  },
}

export function AccountCard({ account, onClick, isSelected }: AccountCardProps) {
  const config = accountTypeConfig[account.type]
  const Icon = config.icon

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: account.currency,
    }).format(Math.abs(amount))
  }

  const isNegative = account.balance < 0

  return (
    <button
      onClick={onClick}
      className={cn(
        'relative w-full overflow-hidden rounded-2xl p-6 text-left text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl',
        config.bgPattern,
        config.gradient,
        isSelected && 'ring-2 ring-white ring-offset-2 ring-offset-background'
      )}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-white/80">{account.name}</p>
            <p className="mt-1 text-xs text-white/60">{account.accountNumber}</p>
          </div>
          <div className="rounded-full bg-white/20 p-2">
            <Icon className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs text-white/70">
            {account.type === 'credit' ? 'Current Balance' : 'Available Balance'}
          </p>
          <div className="mt-1 flex items-center gap-2">
            <p className="text-2xl font-bold">
              {isNegative && '-'}
              {formatCurrency(account.balance)}
            </p>
            {account.type !== 'credit' && (
              <span
                className={cn(
                  'flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium',
                  'bg-white/20 text-white'
                )}
              >
                <TrendingUp className="h-3 w-3" />
                +2.4%
              </span>
            )}
          </div>
        </div>

        {account.type === 'credit' && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-white/70">
              <span>Credit Available</span>
              <span>{formatCurrency(account.availableBalance)}</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-white"
                style={{
                  width: `${(Math.abs(account.balance) / (Math.abs(account.balance) + account.availableBalance)) * 100}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </button>
  )
}
