export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        {/* Left Panel - Branding */}
        <div className="hidden lg:flex lg:w-1/2 lg:flex-col lg:justify-between bg-sidebar p-12">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">N</span>
            </div>
            <span className="text-xl font-semibold text-sidebar-foreground">NexusBank</span>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight text-sidebar-foreground text-balance">
              Banking reimagined for the digital age
            </h1>
            <p className="text-lg text-sidebar-foreground/70 leading-relaxed">
              Experience seamless financial management with enterprise-grade security, 
              AI-powered insights, and real-time fraud protection.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="space-y-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sidebar-accent">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-sidebar-foreground">Bank-grade Security</h3>
                <p className="text-sm text-sidebar-foreground/60">
                  256-bit encryption with multi-factor authentication
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sidebar-accent">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-sidebar-foreground">AI-Powered Insights</h3>
                <p className="text-sm text-sidebar-foreground/60">
                  Smart recommendations to optimize your finances
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sidebar-accent">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-sidebar-foreground">Instant Transfers</h3>
                <p className="text-sm text-sidebar-foreground/60">
                  Send money anywhere in seconds, not days
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sidebar-accent">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-sidebar-foreground">24/7 Support</h3>
                <p className="text-sm text-sidebar-foreground/60">
                  Expert help whenever you need it
                </p>
              </div>
            </div>
          </div>

          <p className="text-sm text-sidebar-foreground/50">
            © 2024 NexusBank. All rights reserved.
          </p>
        </div>

        {/* Right Panel - Auth Forms */}
        <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  )
}
