"use client"

import { useState } from "react"
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Lightbulb,
  Target,
  PiggyBank,
  AlertCircle,
  ChevronRight,
  Sparkles,
  DollarSign,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const spendingTrend = [
  { month: "Jan", spending: 4200, income: 8500 },
  { month: "Feb", spending: 3800, income: 8500 },
  { month: "Mar", spending: 4500, income: 9200 },
  { month: "Apr", spending: 3200, income: 8500 },
  { month: "May", spending: 4100, income: 8500 },
  { month: "Jun", spending: 3900, income: 10200 },
]

const categoryBreakdown = [
  { name: "Housing", value: 2200, color: "hsl(var(--chart-1))" },
  { name: "Food & Dining", value: 850, color: "hsl(var(--chart-2))" },
  { name: "Transportation", value: 450, color: "hsl(var(--chart-3))" },
  { name: "Entertainment", value: 320, color: "hsl(var(--chart-4))" },
  { name: "Other", value: 280, color: "hsl(var(--chart-5))" },
]

const aiInsights = [
  {
    id: "1",
    type: "savings",
    title: "Potential Monthly Savings",
    description:
      "Based on your spending patterns, you could save an additional $340/month by reducing subscription services.",
    impact: "+$340/mo",
    priority: "high",
    icon: PiggyBank,
  },
  {
    id: "2",
    type: "spending",
    title: "Unusual Spending Pattern",
    description:
      "Your entertainment spending increased by 45% compared to last month. Consider setting a budget limit.",
    impact: "-$180",
    priority: "medium",
    icon: AlertCircle,
  },
  {
    id: "3",
    type: "investment",
    title: "Investment Opportunity",
    description:
      "Your emergency fund target is reached. Consider investing surplus funds in a high-yield savings account.",
    impact: "+2.5% APY",
    priority: "low",
    icon: TrendingUp,
  },
  {
    id: "4",
    type: "goal",
    title: "Vacation Fund Progress",
    description:
      "At your current savings rate, you will reach your vacation goal 2 weeks ahead of schedule.",
    impact: "On track",
    priority: "low",
    icon: Target,
  },
]

const savingsGoals = [
  {
    id: "1",
    name: "Emergency Fund",
    current: 12500,
    target: 15000,
    deadline: "June 2024",
    monthlyContribution: 500,
  },
  {
    id: "2",
    name: "Vacation",
    current: 2800,
    target: 5000,
    deadline: "August 2024",
    monthlyContribution: 300,
  },
  {
    id: "3",
    name: "New Car",
    current: 8200,
    target: 25000,
    deadline: "December 2025",
    monthlyContribution: 800,
  },
]

const predictions = [
  { label: "Projected Savings (Next 6 mo)", value: "$8,400", trend: "up" },
  { label: "Expected Expenses (Next month)", value: "$4,150", trend: "down" },
  { label: "Cash Flow Forecast", value: "+$4,350", trend: "up" },
]

export default function InsightsPage() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 2000)
  }

  const totalSpending = categoryBreakdown.reduce((acc, cat) => acc + cat.value, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">AI Insights</h1>
          <p className="text-muted-foreground">
            Intelligent analysis of your financial patterns
          </p>
        </div>
        <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
          <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh Insights
        </Button>
      </div>

      {/* AI Summary Card */}
      <Card className="border-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20">
                <Brain className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground">Financial Health Score</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Based on spending, savings, and investment patterns
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">82</div>
                <p className="text-sm text-muted-foreground">out of 100</p>
              </div>
              <Badge variant="secondary" className="bg-success/20 text-success">
                Good Standing
              </Badge>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {predictions.map((pred, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-background/50 p-3"
              >
                <div>
                  <p className="text-xs text-muted-foreground">{pred.label}</p>
                  <p className="text-lg font-semibold text-foreground">{pred.value}</p>
                </div>
                {pred.trend === "up" ? (
                  <ArrowUpRight className="h-5 w-5 text-success" />
                ) : (
                  <ArrowDownRight className="h-5 w-5 text-warning" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-medium text-foreground">AI Recommendations</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {aiInsights.map((insight) => (
            <Card key={insight.id} className="group transition-shadow hover:shadow-md">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                      insight.priority === "high"
                        ? "bg-warning/20 text-warning"
                        : insight.priority === "medium"
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <insight.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium text-foreground">{insight.title}</h4>
                      <Badge
                        variant="outline"
                        className={
                          insight.impact.startsWith("+")
                            ? "border-success/30 bg-success/10 text-success"
                            : insight.impact.startsWith("-")
                              ? "border-warning/30 bg-warning/10 text-warning"
                              : "border-primary/30 bg-primary/10 text-primary"
                        }
                      >
                        {insight.impact}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {insight.description}
                    </p>
                    <Button
                      variant="link"
                      className="mt-2 h-auto p-0 text-primary"
                      size="sm"
                    >
                      Learn more <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Spending Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Income vs Spending</CardTitle>
            <CardDescription>6-month trend analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={spendingTrend}>
                  <defs>
                    <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="income"
                    stroke="hsl(var(--chart-1))"
                    fill="url(#incomeGradient)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="spending"
                    stroke="hsl(var(--chart-2))"
                    fill="url(#spendingGradient)"
                    strokeWidth={2}
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
                <span className="text-sm text-muted-foreground">Spending</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Spending by Category</CardTitle>
            <CardDescription>This month breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <div className="h-48 w-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {categoryBreakdown.map((entry, index) => (
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
              <div className="flex-1 space-y-3">
                {categoryBreakdown.map((cat, index) => (
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
                        ${cat.value.toLocaleString()}
                      </span>
                      <span className="ml-2 text-xs text-muted-foreground">
                        ({Math.round((cat.value / totalSpending) * 100)}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Savings Goals */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Savings Goals</CardTitle>
              <CardDescription>Track your progress towards financial goals</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Target className="mr-2 h-4 w-4" />
              Add Goal
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {savingsGoals.map((goal) => {
            const progress = (goal.current / goal.target) * 100
            return (
              <div key={goal.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">{goal.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Target: {goal.deadline} | ${goal.monthlyContribution}/mo
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-foreground">
                      ${goal.current.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      of ${goal.target.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={progress} className="h-2 flex-1" />
                  <span className="w-12 text-right text-sm font-medium text-primary">
                    {Math.round(progress)}%
                  </span>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
