import { EpisodeEntity } from '@/core/EpisodeEntity'
import { PodcastEntity } from '@/core/PodcastEntity'
import { PodcastRepository } from '@/core/PodcastRepository.interface'
import { useEffect, useState } from 'react'

interface UsePodcastInfoProps {
  podcastId?: string
  service: PodcastRepository
}

interface State {
  podcast: PodcastEntity | undefined
  episodes?: EpisodeEntity[]
}

export const usePodcastInfo = ({ podcastId, service }: UsePodcastInfoProps) => {
  const [state, setState] = useState<State>({ podcast: undefined, episodes: [] })

  useEffect(() => {
    const getData = async (id: string) => {
      const response = await Promise.all([
        service.getPodcastDetailsById(id),
        service.getEpisodesByPodcastId(id)
      ])
      const podcast = { ...response[0] }
      const episodes = response[1].slice(1) // The first one is the podcast info
      setState({
        podcast,
        episodes
      })
    }
    if (podcastId) {
      getData(podcastId)
    }
  }, [podcastId, service])

  return {
    ...state
  }
}
