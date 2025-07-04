"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, ShoppingCart, Loader2 } from "lucide-react"
import { fetchGameStores } from "@/lib/api"
import type { GameStore } from "@/types/game"

interface GameStoresProps {
  gameId: number
}

export function GameStores({ gameId }: GameStoresProps) {
  const [stores, setStores] = useState<GameStore[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadStores = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchGameStores(gameId)
        // Filter out stores with invalid data structure
        const validStores = (data.results || []).filter(
          (gameStore: any) => gameStore && gameStore.store && gameStore.store.name,
        )
        setStores(validStores)
      } catch (err) {
        console.error("Failed to load stores:", err)
        setError("Failed to load store information")
      } finally {
        setLoading(false)
      }
    }

    loadStores()
  }, [gameId])

  if (loading) {
    return (
      <Card className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <ShoppingCart className="w-5 h-5 text-purple-600" />
            Where to Buy
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
      <Card className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <ShoppingCart className="w-5 h-5 text-purple-600" />
            Where to Buy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-center py-4">{error}</p>
        </CardContent>
      </Card>
    )
  }

  if (stores.length === 0) {
    return null
  }

  return (
    <Card className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <ShoppingCart className="w-5 h-5 text-purple-600" />
          Where to Buy
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {stores.map((gameStore) => (
          <Link key={gameStore.id} href={gameStore.url || "#"} target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              className="w-full justify-between bg-white/80 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <img
                  src={gameStore.store?.image_background || "/placeholder.svg?height=24&width=24"}
                  alt={gameStore.store?.name || "Store"}
                  className="w-6 h-6 rounded object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=24&width=24"
                  }}
                />
                <span>{gameStore.store?.name || "Unknown Store"}</span>
              </div>
              <ExternalLink className="w-4 h-4" />
            </Button>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
