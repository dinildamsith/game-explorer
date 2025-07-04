export interface Game {
  id: number
  name: string
  slug: string
  background_image: string
  released: string
  rating: number
  rating_top: number
  ratings_count: number
  metacritic: number | null
  playtime: number
  platforms: Platform[]
  genres: Genre[]
  tags: Tag[]
  esrb_rating: EsrbRating | null
  short_screenshots: Screenshot[]
  description_raw?: string
  website?: string
  reddit_url?: string
  metacritic_url?: string
  developers?: Developer[]
  publishers?: Publisher[]
}

export interface Platform {
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
}

export interface Tag {
  id: number
  name: string
  slug: string
}

export interface EsrbRating {
  id: number
  name: string
  slug: string
}

export interface Screenshot {
  id: number
  image: string
}

export interface Developer {
  id: number
  name: string
  slug: string
}

export interface Publisher {
  id: number
  name: string
  slug: string
}

export interface GamesResponse {
  count: number
  next: string | null
  previous: string | null
  results: Game[]
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

export interface GameScreenshot {
  id: number
  image: string
  width: number
  height: number
}

export interface GameStore {
  id: number
  store: {
    id: number
    name: string
    slug: string
    domain: string
    games_count: number
    image_background: string
  }
  url: string
}

export interface GameAchievement {
  id: number
  name: string
  description: string
  image: string
  percent: string
}

export interface GameReview {
  id: number
  username: string
  rating: number
  text: string
  created: string
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

export interface GameSeries {
  id: number
  name: string
  slug: string
  games_count: number
  image_background: string
}

export interface GameAddition {
  id: number
  name: string
  slug: string
  released: string
  background_image: string
  rating: number
}

export interface Store {
  id: number
  name: string
  slug: string
  domain: string
  games_count: number
  image_background: string
}

export interface GameDetails extends Game {
  description_raw: string
  website: string
  reddit_url: string
  metacritic_url: string
  developers: Developer[]
  publishers: Publisher[]
  parent_platforms: Platform[]
  stores: GameStore[]
  clip?: GameTrailer
  tags: Tag[]
  user_game?: any
  reviews_count: number
  suggestions_count: number
  alternative_names: string[]
  parents_count: number
  additions_count: number
  game_series_count: number
  tba: boolean
  dominant_color: string
}
