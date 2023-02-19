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
      date: getDateFormatted(new Date(episode.releaseDate)),
      duration: miliToMinutesAndSeconds(episode.trackTimeMillis),
      episodeURL: episode.episodeUrl,
      description: episode.description
    }
  }
}

const miliToMinutesAndSeconds = (ms: number) => {
  return new Date(ms).toISOString().slice(11, 19)
}

const getDateFormatted = (inputDate: Date): string => {
  let date, month, year

  date = inputDate.getDate()
  month = inputDate.getMonth() + 1
  year = inputDate.getFullYear()

  date = date.toString().padStart(2, '0')

  month = month.toString().padStart(2, '0')

  return `${date}/${month}/${year}`
}
