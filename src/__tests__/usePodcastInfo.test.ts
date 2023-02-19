import { EpisodeEntity } from '@/core/EpisodeEntity'
import { PodcastEntity } from '@/core/PodcastEntity'
import { PodcastRepository } from '@/core/PodcastRepository.interface'
import { usePodcastInfo } from '@/hooks/usePodcastInfo'
import { renderHook, waitFor } from '@testing-library/react'
import { EPISODE_LIST_FORMATTED, PODCAST_LIST_FORMATTED } from './fixtures'

class DummyService implements PodcastRepository {
  getPodcastList(): Promise<PodcastEntity[]> {
    return Promise.resolve(PODCAST_LIST_FORMATTED)
  }
  getPodcastDetailsById(id: string): Promise<PodcastEntity> {
    return Promise.resolve(PODCAST_LIST_FORMATTED[0])
  }
  getEpisodesByPodcastId(id: string): Promise<EpisodeEntity[]> {
    return Promise.resolve(EPISODE_LIST_FORMATTED)
  }
}

describe('usePodcastInfo', () => {
  it('should return the initial state if id is e,pty string', async () => {
    const service = new DummyService()
    const { result } = renderHook(() => usePodcastInfo({ podcastId: '', service }))
    const expected = { podcast: undefined, episodes: [] }
    await waitFor(() => {
      expect(result.current).toEqual(expected)
    })
  })

  it('should return the initial state if id is undefined', async () => {
    const service = new DummyService()
    const { result } = renderHook(() => usePodcastInfo({ podcastId: undefined, service }))
    const expected = { podcast: undefined, episodes: [] }
    await waitFor(() => {
      expect(result.current).toEqual(expected)
    })
  })

  it('should return the podcast info and episodes', async () => {
    const service = new DummyService()
    const { result } = renderHook(() => usePodcastInfo({ podcastId: '123', service }))

    await waitFor(() => {
      expect(result.current.podcast).toEqual(PODCAST_LIST_FORMATTED[0])
      expect(result.current.episodes).toHaveLength(EPISODE_LIST_FORMATTED.length - 1)
      expect(result.current.episodes).toEqual(EPISODE_LIST_FORMATTED.slice(1))
    })
  })
})
