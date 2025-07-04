"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Store, Search, ExternalLink, Gamepad2 } from "lucide-react"
import { fetchStores } from "@/lib/api"
import type { StoreData } from "@/types/game"

export default function StoresPage() {
  const [stores, setStores] = useState<StoreData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredStores, setFilteredStores] = useState<StoreData[]>([])

  useEffect(() => {
    const loadStores = async () => {
      try {
        const data = await fetchStores()
        setStores(data.results || [])
        setFilteredStores(data.results || [])
      } catch (error) {
        console.error("Failed to load stores:", error)
      } finally {
        setLoading(false)
      }
    }

    loadStores()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredStores(stores)
    } else {
      const filtered = stores.filter((store) => store.name.toLowerCase().includes(searchQuery.toLowerCase()))
      setFilteredStores(filtered)
    }
  }, [searchQuery, stores])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-md sticky top-0 z-[100] shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-2 rounded-lg shadow-lg">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Game Stores</h1>
                <p className="text-sm text-gray-600">Discover where to buy games</p>
              </div>
            </div>
            <Link href="/">
              <Button
                variant="outline"
                className="gap-2 bg-white border-gray-300 text-gray-700 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-300 transition-all duration-200 font-medium"
              >
                <Gamepad2 className="w-4 h-4" />
                <span className="text-sm font-medium">Back to Games</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="mb-8 animate-fade-in">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search stores..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-green-500 focus:ring-green-500 transition-all duration-200"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center animate-pulse">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <span className="text-gray-600 font-medium">Loading stores...</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStores.map((store, index) => (
              <Card
                key={store.id}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-gray-200 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={store.image_background || "/placeholder.svg?height=200&width=300"}
                    alt={store.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=200&width=300"
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center overflow-hidden">
                      {store.image ? (
                        <img
                          src={store.image || "/placeholder.svg"}
                          alt={store.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = "none"
                            const parent = target.parentElement
                            if (parent) {
                              parent.innerHTML = `<Store class="w-5 h-5 text-gray-400" />`
                            }
                          }}
                        />
                      ) : (
                        <Store className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg text-gray-900 group-hover:text-green-600 transition-colors duration-200 font-bold">
                        {store.name}
                      </CardTitle>
                      <p className="text-sm text-gray-500 font-medium">{store.games_count} games available</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700 hover:bg-green-200 transition-colors duration-200 font-medium"
                    >
                      ID: {store.id}
                    </Badge>
                    {store.domain && (
                      <Link href={`https://${store.domain}`} target="_blank" rel="noopener noreferrer">
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1 bg-white border-gray-300 text-gray-700 hover:bg-green-50 hover:text-green-600 hover:border-green-300 transition-all duration-200 font-medium"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span className="text-xs font-medium">Visit</span>
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && filteredStores.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
              <Store className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">No stores found</h3>
              <p className="text-gray-600">Try adjusting your search query</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
