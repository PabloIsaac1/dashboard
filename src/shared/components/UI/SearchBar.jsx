"use client"

import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const SearchBar = ({ searchTerm, onSearchChange, placeholder = "Buscar...", onFilterClick, showFilter = true }) => {
  return (
    <div className="flex items-center space-x-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-lg">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder={`🔍 ${placeholder}`}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-12 pr-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>
      {showFilter && (
        <Button 
          variant="outline" 
          onClick={onFilterClick} 
          className="flex items-center space-x-2 bg-white border-gray-200 hover:bg-gray-50 px-4 py-3 rounded-xl"
        >
          <Filter className="h-5 w-5 text-gray-600" />
          <span className="text-gray-700">🔧 Filtros</span>
        </Button>
      )}
    </div>
  )
}

export default SearchBar
