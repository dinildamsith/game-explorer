"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Star, Calendar, Clock, ExternalLink, Globe, Loader2 } from "lucide-react"
import { fetchGameDetails } from "@/lib/api"
import type { GameDetails } from "@/types/game"
import { GameTrailers } from "@/components/game-trailers"
import { GameAchievements } from "@/components/game-achievements"
import { GameStores } from "@/components/game-stores"
import { GameSuggestions } from "@/components/game-suggestions"

export default function GameDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [game, setGame] = useState<GameDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadGameDetails = async () => {
      try {
        setLoading(true)
        const gameId = Number.parseInt(params.id as string)
        const gameData = await fetchGameDetails(gameId)
        setGame(gameData)
      } catch (err) {
        setError("Failed to load game details")
        console.error("Error loading game details:", err)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      loadGameDetails()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
          <span className="text-gray-700">Loading game details...</span>
        </div>
      </div>
    )
  }

  if (error || !game) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2 text-gray-900">Game not found</h2>
          <p className="text-gray-600 mb-4">{error || "The requested game could not be found."}</p>
          <Button onClick={() => router.push("/")} className="bg-purple-600 hover:bg-purple-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Games
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      {/* Background Image with Opacity */}
      <div className="fixed inset-0 z-0">
        <Image
          src={game.background_image || "/placeholder.svg?height=1080&width=1920"}
          alt={game.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-white/85" />
      </div>

      {/* Header with Higher Z-Index */}
      <header className="relative z-[100] bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="gap-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Games
          </Button>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8">
        {/* Game Info Card - Top Left */}
        <div className="mb-8">
          <Card className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg max-w-4xl">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Game Image Card */}
                <div className="flex-shrink-0">
                  <div className="relative w-48 h-64 rounded-lg overflow-hidden shadow-lg border-2 border-gray-200">
                    <Image
                      src={game.background_image || "/placeholder.svg?height=320&width=240"}
                      alt={game.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Game Information */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{game.name}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{game.rating.toFixed(1)}/5</span>
                        <span className="text-gray-500">({game.ratings_count} reviews)</span>
                      </div>
                      {game.released && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-blue-500" />
                          <span>{new Date(game.released).toLocaleDateString()}</span>
                        </div>
                      )}
                      {game.playtime > 0 && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-purple-500" />
                          <span>{game.playtime} hours</span>
                        </div>
                      )}
                      {game.metacritic && (
                        <Badge className="bg-green-500 text-white font-semibold">Metacritic: {game.metacritic}</Badge>
                      )}
                    </div>
                  </div>

                  {/* Genres */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Genres</h3>
                    <div className="flex flex-wrap gap-2">
                      {game.genres.map((genre) => (
                        <Badge key={genre.id} className="bg-blue-50 text-blue-700 border-blue-200">
                          {genre.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Platforms */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Available on</h3>
                    <div className="flex flex-wrap gap-2">
                      {game.platforms.slice(0, 6).map((platform) => (
                        <Badge key={platform.platform.id} className="bg-gray-100 text-gray-700 border-gray-300">
                          {platform.platform.name}
                        </Badge>
                      ))}
                      {game.platforms.length > 6 && (
                        <Badge className="bg-gray-100 text-gray-700 border-gray-300">
                          +{game.platforms.length - 6} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Developers & Publishers */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {game.developers && game.developers.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Developers</h3>
                        <div className="space-y-1">
                          {game.developers.slice(0, 3).map((developer) => (
                            <p key={developer.id} className="text-sm text-gray-600">
                              {developer.name}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}

                    {game.publishers && game.publishers.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Publishers</h3>
                        <div className="space-y-1">
                          {game.publishers.slice(0, 3).map((publisher) => (
                            <p key={publisher.id} className="text-sm text-gray-600">
                              {publisher.name}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ESRB Rating */}
                  {game.esrb_rating && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Rating</h3>
                      <Badge variant="outline" className="border-orange-300 text-orange-700">
                        {game.esrb_rating.name}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            {game.description_raw && (
              <Card className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900">About this Game</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{game.description_raw}</p>
                </CardContent>
              </Card>
            )}

            {/* Screenshots */}
            {game.short_screenshots && game.short_screenshots.length > 0 && (
              <Card className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900">Screenshots</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {game.short_screenshots.slice(1, 7).map((screenshot) => (
                      <div
                        key={screenshot.id}
                        className="aspect-video relative rounded-lg overflow-hidden border border-gray-200"
                      >
                        <Image
                          src={screenshot.image || "/placeholder.svg"}
                          alt="Game screenshot"
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Trailers */}
            <GameTrailers gameId={game.id} gameName={game.name} gameImage={game.background_image} />

            {/* Achievements */}
            <GameAchievements gameId={game.id} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* External Links */}
            <Card className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900">Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {game.website && (
                  <Link href={game.website} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2 bg-white/80 border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      <Globe className="w-4 h-4" />
                      Official Website
                      <ExternalLink className="w-4 h-4 ml-auto" />
                    </Button>
                  </Link>
                )}
                {game.reddit_url && (
                  <Link href={game.reddit_url} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2 bg-white/80 border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Reddit
                      <ExternalLink className="w-4 h-4 ml-auto" />
                    </Button>
                  </Link>
                )}
                {game.metacritic_url && (
                  <Link href={game.metacritic_url} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2 bg-white/80 border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      <Star className="w-4 h-4" />
                      Metacritic
                      <ExternalLink className="w-4 h-4 ml-auto" />
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>

            {/* Game Stats */}
            <Card className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900">Game Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">User Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-900">{game.rating.toFixed(1)}/5</span>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Reviews</span>
                  <span className="font-semibold text-gray-900">{game.ratings_count.toLocaleString()}</span>
                </div>
                {game.metacritic && (
                  <>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Metacritic Score</span>
                      <Badge className="bg-green-500 text-white">{game.metacritic}</Badge>
                    </div>
                  </>
                )}
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Playtime</span>
                  <span className="font-semibold text-gray-900">{game.playtime} hours</span>
                </div>
                {game.released && (
                  <>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Release Date</span>
                      <span className="font-semibold text-gray-900">
                        {new Date(game.released).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="mt-12 space-y-8">
          {/* Where to Buy */}
          <GameStores gameId={game.id} />

          {/* Similar Games */}
          <GameSuggestions gameId={game.id} />
        </div>
      </main>
    </div>
  )
}
