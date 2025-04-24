import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Building, Calendar, CheckCircle, Clock, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b py-4 px-6 bg-white">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">ГосПриём</h1>
          </div>
          <div className="flex gap-4">
            <Button asChild variant="outline">
              <Link href="/login">Войти</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Регистрация</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="hero-pattern py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-4xl font-bold">Запись на приём к специалистам администрации</h2>
                <p className="text-xl text-gray-600">
                  Больше никаких очередей! Запишитесь на приём онлайн и приходите к назначенному времени.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="rounded-full">
                    <Link href="/register">Начать пользоваться</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-full">
                    <Link href="#how-it-works">Как это работает</Link>
                  </Button>
                </div>
              </div>
              <div className="relative animate-slide-in">
                <div className="absolute -inset-4 rounded-3xl bg-primary/5 -z-10"></div>
                <img
                  src="/image.jpg"
                  alt="Запись на приём"
                  className="rounded-2xl shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">Как это работает</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="relative p-8 rounded-2xl border bg-gradient-to-br from-white to-primary/5">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">
                  1
                </div>
                <div className="pt-6 text-center">
                  <Calendar className="mx-auto h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Регистрация</h3>
                  <p className="text-gray-600">Создайте аккаунт, указав свои данные: ФИО, паспорт и СНИЛС.</p>
                </div>
              </div>
              <div className="relative p-8 rounded-2xl border bg-gradient-to-br from-white to-primary/5">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">
                  2
                </div>
                <div className="pt-6 text-center">
                  <Users className="mx-auto h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Выбор услуги</h3>
                  <p className="text-gray-600">Выберите нужную услугу, специалиста и удобное для вас время.</p>
                </div>
              </div>
              <div className="relative p-8 rounded-2xl border bg-gradient-to-br from-white to-primary/5">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">
                  3
                </div>
                <div className="pt-6 text-center">
                  <CheckCircle className="mx-auto h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Приём</h3>
                  <p className="text-gray-600">Приходите в назначенное время без необходимости ждать в очереди.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Преимущества онлайн-записи</h2>
              <p className="text-lg text-gray-600 mb-12">
                Наш сервис делает взаимодействие с администрацией города удобным и эффективным
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm flex items-start gap-4">
                  <Clock className="h-10 w-10 text-primary flex-shrink-0" />
                  <div className="text-left">
                    <h3 className="font-semibold mb-2">Экономия времени</h3>
                    <p className="text-gray-600">Не нужно тратить время на ожидание в очереди</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm flex items-start gap-4">
                  <Calendar className="h-10 w-10 text-primary flex-shrink-0" />
                  <div className="text-left">
                    <h3 className="font-semibold mb-2">Удобное планирование</h3>
                    <p className="text-gray-600">Выбирайте удобное для вас время приёма</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm flex items-start gap-4">
                  <Users className="h-10 w-10 text-primary flex-shrink-0" />
                  <div className="text-left">
                    <h3 className="font-semibold mb-2">Выбор специалиста</h3>
                    <p className="text-gray-600">Запись к конкретному специалисту по вашему вопросу</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm flex items-start gap-4">
                  <CheckCircle className="h-10 w-10 text-primary flex-shrink-0" />
                  <div className="text-left">
                    <h3 className="font-semibold mb-2">Уведомления</h3>
                    <p className="text-gray-600">Получайте напоминания о предстоящих приёмах</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-bold">ГосПриём</h2>
              </div>
              <p className="text-gray-400">Система онлайн-записи на приём к специалистам администрации города</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Контакты</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Адрес: г. Симферополь, ул. Севастопольская, д. 64</li>
                <li>Телефон: +7 (978) 123-45-67</li>
                <li>Email: info@gospriem.ru</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Полезные ссылки</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-primary">
                    О сервисе
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-primary">
                    Помощь
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-primary">
                    Политика конфиденциальности
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} ГосПриём. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
