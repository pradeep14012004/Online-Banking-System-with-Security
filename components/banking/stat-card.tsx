'use client'

import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface StatCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: React.ReactNode
  className?: string
  variant?: 'default' | 'success' | 'warning' | 'danger'
}

const variantStyles = {
  default: 'border-border',
  success: 'border-l-4 border-l-green-500',
  warning: 'border-l-4 border-l-yellow-500',
  danger: 'border-l-4 border-l-red-500',
}

export function StatCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  className,
  variant = 'default',
}: StatCardProps) {
  const getTrendIcon = () => {
    if (!change || change === 0) return <Minus className="h-3 w-3" />
    if (change > 0) return <TrendingUp className="h-3 w-3" />
    return <TrendingDown className="h-3 w-3" />
  }

  const getTrendColor = () => {
    if (!change || change === 0) return 'text-muted-foreground'
    if (change > 0) return 'text-green-600 dark:text-green-400'
    return 'text-red-600 dark:text-red-400'
  }

  return (
    <Card className={cn(variantStyles[variant], className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {(change !== undefined || changeLabel) && (
              <div className={cn('flex items-center gap-1 text-sm', getTrendColor())}>
                {getTrendIcon()}
                <span>
                  {change !== undefined && (change > 0 ? '+' : '')}
                  {change !== undefined && `${change}%`}
                  {changeLabel && ` ${changeLabel}`}
                </span>
              </div>
            )}
          </div>
          {icon && (
            <div className="rounded-lg bg-muted p-2.5">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
