"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { services } from "@/lib/data"

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredServices = services.filter((service) => service.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="container mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold">Услуги</h1>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Поиск услуг..."
            className="pl-10 rounded-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id} className="border-none shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-2 bg-primary"></div>
            <CardHeader className="bg-primary/5 pb-4">
              <CardTitle>{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 p-6">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Доступно подуслуг: {service.subServices.length}</p>
                <Button asChild className="w-full rounded-full">
                  <Link href={`/dashboard/services/${service.id}`}>
                    Выбрать <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredServices.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">Услуги не найдены</p>
          </div>
        )}
      </div>
    </div>
  )
}
