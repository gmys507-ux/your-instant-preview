export type Platform = 'Instagram' | 'TikTok' | 'YouTube' | 'Meta'

export type Ad = {
  id: string
  brand: string
  product: string
  platform: Platform
  country: string
  channel: string
  thumbnail: string
  video_url?: string
  copy_hook: string
  concept: string
  conti: string[]
  appeal_points: string[]
  metrics: {
    estimated_impressions: string
    estimated_spend: string
    running_days: number
    engagement_rate: string
  }
  alignment_score: number
  tags: string[]
}

export type FilterState = {
  query: string
  brands: Set<string>
  platforms: Set<Platform>
  countries: Set<string>
  channels: Set<string>
  tags: Set<string>
}

export const initialFilterState = (): FilterState => ({
  query: '',
  brands: new Set(),
  platforms: new Set(),
  countries: new Set(),
  channels: new Set(),
  tags: new Set(),
})
