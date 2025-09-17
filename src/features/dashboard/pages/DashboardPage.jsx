import DashboardStats from "../components/DashboardStats"
import RecentActivity from "../components/RecentActivity"
import PropertyChart from "../components/PropertyChart"

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-secondary p-6 rounded-lg animate-fade-in">
        <h1 className="text-2xl font-bold mb-2 text-primary-foreground">¡Bienvenido de vuelta!</h1>
        <p className="text-primary-foreground/90">Aquí tienes un resumen de tu actividad inmobiliaria</p>
      </div>

      {/* Stats Cards */}
      <DashboardStats />

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PropertyChart />
        <RecentActivity />
      </div>
    </div>
  )
}

export default DashboardPage
