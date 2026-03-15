"use client"

import { useState } from "react"
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  MapPin,
  Clock,
  CreditCard,
  ArrowRightLeft,
  Eye,
  Ban,
  CheckCircle2,
  XCircle,
  FileText,
  RefreshCw,
  Filter,
  ChevronRight,
  Activity,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

type AlertStatus = "pending" | "investigating" | "resolved" | "false_positive"
type AlertSeverity = "critical" | "high" | "medium" | "low"

interface FraudAlert {
  id: string
  type: string
  description: string
  amount: number
  location: string
  device: string
  time: string
  status: AlertStatus
  severity: AlertSeverity
  accountNumber: string
  merchantName?: string
  riskScore: number
}

const fraudAlerts: FraudAlert[] = [
  {
    id: "FA-001",
    type: "Unusual Transaction",
    description: "Large transaction from new device in unfamiliar location",
    amount: 4500,
    location: "Lagos, Nigeria",
    device: "Unknown Android Device",
    time: "10 minutes ago",
    status: "pending",
    severity: "critical",
    accountNumber: "****4532",
    merchantName: "Online Electronics Store",
    riskScore: 92,
  },
  {
    id: "FA-002",
    type: "Multiple Failed Attempts",
    description: "5 failed login attempts from different IP addresses",
    amount: 0,
    location: "Multiple Locations",
    device: "Various",
    time: "1 hour ago",
    status: "investigating",
    severity: "high",
    accountNumber: "****4532",
    riskScore: 78,
  },
  {
    id: "FA-003",
    type: "Card Not Present",
    description: "Online purchase from new merchant with high-risk profile",
    amount: 1250,
    location: "Unknown",
    device: "Desktop - Chrome",
    time: "3 hours ago",
    status: "pending",
    severity: "medium",
    accountNumber: "****7891",
    merchantName: "Crypto Exchange XYZ",
    riskScore: 65,
  },
  {
    id: "FA-004",
    type: "Velocity Alert",
    description: "Multiple transactions in short timeframe exceeding normal pattern",
    amount: 890,
    location: "San Francisco, CA",
    device: "iPhone 15 Pro",
    time: "Yesterday",
    status: "resolved",
    severity: "low",
    accountNumber: "****4532",
    riskScore: 45,
  },
  {
    id: "FA-005",
    type: "Geographic Anomaly",
    description: "Transaction from location 500+ miles from last activity",
    amount: 320,
    location: "Miami, FL",
    device: "Android Device",
    time: "2 days ago",
    status: "false_positive",
    severity: "medium",
    accountNumber: "****7891",
    merchantName: "Restaurant",
    riskScore: 58,
  },
]

const blockedTransactions = [
  {
    id: "BT-001",
    merchant: "Suspicious Online Store",
    amount: 2500,
    time: "Today, 2:30 PM",
    reason: "High-risk merchant",
    card: "****4532",
  },
  {
    id: "BT-002",
    merchant: "Foreign Exchange Service",
    amount: 5000,
    time: "Yesterday, 11:15 AM",
    reason: "Unusual transaction pattern",
    card: "****7891",
  },
]

const getSeverityColor = (severity: AlertSeverity) => {
  switch (severity) {
    case "critical":
      return "bg-destructive/20 text-destructive border-destructive/30"
    case "high":
      return "bg-warning/20 text-warning border-warning/30"
    case "medium":
      return "bg-chart-3/20 text-chart-3 border-chart-3/30"
    case "low":
      return "bg-muted text-muted-foreground border-border"
    default:
      return "bg-muted text-muted-foreground"
  }
}

