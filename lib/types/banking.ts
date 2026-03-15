// User Types
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string
  avatar?: string
  role: 'user' | 'admin'
  mfaEnabled: boolean
  createdAt: Date
  lastLogin: Date
  status: 'active' | 'frozen' | 'locked'
}

// Account Types
export type AccountType = 'checking' | 'savings' | 'credit'

export interface Account {
  id: string
  userId: string
  type: AccountType
  name: string
  accountNumber: string
  balance: number
  availableBalance: number
  currency: string
  status: 'active' | 'frozen' | 'closed'
  createdAt: Date
}

// Transaction Types
export type TransactionType = 'credit' | 'debit'
export type TransactionCategory = 
  | 'transfer'
  | 'payment'
  | 'deposit'
  | 'withdrawal'
  | 'shopping'
  | 'food'
  | 'utilities'
  | 'entertainment'
  | 'transportation'
  | 'healthcare'
  | 'other'

export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'flagged'

export interface Transaction {
  id: string
  accountId: string
  type: TransactionType
  category: TransactionCategory
  amount: number
  currency: string
  description: string
  merchantName?: string
  reference: string
  status: TransactionStatus
  date: Date
  balanceAfter: number
}

// Beneficiary Types
export interface Beneficiary {
  id: string
  userId: string
  name: string
  bankName: string
  accountNumber: string
  routingNumber?: string
  email?: string
  phone?: string
  isFavorite: boolean
  createdAt: Date
}

// Transfer Types
export interface Transfer {
  id: string
  fromAccountId: string
  toAccountId?: string
  beneficiaryId?: string
  amount: number
  currency: string
  description: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  scheduledDate?: Date
  completedDate?: Date
  createdAt: Date
}

// Payment Types
export interface ScheduledPayment {
  id: string
  accountId: string
  payee: string
  amount: number
  currency: string
  frequency: 'once' | 'weekly' | 'biweekly' | 'monthly'
  nextPaymentDate: Date
  status: 'active' | 'paused' | 'cancelled'
}

// Notification Types
export type NotificationType = 'transaction' | 'security' | 'login' | 'system' | 'fraud'

export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  isRead: boolean
  createdAt: Date
  data?: Record<string, unknown>
}

// Security Types
export interface DeviceSession {
  id: string
  userId: string
  deviceName: string
  browser: string
  location: string
  ipAddress: string
  lastActive: Date
  isCurrent: boolean
}

export interface LoginHistory {
  id: string
  userId: string
  ipAddress: string
  location: string
  device: string
  status: 'success' | 'failed'
  timestamp: Date
}

// AI Insights Types
export interface SpendingCategory {
  category: string
  amount: number
  percentage: number
  trend: 'up' | 'down' | 'stable'
}

export interface FinancialSummary {
  totalIncome: number
  totalExpenses: number
  savings: number
  savingsRate: number
  month: string
}

export interface BudgetRecommendation {
  category: string
  currentSpending: number
  recommendedBudget: number
  potential Savings: number
}

// Fraud Monitoring Types
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical'

export interface FraudAlert {
  id: string
  transactionId: string
  riskScore: number
  riskLevel: RiskLevel
  reasons: string[]
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed'
  createdAt: Date
}

// Admin Types
export interface SystemAlert {
  id: string
  type: 'info' | 'warning' | 'error' | 'critical'
  title: string
  message: string
  createdAt: Date
  resolvedAt?: Date
}

export interface AuditLog {
  id: string
  userId: string
  action: string
  resource: string
  details: string
  ipAddress: string
  timestamp: Date
}
