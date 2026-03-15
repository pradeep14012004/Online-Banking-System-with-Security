'use client'

import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import {
  ArrowUpRight,
  ArrowDownLeft,
  ShoppingBag,
  Utensils,
  Zap,
  Car,
  Film,
  Heart,
  MoreHorizontal,
  ArrowLeftRight,
  CreditCard,
  Banknote,
  HelpCircle,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Transaction } from '@/lib/types/banking'

interface TransactionListProps {
  transactions: Transaction[]
  showAccount?: boolean
  onTransactionClick?: (transaction: Transaction) => void
}

const categoryIcons: Record<string, React.ElementType> = {
  shopping: ShoppingBag,
  food: Utensils,
  utilities: Zap,
  transportation: Car,
  entertainment: Film,
  healthcare: Heart,
  transfer: ArrowLeftRight,
  payment: CreditCard,
  deposit: Banknote,
  withdrawal: Banknote,
  other: HelpCircle,
}

const categoryColors: Record<string, string> = {
  shopping: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  food: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  utilities: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  transportation: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  entertainment: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  healthcare: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  transfer: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  payment: 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400',
  deposit: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  withdrawal: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400',
  other: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400',
}

const statusColors: Record<string, string> = {
  completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  failed: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  flagged: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
}

export function TransactionList({
  transactions,
  showAccount = false,
  onTransactionClick,
}: TransactionListProps) {
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount)
  }

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-4">
          <ArrowLeftRight className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-semibold">No transactions</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Your transactions will appear here
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {transactions.map((transaction) => {
        const Icon = categoryIcons[transaction.category] || HelpCircle
        const isCredit = transaction.type === 'credit'

        return (
          <button
            key={transaction.id}
            onClick={() => onTransactionClick?.(transaction)}
            className="flex w-full items-center gap-4 rounded-xl bg-card p-4 text-left transition-colors hover:bg-accent/50"
          >
            {/* Icon */}
            <div
              className={cn(
                'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl',
                categoryColors[transaction.category]
              )}
            >
              <Icon className="h-5 w-5" />
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-medium truncate">{transaction.description}</p>
                  <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{format(new Date(transaction.date), 'MMM d, yyyy')}</span>
                    {transaction.merchantName && (
                      <>
                        <span className="text-muted-foreground/50">•</span>
                        <span className="truncate">{transaction.merchantName}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p
                    className={cn(
                      'font-semibold',
                      isCredit ? 'text-green-600 dark:text-green-400' : 'text-foreground'
                    )}
                  >
                    {isCredit ? '+' : '-'}
                    {formatCurrency(transaction.amount, transaction.currency)}
                  </p>
                  <Badge
                    variant="secondary"
                    className={cn('mt-1 text-xs', statusColors[transaction.status])}
                  >
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Arrow indicator */}
            <div
              className={cn(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                isCredit
                  ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
              )}
            >
              {isCredit ? (
                <ArrowDownLeft className="h-4 w-4" />
              ) : (
                <ArrowUpRight className="h-4 w-4" />
              )}
            </div>
          </button>
        )
      })}
    </div>
  )
}
