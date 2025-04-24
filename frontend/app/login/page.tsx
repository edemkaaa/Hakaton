"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { loginUser } from "@/lib/auth"
import { Building, KeyRound, User } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await loginUser(formData)
      router.push("/dashboard")
    } catch (err) {
      setError("Неверный логин или пароль")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b py-4 px-6 bg-white">
        <div className="container mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <Building className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">ГосПриём</h1>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 bg-gradient-to-b from-primary/5 to-white">
        <div className="w-full max-w-md">
          <Card className="border-none shadow-lg">
            <CardHeader className="space-y-1 text-center">
              <div className="flex justify-center mb-2">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold">Вход в систему</CardTitle>
              <CardDescription>Введите свои данные для входа</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {error && <div className="p-3 bg-red-50 text-red-500 text-sm rounded-md">{error}</div>}
                <div className="space-y-2">
                  <Label htmlFor="username">Логин</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      required
                      value={formData.username}
                      onChange={handleChange}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Пароль</Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full rounded-full" disabled={loading}>
                  {loading ? "Вход..." : "Войти"}
                </Button>
                <div className="text-center text-sm">
                  Нет аккаунта?{" "}
                  <Link href="/register" className="text-primary hover:underline font-medium">
                    Зарегистрироваться
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
}
