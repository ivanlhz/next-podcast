import { ItunesAppleApiAdapter } from '@/adapters/itunesAppleApiAdapter'
import { ItunesAppleApiService } from '@/services/itunesAppleApiService'
import axios from 'axios'
import {
  EPISODE_LIST_FORMATTED,
  EPISODE_LIST_RESPONSE,
  PODCAST_LIST_FORMATTED,
  PODCAST_LIST_RESPONSE
} from './fixtures'

describe('AppleApiService', () => {
  const service = new ItunesAppleApiService()
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('getPodcastList should return a formatted list', async () => {
    const mockedAxios = jest
      .spyOn(axios, 'get')
      .mockImplementation(() =>
        Promise.resolve({ data: { feed: { entry: PODCAST_LIST_RESPONSE } } })
      )
    const expected = PODCAST_LIST_FORMATTED
    const response = await service.getPodcastList()
    expect(mockedAxios).toBeCalledTimes(1)
    expect(response).toEqual(expected)
  })

  it('getPodcastDetailsById should return the podcast details', async () => {
    jest
      .spyOn(axios, 'get')
      .mockImplementation(() =>
        Promise.resolve({ data: { feed: { entry: PODCAST_LIST_RESPONSE } } })
      )
    const expected = PODCAST_LIST_FORMATTED[1]

    const response = await service.getPodcastDetailsById('456')
    expect(response).toEqual(expected)
  })

  it('getPodcastDetailsById should return an error if not found', async () => {
    jest
      .spyOn(axios, 'get')
      .mockImplementation(() =>
        Promise.resolve({ data: { feed: { entry: PODCAST_LIST_RESPONSE } } })
      )
    try {
      await service.getPodcastDetailsById('333')
    } catch (error) {
      expect((error as Error).message).toBe('Podcast not found')
    }
  })

  it('getEpisodesByPodcastId should return a formatted episode list', async () => {
    const mockedAxios = jest
      .spyOn(axios, 'get')
      .mockImplementation(() => Promise.resolve({ data: { results: EPISODE_LIST_RESPONSE } }))
    const expected = EPISODE_LIST_FORMATTED
    const response = await service.getEpisodesByPodcastId('test')
    expect(mockedAxios).toBeCalledTimes(1)
    expect(mockedAxios).toBeCalledWith(
      'https://cors-anywhere.herokuapp.com/https://itunes.apple.com/lookup?id=test&media=podcast&entity=podcastEpisode'
    )
    expect(response).toEqual(expected)
  })
})
