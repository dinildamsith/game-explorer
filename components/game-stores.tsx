"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Store, ExternalLink } from "lucide-react"
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
        const data = await fetchGameStores(gameId)
        setStores(data.results || [])
      } catch (err) {
        setError("Failed to load stores")
        console.error("Error loading stores:", err)
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
          <CardTitle className="text-gray-900">Where to Buy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || !stores.length) {
    return (
      <Card className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-900">Where to Buy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Store className="w-12 h-12 mx-auto text-gray-400 mb-2" />
            <p className="text-gray-600">No stores available</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-gray-900">Where to Buy</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stores.map((gameStore) => {
            const store = gameStore.store
            if (!store) return null

            return (
              <Link key={gameStore.id} href={gameStore.url} target="_blank" rel="noopener noreferrer">
                <div className="group p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-200 bg-white">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                      {store.image_background ? (
                        <img
                          src={store.image_background || "/placeholder.svg"}
                          alt={store.name}
                          className="w-6 h-6 rounded object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = "none"
                            const parent = target.parentElement
                            if (parent) {
                              const icon = document.createElement("div")
                              icon.innerHTML =
                                '<svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h3v-8h6v8h3a1 1 0 001-1V7l-7-5z" clipRule="evenodd"></path></svg>'
                              parent.appendChild(icon)
                            }
                          }}
                        />
                      ) : (
                        <Store className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-200">
                        {store.name}
                      </h4>
                      <p className="text-xs text-gray-500">{store.domain}</p>
                    </div>
                  </div>
                  <Button size="sm" className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white border-0">
                    <ExternalLink className="w-4 h-4" />
                    <span className="font-medium">Visit Store</span>
                  </Button>
                </div>
              </Link>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
