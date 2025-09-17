import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Building2, User, DollarSign } from "lucide-react"

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: "appointment",
      title: "Nueva cita programada",
      description: "Juan Pérez - Apartamento en Zona Rosa",
      time: "Hace 2 horas",
      icon: Calendar,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      type: "property",
      title: "Propiedad agregada",
      description: "Casa en El Poblado - $450,000",
      time: "Hace 4 horas",
      icon: Building2,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 3,
      type: "client",
      title: "Nuevo cliente registrado",
      description: "María González",
      time: "Hace 6 horas",
      icon: User,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 4,
      type: "sale",
      title: "Venta completada",
      description: "Apartamento Centro - $320,000",
      time: "Hace 1 día",
      icon: DollarSign,
      color: "bg-orange-100 text-orange-600",
    },
  ]

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>Actividad Reciente</span>
          <Badge variant="secondary" className="ml-auto">
            {activities.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon
            return (
              <div
                key={activity.id}
                className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className={`p-2 rounded-full ${activity.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-card-foreground">{activity.title}</p>
                  <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default RecentActivity
