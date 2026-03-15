'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  Receipt,
  Users,
  CreditCard,
  Bell,
  Shield,
  Brain,
  AlertTriangle,
  Settings,
  UserCog,
  Activity,
  FileText,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useBankingStore } from '@/lib/store/banking-store'

const userNavItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/accounts', label: 'Accounts', icon: Wallet },
  { href: '/transfers', label: 'Transfers', icon: ArrowLeftRight },
  { href: '/transactions', label: 'Transactions', icon: Receipt },
  { href: '/beneficiaries', label: 'Beneficiaries', icon: Users },
  { href: '/payments', label: 'Payments', icon: CreditCard },
  { href: '/notifications', label: 'Notifications', icon: Bell },
  { href: '/security', label: 'Security Center', icon: Shield },
  { href: '/insights', label: 'AI Insights', icon: Brain },
]

const adminNavItems = [
  { href: '/admin', label: 'Admin Dashboard', icon: LayoutDashboard },
  { href: '/admin/users', label: 'User Management', icon: UserCog },
  { href: '/admin/transactions', label: 'Transaction Monitoring', icon: Activity },
  { href: '/admin/fraud', label: 'Fraud Monitoring', icon: AlertTriangle },
  { href: '/admin/audit', label: 'Audit Logs', icon: FileText },
]

interface SidebarProps {
  isAdmin?: boolean
}

export function Sidebar({ isAdmin = false }: SidebarProps) {
  const pathname = usePathname()
  const { sidebarCollapsed, toggleSidebar, user } = useBankingStore()

  const navItems = isAdmin ? adminNavItems : userNavItems

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 flex h-screen flex-col bg-sidebar text-sidebar-foreground transition-all duration-300',
          sidebarCollapsed ? 'w-16' : 'w-64'
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          {!sidebarCollapsed && (
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">N</span>
              </div>
              <span className="text-lg font-semibold">NexusBank</span>
            </Link>
          )}
          {sidebarCollapsed && (
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">N</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              const Icon = item.icon

              if (sidebarCollapsed) {
                return (
                  <Tooltip key={item.href}>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          'flex h-10 w-10 items-center justify-center rounded-lg transition-colors',
                          isActive
                            ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                            : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="font-medium">
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                )
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Admin Section Toggle for User View */}
          {!isAdmin && user?.role === 'admin' && (
            <>
              <Separator className="my-4 bg-sidebar-border" />
              <div className="space-y-1">
                {sidebarCollapsed ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href="/admin"
                        className={cn(
                          'flex h-10 w-10 items-center justify-center rounded-lg transition-colors',
                          pathname.startsWith('/admin')
                            ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                            : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                        )}
                      >
                        <Shield className="h-5 w-5" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="font-medium">
                      Admin Panel
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <Link
                    href="/admin"
                    className={cn(
                      'flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors',
                      pathname.startsWith('/admin')
                        ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                        : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    )}
                  >
                    <Shield className="h-5 w-5 shrink-0" />
                    <span>Admin Panel</span>
                  </Link>
                )}
              </div>
            </>
          )}
        </ScrollArea>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-3">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <Link
                href="/settings"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <Settings className="h-5 w-5 shrink-0" />
                <span>Settings</span>
              </Link>
            )}
            {sidebarCollapsed && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/settings"
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    <Settings className="h-5 w-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="font-medium">
                  Settings
                </TooltipContent>
              </Tooltip>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="h-8 w-8 shrink-0 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </aside>
    </TooltipProvider>
  )
}
