"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight, Edit, Lock, MoreHorizontal, Search, Trash, User, UserPlus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination"
import { Label } from "@/components/ui/label"

interface UserType {
  id: number
  username: string
  fullName: string
  email?: string
  phone?: string
  role: "user" | "admin"
  status: "active" | "blocked"
  lastLogin?: string
  registrationDate: string
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserType[]>([
    {
      id: 1,
      username: "admin",
      fullName: "Администратор Системы",
      email: "admin@example.com",
      phone: "+7 (999) 123-45-67",
      role: "admin",
      status: "active",
      lastLogin: "10.05.2024",
      registrationDate: "01.01.2024",
    },
    {
      id: 2,
      username: "user",
      fullName: "Иванов Иван Иванович",
      email: "user@example.com",
      phone: "+7 (999) 987-65-43",
      role: "user",
      status: "active",
      lastLogin: "09.05.2024",
      registrationDate: "15.01.2024",
    },
    {
      id: 3,
      username: "petrov",
      fullName: "Петров Петр Петрович",
      email: "petrov@example.com",
      phone: "+7 (999) 111-22-33",
      role: "user",
      status: "active",
      lastLogin: "05.05.2024",
      registrationDate: "20.02.2024",
    },
    {
      id: 4,
      username: "sidorov",
      fullName: "Сидоров Сидор Сидорович",
      email: "sidorov@example.com",
      phone: "+7 (999) 444-55-66",
      role: "user",
      status: "blocked",
      lastLogin: "01.05.2024",
      registrationDate: "10.03.2024",
    },
  ])

  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [filterRole, setFilterRole] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const [editForm, setEditForm] = useState({
    username: "",
    fullName: "",
    email: "",
    phone: "",
    role: "user" as "user" | "admin",
    status: "active" as "active" | "blocked",
  })

  const [createForm, setCreateForm] = useState({
    username: "",
    password: "",
    fullName: "",
    email: "",
    phone: "",
    role: "user" as "user" | "admin",
  })

  const handleOpenDetails = (user: UserType) => {
    setSelectedUser(user)
    setIsDetailsOpen(true)
  }

  const handleOpenEdit = (user: UserType) => {
    setSelectedUser(user)
    setEditForm({
      username: user.username,
      fullName: user.fullName,
      email: user.email || "",
      phone: user.phone || "",
      role: user.role,
      status: user.status,
    })
    setIsEditOpen(true)
  }

  const handleOpenDelete = (user: UserType) => {
    setSelectedUser(user)
    setIsDeleteOpen(true)
  }

  const handleEditUser = () => {
    if (selectedUser) {
      setUsers(users.map((user) => (user.id === selectedUser.id ? { ...user, ...editForm } : user)))
      setIsEditOpen(false)
    }
  }

  const handleDeleteUser = () => {
    if (selectedUser) {
      setUsers(users.filter((user) => user.id !== selectedUser.id))
      setIsDeleteOpen(false)
    }
  }

  const handleCreateUser = () => {
    const newUser: UserType = {
      id: Math.max(...users.map((u) => u.id)) + 1,
      username: createForm.username,
      fullName: createForm.fullName,
      email: createForm.email,
      phone: createForm.phone,
      role: createForm.role,
      status: "active",
      registrationDate: new Date().toLocaleDateString("ru-RU"),
    }

    setUsers([...users, newUser])
    setIsCreateOpen(false)
    setCreateForm({
      username: "",
      password: "",
      fullName: "",
      email: "",
      phone: "",
      role: "user",
    })
  }

