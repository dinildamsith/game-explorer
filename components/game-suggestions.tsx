"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Lightbulb } from "lucide-react"
import { fetchGameSuggestions } from "@/lib/api"
import type { Game } from "@/types/game"

interface GameSuggestionsProps {
  gameId: number
}

export function GameSuggestions({ gameId }: GameSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadSuggestions = async () => {
      try {
        setLoading(true)
        const data = await fetchGameSuggestions(gameId)
        setSuggestions(data.results || [])
      } catch (err) {
        setError("Failed to load suggestions")
        console.error("Error loading suggestions:", err)
      } finally {
        setLoading(false)
      }
    }

    loadSuggestions()
  }, [gameId])

  if (loading) {
    return (
      <Card className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-900 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-purple-600" />
            Similar Games
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || !suggestions.length) {
    return (
      <Card className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-900 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-purple-600" />
            Similar Games
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Lightbulb className="w-12 h-12 mx-auto text-gray-400 mb-2" />
            <p className="text-gray-600">No suggestions available</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-gray-900 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-purple-600" />
          Similar Games
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {suggestions.slice(0, 6).map((game) => (
            <Link key={game.id} href={`/game/${game.id}`}>
              <div className="group rounded-lg overflow-hidden border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-200 bg-white">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={game.background_image || "/placeholder.svg?height=150&width=250"}
                    alt={game.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=150&width=250"
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <h4 className="text-white font-semibold text-sm line-clamp-2 group-hover:text-purple-200 transition-colors duration-200">
                      {game.name}
                    </h4>
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs font-medium text-gray-700">{game.rating}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {game.released}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {game.genres?.slice(0, 2).map((genre) => (
                      <Badge
                        key={genre.id}
                        variant="outline"
                        className="text-xs border-purple-300 text-purple-700 hover:bg-purple-50"
                      >
                        {genre.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
