export interface Game {
  id: number
  name: string
  slug: string
  description?: string
  description_raw?: string
  released?: string
  tba?: boolean
  background_image?: string
  background_image_additional?: string
  website?: string
  rating: number
  rating_top: number
  ratings?: Rating[]
  ratings_count: number
  reviews_text_count?: number
  added: number
  added_by_status?: AddedByStatus
  metacritic?: number
  metacritic_platforms?: MetacriticPlatform[]
  metacritic_url?: string
  playtime: number
  screenshots_count: number
  movies_count: number
  creators_count: number
  achievements_count: number
  parent_achievements_count: number
  reddit_url?: string
  reddit_name?: string
  reddit_description?: string
  reddit_logo?: string
  reddit_count: number
  twitch_count: number
  youtube_count: number
  reviews_count: number
  saturated_color: string
  dominant_color: string
  platforms?: PlatformInfo[]
  parent_platforms?: ParentPlatform[]
  genres?: Genre[]
  stores?: StoreInfo[]
  developers?: Developer[]
  publishers?: Publisher[]
  esrb_rating?: ESRBRating
  clip?: Clip
  tags?: Tag[]
  short_screenshots?: Screenshot[]
}

export interface Rating {
  id: number
  title: string
  count: number
  percent: number
}

export interface AddedByStatus {
  yet?: number
  owned?: number
  beaten?: number
  toplay?: number
  dropped?: number
  playing?: number
}

export interface MetacriticPlatform {
  metascore: number
  url: string
  platform: {
    platform: number
    name: string
    slug: string
  }
}

export interface PlatformInfo {
  platform: Platform
  released_at?: string
  requirements?: Requirements
}

export interface Platform {
  id: number
  name: string
  slug: string
  image?: string
  year_end?: number
  year_start?: number
  games_count: number
  image_background?: string
}

export interface Requirements {
  minimum?: string
  recommended?: string
}

export interface ParentPlatform {
  platform: {
    id: number
    name: string
    slug: string
  }
}

export interface Genre {
  id: number
  name: string
  slug: string
  games_count: number
  image_background?: string
}

export interface StoreInfo {
  id: number
  store: Store
  url_en?: string
  url_ru?: string
}

export interface Store {
  id: number
  name: string
  slug: string
  domain?: string
  games_count: number
  image_background?: string
}

export interface Developer {
  id: number
  name: string
  slug: string
  games_count: number
  image_background?: string
}

export interface Publisher {
  id: number
  name: string
  slug: string
  games_count: number
  image_background?: string
}

export interface ESRBRating {
  id: number
  name: string
  slug: string
}

export interface Clip {
  clip: string
  clips: {
    [key: string]: string
  }
  video: string
  preview: string
}

export interface Tag {
  id: number
  name: string
  slug: string
  language: string
  games_count: number
  image_background?: string
}

export interface Screenshot {
  id: number
  image: string
}

export interface GamesResponse {
  count: number
  next?: string
  previous?: string
  results: Game[]
}

export interface Creator {
  id: number
  name: string
  slug: string
  image?: string
  image_background?: string
  games_count: number
  positions?: Position[]
  games?: Game[]
}

export interface Position {
  id: number
  name: string
  slug: string
}

export interface Achievement {
  id: number
  name: string
  description?: string
  image?: string
  percent?: number
}

export interface GameTrailer {
  id: number
  name?: string
  preview?: string
  data?: {
    [key: string]: string
    max?: string
  }
}

export interface GameScreenshot {
  id: number
  image: string
  width?: number
  height?: number
}

export interface GameStore {
  id: number
  url: string
  store: Store
}
