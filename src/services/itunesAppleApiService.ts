import { ItunesAppleApiAdapter } from '@/adapters/itunesAppleApiAdapter'
import { EpisodeEntity } from '@/core/EpisodeEntity'
import { PodcastRepository } from '@/core/PodcastRepository.interface'
import axios from 'axios'
import { EpisodeDTO, GetPodcastListResponse } from './appleApiServiceTypes'
const baseURL = 'https://cors-anywhere.herokuapp.com/'

export class ItunesAppleApiService implements PodcastRepository {
  async getPodcastList() {
    const response: GetPodcastListResponse = await axios.get(
      'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
    )
    return response.data.feed.entry.map((res) =>
      ItunesAppleApiAdapter.formatPodcastListPodcast(res)
    )
  }

  async getPodcastDetailsById(id: string) {
    const response = await this.getPodcastList()
    const found = response.find((p) => p.id === id)
    if (found) {
      return found
    }
    throw new Error('Podcast not found')
  }

  async getEpisodesByPodcastId(id: string): Promise<EpisodeEntity[]> {
    const response = await axios.get(
      baseURL + `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode`
    )
    return response?.data?.results.map((result: EpisodeDTO) =>
      ItunesAppleApiAdapter.formatPodcastEpisode(result)
    )
  }
}
