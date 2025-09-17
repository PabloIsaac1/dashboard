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
      emoji: "🏠",
      bgColor: "bg-blue-100"
    },
    {
      title: "Citas Programadas",
      value: "23",
      change: "+8%",
      changeType: "positive",
      icon: Calendar,
      color: "text-green-600",
      emoji: "📅",
      bgColor: "bg-green-100"
    },
    {
      title: "Ventas del Mes",
      value: "$2.4M",
      change: "+15%",
      changeType: "positive",
      icon: DollarSign,
      color: "text-purple-600",
      emoji: "💰",
      bgColor: "bg-purple-100"
    },
    {
      title: "Clientes Activos",
      value: "89",
      change: "+5%",
      changeType: "positive",
      icon: Users,
      color: "text-orange-600",
      emoji: "👥",
      bgColor: "bg-orange-100"
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className="hover:shadow-xl transition-all duration-300 animate-fade-in border-0 shadow-lg bg-white">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <span className="text-2xl">{stat.emoji}</span>
                </div>
                <div className="flex-1">
                  <CardTitle className="text-sm font-medium text-gray-600 mb-1">{stat.title}</CardTitle>
                  <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <span className={`font-semibold ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                  {stat.changeType === "positive" ? "📈" : "📉"}
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
