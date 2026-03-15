'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import {
  CreditCard,
  Plus,
  Zap,
  Wifi,
  Phone,
  Home,
  Car,
  GraduationCap,
  MoreHorizontal,
  Pause,
  Play,
  Trash2,
  Clock,
  CheckCircle2,
  Loader2,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useBankingStore } from '@/lib/store/banking-store'
import { mockScheduledPayments } from '@/lib/data/mock-data'
import { cn } from '@/lib/utils'

const billCategories = [
  { id: 'electricity', name: 'Electricity', icon: Zap, color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
  { id: 'internet', name: 'Internet', icon: Wifi, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  { id: 'phone', name: 'Phone', icon: Phone, color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  { id: 'rent', name: 'Rent/Mortgage', icon: Home, color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
  { id: 'car', name: 'Car Insurance', icon: Car, color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' },
  { id: 'education', name: 'Education', icon: GraduationCap, color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400' },
]

const recentPayments = [
  { id: '1', payee: 'City Power Co.', amount: 185.50, date: new Date('2024-03-12'), status: 'completed' },
  { id: '2', payee: 'Internet Provider', amount: 79.99, date: new Date('2024-03-01'), status: 'completed' },
  { id: '3', payee: 'Mobile Carrier', amount: 65.00, date: new Date('2024-02-28'), status: 'completed' },
  { id: '4', payee: 'Water Utility', amount: 45.30, date: new Date('2024-02-25'), status: 'completed' },
]

export default function PaymentsPage() {
  const { accounts } = useBankingStore()
  const [scheduledPayments, setScheduledPayments] = useState(mockScheduledPayments)
  const [isPayBillOpen, setIsPayBillOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<typeof billCategories[0] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const [formData, setFormData] = useState({
    fromAccount: '',
    payee: '',
    accountNumber: '',
    amount: '',
    scheduleDate: '',
    isRecurring: false,
    frequency: 'monthly',
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const handlePayBill = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setPaymentSuccess(true)
  }

  const handleCloseDialog = () => {
    setIsPayBillOpen(false)
    setSelectedCategory(null)
    setPaymentSuccess(false)
    setFormData({
      fromAccount: '',
      payee: '',
      accountNumber: '',
      amount: '',
      scheduleDate: '',
      isRecurring: false,
      frequency: 'monthly',
    })
  }

  const togglePaymentStatus = (id: string) => {
    setScheduledPayments((prev) =>
      prev.map((payment) =>
        payment.id === id
          ? { ...payment, status: payment.status === 'active' ? 'paused' : 'active' }
          : payment
      )
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground">
            Pay bills and manage scheduled payments
          </p>
        </div>
        <Button onClick={() => setIsPayBillOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Pay a Bill
        </Button>
      </div>

      {/* Quick Pay Categories */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">Quick Pay</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {billCategories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category)
                  setIsPayBillOpen(true)
                }}
                className="flex flex-col items-center gap-3 rounded-xl border bg-card p-4 text-center transition-all hover:bg-accent/50 hover:shadow-md"
              >
                <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl', category.color)}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            )
          })}
        </div>
      </section>

      {/* Main Content */}
      <Tabs defaultValue="scheduled">
        <TabsList>
          <TabsTrigger value="scheduled">Scheduled Payments</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
        </TabsList>

        <TabsContent value="scheduled" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Payments</CardTitle>
              <CardDescription>Manage your recurring and scheduled payments</CardDescription>
            </CardHeader>
            <CardContent>
              {scheduledPayments.length > 0 ? (
                <div className="space-y-4">
                  {scheduledPayments.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                          <CreditCard className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">{payment.payee}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>
                              Next: {format(payment.nextPaymentDate, 'MMM d, yyyy')}
                            </span>
                            <span>•</span>
                            <span className="capitalize">{payment.frequency}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold">{formatCurrency(payment.amount)}</p>
                          <Badge
                            variant={payment.status === 'active' ? 'default' : 'secondary'}
                            className="mt-1"
                          >
                            {payment.status}
                          </Badge>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => togglePaymentStatus(payment.id)}>
                              {payment.status === 'active' ? (
                                <>
                                  <Pause className="mr-2 h-4 w-4" />
                                  Pause Payment
                                </>
                              ) : (
                                <>
                                  <Play className="mr-2 h-4 w-4" />
                                  Resume Payment
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Cancel Payment
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <Clock className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">No scheduled payments</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Set up recurring payments to automate your bills
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>View your recent bill payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPayments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium">{payment.payee}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(payment.date, 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold">-{formatCurrency(payment.amount)}</p>
                      <Badge variant="secondary" className="mt-1">
                        Completed
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Pay Bill Dialog */}
      <Dialog open={isPayBillOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-md">
          {!paymentSuccess ? (
            <>
              <DialogHeader>
                <DialogTitle>
                  {selectedCategory ? `Pay ${selectedCategory.name} Bill` : 'Pay a Bill'}
                </DialogTitle>
                <DialogDescription>
                  Enter the payment details below
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handlePayBill} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fromAccount">From Account</Label>
                  <Select
                    value={formData.fromAccount}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, fromAccount: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts
                        .filter((acc) => acc.type !== 'credit')
                        .map((account) => (
                          <SelectItem key={account.id} value={account.id}>
                            {account.name} - {formatCurrency(account.balance)}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payee">Payee / Biller Name</Label>
                  <Input
                    id="payee"
                    placeholder="e.g., City Power Co."
                    value={formData.payee}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, payee: e.target.value }))
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account / Reference Number</Label>
                  <Input
                    id="accountNumber"
                    placeholder="Enter your account number"
                    value={formData.accountNumber}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, accountNumber: e.target.value }))
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={formData.amount}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, amount: e.target.value }))
                      }
                      className="pl-8"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={handleCloseDialog}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Pay Now'
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center py-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <DialogTitle className="mt-4">Payment Successful!</DialogTitle>
              <DialogDescription className="mt-2">
                Your payment of {formatCurrency(parseFloat(formData.amount) || 0)} to{' '}
                {formData.payee} has been processed.
              </DialogDescription>
              <Button className="mt-6" onClick={handleCloseDialog}>
                Done
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
