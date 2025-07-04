const API_KEY = "32588095bdd046128652573c649337e1"
const BASE_URL = "https://api.rawg.io/api"

interface FetchGamesParams {
  page?: number
  page_size?: number
  search?: string
  genres?: string
  platforms?: string
  ordering?: string
  dates?: string
  stores?: string
  tags?: string
}

export async function fetchGames(params: FetchGamesParams = {}) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    page: params.page?.toString() || "1",
    page_size: params.page_size?.toString() || "20",
    ...(params.search && { search: params.search }),
    ...(params.genres && { genres: params.genres }),
    ...(params.platforms && { platforms: params.platforms }),
    ...(params.ordering && { ordering: params.ordering }),
    ...(params.dates && { dates: params.dates }),
    ...(params.stores && { stores: params.stores }),
    ...(params.tags && { tags: params.tags }),
  })

  const response = await fetch(`${BASE_URL}/games?${searchParams}`)
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

export async function fetchGame(id: number) {
  return fetchGameDetails(id)
}

export async function fetchGameScreenshots(id: number) {
  const response = await fetch(`${BASE_URL}/games/${id}/screenshots?key=${API_KEY}`)
  if (!response.ok) {
    throw new Error("Failed to fetch screenshots")
  }
  return response.json()
}

export async function fetchGameTrailers(id: number) {
  const response = await fetch(`${BASE_URL}/games/${id}/movies?key=${API_KEY}`)
  if (!response.ok) {
    throw new Error("Failed to fetch trailers")
  }
  return response.json()
}

export async function fetchGameAchievements(id: number) {
  const response = await fetch(`${BASE_URL}/games/${id}/achievements?key=${API_KEY}`)
  if (!response.ok) {
    throw new Error("Failed to fetch achievements")
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
  const response = await fetch(`${BASE_URL}/games/${id}/suggested?key=${API_KEY}`)
  if (!response.ok) {
    throw new Error("Failed to fetch suggestions")
  }
  return response.json()
}

export async function fetchGameSeries(id: number) {
  const response = await fetch(`${BASE_URL}/games/${id}/game-series?key=${API_KEY}`)
  if (!response.ok) {
    throw new Error("Failed to fetch game series")
  }
  return response.json()
}

export async function fetchGameAdditions(id: number) {
  const response = await fetch(`${BASE_URL}/games/${id}/additions?key=${API_KEY}`)
  if (!response.ok) {
    throw new Error("Failed to fetch game additions")
  }
  return response.json()
}

export async function fetchGameReviews(id: number) {
  const response = await fetch(`${BASE_URL}/games/${id}/reviews?key=${API_KEY}`)
  if (!response.ok) {
    throw new Error("Failed to fetch game reviews")
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

export async function fetchStores() {
  const response = await fetch(`${BASE_URL}/stores?key=${API_KEY}`)
  if (!response.ok) {
    throw new Error("Failed to fetch stores")
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

export async function fetchCreators() {
  const response = await fetch(`${BASE_URL}/creators?key=${API_KEY}`)
  if (!response.ok) {
    throw new Error("Failed to fetch creators")
  }
  return response.json()
}

export async function fetchCreatorDetails(id: number) {
  const response = await fetch(`${BASE_URL}/creators/${id}?key=${API_KEY}`)
  if (!response.ok) {
    throw new Error("Failed to fetch creator details")
  }
  return response.json()
}