  const handleToggleUserStatus = (userId: number) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: user.status === "active" ? "blocked" : "active" } : user,
      ),
    )
  }

  const filteredUsers = users.filter(
    (user) =>
      (user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (filterRole === "all" || user.role === filterRole) &&
      (filterStatus === "all" || user.status === filterStatus),
  )

  const adminUsers = filteredUsers.filter((user) => user.role === "admin")
  const regularUsers = filteredUsers.filter((user) => user.role === "user")
  const activeUsers = filteredUsers.filter((user) => user.status === "active")
  const blockedUsers = filteredUsers.filter((user) => user.status === "blocked")

  return (
    <div className="container mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Управление пользователями</h1>
        <Button className="rounded-full" onClick={() => setIsCreateOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Создать пользователя
        </Button>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card className="border-none shadow-md overflow-hidden service-card">
          <div className="h-2 bg-primary"></div>
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <User className="h-6 w-6 text-primary" />
            </div>
            <p className="text-2xl font-bold">{users.length}</p>
            <p className="text-muted-foreground text-center">Всего пользователей</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md overflow-hidden service-card">
          <div className="h-2 bg-primary"></div>
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <User className="h-6 w-6 text-primary" />
            </div>
            <p className="text-2xl font-bold">{adminUsers.length}</p>
            <p className="text-muted-foreground text-center">Администраторов</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md overflow-hidden service-card">
          <div className="h-2 bg-primary"></div>
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <User className="h-6 w-6 text-primary" />
            </div>
            <p className="text-2xl font-bold">{activeUsers.length}</p>
            <p className="text-muted-foreground text-center">Активных</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md overflow-hidden service-card">
          <div className="h-2 bg-primary"></div>
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <p className="text-2xl font-bold">{blockedUsers.length}</p>
            <p className="text-muted-foreground text-center">Заблокированных</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Поиск пользователей..."
              className="pl-10 rounded-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Роль" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все роли</SelectItem>
                <SelectItem value="admin">Администраторы</SelectItem>
                <SelectItem value="user">Пользователи</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="active">Активные</SelectItem>
                <SelectItem value="blocked">Заблокированные</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">Все</TabsTrigger>
            <TabsTrigger value="admins">Администраторы</TabsTrigger>
            <TabsTrigger value="users">Пользователи</TabsTrigger>
            <TabsTrigger value="blocked">Заблокированные</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <UsersTable
              users={filteredUsers}
              onViewDetails={handleOpenDetails}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
              onToggleStatus={handleToggleUserStatus}
            />
          </TabsContent>
          <TabsContent value="admins">
            <UsersTable
              users={adminUsers}
              onViewDetails={handleOpenDetails}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
              onToggleStatus={handleToggleUserStatus}
            />
          </TabsContent>
          <TabsContent value="users">
            <UsersTable
              users={regularUsers}
              onViewDetails={handleOpenDetails}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
              onToggleStatus={handleToggleUserStatus}
            />
          </TabsContent>
          <TabsContent value="blocked">
            <UsersTable
              users={blockedUsers}
              onViewDetails={handleOpenDetails}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
              onToggleStatus={handleToggleUserStatus}
            />
          </TabsContent>
        </Tabs>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink className="rounded-full">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Пред.
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink className="rounded-full" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink className="rounded-full">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink className="rounded-full">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink className="rounded-full">
                След.
                <ChevronRight className="h-4 w-4 ml-2" />
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Диалог с деталями пользователя */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Информация о пользователе</DialogTitle>
            <DialogDescription>Детальная информация о пользователе</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-10 w-10 text-primary" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Логин</p>
                  <p>{selectedUser.username}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">ФИО</p>
                  <p>{selectedUser.fullName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p>{selectedUser.email || "Не указан"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Телефон</p>
                  <p>{selectedUser.phone || "Не указан"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Роль</p>
                  <Badge variant={selectedUser.role === "admin" ? "default" : "outline"}>
                    {selectedUser.role === "admin" ? "Администратор" : "Пользователь"}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Статус</p>
                  <Badge variant={selectedUser.status === "active" ? "success" : "destructive"}>
                    {selectedUser.status === "active" ? "Активен" : "Заблокирован"}
                  </Badge>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Дата регистрации</p>
                <p>{selectedUser.registrationDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Последний вход</p>
                <p>{selectedUser.lastLogin || "Нет данных"}</p>
              </div>
            </div>
          )}
          <DialogFooter className="flex flex-row gap-2 sm:justify-between">
            <Button type="button" variant="outline" onClick={() => setIsDetailsOpen(false)}>
              Закрыть
            </Button>
            {selectedUser && (
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDetailsOpen(false)
                    handleOpenEdit(selectedUser)
                  }}
                >
                  Редактировать
                </Button>
                <Button
                  type="button"
                  variant={selectedUser.status === "active" ? "destructive" : "default"}
                  onClick={() => {
                    handleToggleUserStatus(selectedUser.id)
                    setIsDetailsOpen(false)
                  }}
                >
                  {selectedUser.status === "active" ? "Заблокировать" : "Разблокировать"}
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Диалог редактирования пользователя */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Редактирование пользователя</DialogTitle>
            <DialogDescription>Изменение данных пользователя</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-username">Логин</Label>
              <Input
                id="edit-username"
                value={editForm.username}
                onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-fullName">ФИО</Label>
              <Input
                id="edit-fullName"
                value={editForm.fullName}
                onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-phone">Телефон</Label>
              <Input
                id="edit-phone"
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-role">Роль</Label>
              <Select
                value={editForm.role}
                onValueChange={(value) => setEditForm({ ...editForm, role: value as "user" | "admin" })}
              >
                <SelectTrigger id="edit-role">
                  <SelectValue placeholder="Выберите роль" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Пользователь</SelectItem>
                  <SelectItem value="admin">Администратор</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Статус</Label>
              <Select
                value={editForm.status}
                onValueChange={(value) => setEditForm({ ...editForm, status: value as "active" | "blocked" })}
              >
                <SelectTrigger id="edit-status">
                  <SelectValue placeholder="Выберите статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Активен</SelectItem>
                  <SelectItem value="blocked">Заблокирован</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="flex flex-row gap-2 sm:justify-end">
            <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>
              Отмена
            </Button>
            <Button type="button" onClick={handleEditUser}>
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Диалог удаления пользователя */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Удаление пользователя</DialogTitle>
            <DialogDescription>Вы уверены, что хотите удалить этого пользователя?</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="border rounded-lg p-4 bg-muted/50">
              <p>
                <strong>Логин:</strong> {selectedUser.username}
              </p>
              <p>
                <strong>ФИО:</strong> {selectedUser.fullName}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email || "Не указан"}
              </p>
            </div>
          )}
          <DialogFooter className="flex flex-row gap-2 sm:justify-end">
            <Button type="button" variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Отмена
            </Button>
            <Button type="button" variant="destructive" onClick={handleDeleteUser}>
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Диалог создания пользователя */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Создание пользователя</DialogTitle>
            <DialogDescription>Заполните данные для создания нового пользователя</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="create-username">Логин</Label>
              <Input
                id="create-username"
                value={createForm.username}
                onChange={(e) => setCreateForm({ ...createForm, username: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-password">Пароль</Label>
              <Input
                id="create-password"
                type="password"
                value={createForm.password}
                onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-fullName">ФИО</Label>
              <Input
                id="create-fullName"
                value={createForm.fullName}
                onChange={(e) => setCreateForm({ ...createForm, fullName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-email">Email</Label>
              <Input
                id="create-email"
                type="email"
                value={createForm.email}
                onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-phone">Телефон</Label>
              <Input
                id="create-phone"
                value={createForm.phone}
                onChange={(e) => setCreateForm({ ...createForm, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-role">Роль</Label>
              <Select
                value={createForm.role}
                onValueChange={(value) => setCreateForm({ ...createForm, role: value as "user" | "admin" })}
              >
                <SelectTrigger id="create-role">
                  <SelectValue placeholder="Выберите роль" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Пользователь</SelectItem>
                  <SelectItem value="admin">Администратор</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="flex flex-row gap-2 sm:justify-end">
            <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
              Отмена
            </Button>
            <Button type="button" onClick={handleCreateUser}>
              Создать
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function UsersTable({
  users,
  onViewDetails,
  onEdit,
  onDelete,
  onToggleStatus,
}: {
  users: UserType[]
  onViewDetails: (user: UserType) => void
  onEdit: (user: UserType) => void
  onDelete: (user: UserType) => void
  onToggleStatus: (userId: number) => void
}) {
  if (users.length === 0) {
    return <div className="text-center py-6 text-muted-foreground">Пользователи не найдены</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-3 px-4 text-left font-medium">Пользователь</th>
            <th className="py-3 px-4 text-left font-medium">Email</th>
            <th className="py-3 px-4 text-left font-medium">Телефон</th>
            <th className="py-3 px-4 text-left font-medium">Роль</th>
            <th className="py-3 px-4 text-left font-medium">Статус</th>
            <th className="py-3 px-4 text-left font-medium">Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-muted/50 cursor-pointer" onClick={() => onViewDetails(user)}>
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{user.fullName}</p>
                    <p className="text-sm text-muted-foreground">{user.username}</p>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4">{user.email || "—"}</td>
              <td className="py-3 px-4">{user.phone || "—"}</td>
              <td className="py-3 px-4">
                <Badge variant={user.role === "admin" ? "default" : "outline"}>
                  {user.role === "admin" ? "Администратор" : "Пользователь"}
                </Badge>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${user.status === "active" ? "bg-green-500" : "bg-red-500"}`}
                  ></div>
                  <span>{user.status === "active" ? "Активен" : "Заблокирован"}</span>
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="sm" className="rounded-full">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          onViewDetails(user)
                        }}
                      >
                        Детали
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          onEdit(user)
                        }}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Редактировать
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          onToggleStatus(user.id)
                        }}
                      >
                        <Lock className="h-4 w-4 mr-2" />
                        {user.status === "active" ? "Заблокировать" : "Разблокировать"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          onDelete(user)
                        }}
                        className="text-red-500"
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Удалить
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
