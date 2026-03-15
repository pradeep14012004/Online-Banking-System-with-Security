'use client'

import { useState, useMemo } from 'react'
import {
  Wallet,
  PiggyBank,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Eye,
  EyeOff,
  Download,
  Plus,
  ChevronRight,
  MoreHorizontal,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AccountCard } from '@/components/banking/account-card'
import { TransactionList } from '@/components/banking/transaction-list'
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
import type { Account } from '@/lib/types/banking'

const accountBalanceHistory = [
  { date: 'Jan', balance: 18500 },
  { date: 'Feb', balance: 21200 },
  { date: 'Mar', balance: 19800 },
  { date: 'Apr', balance: 22500 },
  { date: 'May', balance: 23100 },
  { date: 'Jun', balance: 24580 },
]

export default function AccountsPage() {
  const { accounts, transactions, selectAccount, selectedAccountId } = useBankingStore()
  const [hideBalances, setHideBalances] = useState(false)

  const selectedAccount = useMemo(() => {
    return accounts.find((acc) => acc.id === selectedAccountId) || accounts[0]
  }, [accounts, selectedAccountId])

  const accountTransactions = useMemo(() => {
    if (!selectedAccount) return []
    return transactions
      .filter((txn) => txn.accountId === selectedAccount.id)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [transactions, selectedAccount])

  const formatCurrency = (amount: number, hide = false) => {
    if (hide) return '••••••'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(Math.abs(amount))
  }

  const totalBalance = useMemo(() => {
    return accounts.reduce((sum, acc) => sum + acc.balance, 0)
  }, [accounts])

  const getAccountTypeIcon = (type: Account['type']) => {
    switch (type) {
      case 'checking':
        return <Wallet className="h-5 w-5" />
      case 'savings':
        return <PiggyBank className="h-5 w-5" />
      case 'credit':
        return <CreditCard className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Accounts</h1>
          <p className="text-muted-foreground">
            Manage and monitor all your accounts
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setHideBalances(!hideBalances)}
          >
            {hideBalances ? (
              <>
                <Eye className="mr-2 h-4 w-4" />
                Show balances
              </>
            ) : (
              <>
                <EyeOff className="mr-2 h-4 w-4" />
                Hide balances
              </>
            )}
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Account
          </Button>
        </div>
      </div>

      {/* Total Balance Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="md:col-span-2 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-primary-foreground/80">
              Total Net Worth
            </p>
            <p className="mt-2 text-3xl font-bold">
              {formatCurrency(totalBalance, hideBalances)}
            </p>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>+$3,240 this month</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Income</p>
                <p className="text-lg font-semibold">
                  {formatCurrency(7500, hideBalances)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
                <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Expenses</p>
                <p className="text-lg font-semibold">
                  {formatCurrency(4450, hideBalances)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Cards */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">Your Accounts</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {accounts.map((account) => (
            <AccountCard
              key={account.id}
              account={{
                ...account,
                balance: hideBalances ? 0 : account.balance,
                availableBalance: hideBalances ? 0 : account.availableBalance,
              }}
              isSelected={account.id === selectedAccount?.id}
              onClick={() => selectAccount(account.id)}
            />
          ))}
        </div>
      </section>

      {/* Selected Account Details */}
      {selectedAccount && (
        <Card>
          <CardHeader className="flex flex-row items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {getAccountTypeIcon(selectedAccount.type)}
              </div>
              <div>
                <CardTitle>{selectedAccount.name}</CardTitle>
                <CardDescription>
                  Account {selectedAccount.accountNumber} • {selectedAccount.type.charAt(0).toUpperCase() + selectedAccount.type.slice(1)}
                </CardDescription>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  Download Statement
                </DropdownMenuItem>
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Set Alerts</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="transactions">
              <TabsList>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="transactions" className="mt-6">
                <TransactionList
                  transactions={accountTransactions.slice(0, 10)}
                  onTransactionClick={(txn) => console.log('Transaction clicked', txn)}
                />
              </TabsContent>

              <TabsContent value="analytics" className="mt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Balance History</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Your account balance over the last 6 months
                    </p>
                  </div>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={accountBalanceHistory}>
                        <defs>
                          <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis
                          dataKey="date"
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
                          formatter={(value: number) => [formatCurrency(value), 'Balance']}
                        />
                        <Area
                          type="monotone"
                          dataKey="balance"
                          stroke="hsl(var(--primary))"
                          fillOpacity={1}
                          fill="url(#colorBalance)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
