export interface Game {
  id: number
  name: string
  released: string
  background_image: string
  rating: number
  rating_top: number
  ratings_count: number
  reviews_count: number
  metacritic: number
  playtime: number
  genres: Genre[]
  platforms: PlatformInfo[]
  stores: StoreInfo[]
  developers: Developer[]
  publishers: Publisher[]
  esrb_rating: ESRBRating
  description_raw: string
  website: string
  reddit_url: string
  metacritic_url: string
  tags: Tag[]
}

export interface Genre {
  id: number
  name: string
  slug: string
}

export interface PlatformInfo {
  platform: Platform
  released_at: string
  requirements: Requirements
}

export interface Platform {
  id: number
  name: string
  slug: string
  image: string
  year_end: number
  year_start: number
  games_count: number
  image_background: string
}

export interface Requirements {
  minimum: string
  recommended: string
}

export interface StoreInfo {
  id: number
  store: Store
  url: string
}

export interface Store {
  id: number
  name: string
  slug: string
  domain: string
  games_count: number
  image_background: string
  image: string
}

export interface Developer {
  id: number
  name: string
  slug: string
  games_count: number
  image_background: string
}

export interface Publisher {
  id: number
  name: string
  slug: string
  games_count: number
  image_background: string
}

export interface ESRBRating {
  id: number
  name: string
  slug: string
}

export interface Tag {
  id: number
  name: string
  slug: string
  language: string
  games_count: number
  image_background: string
}

export interface GamesResponse {
  count: number
  next: string | null
  previous: string | null
  results: Game[]
}

export interface Screenshot {
  id: number
  image: string
  width: number
  height: number
}

export interface ScreenshotsResponse {
  count: number
  results: Screenshot[]
}

export interface GameTrailer {
  id: number
  name: string
  preview: string
  data: {
    480: string
    max: string
  }
}

export interface TrailersResponse {
  count: number
  results: GameTrailer[]
}

export interface GameAchievement {
  id: number
  name: string
  description: string
  image: string
  percent: number
}

export interface AchievementsResponse {
  count: number
  results: GameAchievement[]
}

export interface GameStore {
  id: number
  store: Store
  url: string
}

export interface GameStoresResponse {
  count: number
  results: GameStore[]
}

export interface Creator {
  id: number
  name: string
  slug: string
  image: string
  image_background: string
  games_count: number
  positions: Position[]
}

export interface Position {
  id: number
  name: string
  slug: string
}

export interface CreatorsResponse {
  count: number
  results: Creator[]
}

export interface StoreData {
  id: number
  name: string
  slug: string
  domain: string
  games_count: number
  image_background: string
  image: string
}

export interface StoresResponse {
  count: number
  results: StoreData[]
}
