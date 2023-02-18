import { PodcastEntity } from '@/core/PodcastEntity'
import { PodcastRepository } from '@/core/PodcastRepository.interface'
import { useEffect, useState } from 'react'

interface UsePodcastListProps {
  service: PodcastRepository
}

export const usePodcastList = ({ service }: UsePodcastListProps) => {
  const [podcasts, setPodcasts] = useState<PodcastEntity[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await service.getPodcastList()
      setPodcasts(response)
    }
    fetchData()
  }, [service])

  return { podcasts }
}
