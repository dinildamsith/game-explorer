"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, Search, Loader2 } from "lucide-react"
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
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold">Game Creators</h1>
            </div>
            <Link href="/">
              <Button variant="outline">Back to Games</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search creators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
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
              <Card key={creator.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-video">
                  <Image
                    src={creator.image_background || "/placeholder.svg?height=200&width=300"}
                    alt={creator.name}
                    fill
                    className="object-cover"
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
                      <h3 className="font-semibold text-lg">{creator.name}</h3>
                      <p className="text-sm text-muted-foreground">{creator.games_count} games</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {creator.positions.slice(0, 3).map((position) => (
                      <Badge key={position.id} variant="secondary" className="text-xs">
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
          <div className="text-center py-12">
            <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No creators found</h3>
            <p className="text-muted-foreground">Try adjusting your search query</p>
          </div>
        )}
      </main>
    </div>
  )
}
