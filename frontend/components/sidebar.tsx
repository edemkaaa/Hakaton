"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CalendarDays, Home, Settings, User } from "lucide-react"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/dashboard",
      label: "Главная",
      icon: Home,
    },
    {
      href: "/dashboard/services",
      label: "Услуги",
      icon: CalendarDays,
    },
    {
      href: "/dashboard/appointments",
      label: "Мои записи",
      icon: CalendarDays,
    },
    {
      href: "/dashboard/profile",
      label: "Профиль",
      icon: User,
    },
    {
      href: "/dashboard/settings",
      label: "Настройки",
      icon: Settings,
    },
  ]

  return (
    <div className="flex h-full w-[240px] flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <span className="text-lg">Администрация городa</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          {routes.map((route) => (
            <Button
              key={route.href}
              asChild
              variant={pathname === route.href ? "secondary" : "ghost"}
              className={cn("justify-start gap-2", {
                "bg-secondary": pathname === route.href,
              })}
            >
              <Link href={route.href}>
                <route.icon className="h-4 w-4" />
                {route.label}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </div>
  )
}
