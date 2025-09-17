import { Building2, Calendar, Users, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const DashboardStats = () => {
  const stats = [
    {
      title: "Propiedades Activas",
      value: "156",
      change: "+12%",
      changeType: "positive",
      icon: Building2,
      color: "text-blue-600",
    },
    {
      title: "Citas Programadas",
      value: "23",
      change: "+8%",
      changeType: "positive",
      icon: Calendar,
      color: "text-green-600",
    },
    {
      title: "Ventas del Mes",
      value: "$2.4M",
      change: "+15%",
      changeType: "positive",
      icon: DollarSign,
      color: "text-purple-600",
    },
    {
      title: "Clientes Activos",
      value: "89",
      change: "+5%",
      changeType: "positive",
      icon: Users,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200 animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <Icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={`${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                  {stat.change}
                </span>{" "}
                desde el mes pasado
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default DashboardStats
