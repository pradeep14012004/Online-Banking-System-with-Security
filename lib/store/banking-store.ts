'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  User,
  Account,
  Transaction,
  Beneficiary,
  Notification,
  DeviceSession,
} from '@/lib/types/banking'

interface BankingState {
  // Auth
  user: User | null
  isAuthenticated: boolean
  
  // Accounts
  accounts: Account[]
  selectedAccountId: string | null
  
  // Transactions
  transactions: Transaction[]
  
  // Beneficiaries
  beneficiaries: Beneficiary[]
  
  // Notifications
  notifications: Notification[]
  unreadCount: number
  
  // Sessions
  sessions: DeviceSession[]
  
  // UI State
  sidebarCollapsed: boolean
  
  // Actions
  setUser: (user: User | null) => void
  logout: () => void
  setAccounts: (accounts: Account[]) => void
  selectAccount: (accountId: string) => void
  setTransactions: (transactions: Transaction[]) => void
  setBeneficiaries: (beneficiaries: Beneficiary[]) => void
  addBeneficiary: (beneficiary: Beneficiary) => void
  removeBeneficiary: (id: string) => void
  toggleBeneficiaryFavorite: (id: string) => void
  setNotifications: (notifications: Notification[]) => void
  markNotificationRead: (id: string) => void
  markAllNotificationsRead: () => void
  setSessions: (sessions: DeviceSession[]) => void
  toggleSidebar: () => void
}

export const useBankingStore = create<BankingState>()(
  persist(
    (set) => ({
      // Initial State
      user: null,
      isAuthenticated: false,
      accounts: [],
      selectedAccountId: null,
      transactions: [],
      beneficiaries: [],
      notifications: [],
      unreadCount: 0,
      sessions: [],
      sidebarCollapsed: false,

      // Actions
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          accounts: [],
          selectedAccountId: null,
          transactions: [],
          notifications: [],
          unreadCount: 0,
        }),

      setAccounts: (accounts) => set({ accounts }),

      selectAccount: (accountId) => set({ selectedAccountId: accountId }),

      setTransactions: (transactions) => set({ transactions }),

      setBeneficiaries: (beneficiaries) => set({ beneficiaries }),

      addBeneficiary: (beneficiary) =>
        set((state) => ({
          beneficiaries: [...state.beneficiaries, beneficiary],
        })),

      removeBeneficiary: (id) =>
        set((state) => ({
          beneficiaries: state.beneficiaries.filter((b) => b.id !== id),
        })),

      toggleBeneficiaryFavorite: (id) =>
        set((state) => ({
          beneficiaries: state.beneficiaries.map((b) =>
            b.id === id ? { ...b, isFavorite: !b.isFavorite } : b
          ),
        })),

      setNotifications: (notifications) =>
        set({
          notifications,
          unreadCount: notifications.filter((n) => !n.isRead).length,
        }),

      markNotificationRead: (id) =>
        set((state) => {
          const notifications = state.notifications.map((n) =>
            n.id === id ? { ...n, isRead: true } : n
          )
          return {
            notifications,
            unreadCount: notifications.filter((n) => !n.isRead).length,
          }
        }),

      markAllNotificationsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
          unreadCount: 0,
        })),

      setSessions: (sessions) => set({ sessions }),

      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
    }),
    {
      name: 'banking-storage',
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
)
