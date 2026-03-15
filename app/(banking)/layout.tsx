import { BankingLayout } from '@/components/banking/banking-layout'

export default function BankingRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <BankingLayout>{children}</BankingLayout>
}
