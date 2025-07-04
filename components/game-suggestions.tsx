"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GameCard } from "./game-card"
import { Lightbulb, Loader2 } from "lucide-react"
import { fetchGameSuggestions } from "@/lib/api"
import type { Game } from "@/types/game"

interface GameSuggestionsProps {
  gameId: number
}

export function GameSuggestions({ gameId }: GameSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSuggestions = async () => {
      try {
        const data = await fetchGameSuggestions(gameId)
        setSuggestions(data.results?.slice(0, 6) || [])
      } catch (error) {
        console.error("Failed to load suggestions:", error)
      } finally {
        setLoading(false)
      }
    }

    loadSuggestions()
  }, [gameId])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Similar Games
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (suggestions.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5" />
          Similar Games
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {suggestions.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
