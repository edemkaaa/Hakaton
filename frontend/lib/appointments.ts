// Это имитация функций для работы с записями на приём

interface Appointment {
  id: number
  userId: number
  serviceId: number
  subServiceId: number
  specialistId: number
  date: Date
  time: string
  status: "pending" | "completed" | "cancelled"
}

interface CreateAppointmentData {
  serviceId: number
  subServiceId: number
  specialistId: number
  date: Date
  time: string
}

interface CreateAppointmentByAdminData extends CreateAppointmentData {
  fullName: string
  passportSeries: string
  passportNumber: string
}

// Имитация хранилища записей
let appointments: Appointment[] = [
  {
    id: 1,
    userId: 2,
    serviceId: 1,
    subServiceId: 1,
    specialistId: 3,
    date: new Date(),
    time: "12:00",
    status: "pending",
  },
]

// Функция для создания записи на приём
export async function createAppointment(data: CreateAppointmentData): Promise<Appointment> {
  // Имитация задержки сети
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Создание новой записи
  const newAppointment: Appointment = {
    id: appointments.length + 1,
    userId: 2, // В реальном приложении здесь будет ID текущего пользователя
    serviceId: data.serviceId,
    subServiceId: data.subServiceId,
    specialistId: data.specialistId,
    date: data.date,
    time: data.time,
    status: "pending",
  }

  // Добавление записи в "базу данных"
  appointments.push(newAppointment)

  return newAppointment
}

// Функция для создания записи администратором
export async function createAppointmentByAdmin(data: CreateAppointmentByAdminData): Promise<Appointment> {
  // Имитация задержки сети
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Создание новой записи
  const newAppointment: Appointment = {
    id: appointments.length + 1,
    userId: 2, // В реальном приложении здесь будет ID найденного или созданного пользователя
    serviceId: data.serviceId,
    subServiceId: data.subServiceId,
    specialistId: data.specialistId,
    date: data.date,
    time: data.time,
    status: "pending",
  }

  // Добавление записи в "базу данных"
  appointments.push(newAppointment)

  return newAppointment
}

// Функция для получения записей пользователя
export async function getUserAppointments(): Promise<any[]> {
  // Имитация задержки сети
  await new Promise((resolve) => setTimeout(resolve, 500))

  // В реальном приложении здесь будет фильтрация по ID текущего пользователя
  return [
    {
      id: 1,
      service: "Получение земельного участка",
      subService: "Оформление документов",
      specialist: "Иванов И.И.",
      date: "15.05.2024",
      time: "12:00",
      status: "pending",
    },
  ]
}

// Функция для получения всех записей (для администратора)
export async function getAdminAppointments(): Promise<any[]> {
  // Имитация задержки сети
  await new Promise((resolve) => setTimeout(resolve, 500))

  return [
    {
      id: 1,
      user: "Иванов Иван Иванович",
      service: "Получение земельного участка",
      subService: "Оформление документов",
      specialist: "Петров П.П.",
      date: new Date().toLocaleDateString("ru-RU"),
      time: "12:00",
      status: "pending",
    },
    {
      id: 2,
      user: "Сидоров Сидор Сидорович",
      service: "Оформление социального пособия",
      subService: "Консультация",
      specialist: "Иванов И.И.",
      date: new Date().toLocaleDateString("ru-RU"),
      time: "14:30",
      status: "pending",
    },
    {
      id: 3,
      user: "Петрова Анна Ивановна",
      service: "Получение земельного участка",
      subService: "Подача заявления",
      specialist: "Сидоров С.С.",
      date: "10.05.2024",
      time: "10:00",
      status: "completed",
    },
  ]
}

// Функция для отметки записи как завершенной
export async function markAppointmentAsCompleted(id: number): Promise<void> {
  // Имитация задержки сети
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Обновление статуса записи
  appointments = appointments.map((appointment) =>
    appointment.id === id ? { ...appointment, status: "completed" } : appointment,
  )
}

// Функция для получения доступных слотов времени
export async function getAvailableTimeSlots(specialistId: number, date: Date): Promise<string[]> {
  // Имитация задержки сети
  await new Promise((resolve) => setTimeout(resolve, 500))

  // В реальном приложении здесь будет логика получения доступных слотов
  // с учетом расписания специалиста и существующих записей
  return [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ]
}
