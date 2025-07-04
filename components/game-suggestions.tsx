"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Calendar } from "lucide-react"
import { fetchGameSuggestions } from "@/lib/api"
import type { Game } from "@/types/game"
import Link from "next/link"

interface GameSuggestionsProps {
  gameId: number
  currentGame?: Game
}

export function GameSuggestions({ gameId, currentGame }: GameSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadSuggestions = async () => {
      try {
        setLoading(true)
        setError(null)

        const data = await fetchGameSuggestions(gameId)

        // Filter out the current game from suggestions
        const filteredSuggestions = data.results?.filter((game: Game) => game.id !== gameId) || []

        // Shuffle and limit results
        const shuffled = filteredSuggestions.sort(() => 0.5 - Math.random())
        setSuggestions(shuffled.slice(0, 8))
      } catch (err) {
        console.error("Error loading suggestions:", err)
        setError("Failed to load suggestions")
      } finally {
        setLoading(false)
      }
    }

    if (gameId) {
      loadSuggestions()
    }
  }, [gameId])

  if (loading) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-gray-900">Similar Games</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center gap-3 p-2">
                <div className="w-16 h-12 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-gray-900">Similar Games</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Try Again
            </button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (suggestions.length === 0) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-gray-900">Similar Games</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-600">No similar games found</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg">
      <CardHeader>
        <CardTitle className="text-gray-900">Similar Games</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {suggestions.map((suggestion) => (
            <Link
              key={suggestion.id}
              href={`/game/${suggestion.id}`}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
            >
              <img
                src={suggestion.background_image || "/placeholder.svg?height=60&width=80"}
                alt={suggestion.name}
                className="w-16 h-12 object-cover rounded border border-gray-200 group-hover:scale-105 transition-transform duration-200"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=60&width=80"
                }}
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 text-sm truncate group-hover:text-purple-700 transition-colors duration-200">
                  {suggestion.name}
                </h4>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  {suggestion.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{suggestion.rating}</span>
                    </div>
                  )}
                  {suggestion.released && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(suggestion.released).getFullYear()}</span>
                    </div>
                  )}
                  {suggestion.genres && suggestion.genres.length > 0 && (
                    <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700 border-purple-200">
                      {suggestion.genres[0].name}
                    </Badge>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
