import { EpisodeEntity } from '@/core/EpisodeEntity'
import Link from 'next/link'
import router from 'next/router'
import React from 'react'
import {
  EpisodesListStyled,
  EpisodeItemStyled,
  EpisodeTitleStyled,
  EpisodeDateStyled,
  EpisodeDurationStyled
} from './styled'

type EpisodeListProps = {
  episodes?: EpisodeEntity[]
  routerPath: string
}

function EpisodeList({ episodes, routerPath }: EpisodeListProps) {
  if (!episodes) {
    return <h2>There is no episodes</h2>
  }
  return (
    <>
      <h3>{episodes?.length} Episodes</h3>
      <EpisodesListStyled>
        {episodes?.map((episode) => (
          <Link key={episode.id} href={`${routerPath}/episode/${episode.id}`}>
            <EpisodeItemStyled>
              <EpisodeTitleStyled>{episode.title}</EpisodeTitleStyled>
              <EpisodeDateStyled>{episode.date}</EpisodeDateStyled>
              <EpisodeDurationStyled>{episode.duration}</EpisodeDurationStyled>
            </EpisodeItemStyled>
          </Link>
        ))}
      </EpisodesListStyled>
    </>
  )
}

export default EpisodeList
