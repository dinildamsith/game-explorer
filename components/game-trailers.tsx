"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, ExternalLink } from "lucide-react"
import { fetchGameTrailers } from "@/lib/api"
import type { Trailer } from "@/types/game"

interface GameTrailersProps {
  gameId: number
  gameName: string
  gameImage: string
}

export function GameTrailers({ gameId, gameName, gameImage }: GameTrailersProps) {
  const [trailers, setTrailers] = useState<Trailer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadTrailers = async () => {
      try {
        setLoading(true)
        const data = await fetchGameTrailers(gameId)
        setTrailers(data.results || [])
      } catch (err) {
        setError("Failed to load trailers")
        console.error("Error loading trailers:", err)
      } finally {
        setLoading(false)
      }
    }

    loadTrailers()
  }, [gameId])

  if (loading) {
    return (
      <Card className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-900">Trailers & Videos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || !trailers.length) {
    return (
      <Card className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-900">Trailers & Videos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Play className="w-12 h-12 mx-auto text-gray-400 mb-2" />
            <p className="text-gray-600">No trailers available</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-gray-900">Trailers & Videos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trailers.slice(0, 4).map((trailer) => (
            <Link
              key={trailer.id}
              href={`/movie/${gameId}/${trailer.id}?name=${encodeURIComponent(gameName)}&image=${encodeURIComponent(gameImage)}`}
            >
              <div className="group relative aspect-video rounded-lg overflow-hidden border border-gray-200 cursor-pointer">
                <img
                  src={trailer.preview || gameImage || "/placeholder.svg?height=200&width=300"}
                  alt={trailer.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = gameImage || "/placeholder.svg?height=200&width=300"
                  }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 rounded-full p-3 group-hover:bg-white group-hover:scale-110 transition-all duration-300">
                    <Play className="w-6 h-6 text-gray-900 fill-current" />
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 right-2">
                  <h4 className="text-white font-semibold text-sm line-clamp-2 group-hover:text-purple-200 transition-colors duration-300">
                    {trailer.name}
                  </h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {trailers.length > 4 && (
          <div className="mt-4 text-center">
            <Button variant="outline" className="gap-2 bg-transparent">
              <ExternalLink className="w-4 h-4" />
              View All Trailers ({trailers.length})
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
