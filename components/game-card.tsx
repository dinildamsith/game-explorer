import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Calendar, Clock } from "lucide-react"
import type { Game } from "@/types/game"

interface GameCardProps {
  game: Game
}

export function GameCard({ game }: GameCardProps) {
  return (
    <Link href={`/game/${game.id}`}>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] bg-white border-gray-200">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={game.background_image || "/placeholder.svg?height=200&width=300"}
            alt={game.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {game.metacritic && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-green-500 text-white font-semibold shadow-lg">{game.metacritic}</Badge>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <CardContent className="p-5 bg-white">
          <h3 className="font-bold text-lg mb-3 line-clamp-1 text-gray-900">{game.name}</h3>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{game.rating.toFixed(1)}</span>
            </div>
            {game.released && (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span>{new Date(game.released).getFullYear()}</span>
              </div>
            )}
            {game.playtime > 0 && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-purple-500" />
                <span>{game.playtime}h</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {game.genres.slice(0, 2).map((genre) => (
              <Badge key={genre.id} variant="secondary" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                {genre.name}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {game.platforms.slice(0, 3).map((platform) => (
              <Badge key={platform.platform.id} className="text-xs bg-gray-100 text-gray-700 border-gray-300">
                {platform.platform.name}
              </Badge>
            ))}
            {game.platforms.length > 3 && (
              <Badge className="text-xs bg-gray-100 text-gray-700 border-gray-300">+{game.platforms.length - 3}</Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
