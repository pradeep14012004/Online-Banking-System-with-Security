'use client'

import { useState } from 'react'
import {
  Users,
  Plus,
  Search,
  Star,
  StarOff,
  Send,
  MoreHorizontal,
  Pencil,
  Trash2,
  Building2,
  Phone,
  Mail,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useBankingStore } from '@/lib/store/banking-store'
import { cn } from '@/lib/utils'
import type { Beneficiary } from '@/lib/types/banking'
import Link from 'next/link'

export default function BeneficiariesPage() {
  const { beneficiaries, addBeneficiary, removeBeneficiary, toggleBeneficiaryFavorite } =
    useBankingStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingBeneficiary, setEditingBeneficiary] = useState<Beneficiary | null>(null)
  const [deletingBeneficiary, setDeletingBeneficiary] = useState<Beneficiary | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    email: '',
    phone: '',
  })

  const filteredBeneficiaries = beneficiaries.filter(
    (ben) =>
      ben.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ben.bankName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const favoriteBeneficiaries = filteredBeneficiaries.filter((ben) => ben.isFavorite)
  const otherBeneficiaries = filteredBeneficiaries.filter((ben) => !ben.isFavorite)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newBeneficiary: Beneficiary = {
      id: `ben_${Date.now()}`,
      userId: 'usr_1',
      name: formData.name,
      bankName: formData.bankName,
      accountNumber: `****${formData.accountNumber.slice(-4)}`,
      routingNumber: formData.routingNumber,
      email: formData.email || undefined,
      phone: formData.phone || undefined,
      isFavorite: false,
      createdAt: new Date(),
    }

    addBeneficiary(newBeneficiary)
    setIsAddDialogOpen(false)
    setFormData({
      name: '',
      bankName: '',
      accountNumber: '',
      routingNumber: '',
      email: '',
      phone: '',
    })
  }

  const handleDelete = () => {
    if (deletingBeneficiary) {
      removeBeneficiary(deletingBeneficiary.id)
      setDeletingBeneficiary(null)
    }
  }

  const BeneficiaryCard = ({ beneficiary }: { beneficiary: Beneficiary }) => (
    <div className="flex items-center gap-4 rounded-xl border bg-card p-4 transition-colors hover:bg-accent/50">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
        {beneficiary.name.charAt(0)}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-semibold truncate">{beneficiary.name}</p>
          {beneficiary.isFavorite && (
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 shrink-0" />
          )}
        </div>
        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
          <Building2 className="h-3 w-3 shrink-0" />
          <span className="truncate">{beneficiary.bankName}</span>
          <span>•</span>
          <span>{beneficiary.accountNumber}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/transfers?beneficiary=${beneficiary.id}`}>
            <Send className="mr-2 h-3 w-3" />
            Send
          </Link>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => toggleBeneficiaryFavorite(beneficiary.id)}>
              {beneficiary.isFavorite ? (
                <>
                  <StarOff className="mr-2 h-4 w-4" />
                  Remove from favorites
                </>
              ) : (
                <>
                  <Star className="mr-2 h-4 w-4" />
                  Add to favorites
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setEditingBeneficiary(beneficiary)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => setDeletingBeneficiary(beneficiary)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Beneficiaries</h1>
          <p className="text-muted-foreground">
            Manage your saved recipients for quick transfers
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Beneficiary
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Beneficiary</DialogTitle>
              <DialogDescription>
                Enter the details of the person or business you want to add
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Smith"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name</Label>
                <Input
                  id="bankName"
                  placeholder="Chase Bank"
                  value={formData.bankName}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, bankName: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    placeholder="123456789"
                    value={formData.accountNumber}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, accountNumber: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="routingNumber">Routing Number</Label>
                  <Input
                    id="routingNumber"
                    placeholder="021000021"
                    value={formData.routingNumber}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, routingNumber: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email (optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, email: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, phone: e.target.value }))
                    }
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Beneficiary</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search beneficiaries..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Favorite Beneficiaries */}
      {favoriteBeneficiaries.length > 0 && (
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <Star className="h-5 w-5 text-yellow-500" />
            Favorites
          </h2>
          <div className="space-y-3">
            {favoriteBeneficiaries.map((beneficiary) => (
              <BeneficiaryCard key={beneficiary.id} beneficiary={beneficiary} />
            ))}
          </div>
        </section>
      )}

      {/* All Beneficiaries */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">
          {favoriteBeneficiaries.length > 0 ? 'All Beneficiaries' : 'Your Beneficiaries'}
        </h2>
        {otherBeneficiaries.length > 0 ? (
          <div className="space-y-3">
            {otherBeneficiaries.map((beneficiary) => (
              <BeneficiaryCard key={beneficiary.id} beneficiary={beneficiary} />
            ))}
          </div>
        ) : filteredBeneficiaries.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No beneficiaries found</h3>
              <p className="mt-2 text-sm text-muted-foreground text-center max-w-sm">
                {searchQuery
                  ? 'Try a different search term'
                  : 'Add your first beneficiary to start sending money quickly'}
              </p>
              {!searchQuery && (
                <Button className="mt-4" onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Beneficiary
                </Button>
              )}
            </CardContent>
          </Card>
        ) : null}
      </section>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingBeneficiary} onOpenChange={() => setDeletingBeneficiary(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Beneficiary</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {deletingBeneficiary?.name}? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
