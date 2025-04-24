interface NotificationProps {
  notification: {
    id: number
    title: string
    message: string
    date: string
    read: boolean
  }
}

export function Notification({ notification }: NotificationProps) {
  return (
    <div className={`border rounded-xl p-4 ${notification.read ? "bg-background" : "bg-primary/5"}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium">{notification.title}</h3>
        <div className="text-xs text-muted-foreground">{notification.date}</div>
      </div>
      <p className="text-sm text-muted-foreground">{notification.message}</p>
      {!notification.read && (
        <div className="mt-2">
          <button className="text-xs text-primary hover:underline">Отметить как прочитанное</button>
        </div>
      )}
    </div>
  )
}
