export interface Game {
  id: number
  name: string
  slug: string
  released: string
  tba: boolean
  background_image: string
  rating: number
  rating_top: number
  ratings: Rating[]
  ratings_count: number
  reviews_text_count: number
  reviews_count: number
  added: number
  added_by_status: AddedByStatus
  metacritic: number
  playtime: number
  suggestions_count: number
  updated: string
  user_game: any
  platforms: PlatformInfo[]
  parent_platforms: ParentPlatform[]
  genres: Genre[]
  stores: StoreInfo[]
  clip: any
  tags: Tag[]
  esrb_rating: EsrbRating
  short_screenshots: ShortScreenshot[]
  description?: string
  description_raw?: string
  website?: string
  reddit_url?: string
  reddit_name?: string
  reddit_description?: string
  reddit_logo?: string
  reddit_count?: number
  twitch_count?: number
  youtube_count?: number
  reviews_text_count_positive?: number
  reviews_text_count_negative?: number
  saturated_color?: string
  dominant_color?: string
  developers?: Developer[]
  publishers?: Publisher[]
}

export interface Rating {
  id: number
  title: string
  count: number
  percent: number
}

export interface AddedByStatus {
  yet: number
  owned: number
  beaten: number
  toplay: number
  dropped: number
  playing: number
}

export interface PlatformInfo {
  platform: Platform
  released_at: string
  requirements_en: Requirements
  requirements_ru: Requirements
}

export interface Platform {
  id: number
  name: string
  slug: string
  image: any
  year_end: any
  year_start: number
  games_count: number
  image_background: string
}

export interface Requirements {
  minimum: string
  recommended: string
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
  image_background: string
}

export interface StoreInfo {
  id: number
  store: Store
}

export interface Store {
  id: number
  name: string
  slug: string
  domain: string
  games_count: number
  image_background: string
}

export interface Tag {
  id: number
  name: string
  slug: string
  language: string
  games_count: number
  image_background: string
}

export interface EsrbRating {
  id: number
  name: string
  slug: string
}

export interface ShortScreenshot {
  id: number
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

export interface Screenshot {
  id: number
  image: string
  width: number
  height: number
  is_deleted: boolean
}

export interface Trailer {
  id: number
  name: string
  preview: string
  data: {
    480: string
    max: string
  }
}

export interface Achievement {
  id: number
  name: string
  description: string
  image: string
  percent: string
}

export interface GameStore {
  id: number
  game_id: number
  store_id: number
  url: string
  store?: Store
}

export interface StoreData {
  id: number
  name: string
  slug: string
  domain: string
  games_count: number
  image_background: string
  image?: string
}

export interface Creator {
  id: number
  name: string
  slug: string
  image: string
  image_background: string
  games_count: number
  positions: Position[]
  games: CreatorGame[]
}

export interface Position {
  id: number
  name: string
  slug: string
}

export interface CreatorGame {
  id: number
  slug: string
  name: string
  added: number
}

export interface GamesResponse {
  count: number
  next: string | null
  previous: string | null
  results: Game[]
}

export interface ScreenshotsResponse {
  count: number
  next: string | null
  previous: string | null
  results: Screenshot[]
}

export interface TrailersResponse {
  count: number
  next: string | null
  previous: string | null
  results: Trailer[]
}

export interface AchievementsResponse {
  count: number
  next: string | null
  previous: string | null
  results: Achievement[]
}

export interface GameStoresResponse {
  count: number
  next: string | null
  previous: string | null
  results: GameStore[]
}

export interface StoresResponse {
  count: number
  next: string | null
  previous: string | null
  results: StoreData[]
}

export interface CreatorsResponse {
  count: number
  next: string | null
  previous: string | null
  results: Creator[]
}

export interface GenresResponse {
  count: number
  next: string | null
  previous: string | null
  results: Genre[]
}

export interface PlatformsResponse {
  count: number
  next: string | null
  previous: string | null
  results: Platform[]
}
