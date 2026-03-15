'use client'

import { useState } from 'react'
import {
  ArrowLeftRight,
  Send,
  Building2,
  Users,
  Clock,
  CheckCircle2,
  Loader2,
  ChevronRight,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { OTPInput } from '@/components/banking/otp-input'
import { useBankingStore } from '@/lib/store/banking-store'
import { cn } from '@/lib/utils'

type TransferStep = 'form' | 'confirm' | 'otp' | 'success'

export default function TransfersPage() {
  const { accounts, beneficiaries } = useBankingStore()
  const [step, setStep] = useState<TransferStep>('form')
  const [isLoading, setIsLoading] = useState(false)
  const [transferType, setTransferType] = useState<'internal' | 'beneficiary'>('internal')

  const [formData, setFormData] = useState({
    fromAccount: '',
    toAccount: '',
    beneficiaryId: '',
    amount: '',
    description: '',
  })

  const [otp, setOtp] = useState('')
  const [otpError, setOtpError] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const selectedFromAccount = accounts.find((acc) => acc.id === formData.fromAccount)
  const selectedToAccount = accounts.find((acc) => acc.id === formData.toAccount)
  const selectedBeneficiary = beneficiaries.find((ben) => ben.id === formData.beneficiaryId)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('confirm')
  }

  const handleConfirm = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setStep('otp')
  }

  const handleOTPComplete = async (code: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Demo: any 6-digit code works
    if (code.length === 6) {
      setStep('success')
    } else {
      setOtpError(true)
    }
    setIsLoading(false)
  }

  const handleNewTransfer = () => {
    setStep('form')
    setFormData({
      fromAccount: '',
      toAccount: '',
      beneficiaryId: '',
      amount: '',
      description: '',
    })
    setOtp('')
    setOtpError(false)
  }

  const quickAmounts = [100, 250, 500, 1000]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Transfers</h1>
        <p className="text-muted-foreground">
          Send money to your accounts or other people
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Transfer Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>New Transfer</CardTitle>
              <CardDescription>
                Choose transfer type and enter the details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={transferType} onValueChange={(v) => setTransferType(v as 'internal' | 'beneficiary')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="internal">
                    <ArrowLeftRight className="mr-2 h-4 w-4" />
                    Between Accounts
                  </TabsTrigger>
                  <TabsTrigger value="beneficiary">
                    <Users className="mr-2 h-4 w-4" />
                    To Beneficiary
                  </TabsTrigger>
                </TabsList>

                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                  {/* From Account */}
                  <div className="space-y-2">
                    <Label htmlFor="fromAccount">From Account</Label>
                    <Select
                      value={formData.fromAccount}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, fromAccount: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select source account" />
                      </SelectTrigger>
                      <SelectContent>
                        {accounts
                          .filter((acc) => acc.type !== 'credit')
                          .map((account) => (
                            <SelectItem key={account.id} value={account.id}>
                              <div className="flex items-center justify-between gap-4">
                                <span>{account.name}</span>
                                <span className="text-muted-foreground">
                                  {formatCurrency(account.balance)}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <TabsContent value="internal" className="m-0 space-y-6">
                    {/* To Account (Internal) */}
                    <div className="space-y-2">
                      <Label htmlFor="toAccount">To Account</Label>
                      <Select
                        value={formData.toAccount}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, toAccount: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select destination account" />
                        </SelectTrigger>
                        <SelectContent>
                          {accounts
                            .filter((acc) => acc.id !== formData.fromAccount)
                            .map((account) => (
                              <SelectItem key={account.id} value={account.id}>
                                <div className="flex items-center justify-between gap-4">
                                  <span>{account.name}</span>
                                  <span className="text-muted-foreground">
                                    {formatCurrency(account.balance)}
                                  </span>
                                </div>
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>

                  <TabsContent value="beneficiary" className="m-0 space-y-6">
                    {/* Beneficiary */}
                    <div className="space-y-2">
                      <Label htmlFor="beneficiary">Beneficiary</Label>
                      <Select
                        value={formData.beneficiaryId}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, beneficiaryId: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a beneficiary" />
                        </SelectTrigger>
                        <SelectContent>
                          {beneficiaries.map((beneficiary) => (
                            <SelectItem key={beneficiary.id} value={beneficiary.id}>
                              <div className="flex items-center gap-2">
                                <span>{beneficiary.name}</span>
                                <span className="text-muted-foreground">
                                  ({beneficiary.bankName})
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>

                  {/* Amount */}
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
                      />
                    </div>
                    <div className="flex gap-2 mt-2">
                      {quickAmounts.map((amount) => (
                        <Button
                          key={amount}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, amount: amount.toString() }))
                          }
                        >
                          ${amount}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description (optional)</Label>
                    <Input
                      id="description"
                      placeholder="What's this transfer for?"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, description: e.target.value }))
                      }
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={
                      !formData.fromAccount ||
                      !formData.amount ||
                      (transferType === 'internal' && !formData.toAccount) ||
                      (transferType === 'beneficiary' && !formData.beneficiaryId)
                    }
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Continue
                  </Button>
                </form>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Recent & Favorites */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Favorite Recipients</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {beneficiaries
                .filter((b) => b.isFavorite)
                .map((beneficiary) => (
                  <button
                    key={beneficiary.id}
                    onClick={() => {
                      setTransferType('beneficiary')
                      setFormData((prev) => ({ ...prev, beneficiaryId: beneficiary.id }))
                    }}
                    className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-muted"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      {beneficiary.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{beneficiary.name}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {beneficiary.bankName}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Transfer Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  Internal transfers are instant. External transfers may take 1-3 business days.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  Wire transfers are available for amounts over $10,000.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={step === 'confirm'} onOpenChange={() => setStep('form')}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Transfer</DialogTitle>
            <DialogDescription>
              Please review the transfer details before proceeding
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="rounded-lg border p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">From</span>
                <span className="font-medium">{selectedFromAccount?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">To</span>
                <span className="font-medium">
                  {transferType === 'internal'
                    ? selectedToAccount?.name
                    : selectedBeneficiary?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="text-xl font-bold text-primary">
                  {formatCurrency(parseFloat(formData.amount) || 0)}
                </span>
              </div>
              {formData.description && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Description</span>
                  <span>{formData.description}</span>
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setStep('form')}>
              Edit
            </Button>
            <Button onClick={handleConfirm} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Confirm Transfer'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* OTP Dialog */}
      <Dialog open={step === 'otp'} onOpenChange={() => setStep('form')}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Verify Transfer</DialogTitle>
            <DialogDescription>
              Enter the 6-digit code sent to your registered device
            </DialogDescription>
          </DialogHeader>

          <div className="py-6">
            <OTPInput
              length={6}
              onChange={setOtp}
              onComplete={handleOTPComplete}
              error={otpError}
              disabled={isLoading}
            />
            {otpError && (
              <p className="mt-3 text-center text-sm text-destructive">
                Invalid code. Please try again.
              </p>
            )}
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-row">
            <Button variant="outline" onClick={() => setStep('form')} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button
              onClick={() => handleOTPComplete(otp)}
              disabled={isLoading || otp.length !== 6}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify & Send'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={step === 'success'} onOpenChange={handleNewTransfer}>
        <DialogContent className="sm:max-w-md text-center">
          <div className="flex flex-col items-center py-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <DialogTitle className="mt-4">Transfer Successful!</DialogTitle>
            <DialogDescription className="mt-2">
              Your transfer of {formatCurrency(parseFloat(formData.amount) || 0)} has been
              completed successfully.
            </DialogDescription>
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-row">
            <Button variant="outline" onClick={handleNewTransfer} className="w-full sm:w-auto">
              New Transfer
            </Button>
            <Button asChild className="w-full sm:w-auto">
              <a href="/transactions">View Transactions</a>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
