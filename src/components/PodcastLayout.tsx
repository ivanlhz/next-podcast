import { EpisodeEntity } from '@/core/EpisodeEntity'
import { usePodcastInfo } from '@/hooks/usePodcastInfo'
import { ItunesAppleApiService } from '@/services/ItunesAppleApiService'
import { Flex, Heading, Divider, Box, Grid } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import Sidebar from './Sidebar'

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

function PodcastLayout({
  children,
  episodeId,
  podcastId,
  isFallback = true,
  ...props
}: PodcastLayoutProps) {
  const { podcast, episodes } = usePodcastInfo({
    podcastId,
    service
  })

  const episode = episodes?.length ? episodes.find((p) => p.id === episodeId) : undefined

  if (isFallback || !podcast) {
    return <div {...props}>Loading...</div>
  }

  return (
    <Flex minHeight='100vh' flexDirection='column' padding={20} {...props}>
      <Heading color='blue.600'>
        <Link href='/'>Podcaster</Link>
      </Heading>
      <Divider color={'blue'} size='xl' my='4' />
      <Grid templateColumns='30% 70%' gap='24px'>
        <Sidebar podcast={podcast} />
        <Box>{children({ episode, episodes })}</Box>
      </Grid>
    </Flex>
  )
}

export default PodcastLayout
