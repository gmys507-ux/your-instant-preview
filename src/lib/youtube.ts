/**
 * YouTube 광고 영상 cycle helper.
 * 30개 ad ID를 hash해서 6개 영상에 순환 매핑.
 * 시연용 placeholder — 실제로는 각 광고가 자기 영상을 가짐.
 */

const YOUTUBE_IDS = [
  'yMV8tQtCYYY',
  '0onxkpGOxYw',
  'BQW8U-RBnNY',
  'ixeRBocqdF8',
  'vmckV6XP_h8',
  'woRAHak1Z9U',
]

function hashOf(adId: string): number {
  return adId.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
}

export function youtubeIdFor(adId: string): string {
  return YOUTUBE_IDS[hashOf(adId) % YOUTUBE_IDS.length]
}

/**
 * hqdefault: 480x360, 가장 안정적이고 항상 사용 가능.
 */
export function youtubeThumbnail(adId: string): string {
  return `https://img.youtube.com/vi/${youtubeIdFor(adId)}/hqdefault.jpg`
}

export function youtubeEmbedUrl(adId: string): string {
  return `https://www.youtube.com/embed/${youtubeIdFor(adId)}?autoplay=0&rel=0&modestbranding=1`
}

export function youtubeWatchUrl(adId: string): string {
  return `https://www.youtube.com/watch?v=${youtubeIdFor(adId)}`
}
