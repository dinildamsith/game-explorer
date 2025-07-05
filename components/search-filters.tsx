"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X, Filter } from "lucide-react"
import { fetchGenres, fetchPlatforms, fetchTags, fetchStores } from "@/lib/api"

interface SearchFiltersProps {
  onSearch: (query: string) => void
  onGenreChange: (genre: string) => void
  onPlatformChange: (platform: string) => void
  onOrderingChange: (ordering: string) => void
  onTagChange?: (tag: string) => void
  onStoreChange?: (store: string) => void
  onClearFilters: () => void
}

export function SearchFilters({
  onSearch,
  onGenreChange,
  onPlatformChange,
  onOrderingChange,
  onTagChange,
  onStoreChange,
  onClearFilters,
}: SearchFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [genres, setGenres] = useState<any[]>([])
  const [platforms, setPlatforms] = useState<any[]>([])
  const [selectedGenre, setSelectedGenre] = useState("")
  const [selectedPlatform, setSelectedPlatform] = useState("")
  const [selectedOrdering, setSelectedOrdering] = useState("")
  const [tags, setTags] = useState<any[]>([])
  const [stores, setStores] = useState<any[]>([])
  const [selectedTag, setSelectedTag] = useState("")
  const [selectedStore, setSelectedStore] = useState("")

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const [genresData, platformsData, tagsData, storesData] = await Promise.all([
          fetchGenres(),
          fetchPlatforms(),
          fetchTags(),
          fetchStores(),
        ])
        setGenres(genresData.results)
        setPlatforms(platformsData.results)
        setTags(tagsData.results)
        setStores(storesData.results)
      } catch (error) {
        console.error("Failed to load filters:", error)
      }
    }
    loadFilters()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  const handleClearFilters = () => {
    setSearchQuery("")
    setSelectedGenre("")
    setSelectedPlatform("")
    setSelectedOrdering("")
    setSelectedTag("")
    setSelectedStore("")
    onClearFilters()
  }

  return (
    <div className="space-y-6 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-purple-600" />
        <h2 className="text-lg font-semibold text-gray-900">Search & Filters</h2>
      </div>

      <form onSubmit={handleSearch} className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search for games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-gray-300 text-black focus:border-purple-500 focus:ring-purple-500 bg-white"
          />
        </div>
        <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-6">
          Search
        </Button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Select
          value={selectedGenre}
          onValueChange={(value) => {
            setSelectedGenre(value)
            onGenreChange(value)
          }}
        >
          <SelectTrigger className="border-gray-300 focus:border-purple-500 bg-white text-gray-900">
            <SelectValue placeholder="Genre" className="text-gray-700" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200 shadow-lg">
            {genres.map((genre) => (
              <SelectItem
                key={genre.id}
                value={genre.id.toString()}
                className="text-gray-900 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black"
              >
                {genre.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedPlatform}
          onValueChange={(value) => {
            setSelectedPlatform(value)
            onPlatformChange(value)
          }}
        >
          <SelectTrigger className="border-gray-300 focus:border-purple-500 bg-white text-gray-900">
            <SelectValue placeholder="Platform" className="text-gray-700" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200 shadow-lg">
            {platforms.slice(0, 20).map((platform) => (
              <SelectItem
                key={platform.id}
                value={platform.id.toString()}
                className="text-gray-900 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black"
              >
                {platform.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedOrdering}
          onValueChange={(value) => {
            setSelectedOrdering(value)
            onOrderingChange(value)
          }}
        >
          <SelectTrigger className="border-gray-300 focus:border-purple-500 bg-white text-gray-900">
            <SelectValue placeholder="Sort by" className="text-gray-700" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200 shadow-lg">
            <SelectItem value="-rating" className="text-gray-900 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black">
              ⭐ Highest Rated
            </SelectItem>
            <SelectItem value="-released" className="text-gray-900 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black">
              🆕 Newest
            </SelectItem>
            <SelectItem value="released" className="text-gray-900 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black">
              📅 Oldest
            </SelectItem>
            <SelectItem value="-metacritic" className="text-gray-900 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black">
              🏆 Metacritic Score
            </SelectItem>
            <SelectItem value="name" className="text-gray-900 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black">
              🔤 Name A-Z
            </SelectItem>
            <SelectItem value="-name" className="text-gray-900 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black">
              🔤 Name Z-A
            </SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={selectedTag}
          onValueChange={(value) => {
            setSelectedTag(value)
            onTagChange?.(value)
          }}
        >
          <SelectTrigger className="border-gray-300 focus:border-purple-500 bg-white text-gray-900">
            <SelectValue placeholder="Tags" className="text-gray-700" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200 shadow-lg">
            {tags.slice(0, 20).map((tag) => (
              <SelectItem
                key={tag.id}
                value={tag.id.toString()}
                className="text-gray-900 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black"
              >
                {tag.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedStore}
          onValueChange={(value) => {
            setSelectedStore(value)
            onStoreChange?.(value)
          }}
        >
          <SelectTrigger className="border-gray-300 focus:border-purple-500 bg-white text-gray-900">
            <SelectValue placeholder="Stores" className="text-gray-700" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200 shadow-lg">
            {stores.slice(0, 15).map((store) => (
              <SelectItem
                key={store.id}
                value={store.id.toString()}
                className="text-gray-900 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black"
              >
                {store.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={handleClearFilters}
          className="flex items-center gap-2 border-gray-300 text-gray-900 hover:bg-gray-50 hover:text-black bg-transparent focus:text-black"
        >
          <X className="w-4 h-4" />
          Clear All
        </Button>
      </div>
    </div>
  )
}
