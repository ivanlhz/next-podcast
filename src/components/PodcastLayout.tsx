import { EpisodeEntity } from '@/core/EpisodeEntity'
import { PodcastEntity } from '@/core/PodcastEntity'
import { usePodcastInfo } from '@/hooks/usePodcastInfo'
import { ItunesAppleApiService } from '@/services/ItunesAppleApiService'
import { NextRouter, useRouter } from 'next/dist/client/router'
import React from 'react'
import Sidebar from './Sidebar'
import { ContainerStyled, MainSectionStyled } from './styled'

const service = new ItunesAppleApiService()

type ChildrenProps = {
  episode?: EpisodeEntity
  episodes?: EpisodeEntity[]
  router: NextRouter
}

interface PodcastLayoutProps {
  children: (props: ChildrenProps) => React.ReactElement | null
}

function PodcastLayout({ children }: PodcastLayoutProps) {
  const router = useRouter()
  const episodeId = router.query['episodeId'] as string
  const id = router.query['podcastId'] as string
  const { podcast, episodes } = usePodcastInfo({
    id,
    service
  })

  const episode = episodes?.length ? episodes.find((p) => p.id === episodeId) : undefined

  if (router.isFallback || !podcast) {
    return <div>Loading...</div>
  }

  return (
    <ContainerStyled>
      <Sidebar podcast={podcast} />
      <MainSectionStyled>{children({ episode, episodes, router })}</MainSectionStyled>
    </ContainerStyled>
  )
}

export default PodcastLayout
