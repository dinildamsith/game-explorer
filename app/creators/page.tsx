"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {Users, Search, Loader2, Gamepad2} from "lucide-react"
import { fetchCreators } from "@/lib/api"
import type { Creator } from "@/types/game"

export default function CreatorsPage() {
  const [creators, setCreators] = useState<Creator[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredCreators, setFilteredCreators] = useState<Creator[]>([])

  useEffect(() => {
    const loadCreators = async () => {
      try {
        const data = await fetchCreators()
        setCreators(data.results || [])
        setFilteredCreators(data.results || [])
      } catch (error) {
        console.error("Failed to load creators:", error)
      } finally {
        setLoading(false)
      }
    }

    loadCreators()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCreators(creators)
    } else {
      const filtered = creators.filter((creator) => creator.name.toLowerCase().includes(searchQuery.toLowerCase()))
      setFilteredCreators(filtered)
    }
  }, [searchQuery, creators])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="border-b bg-white/95 backdrop-blur-md sticky top-0 z-[100] shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold text-gray-900">Game Creators</h1>
            </div>
            <Link href="/">
              <Button
                  variant="outline"
                  className="gap-2 bg-white border-gray-300 text-gray-700 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-300 transition-all duration-200 font-medium"
              >
                <Gamepad2 className="w-4 h-4" />
                <span className="text-sm font-medium text-gray-700">Back to Games</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search creators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="ml-2">Loading creators...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCreators.map((creator) => (
              <Card key={creator.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-gray-200 animate-slide-up">
                <div className="relative aspect-video">
                  <Image
                    src={creator.image_background || "/placeholder.svg?height=200&width=300"}
                    alt={creator.name}
                    fill
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={creator.image || "/placeholder.svg?height=40&width=40"}
                      alt={creator.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-purple-600 transition-colors duration-200">{creator.name}</h3>
                      <p className="text-sm text-gray-600 font-medium">{creator.games_count} games</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {creator.positions.slice(0, 3).map((position) => (
                      <Badge key={position.id} variant="outline" className="bg-purple-100 text-purple-700 border-purple-200 text-xs font-medium px-2 py-1 rounded-full">
                        {position.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && filteredCreators.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                <Users className="w-16 h-16 mx-auto text-gray-400 mb-4"/>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">No creators found</h3>
                <p className="text-gray-600 font-medium">Try adjusting your search query</p>
              </div>
            </div>
        )}
      </main>
    </div>
  )
}
