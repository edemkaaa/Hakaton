"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { registerUser } from "@/lib/auth"
import { Building, CreditCard, KeyRound, User, UserPlus } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    passportSeries: "",
    passportNumber: "",
    snils: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.username || !formData.password || !formData.confirmPassword) {
      setError("Пожалуйста, заполните все поля")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Пароли не совпадают")
      return
    }

    setError("")
    setStep(2)
  }

  const handlePrevStep = () => {
    setStep(1)
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.passportSeries.length !== 4) {
      setError("Серия паспорта должна содержать 4 цифры")
      return
    }

    if (formData.passportNumber.length !== 6) {
      setError("Номер паспорта должен содержать 6 цифр")
      return
    }

    if (formData.snils.replace(/\D/g, "").length !== 11) {
      setError("СНИЛС должен содержать 11 цифр")
      return
    }

    setLoading(true)

    try {
      await registerUser(formData)
      router.push("/dashboard")
    } catch (err) {
      setError("Ошибка при регистрации. Возможно, такой пользователь уже существует.")
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
                  <UserPlus className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold">Регистрация</CardTitle>
              <CardDescription>Создайте аккаунт для записи на приём</CardDescription>

              <div className="flex justify-center mt-4">
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-primary text-white" : "bg-gray-200"}`}
                  >
                    1
                  </div>
                  <div className={`w-16 h-1 ${step >= 2 ? "bg-primary" : "bg-gray-200"}`}></div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-primary text-white" : "bg-gray-200"}`}
                  >
                    2
                  </div>
                </div>
              </div>
            </CardHeader>
            <form onSubmit={step === 1 ? handleNextStep : handleSubmit}>
              <CardContent className="space-y-4">
                {error && <div className="p-3 bg-red-50 text-red-500 text-sm rounded-md">{error}</div>}

                {step === 1 ? (
                  <>
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
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Подтверждение пароля</Label>
                      <div className="relative">
                        <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          required
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="fullName">ФИО</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="fullName"
                          name="fullName"
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="passportSeries">Серия паспорта</Label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="passportSeries"
                            name="passportSeries"
                            type="text"
                            required
                            maxLength={4}
                            value={formData.passportSeries}
                            onChange={handleChange}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="passportNumber">Номер паспорта</Label>
                        <Input
                          id="passportNumber"
                          name="passportNumber"
                          type="text"
                          required
                          maxLength={6}
                          value={formData.passportNumber}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="snils">СНИЛС</Label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="snils"
                          name="snils"
                          type="text"
                          required
                          placeholder="XXX-XXX-XXX XX"
                          value={formData.snils}
                          onChange={handleChange}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                {step === 1 ? (
                  <>
                    <Button type="submit" className="w-full rounded-full">
                      Продолжить
                    </Button>
                    <div className="text-center text-sm">
                      Уже есть аккаунт?{" "}
                      <Link href="/login" className="text-primary hover:underline font-medium">
                        Войти
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="flex gap-4 w-full">
                    <Button type="button" variant="outline" className="flex-1 rounded-full" onClick={handlePrevStep}>
                      Назад
                    </Button>
                    <Button type="submit" className="flex-1 rounded-full" disabled={loading}>
                      {loading ? "Регистрация..." : "Зарегистрироваться"}
                    </Button>
                  </div>
                )}
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
}
