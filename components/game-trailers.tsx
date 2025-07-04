"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Loader2, Film } from "lucide-react"
import { fetchGameTrailers } from "@/lib/api"
import type { GameTrailer } from "@/types/game"

interface GameTrailersProps {
  gameId: number
  gameName?: string
  gameImage?: string
}

export function GameTrailers({ gameId, gameName, gameImage }: GameTrailersProps) {
  const [trailers, setTrailers] = useState<GameTrailer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadTrailers = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchGameTrailers(gameId)
        const validTrailers = (data.results || []).filter((trailer: any) => trailer && trailer.name && trailer.data)
        setTrailers(validTrailers)
      } catch (err) {
        console.error("Failed to load trailers:", err)
        setError("Failed to load trailers")
      } finally {
        setLoading(false)
      }
    }

    loadTrailers()
  }, [gameId])

  if (loading) {
    return (
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <Film className="w-5 h-5 text-purple-600" />
            Trailers & Videos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <Film className="w-5 h-5 text-purple-600" />
            Trailers & Videos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-center py-4">{error}</p>
        </CardContent>
      </Card>
    )
  }

  if (trailers.length === 0) {
    return null
  }

  return (
    <Card className="bg-white border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <Film className="w-5 h-5 text-purple-600" />
          Trailers & Videos ({trailers.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trailers.map((trailer) => (
            <Link
              key={trailer.id}
              href={`/movie/${gameId}/${trailer.id}?gameName=${encodeURIComponent(gameName || "")}&gameImage=${encodeURIComponent(gameImage || "")}`}
            >
              <div className="group cursor-pointer">
                <div className="aspect-video relative rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200 hover:border-purple-300 transition-all duration-300">
                  <img
                    src={trailer.preview || "/placeholder.svg"}
                    alt={trailer.name || "Trailer"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg"
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-lg">
                      <Play className="w-6 h-6 fill-current" />
                    </div>
                  </div>
                </div>
                <div className="mt-3 px-1">
                  <h4 className="font-semibold text-sm text-gray-900 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300">
                    {trailer.name || "Untitled Trailer"}
                  </h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
