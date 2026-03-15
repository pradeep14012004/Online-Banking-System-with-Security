"use client"

import { useState } from "react"
import {
  Shield,
  Smartphone,
  Key,
  Lock,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  Monitor,
  Fingerprint,
  Mail,
  MessageSquare,
  ChevronRight,
  Plus,
  Trash2,
  RefreshCw,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

const securitySettings = {
  twoFactorAuth: true,
  biometricLogin: true,
  loginAlerts: true,
  transactionAlerts: true,
  deviceTrust: true,
  sessionTimeout: 15,
}

const trustedDevices = [
  {
    id: "1",
    name: "MacBook Pro",
    type: "desktop",
    browser: "Chrome 120",
    location: "San Francisco, CA",
    lastActive: "Active now",
    isCurrent: true,
    addedOn: "Jan 15, 2024",
  },
  {
    id: "2",
    name: "iPhone 15 Pro",
    type: "mobile",
    browser: "Safari",
    location: "San Francisco, CA",
    lastActive: "2 hours ago",
    isCurrent: false,
    addedOn: "Dec 10, 2023",
  },
  {
    id: "3",
    name: "iPad Air",
    type: "tablet",
    browser: "Safari",
    location: "Oakland, CA",
    lastActive: "3 days ago",
    isCurrent: false,
    addedOn: "Nov 5, 2023",
  },
]

const loginHistory = [
  {
    id: "1",
    device: "MacBook Pro - Chrome",
    location: "San Francisco, CA",
    ip: "192.168.1.xxx",
    time: "Just now",
    status: "success",
  },
  {
    id: "2",
    device: "iPhone 15 Pro - Safari",
    location: "San Francisco, CA",
    ip: "192.168.1.xxx",
    time: "2 hours ago",
    status: "success",
  },
  {
    id: "3",
    device: "Unknown Device - Firefox",
    location: "New York, NY",
    ip: "203.0.113.xxx",
    time: "Yesterday, 3:45 PM",
    status: "blocked",
  },
  {
    id: "4",
    device: "MacBook Pro - Chrome",
    location: "San Francisco, CA",
    ip: "192.168.1.xxx",
    time: "2 days ago",
    status: "success",
  },
]

export default function SecurityPage() {
  const [settings, setSettings] = useState(securitySettings)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const securityScore = 85

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success"
    if (score >= 60) return "text-warning"
    return "text-destructive"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Good"
    return "Needs Improvement"
  }

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
    toast.success("Security setting updated")
  }

  const handleRemoveDevice = (deviceId: string) => {
    toast.success("Device removed from trusted list")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Security Center</h1>
        <p className="text-muted-foreground">Manage your account security and privacy settings</p>
      </div>

      {/* Security Score Card */}
      <Card className="border-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground">Security Score</h3>
                <p className="text-sm text-muted-foreground">
                  Your account protection level
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-48">
                <div className="mb-2 flex items-center justify-between">
                  <span className={`text-3xl font-bold ${getScoreColor(securityScore)}`}>
                    {securityScore}%
                  </span>
                  <Badge variant="secondary" className="bg-success/20 text-success">
                    {getScoreLabel(securityScore)}
                  </Badge>
                </div>
                <Progress value={securityScore} className="h-2" />
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div className="flex items-center gap-2 rounded-lg bg-background/50 p-3">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <span className="text-sm text-foreground">Two-factor authentication enabled</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-background/50 p-3">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <span className="text-sm text-foreground">Strong password set</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-background/50 p-3">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <span className="text-sm text-foreground">Recovery email not verified</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="settings" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-none lg:gap-2">
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="history">Login History</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-6">
          {/* Password Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Key className="h-5 w-5" />
                Password
              </CardTitle>
              <CardDescription>
                Your password was last changed 45 days ago
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Dialog open={showChangePassword} onOpenChange={setShowChangePassword}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-between sm:w-auto">
                    Change Password
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogDescription>
                      Enter your current password and choose a new one
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="current">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="current"
                          type={showCurrentPassword ? "text" : "password"}
                          placeholder="Enter current password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new">New Password</Label>
                      <div className="relative">
                        <Input
                          id="new"
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Enter new password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm">Confirm New Password</Label>
                      <Input
                        id="confirm"
                        type="password"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setShowChangePassword(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={() => {
                      setShowChangePassword(false)
                      toast.success("Password changed successfully")
                    }}>
                      Update Password
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Two-Factor Authentication */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Smartphone className="h-5 w-5" />
                Two-Factor Authentication
              </CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">SMS Authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Receive codes via text message
                    </p>
                  </div>
                </div>
                <Switch
                  checked={settings.twoFactorAuth}
                  onCheckedChange={() => handleToggle("twoFactorAuth")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Fingerprint className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Biometric Login</p>
                    <p className="text-sm text-muted-foreground">
                      Use fingerprint or face recognition
                    </p>
                  </div>
                </div>
                <Switch
                  checked={settings.biometricLogin}
                  onCheckedChange={() => handleToggle("biometricLogin")}
                />
              </div>
            </CardContent>
          </Card>

          {/* Session Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lock className="h-5 w-5" />
                Session Settings
              </CardTitle>
              <CardDescription>
                Control how your sessions are managed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Auto-logout Timer</p>
                    <p className="text-sm text-muted-foreground">
                      Automatically log out after {settings.sessionTimeout} minutes of inactivity
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Trusted Devices Only</p>
                    <p className="text-sm text-muted-foreground">
                      Only allow login from trusted devices
                    </p>
                  </div>
                </div>
                <Switch
                  checked={settings.deviceTrust}
                  onCheckedChange={() => handleToggle("deviceTrust")}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Trusted Devices</CardTitle>
                <CardDescription>
                  Manage devices that can access your account
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Device
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {trustedDevices.map((device) => (
                <div
                  key={device.id}
                  className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                      {device.type === "desktop" ? (
                        <Monitor className="h-6 w-6 text-muted-foreground" />
                      ) : (
                        <Smartphone className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{device.name}</p>
                        {device.isCurrent && (
                          <Badge variant="secondary" className="bg-success/20 text-success">
                            Current
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {device.browser} - {device.location}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {device.lastActive} • Added {device.addedOn}
                      </p>
                    </div>
                  </div>
                  {!device.isCurrent && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => handleRemoveDevice(device.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Login History</CardTitle>
                <CardDescription>
                  Recent login attempts to your account
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {loginHistory.map((login) => (
                <div
                  key={login.id}
                  className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        login.status === "success"
                          ? "bg-success/20"
                          : "bg-destructive/20"
                      }`}
                    >
                      {login.status === "success" ? (
                        <CheckCircle2 className="h-5 w-5 text-success" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{login.device}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {login.location}
                        <span className="text-muted-foreground/50">•</span>
                        {login.ip}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pl-14 sm:pl-0">
                    <Badge
                      variant={login.status === "success" ? "secondary" : "destructive"}
                      className={
                        login.status === "success"
                          ? "bg-success/20 text-success"
                          : ""
                      }
                    >
                      {login.status === "success" ? "Successful" : "Blocked"}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{login.time}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Security Alerts</CardTitle>
              <CardDescription>
                Configure how you want to be notified about security events
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Email Alerts</p>
                    <p className="text-sm text-muted-foreground">
                      Get notified about suspicious login attempts
                    </p>
                  </div>
                </div>
                <Switch
                  checked={settings.loginAlerts}
                  onCheckedChange={() => handleToggle("loginAlerts")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">SMS Alerts</p>
                    <p className="text-sm text-muted-foreground">
                      Receive text messages for large transactions
                    </p>
                  </div>
                </div>
                <Switch
                  checked={settings.transactionAlerts}
                  onCheckedChange={() => handleToggle("transactionAlerts")}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
