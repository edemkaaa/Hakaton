"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Building, CalendarDays, Home, LogOut, Moon, Settings, Sun, User, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { logoutUser } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { Badge } from "@/components/ui/badge"

export function TopNavbar({ isAdmin = false }: { isAdmin?: boolean }) {
  const router = useRouter()
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const handleLogout = async () => {
    await logoutUser()
    router.push("/login")
  }

  const routes = isAdmin
    ? [
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
    : [
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
    <header className="fixed top-0 left-0 right-0 z-10 bg-white border-b shadow-sm dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href={isAdmin ? "/admin" : "/dashboard"} className="flex items-center gap-2">
              <Building className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">ГосПриём</h1>
              {isAdmin && (
                <Badge variant="outline" className="ml-2 bg-primary/10">
                  Админ
                </Badge>
              )}
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {routes.map((route) => (
              <Button
                key={route.href}
                asChild
                variant="ghost"
                className={cn("rounded-full px-4", {
                  "bg-primary/10 text-primary": pathname === route.href,
                })}
              >
                <Link href={route.href} className="flex items-center gap-2">
                  <route.icon className="h-4 w-4" />
                  {route.label}
                </Link>
              </Button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Переключить тему</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative rounded-full">
                  <Bell className="h-5 w-5" />
                  <span className="notification-badge"></span>
                  <span className="sr-only">Уведомления</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex justify-between items-center">
                  <span>Уведомления</span>
                  <Badge variant="outline" className="ml-2">
                    Новых: 2
                  </Badge>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-[300px] overflow-auto">
                  <DropdownMenuItem className="p-3 cursor-pointer">
                    <div>
                      <p className="font-medium text-sm">Ваша запись на приём подтверждена</p>
                      <p className="text-xs text-muted-foreground mt-1">10.05.2024</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-3 cursor-pointer">
                    <div>
                      <p className="font-medium text-sm">Напоминание о приёме завтра в 12:00</p>
                      <p className="text-xs text-muted-foreground mt-1">10.05.2024</p>
                    </div>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center">
                  <Link href="/dashboard/notifications" className="text-primary text-sm">
                    Все уведомления
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Аватар" />
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={isAdmin ? "/admin/profile" : "/dashboard/profile"} className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Профиль
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={isAdmin ? "/admin/settings" : "/dashboard/settings"} className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Настройки
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-red-500">
                  <LogOut className="h-4 w-4" />
                  Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
