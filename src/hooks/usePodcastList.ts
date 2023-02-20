import { PodcastEntity } from '@/core/PodcastEntity'
import { PodcastRepository } from '@/core/PodcastRepository.interface'
import { differenceIsMoreThanADay } from '@/shared/utilsFunctions'
import { useEffect, useState } from 'react'

interface UsePodcastListProps {
  service: PodcastRepository
}

export const usePodcastList = ({ service }: UsePodcastListProps) => {
  const [podcasts, setPodcasts] = useState<PodcastEntity[]>([])

  useEffect(() => {
    const fetchData = async () => {
      let dataToSave: { podcasts: PodcastEntity[]; lastUpdated: string } = {
        podcasts: [],
        lastUpdated: ''
      }
      const stateFromLocalStorage = localStorage.getItem('podcastListState')

      if (stateFromLocalStorage) {
        dataToSave = JSON.parse(stateFromLocalStorage)
      }

      if (
        !stateFromLocalStorage ||
        (dataToSave && differenceIsMoreThanADay(new Date(), new Date(dataToSave.lastUpdated)))
      ) {
        dataToSave.podcasts = await service.getPodcastList()
        dataToSave.lastUpdated = new Date(Date.now()).toUTCString()
        localStorage.setItem('podcastListState', JSON.stringify(dataToSave))
      }
      setPodcasts(dataToSave.podcasts)
    }
    fetchData()
  }, [service])

  return { podcasts }
}
