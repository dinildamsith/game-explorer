"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trophy, Search, Star, Gamepad2 } from "lucide-react"
import { fetchGames } from "@/lib/api"
import type { Game } from "@/types/game"

export default function AchievementsPage() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredGames, setFilteredGames] = useState<Game[]>([])

  useEffect(() => {
    const loadGamesWithAchievements = async () => {
      try {
        // Load popular games that likely have achievements
        const data = await fetchGames({
          page: 1,
          ordering: "-rating",
          page_size: 20,
        })
        const gamesWithRatings = (data.results || []).filter((game) => game.rating > 4.0)
        setGames(gamesWithRatings)
        setFilteredGames(gamesWithRatings)
      } catch (error) {
        console.error("Failed to load games:", error)
      } finally {
        setLoading(false)
      }
    }

    loadGamesWithAchievements()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredGames(games)
    } else {
      const filtered = games.filter((game) => game.name.toLowerCase().includes(searchQuery.toLowerCase()))
      setFilteredGames(filtered)
    }
  }, [searchQuery, games])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-md sticky top-0 z-[100] shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-yellow-600 to-orange-600 p-2 rounded-lg shadow-lg">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Game Achievements</h1>
                <p className="text-sm text-gray-600">Discover games with achievements</p>
              </div>
            </div>
            <Link href="/">
              <Button
                variant="outline"
                className="gap-2 hover:bg-purple-50 hover:text-purple-600 transition-all duration-200 bg-transparent"
              >
                <Gamepad2 className="w-4 h-4" />
                Back to Games
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="mb-8 animate-fade-in">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search games with achievements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 transition-all duration-200"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center animate-pulse">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
              <span className="text-gray-600">Loading achievements...</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map((game, index) => (
              <Link key={game.id} href={`/game/${game.id}`}>
                <Card
                  className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-gray-200 cursor-pointer animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={game.background_image || "/placeholder.svg?height=200&width=300"}
                      alt={game.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-yellow-500 text-white border-0 shadow-lg">
                        <Trophy className="w-3 h-3 mr-1" />
                        Achievements
                      </Badge>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <h3 className="text-white font-bold text-lg line-clamp-2 group-hover:text-yellow-300 transition-colors duration-200">
                        {game.name}
                      </h3>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-gray-700">{game.rating}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {game.released}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {game.genres?.slice(0, 2).map((genre) => (
                        <Badge
                          key={genre.id}
                          variant="outline"
                          className="text-xs border-yellow-300 text-yellow-700 hover:bg-yellow-50"
                        >
                          {genre.name}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{game.reviews_count} reviews</span>
                      {game.playtime && <span>• {game.playtime}h playtime</span>}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {!loading && filteredGames.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
              <Trophy className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">No games found</h3>
              <p className="text-gray-600">Try adjusting your search query</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
