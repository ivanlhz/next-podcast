export interface PodcastAdapter<PodcastDTO, PodcastEntity, EpisodeDTO, EpisodeEntity> {
  formatPodcastListPodcast: (podcast: PodcastDTO) => PodcastEntity
  formatPodcastEpisode: (episode: EpisodeDTO) => EpisodeEntity
}
