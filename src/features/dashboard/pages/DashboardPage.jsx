import DashboardStats from "../components/DashboardStats"
import RecentActivity from "../components/RecentActivity"
import PropertyChart from "../components/PropertyChart"

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 p-8 rounded-2xl animate-fade-in shadow-xl">
        <div className="flex items-center gap-4">
          <div className="text-6xl">👋</div>
          <div>
            <h1 className="text-3xl font-bold mb-2 text-white">¡Bienvenido de vuelta!</h1>
            <p className="text-white/90 text-lg">Aquí tienes un resumen de tu actividad inmobiliaria 🏠</p>
          </div>
        </div>
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
