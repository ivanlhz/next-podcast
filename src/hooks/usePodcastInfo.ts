import { EpisodeEntity } from '@/core/EpisodeEntity'
import { PodcastEntity } from '@/core/PodcastEntity'
import { PodcastRepository } from '@/core/PodcastRepository.interface'
import { differenceIsMoreThanADay } from '@/shared/utilsFunctions'
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
      let dataToSave: State & { lastUpdated: string } = {
        podcast: undefined,
        episodes: [],
        lastUpdated: ''
      }
      const storageName = `podcastInfoState.${podcastId}`
      const stateFromLocalStorage = localStorage.getItem(storageName)

      if (stateFromLocalStorage) {
        dataToSave = JSON.parse(stateFromLocalStorage)
      }

      if (
        !stateFromLocalStorage ||
        (dataToSave && differenceIsMoreThanADay(new Date(), new Date(dataToSave.lastUpdated)))
      ) {
        const response = await Promise.all([
          service.getPodcastDetailsById(id),
          service.getEpisodesByPodcastId(id)
        ])
        dataToSave.podcast = { ...response[0] }
        dataToSave.episodes = response[1].slice(1) // The first one is the podcast info
        dataToSave.lastUpdated = new Date(Date.now()).toUTCString()

        localStorage.setItem(storageName, JSON.stringify(dataToSave))
      }

      setState({
        podcast: dataToSave.podcast,
        episodes: dataToSave.episodes
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
