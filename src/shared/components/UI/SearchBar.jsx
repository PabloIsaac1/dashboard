"use client"

import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const SearchBar = ({ searchTerm, onSearchChange, placeholder = "Buscar...", onFilterClick, showFilter = true }) => {
  return (
    <div className="flex items-center space-x-4 bg-card p-4 rounded-lg border border-border">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-input"
        />
      </div>
      {showFilter && (
        <Button variant="outline" onClick={onFilterClick} className="flex items-center space-x-2 bg-transparent">
          <Filter className="h-4 w-4" />
          <span>Filtros</span>
        </Button>
      )}
    </div>
  )
}

export default SearchBar
