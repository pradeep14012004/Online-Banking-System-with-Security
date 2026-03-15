"use client"

import { useState } from "react"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
  Filter,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

const monthlyData = [
  { month: "Jan", income: 8500, expenses: 4200, savings: 4300 },
  { month: "Feb", income: 8500, expenses: 3800, savings: 4700 },
  { month: "Mar", income: 9200, expenses: 4500, savings: 4700 },
  { month: "Apr", income: 8500, expenses: 3200, savings: 5300 },
  { month: "May", income: 8500, expenses: 4100, savings: 4400 },
  { month: "Jun", income: 10200, expenses: 3900, savings: 6300 },
  { month: "Jul", income: 8800, expenses: 4300, savings: 4500 },
  { month: "Aug", income: 9000, expenses: 3700, savings: 5300 },
  { month: "Sep", income: 8500, expenses: 4000, savings: 4500 },
  { month: "Oct", income: 9500, expenses: 4200, savings: 5300 },
  { month: "Nov", income: 8500, expenses: 5100, savings: 3400 },
  { month: "Dec", income: 12000, expenses: 6500, savings: 5500 },
]

const categoryExpenses = [
  { name: "Housing", value: 2200, color: "hsl(var(--chart-1))" },
  { name: "Food & Dining", value: 850, color: "hsl(var(--chart-2))" },
  { name: "Transportation", value: 450, color: "hsl(var(--chart-3))" },
  { name: "Utilities", value: 280, color: "hsl(var(--chart-4))" },
  { name: "Entertainment", value: 320, color: "hsl(var(--chart-5))" },
  { name: "Shopping", value: 400, color: "hsl(var(--primary))" },
]

const incomeBySource = [
  { name: "Salary", value: 7500, color: "hsl(var(--chart-1))" },
  { name: "Investments", value: 850, color: "hsl(var(--chart-2))" },
  { name: "Freelance", value: 1200, color: "hsl(var(--chart-3))" },
  { name: "Other", value: 250, color: "hsl(var(--chart-4))" },
]

const weeklySpending = [
  { day: "Mon", amount: 45 },
  { day: "Tue", amount: 120 },
  { day: "Wed", amount: 85 },
  { day: "Thu", amount: 200 },
  { day: "Fri", amount: 320 },
  { day: "Sat", amount: 450 },
  { day: "Sun", amount: 180 },
]

const accountBalanceHistory = [
  { date: "Week 1", checking: 12500, savings: 45000, investment: 28000 },
  { date: "Week 2", checking: 10800, savings: 45500, investment: 28500 },
  { date: "Week 3", checking: 14200, savings: 46000, investment: 29200 },
  { date: "Week 4", checking: 11500, savings: 46800, investment: 29800 },
]

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("6m")

  const stats = [
    {
      title: "Total Income",
      value: "$9,800",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      description: "vs last month",
    },
    {
      title: "Total Expenses",
      value: "$4,100",
      change: "-8.2%",
      trend: "down",
      icon: CreditCard,
      description: "vs last month",
    },
    {
      title: "Net Savings",
      value: "$5,700",
      change: "+28.4%",
      trend: "up",
      icon: TrendingUp,
      description: "vs last month",
    },
    {
      title: "Savings Rate",
      value: "58%",
      change: "+5%",
      trend: "up",
      icon: TrendingUp,
      description: "of income saved",
    },
  ]

  const totalExpenses = categoryExpenses.reduce((acc, cat) => acc + cat.value, 0)
  const totalIncome = incomeBySource.reduce((acc, src) => acc + src.value, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">
            Detailed insights into your financial activity
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-32">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">1 Month</SelectItem>
              <SelectItem value="3m">3 Months</SelectItem>
              <SelectItem value="6m">6 Months</SelectItem>
              <SelectItem value="1y">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="mt-1 text-2xl font-bold text-foreground">{stat.value}</p>
                  <div className="mt-1 flex items-center gap-1">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4 text-success" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-destructive" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        stat.trend === "up" ? "text-success" : "text-destructive"
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {stat.description}
                    </span>
                  </div>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Income vs Expenses Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Income vs Expenses Trend</CardTitle>
            <CardDescription>Monthly comparison over the year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                  />
                  <Area
                    type="monotone"
                    dataKey="income"
                    stroke="hsl(var(--chart-1))"
                    fill="url(#incomeGrad)"
                    strokeWidth={2}
                    name="Income"
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="hsl(var(--chart-2))"
                    fill="url(#expenseGrad)"
                    strokeWidth={2}
                    name="Expenses"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-chart-1" />
                <span className="text-sm text-muted-foreground">Income</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-chart-2" />
                <span className="text-sm text-muted-foreground">Expenses</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expense Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Expense Breakdown</CardTitle>
            <CardDescription>Where your money goes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-48 w-48 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryExpenses}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {categoryExpenses.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`$${value}`, ""]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-2">
                {categoryExpenses.map((cat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                      <span className="text-sm text-foreground">{cat.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-foreground">
                        ${cat.value}
                      </span>
                      <span className="ml-2 text-xs text-muted-foreground">
                        ({Math.round((cat.value / totalExpenses) * 100)}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Income Sources */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Income Sources</CardTitle>
            <CardDescription>Where your money comes from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-48 w-48 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={incomeBySource}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {incomeBySource.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`$${value}`, ""]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-2">
                {incomeBySource.map((src, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: src.color }}
                      />
                      <span className="text-sm text-foreground">{src.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-foreground">
                        ${src.value.toLocaleString()}
                      </span>
                      <span className="ml-2 text-xs text-muted-foreground">
                        ({Math.round((src.value / totalIncome) * 100)}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Spending */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Weekly Spending Pattern</CardTitle>
            <CardDescription>This week activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklySpending}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis
                    dataKey="day"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`$${value}`, "Spent"]}
                  />
                  <Bar
                    dataKey="amount"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Account Balance History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Account Balance History</CardTitle>
            <CardDescription>Last 4 weeks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={accountBalanceHistory}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                  />
                  <Line
                    type="monotone"
                    dataKey="checking"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    dot={false}
                    name="Checking"
                  />
                  <Line
                    type="monotone"
                    dataKey="savings"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    dot={false}
                    name="Savings"
                  />
                  <Line
                    type="monotone"
                    dataKey="investment"
                    stroke="hsl(var(--chart-3))"
                    strokeWidth={2}
                    dot={false}
                    name="Investment"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-chart-1" />
                <span className="text-sm text-muted-foreground">Checking</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-chart-2" />
                <span className="text-sm text-muted-foreground">Savings</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-chart-3" />
                <span className="text-sm text-muted-foreground">Investment</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
