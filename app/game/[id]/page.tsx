"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Clock, Star, Users, ExternalLink, Play, Trophy, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  fetchGameDetails,
  fetchGameTrailers,
  fetchGameScreenshots,
  fetchGameAchievements,
  fetchGameStores,
  fetchGameSuggestions,
} from "@/lib/api"
import type { Game } from "@/types/game"
import Link from "next/link"

export default function GameDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const gameId = Number.parseInt(params.id as string)

  const [game, setGame] = useState<Game | null>(null)
  const [trailers, setTrailers] = useState<any[]>([])
  const [screenshots, setScreenshots] = useState<any[]>([])
  const [achievements, setAchievements] = useState<any[]>([])
  const [stores, setStores] = useState<any[]>([])
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadGameData = async () => {
      try {
        setLoading(true)
        setError(null)

        const [gameData, trailersData, screenshotsData, achievementsData, storesData, suggestionsData] =
          await Promise.allSettled([
            fetchGameDetails(gameId),
            fetchGameTrailers(gameId),
            fetchGameScreenshots(gameId),
            fetchGameAchievements(gameId),
            fetchGameStores(gameId),
            fetchGameSuggestions(gameId),
          ])

        if (gameData.status === "fulfilled") {
          setGame(gameData.value)
        } else {
          throw new Error("Failed to load game details")
        }

        if (trailersData.status === "fulfilled") {
          setTrailers(trailersData.value.results || [])
        }

        if (screenshotsData.status === "fulfilled") {
          setScreenshots(screenshotsData.value.results || [])
        }

        if (achievementsData.status === "fulfilled") {
          setAchievements(achievementsData.value.results || [])
        }

        if (storesData.status === "fulfilled") {
          setStores(storesData.value.results || [])
        }

        if (suggestionsData.status === "fulfilled") {
          setSuggestions(suggestionsData.value.results || [])
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load game data")
      } finally {
        setLoading(false)
      }
    }

    if (gameId) {
      loadGameData()
    }
  }, [gameId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <span className="text-gray-600">Loading game details...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error || !game) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Game Not Found</h1>
            <p className="text-gray-600 mb-6">{error || "The requested game could not be found."}</p>
            <Button onClick={() => router.push("/")} className="bg-purple-600 hover:bg-purple-700">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatPlaytime = (hours: number) => {
    if (hours < 1) return "Less than 1 hour"
    return `${hours} hour${hours !== 1 ? "s" : ""}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Background Image with Overlay */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${game.background_image || "/placeholder.svg?height=1080&width=1920"})`,
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-white/85 backdrop-blur-sm"></div>
      </div>

      {/* Navigation */}
      <header className="relative z-[100] border-b bg-white/95 backdrop-blur-md sticky top-0 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="flex items-center gap-2 hover:bg-purple-100 text-gray-700 hover:text-purple-700"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-gray-900 truncate">{game.name}</h1>
              {game.metacritic && (
                <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                  {game.metacritic}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Game Info Card */}
            <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={game.background_image || "/placeholder.svg?height=320&width=240"}
                      alt={game.name}
                      className="w-60 h-80 object-cover rounded-lg border-2 border-gray-200 shadow-md"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=320&width=240"
                      }}
                    />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{game.name}</h1>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        {game.released && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(game.released)}</span>
                          </div>
                        )}
                        {game.playtime && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{formatPlaytime(game.playtime)}</span>
                          </div>
                        )}
                        {game.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{game.rating}/5</span>
                          </div>
                        )}
                        {game.ratings_count && (
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{game.ratings_count.toLocaleString()} reviews</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Genres */}
                    {game.genres && game.genres.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {game.genres.map((genre) => (
                          <Badge
                            key={genre.id}
                            variant="secondary"
                            className="bg-purple-100 text-purple-800 border-purple-200"
                          >
                            {genre.name}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Platforms */}
                    {game.platforms && game.platforms.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {game.platforms.slice(0, 6).map((platform) => (
                          <Badge key={platform.platform.id} variant="outline" className="text-gray-700 border-gray-300">
                            {platform.platform.name}
                          </Badge>
                        ))}
                        {game.platforms.length > 6 && (
                          <Badge variant="outline" className="text-gray-500 border-gray-300">
                            +{game.platforms.length - 6} more
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Developers & Publishers */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      {game.developers && game.developers.length > 0 && (
                        <div>
                          <span className="font-medium text-gray-900">Developer:</span>
                          <p className="text-gray-600">{game.developers.map((dev) => dev.name).join(", ")}</p>
                        </div>
                      )}
                      {game.publishers && game.publishers.length > 0 && (
                        <div>
                          <span className="font-medium text-gray-900">Publisher:</span>
                          <p className="text-gray-600">{game.publishers.map((pub) => pub.name).join(", ")}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trailers Section - TOP PRIORITY */}
            {trailers.length > 0 && (
              <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Play className="w-5 h-5 text-purple-600" />
                    Trailers & Videos
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200">
                      {trailers.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {trailers.map((trailer, index) => (
                      <Link
                        key={trailer.id || index}
                        href={`/movie/${gameId}/${trailer.id || index}?name=${encodeURIComponent(game.name)}&image=${encodeURIComponent(game.background_image || "")}`}
                        className="group relative block"
                      >
                        <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden border border-gray-300 shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-105">
                          <img
                            src={
                              trailer.preview ||
                              trailer.image ||
                              game.background_image ||
                              "/placeholder.svg?height=180&width=320"
                            }
                            alt={`${game.name} trailer ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = "/placeholder.svg?height=180&width=320"
                            }}
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-lg">
                              <Play className="w-6 h-6 fill-current" />
                            </div>
                          </div>
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-black/70 text-white border-0 text-xs">HD</Badge>
                          </div>
                        </div>
                        <div className="mt-2">
                          <h4 className="font-medium text-gray-900 text-sm truncate">
                            {trailer.name || `${game.name} Trailer ${index + 1}`}
                          </h4>
                          <p className="text-xs text-gray-600">{trailer.data?.max || "Video"}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Game Description */}
            {game.description_raw && (
              <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-gray-900">About {game.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {game.description_raw.length > 500
                      ? `${game.description_raw.substring(0, 500)}...`
                      : game.description_raw}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Screenshots */}
            {screenshots.length > 0 && (
              <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-gray-900">Screenshots</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {screenshots.slice(0, 6).map((screenshot, index) => (
                      <div
                        key={screenshot.id || index}
                        className="aspect-video bg-gray-200 rounded-lg overflow-hidden border border-gray-300 shadow-sm hover:shadow-md transition-shadow duration-300"
                      >
                        <img
                          src={screenshot.image || "/placeholder.svg"}
                          alt={`${game.name} screenshot ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/placeholder.svg?height=180&width=320"
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Achievements */}
            {achievements.length > 0 && (
              <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Trophy className="w-5 h-5 text-yellow-600" />
                    Achievements
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                      {achievements.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.slice(0, 6).map((achievement, index) => (
                      <div
                        key={achievement.id || index}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          {achievement.image ? (
                            <img
                              src={achievement.image || "/placeholder.svg"}
                              alt={achievement.name}
                              className="w-8 h-8 object-cover rounded"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.style.display = "none"
                                target.nextElementSibling?.classList.remove("hidden")
                              }}
                            />
                          ) : null}
                          <Trophy className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 text-sm truncate">
                            {achievement.name || `Achievement ${index + 1}`}
                          </h4>
                          <p className="text-xs text-gray-600 truncate">
                            {achievement.description || "Hidden achievement"}
                          </p>
                          {achievement.percent && (
                            <p className="text-xs text-gray-500">{achievement.percent}% of players</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Game Stats */}
            <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-900">Game Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {game.metacritic && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Metacritic Score</span>
                    <Badge className="bg-green-100 text-green-800 border-green-200">{game.metacritic}</Badge>
                  </div>
                )}
                {game.rating && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">User Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-gray-900">{game.rating}/5</span>
                    </div>
                  </div>
                )}
                {game.ratings_count && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Reviews</span>
                    <span className="font-medium text-gray-900">{game.ratings_count.toLocaleString()}</span>
                  </div>
                )}
                {game.added && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Added to Lists</span>
                    <span className="font-medium text-gray-900">{game.added.toLocaleString()}</span>
                  </div>
                )}
                {game.esrb_rating && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">ESRB Rating</span>
                    <Badge variant="outline" className="text-gray-700 border-gray-300">
                      {game.esrb_rating.name}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* External Links */}
            <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-900">External Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {game.website && (
                  <Button
                    variant="outline"
                    className="w-full justify-start text-gray-700 border-gray-300 hover:bg-gray-50 bg-transparent"
                    asChild
                  >
                    <a href={game.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      <span className="font-medium text-gray-700">Official Website</span>
                    </a>
                  </Button>
                )}
                {game.reddit_url && (
                  <Button
                    variant="outline"
                    className="w-full justify-start text-gray-700 border-gray-300 hover:bg-gray-50 bg-transparent"
                    asChild
                  >
                    <a href={game.reddit_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      <span className="font-medium text-gray-700">Reddit Community</span>
                    </a>
                  </Button>
                )}
                {game.metacritic_url && (
                  <Button
                    variant="outline"
                    className="w-full justify-start text-gray-700 border-gray-300 hover:bg-gray-50 bg-transparent"
                    asChild
                  >
                    <a href={game.metacritic_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      <span className="font-medium text-gray-700">Metacritic Page</span>
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Where to Buy */}
            {stores.length > 0 && (
              <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <ShoppingCart className="w-5 h-5 text-green-600" />
                    Where to Buy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {stores.slice(0, 5).map((storeItem, index) => (
                    <Button
                      key={storeItem.id || index}
                      variant="outline"
                      className="w-full justify-start text-gray-700 border-gray-300 hover:bg-gray-50 bg-transparent"
                      asChild
                    >
                      <a href={storeItem.url} target="_blank" rel="noopener noreferrer">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        <span className="font-medium text-gray-700">
                          {storeItem.store?.name || `Store ${index + 1}`}
                        </span>
                      </a>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Similar Games */}
            {suggestions.length > 0 && (
              <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-gray-900">Similar Games</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {suggestions.slice(0, 5).map((suggestion) => (
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
                            {suggestion.released && <span>{new Date(suggestion.released).getFullYear()}</span>}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
