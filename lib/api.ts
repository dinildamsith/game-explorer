const API_KEY:any = process.env.NEXT_PUBLIC_RAWG_API_KEY
const BASE_URL = "https://api.rawg.io/api"

interface FetchOptions {
  page?: number
  search?: string
  genres?: string
  platforms?: string
  ordering?: string
  tags?: string
  stores?: string
  page_size?: number
}

export async function fetchGames(options: FetchOptions = {}) {
  const params = new URLSearchParams({
    key: API_KEY,
    page: options.page?.toString() || "1",
    page_size: options.page_size?.toString() || "20",
  })

  if (options.search) params.append("search", options.search)
  if (options.genres) params.append("genres", options.genres)
  if (options.platforms) params.append("platforms", options.platforms)
  if (options.ordering) params.append("ordering", options.ordering)
  if (options.tags) params.append("tags", options.tags)
  if (options.stores) params.append("stores", options.stores)

  const response = await fetch(`${BASE_URL}/games?${params}`)
  if (!response.ok) {
    throw new Error("Failed to fetch games")
  }
  return response.json()
}

export async function fetchGameDetails(id: number) {
  const response = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`)
  if (!response.ok) {
    throw new Error("Failed to fetch game details")
  }
  return response.json()
}

export async function fetchGameScreenshots(id: number) {
  const response = await fetch(`${BASE_URL}/games/${id}/screenshots?key=${API_KEY}`)
  if (!response.ok) {
    throw new Error("Failed to fetch game screenshots")
  }
  return response.json()
}

export async function fetchGameTrailers(id: number) {
  const response = await fetch(`${BASE_URL}/games/${id}/movies?key=${API_KEY}`)
  if (!response.ok) {
    throw new Error("Failed to fetch game trailers")
  }
  return response.json()
}

export async function fetchGameAchievements(id: number) {
  const response = await fetch(`${BASE_URL}/games/${id}/achievements?key=${API_KEY}`)
  if (!response.ok) {
    throw new Error("Failed to fetch game achievements")
  }
  return response.json()
}

export async function fetchGameStores(id: number) {
  const response = await fetch(`${BASE_URL}/games/${id}/stores?key=${API_KEY}`)
  if (!response.ok) {
    throw new Error("Failed to fetch game stores")
  }
  return response.json()
}

export async function fetchGameSuggestions(id: number) {
  try {
    const game = await fetchGameDetails(id)
    const genres = game.genres
      ?.map((g: any) => g.slug)
      .slice(0, 2)
      .join(",")

    if (genres) {
      return await fetchGames({
        genres,
        ordering: "-rating",
        page_size: 12,
      })
    } else {
      return await fetchGames({
        ordering: "-rating",
        page_size: 12,
      })
    }
  } catch (error) {
    return await fetchGames({
      ordering: "-added",
      page_size: 12,
    })
  }
}

export async function fetchCreators() {
  const response = await fetch(`${BASE_URL}/creators?key=${API_KEY}&page_size=20`)
  if (!response.ok) {
    throw new Error("Failed to fetch creators")
  }
  return response.json()
}

export async function fetchStores() {
  const response = await fetch(`${BASE_URL}/stores?key=${API_KEY}&page_size=20`)
  if (!response.ok) {
    throw new Error("Failed to fetch stores")
  }
  return response.json()
}

export async function fetchGenres() {
  const response = await fetch(`${BASE_URL}/genres?key=${API_KEY}`)
  if (!response.ok) {
    throw new Error("Failed to fetch genres")
  }
  return response.json()
}

export async function fetchPlatforms() {
  const response = await fetch(`${BASE_URL}/platforms?key=${API_KEY}`)
  if (!response.ok) {
    throw new Error("Failed to fetch platforms")
  }
  return response.json()
}

export async function fetchTags() {
  const response = await fetch(`${BASE_URL}/tags?key=${API_KEY}`)
  if (!response.ok) {
    throw new Error("Failed to fetch tags")
  }
  return response.json()
}
