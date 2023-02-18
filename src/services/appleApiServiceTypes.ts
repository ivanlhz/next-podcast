export type EpisodeDTO = {
  trackId: string
  trackName: string
  releaseDate: string
  trackTimeMillis: number
  episodeUrl: string
  description: string
}

export type PodcastDTO = {
  id: { attributes: { 'im:id': string } }
  title: { label: string }
  'im:image': { label: string }[]
  summary: { label: string }
  'im:artist': { label: string }
}

export type GetPodcastListResponse = {
  data: { feed: { entry: PodcastDTO[] } }
}
