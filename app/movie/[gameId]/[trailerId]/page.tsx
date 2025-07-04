"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Share2 } from "lucide-react"
import { fetchGameTrailers, fetchGameDetails } from "@/lib/api"
import type { GameTrailer, GameDetails } from "@/types/game"

export default function MoviePage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [trailer, setTrailer] = useState<GameTrailer | null>(null)
  const [game, setGame] = useState<GameDetails | null>(null)
  const [loading, setLoading] = useState(true)

  const gameId = Number.parseInt(params.gameId as string)
  const trailerId = Number.parseInt(params.trailerId as string)
  const gameName = searchParams.get("gameName") || ""
  const gameImage = searchParams.get("gameImage") || ""

  useEffect(() => {
    const loadMovieData = async () => {
      try {
        setLoading(true)
        const [trailersData, gameData] = await Promise.all([fetchGameTrailers(gameId), fetchGameDetails(gameId)])

        const foundTrailer = trailersData.results?.find((t: GameTrailer) => t.id === trailerId)
        setTrailer(foundTrailer || null)
        setGame(gameData)
      } catch (error) {
        console.error("Failed to load movie data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadMovieData()
  }, [gameId, trailerId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading movie...</p>
        </div>
      </div>
    )
  }

  if (!trailer || !game) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Movie not found</h2>
          <p className="text-gray-600 mb-4">The requested movie could not be found.</p>
          <Button onClick={() => router.push(`/game/${gameId}`)} className="bg-purple-600 hover:bg-purple-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Game
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Background with reduced opacity */}
      <div className="fixed inset-0 z-0">
        <Image
          src={game.background_image || "/placeholder.svg"}
          alt={game.name}
          fill
          className="object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-white/80" />
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => router.push(`/game/${gameId}`)}
              className="gap-2 text-gray-700 hover:text-purple-600"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to {game.name}
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Game Info Header */}
          <div className="flex items-center gap-4 mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-sm">
            <img
              src={game.background_image || "/placeholder.svg?height=80&width=80"}
              alt={game.name}
              className="w-20 h-20 rounded-lg object-cover border-2 border-gray-200"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{game.name}</h1>
              <p className="text-gray-600">Now Playing: {trailer.name}</p>
            </div>
          </div>

          {/* Video Player */}
          <Card className="mb-8 bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardContent className="p-0">
              <div className="aspect-video relative rounded-lg overflow-hidden bg-black">
                <video
                  key={trailer.id}
                  controls
                  autoPlay
                  className="w-full h-full"
                  poster={trailer.preview || undefined}
                >
                  {trailer.data?.max && <source src={trailer.data.max} type="video/mp4" />}
                  {trailer.data?.[480] && <source src={trailer.data[480]} type="video/mp4" />}
                  Your browser does not support the video tag.
                </video>
              </div>
            </CardContent>
          </Card>

          {/* Movie Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">About this Video</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Title</h3>
                      <p className="text-gray-700">{trailer.name}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Game</h3>
                      <p className="text-gray-700">{game.name}</p>
                    </div>
                    {game.released && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Release Date</h3>
                        <p className="text-gray-700">
                          {new Date(game.released).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Game Stats */}
              <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Game Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rating</span>
                      <span className="font-semibold text-gray-900">{game.rating.toFixed(1)}/5</span>
                    </div>
                    {game.metacritic && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Metacritic</span>
                        <span className="font-semibold text-green-600">{game.metacritic}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Playtime</span>
                      <span className="font-semibold text-gray-900">{game.playtime}h</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Genres */}
              <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {game.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
