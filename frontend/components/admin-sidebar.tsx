"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CalendarDays, Home, Settings, User, Users } from "lucide-react"
import { cn } from "@/lib/utils"

export function AdminSidebar() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/admin",
      label: "Панель управления",
      icon: Home,
    },
    {
      href: "/admin/appointments",
      label: "Записи",
      icon: CalendarDays,
    },
    {
      href: "/admin/users",
      label: "Пользователи",
      icon: Users,
    },
    {
      href: "/admin/profile",
      label: "Профиль",
      icon: User,
    },
    {
      href: "/admin/settings",
      label: "Настройки",
      icon: Settings,
    },
  ]

  return (
    <div className="flex h-full w-[240px] flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/admin" className="flex items-center gap-2 font-semibold">
          <span className="text-lg">Панель администратора</span>
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
