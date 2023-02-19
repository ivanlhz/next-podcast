import { ItunesAppleApiAdapter } from '@/adapters/itunesAppleApiAdapter'
import { EpisodeEntity } from '@/core/EpisodeEntity'
import { PodcastEntity } from '@/core/PodcastEntity'
import { EPISODE_LIST_RESPONSE, PODCAST_LIST_RESPONSE } from './fixtures'

describe('itunesAppleApiAdapter', () => {
  it('should return an podcast formated', () => {
    const result = ItunesAppleApiAdapter.formatPodcastListPodcast(PODCAST_LIST_RESPONSE[0])
    const expected: PodcastEntity = {
      id: '123',
      title: 'uno',
      imageURL: 'dummyimage2',
      description: 'lorem itsum 1',
      artist: 'Goku'
    }
    expect(result).toEqual(expected)
  })
  it('should return an episode formated', () => {
    const result = ItunesAppleApiAdapter.formatPodcastEpisode(EPISODE_LIST_RESPONSE[0])
    const expected: EpisodeEntity = {
      id: '1000600125719',
      title: 'Trust The Process Ft. Billy B',
      episodeURL: EPISODE_LIST_RESPONSE[0].episodeUrl,
      description: EPISODE_LIST_RESPONSE[0].description,
      duration: '01:21:42',
      date: '17/02/2023'
    }
    expect(result).toEqual(expected)
  })
})
