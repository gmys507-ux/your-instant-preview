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

// ─── Assistant Review Types ─────────────────────────────────

export type ScoreItemStatus = 'good' | 'warning' | 'critical'

export type PlanningDocument = {
  title: string
  concept: string
  target: string
  channel: string
  appeal_point: string
  conti: { time: string; scene: string }[]
  script_full: { time: string; voice: string; visual: string }[]
  image_placement_plan: { scene: number; visual: string }[]
  cta_copy: string
}

export type ReviewSection1 = {
  label: string
  alignment_score: number
  score_max: number
  score_color: string
  summary: string
  item_comments: {
    item: string
    status: ScoreItemStatus
    icon: string
    text: string
    guide_ref: string
  }[]
}

export type ReviewSection2 = {
  label: string
  items: {
    type: string
    label: string
    original: string
    improved: string
    reasoning: string
    expected_uplift: string
  }[]
}

export type ReviewSection3 = {
  label: string
  total_duration: string
  channel_optimal: string
  scenes: {
    time: string
    title: string
    visual: string
    voice: string
    key_change_from_original: string
    rationale: string
  }[]
}

export type ReviewSection4 = {
  label: string
  subtitle: string
  items: {
    ad_id: string
    brand: string
    product: string
    thumbnail: string
    platform: Platform
    similarity_score: number
    running_days: number
    key_pattern: string
    differentiator: string
  }[]
}

export type ReviewSection5 = {
  label: string
  subtitle: string
  key_difference: string
  supporting_data: string
  predicted_metrics: {
    current_baseline_roas: number
    if_improvements_applied_roas: number
    uplift_percentage: string
    uplift_breakdown: { factor: string; uplift: string }[]
  }
  confidence: string
}

export type ReviewSection6 = {
  label: string
  actions: {
    type: string
    label: string
    icon: string
    params: Record<string, unknown>
  }[]
}

export type ReviewResult = {
  input_planning_document: PlanningDocument
  review_result: {
    section_1_score: ReviewSection1
    section_2_improved_copy: ReviewSection2
    section_3_scene_structure: ReviewSection3
    section_4_competitor_comparison: ReviewSection4
    section_5_internal_top_comparison: ReviewSection5
    section_6_module_actions: ReviewSection6
  }
}

// ─── Dashboard Types ────────────────────────────────────────

export type KPI = {
  key: string
  label: string
  value: string
  delta: string
  delta_direction: 'up' | 'down' | 'flat'
  period: string
}

export type SankeyData = {
  nodes: { id: string; label: string; layer: number }[]
  links: { source: string; target: string; value: number }[]
}

export type FunnelStage = {
  label: string
  value: number
  rate: number
}

export type RetentionCohort = {
  name: string
  d1: number
  d7: number
  d30: number
}

export type Segment = {
  name: string
  conversion_rate: number
  share: number
}

export type AIInsight = {
  id: string
  title: string
  body: string
  severity: 'warning' | 'success' | 'info'
  actions: string[]
}

export type DashboardData = {
  kpis: KPI[]
  causal_decomposition: {
    default_tab: string
    sankey: SankeyData
    node_graph: { description: string }
    funnel: { stages: FunnelStage[] }
    multi_layer: { layers: { name: string; items: string[] }[] }
  }
  user_data: {
    funnel: { stages: FunnelStage[] }
    retention: { cohorts: RetentionCohort[] }
    segments: Segment[]
  }
  bridge_insight: string
  ai_insights: AIInsight[]
}
