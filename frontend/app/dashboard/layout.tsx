import type React from "react"
import { TopNavbar } from "@/components/top-navbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <TopNavbar />
      <main className="flex-1 p-6 pt-24 dashboard-gradient">{children}</main>
    </div>
  )
}
