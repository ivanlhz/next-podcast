import { EpisodeEntity } from '@/core/EpisodeEntity'
import { PodcastAdapter } from '@/core/PodcastApdater.interface'
import { PodcastEntity } from '@/core/PodcastEntity'
import { EpisodeDTO, PodcastDTO } from '@/services/appleApiServiceTypes'

export const ItunesAppleApiAdapter: PodcastAdapter<
  PodcastDTO,
  PodcastEntity,
  EpisodeDTO,
  EpisodeEntity
> = {
  formatPodcastListPodcast: (podcast) => {
    return {
      id: podcast.id.attributes['im:id'],
      title: podcast.title.label,
      imageURL: podcast['im:image'][2].label,
      description: podcast.summary.label,
      artist: podcast['im:artist'].label
    }
  },

  formatPodcastEpisode: (episode) => {
    return {
      id: episode.trackId.toString(),
      title: episode.trackName,
      date: new Date(episode.releaseDate).toLocaleString(),
      duration: miliToMinutesAndSeconds(episode.trackTimeMillis),
      episodeURL: episode.episodeUrl,
      description: episode.description
    }
  }
}

const miliToMinutesAndSeconds = (miliseconds: number) => {
  const minutes: number = miliseconds / 1000 / 60
  miliseconds -= minutes * 60 * 1000
  const seconds = miliseconds / 1000
  return `${minutes}:${seconds}`
}
