// Это имитация функций аутентификации, в реальном проекте здесь будет взаимодействие с API

interface User {
  id: number
  username: string
  fullName: string
  passportSeries: string
  passportNumber: string
  snils: string
  email?: string
  phone?: string
  role: "user" | "admin"
}

interface LoginData {
  username: string
  password: string
}

interface RegisterData {
  username: string
  password: string
  fullName: string
  passportSeries: string
  passportNumber: string
  snils: string
}

// Имитация хранилища пользователей
let users: User[] = [
  {
    id: 1,
    username: "admin",
    fullName: "Администратор Системы",
    passportSeries: "1111",
    passportNumber: "222222",
    snils: "123-456-789 01",
    email: "admin@example.com",
    phone: "+7 (999) 123-45-67",
    role: "admin",
  },
  {
    id: 2,
    username: "user",
    fullName: "Иванов Иван Иванович",
    passportSeries: "2222",
    passportNumber: "333333",
    snils: "987-654-321 09",
    email: "user@example.com",
    phone: "+7 (999) 987-65-43",
    role: "user",
  },
]

// Имитация текущего пользователя
let currentUser: User | null = null

// Функция для входа пользователя
export async function loginUser(data: LoginData): Promise<User> {
  // Имитация задержки сети
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Поиск пользователя
  const user = users.find((u) => u.username === data.username)

  // В реальном приложении здесь будет проверка пароля
  if (!user) {
    throw new Error("Пользователь не найден")
  }

  // Сохраняем текущего пользователя
  currentUser = user

  return user
}

// Функция для регистрации пользователя
export async function registerUser(data: RegisterData): Promise<User> {
  // Имитация задержки сети
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Проверка, что пользователь с таким именем не существует
  if (users.some((u) => u.username === data.username)) {
    throw new Error("Пользователь с таким именем уже существует")
  }

  // Создание нового пользователя
  const newUser: User = {
    id: users.length + 1,
    username: data.username,
    fullName: data.fullName,
    passportSeries: data.passportSeries,
    passportNumber: data.passportNumber,
    snils: data.snils,
    role: "user",
  }

  // Добавление пользователя в "базу данных"
  users.push(newUser)

  // Сохраняем текущего пользователя
  currentUser = newUser

  return newUser
}

// Функция для выхода пользователя
export async function logoutUser(): Promise<void> {
  // Имитация задержки сети
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Очистка текущего пользователя
  currentUser = null
}

// Функция для получения текущего пользователя
export async function getCurrentUser(): Promise<User | null> {
  // Имитация задержки сети
  await new Promise((resolve) => setTimeout(resolve, 300))

  return currentUser
}

// Функция для обновления профиля пользователя
export async function updateUserProfile(data: Partial<User>): Promise<User> {
  // Имитация задержки сети
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (!currentUser) {
    throw new Error("Пользователь не авторизован")
  }

  // Обновление данных пользователя
  const updatedUser = { ...currentUser, ...data }

  // Обновление в "базе данных"
  users = users.map((u) => (u.id === currentUser?.id ? updatedUser : u))

  // Обновление текущего пользователя
  currentUser = updatedUser

  return updatedUser
}
