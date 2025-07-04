"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Award } from "lucide-react"
import { fetchGameAchievements } from "@/lib/api"
import type { Achievement } from "@/types/game"

interface GameAchievementsProps {
  gameId: number
}

export function GameAchievements({ gameId }: GameAchievementsProps) {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadAchievements = async () => {
      try {
        setLoading(true)
        const data = await fetchGameAchievements(gameId)
        setAchievements(data.results || [])
      } catch (err) {
        setError("Failed to load achievements")
        console.error("Error loading achievements:", err)
      } finally {
        setLoading(false)
      }
    }

    loadAchievements()
  }, [gameId])

  if (loading) {
    return (
      <Card className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-900 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || !achievements.length) {
    return (
      <Card className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-900 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Award className="w-12 h-12 mx-auto text-gray-400 mb-2" />
            <p className="text-gray-600">No achievements available</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-gray-900 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-600" />
          Achievements ({achievements.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {achievements.slice(0, 6).map((achievement) => (
            <div
              key={achievement.id}
              className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="flex-shrink-0">
                {achievement.image ? (
                  <img
                    src={achievement.image || "/placeholder.svg"}
                    alt={achievement.name}
                    className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = "none"
                      const parent = target.parentElement
                      if (parent) {
                        const icon = document.createElement("div")
                        icon.className = "w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center"
                        icon.innerHTML =
                          '<svg class="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd"></path></svg>'
                        parent.appendChild(icon)
                      }
                    }}
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-yellow-600" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-semibold text-gray-900 text-sm line-clamp-1">{achievement.name}</h4>
                  <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 text-xs font-medium">
                    {achievement.percent}%
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                  {achievement.description || "No description available"}
                </p>
              </div>
            </div>
          ))}
          {achievements.length > 6 && (
            <div className="text-center pt-2">
              <p className="text-sm text-gray-600">And {achievements.length - 6} more achievements...</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
