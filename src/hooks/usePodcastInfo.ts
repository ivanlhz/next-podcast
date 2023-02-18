import { EpisodeEntity } from '@/core/EpisodeEntity'
import { PodcastEntity } from '@/core/PodcastEntity'
import { PodcastRepository } from '@/core/PodcastRepository.interface'
import { useEffect, useState } from 'react'

interface UsePodcastInfoProps {
  id: string
  service: PodcastRepository
}

interface State {
  podcast: PodcastEntity | undefined
  episodes?: EpisodeEntity[]
}

export const usePodcastInfo = ({ id, service }: UsePodcastInfoProps) => {
  const [state, setState] = useState<State>({ podcast: undefined, episodes: [] })

  useEffect(() => {
    const getData = async () => {
      const response = await Promise.all([
        service.getPodcastDetailsById(id),
        service.getEpisodesByPodcastId(id)
      ])
      const podcast = { ...response[0] }
      const episodes = response[1].slice(1)
      setState({
        podcast,
        episodes
      })
    }
    if (id) {
      getData()
    }
  }, [id, service])

  return {
    ...state
  }
}
