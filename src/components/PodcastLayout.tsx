import { EpisodeEntity } from '@/core/EpisodeEntity'
import { usePodcastInfo } from '@/hooks/usePodcastInfo'
import { ItunesAppleApiService } from '@/services/ItunesAppleApiService'
import React from 'react'
import Sidebar from './Sidebar'
import { ContainerStyled, MainSectionStyled } from './styled'

const service = new ItunesAppleApiService()

type ChildrenProps = {
  episode?: EpisodeEntity
  episodes?: EpisodeEntity[]
}

interface PodcastLayoutProps {
  children: (props: ChildrenProps) => React.ReactElement | null
  episodeId: string
  podcastId: string
  isFallback?: boolean
}

function PodcastLayout({ children, episodeId, podcastId, isFallback = true }: PodcastLayoutProps) {
  const { podcast, episodes } = usePodcastInfo({
    podcastId,
    service
  })
  console.log(podcast, episodes)
  const episode = episodes?.length ? episodes.find((p) => p.id === episodeId) : undefined

  if (isFallback || !podcast) {
    return <div>Loading...</div>
  }

  return (
    <ContainerStyled>
      <Sidebar podcast={podcast} />
      <MainSectionStyled>{children({ episode, episodes })}</MainSectionStyled>
    </ContainerStyled>
  )
}

export default PodcastLayout
