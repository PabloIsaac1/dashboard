import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const PropertyChart = () => {
  const data = [
    { month: "Ene", ventas: 12, arriendos: 8 },
    { month: "Feb", ventas: 15, arriendos: 12 },
    { month: "Mar", ventas: 18, arriendos: 10 },
    { month: "Abr", ventas: 22, arriendos: 15 },
    { month: "May", ventas: 25, arriendos: 18 },
    { month: "Jun", ventas: 28, arriendos: 20 },
  ]

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Ventas vs Arriendos</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="ventas" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="arriendos" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default PropertyChart
