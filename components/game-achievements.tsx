"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Loader2 } from "lucide-react"
import { fetchGameAchievements } from "@/lib/api"
import type { GameAchievement } from "@/types/game"

interface GameAchievementsProps {
  gameId: number
}

export function GameAchievements({ gameId }: GameAchievementsProps) {
  const [achievements, setAchievements] = useState<GameAchievement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadAchievements = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchGameAchievements(gameId)
        // Filter out achievements with invalid data
        const validAchievements = (data.results || []).filter((achievement: any) => achievement && achievement.name)
        setAchievements(validAchievements)
      } catch (err) {
        console.error("Failed to load achievements:", err)
        setError("Failed to load achievements")
      } finally {
        setLoading(false)
      }
    }

    loadAchievements()
  }, [gameId])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Achievements
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

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">{error}</p>
        </CardContent>
      </Card>
    )
  }

  if (achievements.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Achievements ({achievements.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="flex items-start gap-3 p-3 rounded-lg border">
              <img
                src={achievement.image || "/placeholder.svg?height=48&width=48"}
                alt={achievement.name || "Achievement"}
                className="w-12 h-12 rounded-lg object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=48&width=48"
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-sm truncate">{achievement.name || "Unknown Achievement"}</h4>
                  {achievement.percent && (
                    <Badge variant="secondary" className="text-xs">
                      {achievement.percent}%
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {achievement.description || "No description available"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
