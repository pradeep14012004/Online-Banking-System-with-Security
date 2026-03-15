'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  ArrowDownLeft,
  TrendingUp,
  Wallet,
  CreditCard,
  PiggyBank,
  ChevronRight,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AccountCard } from '@/components/banking/account-card'
import { TransactionList } from '@/components/banking/transaction-list'
import { QuickActions } from '@/components/banking/quick-actions'
import { useBankingStore } from '@/lib/store/banking-store'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { mockMonthlySpending } from '@/lib/data/mock-data'

export default function DashboardPage() {
  const { user, accounts, transactions } = useBankingStore()

  const totalBalance = useMemo(() => {
    return accounts.reduce((sum, acc) => sum + acc.balance, 0)
  }, [accounts])

  const recentTransactions = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5)
  }, [transactions])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back, {user?.firstName}
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s an overview of your finances
        </p>
      </div>

      {/* Total Balance Card */}
      <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary-foreground/80">
                Total Balance
              </p>
              <p className="mt-2 text-4xl font-bold">{formatCurrency(totalBalance)}</p>
              <div className="mt-2 flex items-center gap-2 text-sm">
                <span className="flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5">
                  <TrendingUp className="h-3 w-3" />
                  +12.5%
                </span>
                <span className="text-primary-foreground/70">vs last month</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                    <ArrowDownLeft className="h-5 w-5" />
                  </div>
                  <p className="mt-2 text-xs text-primary-foreground/70">Income</p>
                  <p className="font-semibold">$7,500</p>
                </div>
                <div className="text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                  <p className="mt-2 text-xs text-primary-foreground/70">Expenses</p>
                  <p className="font-semibold">$4,450</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
        <QuickActions />
      </section>

      {/* Accounts Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Your Accounts</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/accounts" className="text-primary">
              View all
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {accounts.map((account) => (
            <AccountCard
              key={account.id}
              account={account}
              onClick={() => {}}
            />
          ))}
        </div>
      </section>

      {/* Charts and Recent Transactions */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Spending Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Spending Overview</CardTitle>
            <CardDescription>Your income vs expenses over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockMonthlySpending}>
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                    formatter={(value: number) => [formatCurrency(value), '']}
                  />
                  <Area
                    type="monotone"
                    dataKey="income"
                    stroke="hsl(var(--chart-1))"
                    fillOpacity={1}
                    fill="url(#colorIncome)"
                    strokeWidth={2}
                    name="Income"
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="hsl(var(--chart-2))"
                    fillOpacity={1}
                    fill="url(#colorExpenses)"
                    strokeWidth={2}
                    name="Expenses"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest account activity</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/transactions" className="text-primary">
                View all
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <TransactionList
              transactions={recentTransactions}
              onTransactionClick={(txn) => console.log('Transaction clicked', txn)}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
