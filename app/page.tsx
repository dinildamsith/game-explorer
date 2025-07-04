"use client"

import { useState, useEffect } from "react"
import { GameCard } from "@/components/game-card"
import { SearchFilters } from "@/components/search-filters"
import { Button } from "@/components/ui/button"
import { Loader2, Gamepad2 } from "lucide-react"
import { fetchGames } from "@/lib/api"
import type { Game, GamesResponse } from "@/types/game"
import { Navigation } from "@/components/navigation"

export default function HomePage() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [filters, setFilters] = useState({
    search: "",
    genres: "",
    platforms: "",
    ordering: "",
    tags: "",
    stores: "",
  })

  const loadGames = async (page = 1, newFilters = filters, append = false) => {
    try {
      if (page === 1) {
        setLoading(true)
      } else {
        setLoadingMore(true)
      }

      const data: GamesResponse = await fetchGames({
        page,
        ...newFilters,
      })

      if (append) {
        setGames((prev) => [...prev, ...data.results])
      } else {
        setGames(data.results)
      }

      setHasMore(!!data.next)
      setCurrentPage(page)
    } catch (error) {
      console.error("Failed to load games:", error)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  useEffect(() => {
    loadGames()
  }, [])

  const handleSearch = (query: string) => {
    const newFilters = { ...filters, search: query }
    setFilters(newFilters)
    loadGames(1, newFilters)
  }

  const handleGenreChange = (genre: string) => {
    const newFilters = { ...filters, genres: genre }
    setFilters(newFilters)
    loadGames(1, newFilters)
  }

  const handlePlatformChange = (platform: string) => {
    const newFilters = { ...filters, platforms: platform }
    setFilters(newFilters)
    loadGames(1, newFilters)
  }

  const handleOrderingChange = (ordering: string) => {
    const newFilters = { ...filters, ordering }
    setFilters(newFilters)
    loadGames(1, newFilters)
  }

  const handleTagChange = (tag: string) => {
    const newFilters = { ...filters, tags: tag }
    setFilters(newFilters)
    loadGames(1, newFilters)
  }

  const handleStoreChange = (store: string) => {
    const newFilters = { ...filters, stores: store }
    setFilters(newFilters)
    loadGames(1, newFilters)
  }

  const handleClearFilters = () => {
    const newFilters = { search: "", genres: "", platforms: "", ordering: "", tags: "", stores: "" }
    setFilters(newFilters)
    loadGames(1, newFilters)
  }

  const loadMore = () => {
    loadGames(currentPage + 1, filters, true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">GameExplorer</h1>
                <p className="text-sm text-gray-600">Discover amazing games</p>
              </div>
            </div>
            <Navigation />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <SearchFilters
            onSearch={handleSearch}
            onGenreChange={handleGenreChange}
            onPlatformChange={handlePlatformChange}
            onOrderingChange={handleOrderingChange}
            onTagChange={handleTagChange}
            onStoreChange={handleStoreChange}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <span className="text-gray-600">Loading amazing games...</span>
            </div>
          </div>
        )}

        {/* Games Grid */}
        {!loading && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {games.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="flex justify-center">
                <Button
                  onClick={loadMore}
                  disabled={loadingMore}
                  size="lg"
                  className="min-w-[200px] bg-purple-600 hover:bg-purple-700 text-white"
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Loading more games...
                    </>
                  ) : (
                    "Load More Games"
                  )}
                </Button>
              </div>
            )}

            {/* No Results */}
            {games.length === 0 && !loading && (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <Gamepad2 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">No games found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
