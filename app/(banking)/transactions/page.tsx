'use client'

import { useState, useMemo } from 'react'
import { format } from 'date-fns'
import {
  Search,
  Filter,
  Download,
  Calendar,
  ChevronDown,
  X,
  ArrowUpRight,
  ArrowDownLeft,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { TransactionList } from '@/components/banking/transaction-list'
import { useBankingStore } from '@/lib/store/banking-store'
import type { Transaction, TransactionCategory, TransactionStatus } from '@/lib/types/banking'
import { cn } from '@/lib/utils'

const categories: { value: TransactionCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Categories' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'food', label: 'Food & Dining' },
  { value: 'utilities', label: 'Utilities' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'transfer', label: 'Transfers' },
  { value: 'deposit', label: 'Deposits' },
]

const statuses: { value: TransactionStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All Statuses' },
  { value: 'completed', label: 'Completed' },
  { value: 'pending', label: 'Pending' },
  { value: 'failed', label: 'Failed' },
  { value: 'flagged', label: 'Flagged' },
]

export default function TransactionsPage() {
  const { accounts, transactions } = useBankingStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAccount, setSelectedAccount] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<TransactionCategory | 'all'>('all')
  const [selectedStatus, setSelectedStatus] = useState<TransactionStatus | 'all'>('all')
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions]

    // Filter by account
    if (selectedAccount !== 'all') {
      filtered = filtered.filter((txn) => txn.accountId === selectedAccount)
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((txn) => txn.category === selectedCategory)
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter((txn) => txn.status === selectedStatus)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (txn) =>
          txn.description.toLowerCase().includes(query) ||
          txn.merchantName?.toLowerCase().includes(query) ||
          txn.reference.toLowerCase().includes(query)
      )
    }

    // Filter by date range
    if (dateRange.from) {
      filtered = filtered.filter((txn) => new Date(txn.date) >= dateRange.from!)
    }
    if (dateRange.to) {
      filtered = filtered.filter((txn) => new Date(txn.date) <= dateRange.to!)
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return filtered
  }, [transactions, selectedAccount, selectedCategory, selectedStatus, searchQuery, dateRange])

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount)
  }

  const totalIncome = useMemo(() => {
    return filteredTransactions
      .filter((txn) => txn.type === 'credit')
      .reduce((sum, txn) => sum + txn.amount, 0)
  }, [filteredTransactions])

  const totalExpenses = useMemo(() => {
    return filteredTransactions
      .filter((txn) => txn.type === 'debit')
      .reduce((sum, txn) => sum + txn.amount, 0)
  }, [filteredTransactions])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedAccount('all')
    setSelectedCategory('all')
    setSelectedStatus('all')
    setDateRange({})
  }

  const hasActiveFilters =
    searchQuery ||
    selectedAccount !== 'all' ||
    selectedCategory !== 'all' ||
    selectedStatus !== 'all' ||
    dateRange.from ||
    dateRange.to

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">
            View and manage all your transaction history
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download Statement
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <ArrowDownLeft className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Income</p>
                <p className="text-xl font-bold text-green-600">
                  +{formatCurrency(totalIncome, 'USD')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <ArrowUpRight className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Expenses</p>
                <p className="text-xl font-bold text-red-600">
                  -{formatCurrency(totalExpenses, 'USD')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Filter className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Transactions</p>
                <p className="text-xl font-bold">{filteredTransactions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Account Filter */}
            <Select value={selectedAccount} onValueChange={setSelectedAccount}>
              <SelectTrigger className="w-full lg:w-[180px]">
                <SelectValue placeholder="All Accounts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Accounts</SelectItem>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Category Filter */}
            <Select
              value={selectedCategory}
              onValueChange={(v) => setSelectedCategory(v as TransactionCategory | 'all')}
            >
              <SelectTrigger className="w-full lg:w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select
              value={selectedStatus}
              onValueChange={(v) => setSelectedStatus(v as TransactionStatus | 'all')}
            >
              <SelectTrigger className="w-full lg:w-[150px]">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Date Range */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full lg:w-auto justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, 'LLL dd')} - {format(dateRange.to, 'LLL dd')}
                      </>
                    ) : (
                      format(dateRange.from, 'LLL dd, yyyy')
                    )
                  ) : (
                    'Pick dates'
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <CalendarComponent
                  mode="range"
                  selected={{ from: dateRange.from, to: dateRange.to }}
                  onSelect={(range) => setDateRange({ from: range?.from, to: range?.to })}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="mr-2 h-4 w-4" />
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Transaction List */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TransactionList
            transactions={filteredTransactions}
            onTransactionClick={setSelectedTransaction}
          />
        </CardContent>
      </Card>

      {/* Transaction Details Dialog */}
      <Dialog
        open={!!selectedTransaction}
        onOpenChange={() => setSelectedTransaction(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>
              Reference: {selectedTransaction?.reference}
            </DialogDescription>
          </DialogHeader>

          {selectedTransaction && (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-center">
                <div
                  className={cn(
                    'flex h-16 w-16 items-center justify-center rounded-full',
                    selectedTransaction.type === 'credit'
                      ? 'bg-green-100 dark:bg-green-900/30'
                      : 'bg-red-100 dark:bg-red-900/30'
                  )}
                >
                  {selectedTransaction.type === 'credit' ? (
                    <ArrowDownLeft className="h-8 w-8 text-green-600 dark:text-green-400" />
                  ) : (
                    <ArrowUpRight className="h-8 w-8 text-red-600 dark:text-red-400" />
                  )}
                </div>
              </div>

              <div className="text-center">
                <p
                  className={cn(
                    'text-3xl font-bold',
                    selectedTransaction.type === 'credit'
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-foreground'
                  )}
                >
                  {selectedTransaction.type === 'credit' ? '+' : '-'}
                  {formatCurrency(selectedTransaction.amount, selectedTransaction.currency)}
                </p>
                <p className="mt-1 text-muted-foreground">
                  {selectedTransaction.description}
                </p>
              </div>

              <div className="rounded-lg border divide-y">
                <div className="flex justify-between p-3">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">
                    {format(new Date(selectedTransaction.date), 'PPpp')}
                  </span>
                </div>
                <div className="flex justify-between p-3">
                  <span className="text-muted-foreground">Category</span>
                  <Badge variant="secondary">
                    {selectedTransaction.category.charAt(0).toUpperCase() +
                      selectedTransaction.category.slice(1)}
                  </Badge>
                </div>
                <div className="flex justify-between p-3">
                  <span className="text-muted-foreground">Status</span>
                  <Badge
                    variant={
                      selectedTransaction.status === 'completed'
                        ? 'default'
                        : selectedTransaction.status === 'pending'
                        ? 'secondary'
                        : 'destructive'
                    }
                  >
                    {selectedTransaction.status.charAt(0).toUpperCase() +
                      selectedTransaction.status.slice(1)}
                  </Badge>
                </div>
                {selectedTransaction.merchantName && (
                  <div className="flex justify-between p-3">
                    <span className="text-muted-foreground">Merchant</span>
                    <span className="font-medium">{selectedTransaction.merchantName}</span>
                  </div>
                )}
                <div className="flex justify-between p-3">
                  <span className="text-muted-foreground">Balance After</span>
                  <span className="font-medium">
                    {formatCurrency(selectedTransaction.balanceAfter, selectedTransaction.currency)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
