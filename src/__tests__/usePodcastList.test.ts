import { EpisodeEntity } from '@/core/EpisodeEntity'
import { PodcastEntity } from '@/core/PodcastEntity'
import { PodcastRepository } from '@/core/PodcastRepository.interface'
import { usePodcastList } from '@/hooks/usePodcastList'
import { renderHook, waitFor } from '@testing-library/react'
import { PODCAST_LIST_FORMATTED } from './fixtures'

class DummyService implements PodcastRepository {
  getPodcastList(): Promise<PodcastEntity[]> {
    return Promise.resolve(PODCAST_LIST_FORMATTED)
  }
  getPodcastDetailsById(id: string): Promise<PodcastEntity> {
    throw new Error('Method not implemented.')
  }
  getEpisodesByPodcastId(id: string): Promise<EpisodeEntity[]> {
    throw new Error('Method not implemented.')
  }
}

describe('usePodcastList', () => {
  it('should return the podcast list', async () => {
    const { result } = renderHook(() => usePodcastList({ service: new DummyService() }))
    await waitFor(() => {
      expect(result.current.podcasts).toEqual(PODCAST_LIST_FORMATTED)
    })
  })
})
