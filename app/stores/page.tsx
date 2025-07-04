"use client"

import { useState, useEffect } from "react"
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
                <p className="text-sm text-gray-600">Browse gaming platforms and stores</p>
              </div>
            </div>
            <Link href="/">
              <Button
                variant="outline"
                className="gap-2 bg-white border-gray-300 text-gray-700 hover:bg-green-50 hover:text-green-600 hover:border-green-300 transition-all duration-200 font-medium"
              >
                <Gamepad2 className="w-4 h-4" />
                <span className="text-sm font-medium text-gray-700">Back to Games</span>
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
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                      {store.image_background ? (
                        <img
                          src={store.image_background || "/placeholder.svg"}
                          alt={store.name}
                          className="w-8 h-8 rounded object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = "none"
                            const parent = target.parentElement
                            if (parent) {
                              const icon = document.createElement("div")
                              icon.innerHTML =
                                '<svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h3v-8h6v8h3a1 1 0 001-1V7l-7-5z" clipRule="evenodd"></path></svg>'
                              parent.appendChild(icon)
                            }
                          }}
                        />
                      ) : (
                        <Store className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-200">
                        {store.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600 font-medium">{store.domain}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 font-medium">Games Available</span>
                      <Badge className="bg-green-100 text-green-700 border-green-200 font-medium">
                        {store.games_count.toLocaleString()}
                      </Badge>
                    </div>
                    <Link href={`https://${store.domain}`} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0 shadow-lg transition-all duration-200 font-medium">
                        <ExternalLink className="w-4 h-4" />
                        <span className="font-medium text-white">Visit Store</span>
                      </Button>
                    </Link>
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
              <p className="text-gray-600 font-medium">Try adjusting your search query</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
