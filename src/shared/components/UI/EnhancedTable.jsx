"use client"

import { useState } from "react"
import { Search, Filter, MoreVertical, Edit, Trash2, Eye } from "lucide-react"

export const EnhancedTable = ({
  data = [],
  columns = [],
  onEdit,
  onDelete,
  onView,
  searchable = true,
  filterable = true,
  emptyMessage = "No hay datos disponibles",
  emptyEmoji = "📭",
}) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState("")
  const [sortDirection, setSortDirection] = useState("asc")
  const [activeDropdown, setActiveDropdown] = useState(null)

  // Filtrar y ordenar datos
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) => value?.toString().toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0
    const aVal = a[sortColumn]
    const bVal = b[sortColumn]
    const direction = sortDirection === "asc" ? 1 : -1
    return aVal > bVal ? direction : -direction
  })

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header con búsqueda */}
      {searchable && (
        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="🔍 Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            {filterable && (
              <button className="p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Tabla */}
      <div className="overflow-x-auto">
        {sortedData.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">{emptyEmoji}</div>
            <p className="text-gray-500 text-lg">{emptyMessage}</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-6 py-4 text-left text-sm font-bold text-gray-700 cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={() => handleSort(column.key)}
                  >
                    <div className="flex items-center gap-2">
                      {column.emoji && <span>{column.emoji}</span>}
                      {column.label}
                      {sortColumn === column.key && (
                        <span className="text-blue-600">{sortDirection === "asc" ? "↑" : "↓"}</span>
                      )}
                    </div>
                  </th>
                ))}
                <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">⚙️ Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((item, index) => (
                <tr
                  key={item.id || index}
                  className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200"
                >
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4 text-sm text-gray-800">
                      {column.render ? column.render(item[column.key], item) : item[column.key]}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right">
                    <div className="relative">
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === item.id ? null : item.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-600" />
                      </button>

                      {activeDropdown === item.id && (
                        <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-10 min-w-[150px]">
                          {onView && (
                            <button
                              onClick={() => {
                                onView(item)
                                setActiveDropdown(null)
                              }}
                              className="w-full px-4 py-3 text-left text-sm hover:bg-blue-50 flex items-center gap-3 transition-colors"
                            >
                              <Eye className="w-4 h-4 text-blue-600" />
                              👁️ Ver
                            </button>
                          )}
                          {onEdit && (
                            <button
                              onClick={() => {
                                onEdit(item)
                                setActiveDropdown(null)
                              }}
                              className="w-full px-4 py-3 text-left text-sm hover:bg-green-50 flex items-center gap-3 transition-colors"
                            >
                              <Edit className="w-4 h-4 text-green-600" />
                              ✏️ Editar
                            </button>
                          )}
                          {onDelete && (
                            <button
                              onClick={() => {
                                onDelete(item)
                                setActiveDropdown(null)
                              }}
                              className="w-full px-4 py-3 text-left text-sm hover:bg-red-50 flex items-center gap-3 transition-colors border-t border-gray-100"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                              🗑️ Eliminar
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}