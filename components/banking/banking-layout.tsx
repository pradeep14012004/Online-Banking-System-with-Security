'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Sidebar } from './sidebar'
import { Header } from './header'
import { useBankingStore } from '@/lib/store/banking-store'
import { cn } from '@/lib/utils'
import {
  mockUser,
  mockAccounts,
  mockTransactions,
  mockBeneficiaries,
  mockNotifications,
  mockDeviceSessions,
} from '@/lib/data/mock-data'

interface BankingLayoutProps {
  children: React.ReactNode
  isAdmin?: boolean
}

export function BankingLayout({ children, isAdmin = false }: BankingLayoutProps) {
  const router = useRouter()
  const {
    isAuthenticated,
    sidebarCollapsed,
    setUser,
    setAccounts,
    setTransactions,
    setBeneficiaries,
    setNotifications,
    setSessions,
  } = useBankingStore()

  // Initialize mock data for demo purposes
  useEffect(() => {
    // For demo, auto-login with mock user
    if (!isAuthenticated) {
      setUser(mockUser)
      setAccounts(mockAccounts)
      setTransactions(mockTransactions)
      setBeneficiaries(mockBeneficiaries)
      setNotifications(mockNotifications)
      setSessions(mockDeviceSessions)
    }
  }, [
    isAuthenticated,
    setUser,
    setAccounts,
    setTransactions,
    setBeneficiaries,
    setNotifications,
    setSessions,
  ])

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isAdmin={isAdmin} />
      <Header />
      <main
        className={cn(
          'min-h-screen pt-16 transition-all duration-300',
          sidebarCollapsed ? 'pl-16' : 'pl-64'
        )}
      >
        <div className="container mx-auto p-6">{children}</div>
      </main>
    </div>
  )
}