const getStatusColor = (status: AlertStatus) => {
  switch (status) {
    case "pending":
      return "bg-warning/20 text-warning"
    case "investigating":
      return "bg-chart-2/20 text-chart-2"
    case "resolved":
      return "bg-success/20 text-success"
    case "false_positive":
      return "bg-muted text-muted-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export default function FraudCenterPage() {
  const [alerts, setAlerts] = useState(fraudAlerts)
  const [selectedAlert, setSelectedAlert] = useState<FraudAlert | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const pendingCount = alerts.filter((a) => a.status === "pending").length
  const criticalCount = alerts.filter((a) => a.severity === "critical").length

  const filteredAlerts = alerts.filter((alert) => {
    if (filterStatus === "all") return true
    return alert.status === filterStatus
  })

  const handleResolve = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, status: "resolved" as AlertStatus } : a))
    )
    setIsDialogOpen(false)
    toast.success("Alert marked as resolved")
  }

  const handleFalsePositive = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, status: "false_positive" as AlertStatus } : a))
    )
    setIsDialogOpen(false)
    toast.success("Alert marked as false positive")
  }

  const handleBlockCard = () => {
    toast.success("Card temporarily blocked. Contact support to unblock.")
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Fraud Center</h1>
          <p className="text-muted-foreground">
            Monitor and manage suspicious activity on your accounts
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="destructive">
            <Ban className="mr-2 h-4 w-4" />
            Emergency Block
          </Button>
        </div>
      </div>

      {/* Alert Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className={pendingCount > 0 ? "border-warning/50" : ""}>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
              <AlertTriangle className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
              <p className="text-sm text-muted-foreground">Pending Review</p>
            </div>
          </CardContent>
        </Card>
        <Card className={criticalCount > 0 ? "border-destructive/50" : ""}>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
              <AlertOctagon className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{criticalCount}</p>
              <p className="text-sm text-muted-foreground">Critical Alerts</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
              <ShieldCheck className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {alerts.filter((a) => a.status === "resolved").length}
              </p>
              <p className="text-sm text-muted-foreground">Resolved</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-2/10">
              <Activity className="h-6 w-6 text-chart-2" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{blockedTransactions.length}</p>
              <p className="text-sm text-muted-foreground">Blocked Today</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Assessment Card */}
      <Card className="border-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20">
                <ShieldAlert className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground">Account Risk Level</h3>
                <p className="text-sm text-muted-foreground">
                  Based on recent activity and security patterns
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-48">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Risk Score</span>
                  <Badge variant="secondary" className="bg-warning/20 text-warning">
                    Moderate
                  </Badge>
                </div>
                <Progress value={35} className="h-2" />
                <p className="mt-1 text-right text-xs text-muted-foreground">35/100</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="alerts" className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TabsList>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              Alerts
              {pendingCount > 0 && (
                <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 text-xs">
                  {pendingCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="blocked">Blocked</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Alerts</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="investigating">Investigating</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="false_positive">False Positive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="alerts" className="space-y-4">
          {filteredAlerts.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <ShieldCheck className="h-12 w-12 text-success" />
                <h3 className="mt-4 text-lg font-medium text-foreground">All Clear</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  No alerts match your current filter
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredAlerts.map((alert) => (
              <Card
                key={alert.id}
                className={`transition-shadow hover:shadow-md ${
                  alert.severity === "critical" ? "border-destructive/30" : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex gap-4">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${
                          alert.severity === "critical"
                            ? "bg-destructive/20"
                            : alert.severity === "high"
                              ? "bg-warning/20"
                              : "bg-muted"
                        }`}
                      >
                        {alert.severity === "critical" ? (
                          <AlertOctagon
                            className={`h-6 w-6 ${
                              alert.severity === "critical"
                                ? "text-destructive"
                                : "text-warning"
                            }`}
                          />
                        ) : (
                          <AlertTriangle
                            className={`h-6 w-6 ${
                              alert.severity === "high"
                                ? "text-warning"
                                : "text-muted-foreground"
                            }`}
                          />
                        )}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs text-muted-foreground">{alert.id}</span>
                          <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                            {alert.severity}
                          </Badge>
                          <Badge className={getStatusColor(alert.status)}>
                            {alert.status.replace("_", " ")}
                          </Badge>
                        </div>
                        <h4 className="mt-1 font-medium text-foreground">{alert.type}</h4>
                        <p className="mt-1 text-sm text-muted-foreground">{alert.description}</p>
                        <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
                          {alert.amount > 0 && (
                            <span className="flex items-center gap-1">
                              <CreditCard className="h-3 w-3" />$
                              {alert.amount.toLocaleString()}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {alert.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {alert.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground">Risk:</span>
                        <span
                          className={`text-sm font-medium ${
                            alert.riskScore >= 80
                              ? "text-destructive"
                              : alert.riskScore >= 60
                                ? "text-warning"
                                : "text-muted-foreground"
                          }`}
                        >
                          {alert.riskScore}%
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedAlert(alert)
                          setIsDialogOpen(true)
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Review
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="blocked" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Blocked Transactions</CardTitle>
              <CardDescription>
                Transactions that were automatically blocked by fraud detection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {blockedTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                      <Ban className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{tx.merchant}</p>
                      <p className="text-sm text-muted-foreground">
                        {tx.reason} | Card {tx.card}
                      </p>
                      <p className="text-xs text-muted-foreground">{tx.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pl-14 sm:pl-0">
                    <span className="text-lg font-semibold text-destructive">
                      ${tx.amount.toLocaleString()}
                    </span>
                    <Button variant="outline" size="sm">
                      Review
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Fraud Reports</CardTitle>
              <CardDescription>
                Download detailed reports of fraud activity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Monthly Fraud Summary</p>
                    <p className="text-sm text-muted-foreground">March 2024</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Download PDF
                </Button>
              </div>
              <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Quarterly Risk Assessment</p>
                    <p className="text-sm text-muted-foreground">Q1 2024</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Alert Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Alert Details
              {selectedAlert && (
                <Badge variant="outline" className={getSeverityColor(selectedAlert.severity)}>
                  {selectedAlert.severity}
                </Badge>
              )}
            </DialogTitle>
            <DialogDescription>Review and take action on this alert</DialogDescription>
          </DialogHeader>
          {selectedAlert && (
            <div className="space-y-4 py-4">
              <div className="rounded-lg bg-muted/50 p-4">
                <h4 className="font-medium text-foreground">{selectedAlert.type}</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  {selectedAlert.description}
                </p>
              </div>
              <div className="grid gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Alert ID</span>
                  <span className="font-medium text-foreground">{selectedAlert.id}</span>
                </div>
                {selectedAlert.amount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-medium text-foreground">
                      ${selectedAlert.amount.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium text-foreground">{selectedAlert.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Device</span>
                  <span className="font-medium text-foreground">{selectedAlert.device}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account</span>
                  <span className="font-medium text-foreground">
                    {selectedAlert.accountNumber}
                  </span>
                </div>
                {selectedAlert.merchantName && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Merchant</span>
                    <span className="font-medium text-foreground">
                      {selectedAlert.merchantName}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Risk Score</span>
                  <span
                    className={`font-medium ${
                      selectedAlert.riskScore >= 80
                        ? "text-destructive"
                        : selectedAlert.riskScore >= 60
                          ? "text-warning"
                          : "text-foreground"
                    }`}
                  >
                    {selectedAlert.riskScore}%
                  </span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="flex-col gap-2 sm:flex-row">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => selectedAlert && handleFalsePositive(selectedAlert.id)}
            >
              <XCircle className="mr-2 h-4 w-4" />
              False Positive
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => selectedAlert && handleResolve(selectedAlert.id)}
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Mark Resolved
            </Button>
            <Button variant="destructive" className="flex-1" onClick={handleBlockCard}>
              <Ban className="mr-2 h-4 w-4" />
              Block Card
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
