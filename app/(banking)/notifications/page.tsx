"use client"

import { useState } from "react"
import {
  Bell,
  BellOff,
  Check,
  CheckCheck,
  AlertTriangle,
  CreditCard,
  ArrowRightLeft,
  Shield,
  Gift,
  Info,
  Trash2,
  Filter,
  MoreHorizontal,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

type NotificationType = "transaction" | "security" | "promotion" | "system"

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  time: string
  read: boolean
  actionUrl?: string
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "transaction",
    title: "Payment Received",
    message: "You received $2,500.00 from John Smith for invoice #INV-2024-001",
    time: "2 minutes ago",
    read: false,
  },
  {
    id: "2",
    type: "security",
    title: "New Device Login",
    message: "A new device logged into your account from San Francisco, CA",
    time: "1 hour ago",
    read: false,
    actionUrl: "/security",
  },
  {
    id: "3",
    type: "transaction",
    title: "Transfer Completed",
    message: "Your transfer of $500.00 to Sarah Johnson has been completed",
    time: "3 hours ago",
    read: false,
  },
  {
    id: "4",
    type: "promotion",
    title: "Earn 5% Cashback",
    message: "Use your NexusBank card this weekend and earn 5% cashback on all purchases",
    time: "5 hours ago",
    read: true,
  },
  {
    id: "5",
    type: "security",
    title: "Password Changed",
    message: "Your account password was successfully changed",
    time: "1 day ago",
    read: true,
  },
  {
    id: "6",
    type: "system",
    title: "Scheduled Maintenance",
    message: "Online banking will be unavailable on March 20th from 2:00 AM to 4:00 AM PST",
    time: "2 days ago",
    read: true,
  },
  {
    id: "7",
    type: "transaction",
    title: "Large Transaction Alert",
    message: "A transaction of $5,000.00 was made from your checking account",
    time: "3 days ago",
    read: true,
    actionUrl: "/transactions",
  },
  {
    id: "8",
    type: "promotion",
    title: "New Savings Goal Feature",
    message: "Set up savings goals and track your progress with our new feature",
    time: "5 days ago",
    read: true,
  },
]

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case "transaction":
      return <ArrowRightLeft className="h-5 w-5" />
    case "security":
      return <Shield className="h-5 w-5" />
    case "promotion":
      return <Gift className="h-5 w-5" />
    case "system":
      return <Info className="h-5 w-5" />
    default:
      return <Bell className="h-5 w-5" />
  }
}

const getNotificationColor = (type: NotificationType) => {
  switch (type) {
    case "transaction":
      return "bg-chart-1/20 text-chart-1"
    case "security":
      return "bg-warning/20 text-warning"
    case "promotion":
      return "bg-chart-4/20 text-chart-4"
    case "system":
      return "bg-chart-2/20 text-chart-2"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export default function NotificationsPage() {
  const [notificationList, setNotificationList] = useState(notifications)
  const [activeTab, setActiveTab] = useState("all")

  const unreadCount = notificationList.filter((n) => !n.read).length

  const filteredNotifications = notificationList.filter((n) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !n.read
    return n.type === activeTab
  })

  const markAsRead = (id: string) => {
    setNotificationList((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((n) => ({ ...n, read: true })))
    toast.success("All notifications marked as read")
  }

  const deleteNotification = (id: string) => {
    setNotificationList((prev) => prev.filter((n) => n.id !== id))
    toast.success("Notification deleted")
  }

  const clearAll = () => {
    setNotificationList([])
    toast.success("All notifications cleared")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with your account activity
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <CheckCheck className="mr-2 h-4 w-4" />
            Mark all read
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={clearAll}
            className="text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear all
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{notificationList.length}</p>
              <p className="text-sm text-muted-foreground">Total</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
              <AlertTriangle className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{unreadCount}</p>
              <p className="text-sm text-muted-foreground">Unread</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-1/10">
              <ArrowRightLeft className="h-6 w-6 text-chart-1" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {notificationList.filter((n) => n.type === "transaction").length}
              </p>
              <p className="text-sm text-muted-foreground">Transactions</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
              <Shield className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {notificationList.filter((n) => n.type === "security").length}
              </p>
              <p className="text-sm text-muted-foreground">Security</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="flex flex-wrap h-auto gap-2">
          <TabsTrigger value="all" className="flex items-center gap-2">
            All
            <Badge variant="secondary" className="ml-1">
              {notificationList.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="unread" className="flex items-center gap-2">
            Unread
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-1">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="transaction">Transactions</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="promotion">Promotions</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <BellOff className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-foreground">No notifications</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  You are all caught up!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={cn(
                    "transition-colors",
                    !notification.read && "border-primary/30 bg-primary/5"
                  )}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                          getNotificationColor(notification.type)
                        )}
                      >
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-foreground">
                                {notification.title}
                              </h4>
                              {!notification.read && (
                                <span className="h-2 w-2 rounded-full bg-primary" />
                              )}
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {notification.message}
                            </p>
                            <p className="mt-2 text-xs text-muted-foreground">
                              {notification.time}
                            </p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="shrink-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {!notification.read && (
                                <DropdownMenuItem
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  <Check className="mr-2 h-4 w-4" />
                                  Mark as read
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => deleteNotification(notification.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
