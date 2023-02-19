import { EpisodeEntity } from '@/core/EpisodeEntity'
import React from 'react'
import {
  EpisodeDetailsTitleStyled,
  EpisodeDetailsDescriptionStyled,
  AudioPlayerStyled
} from './styled'

type EpisodeProps = {
  data: EpisodeEntity
}

function Episode({ data }: EpisodeProps) {
  return (
    <>
      <EpisodeDetailsTitleStyled>{data.title}</EpisodeDetailsTitleStyled>
      <EpisodeDetailsDescriptionStyled
        className='prose'
        dangerouslySetInnerHTML={{ __html: data.description }}
      />
      <AudioPlayerStyled src={data.episodeURL} controls />
    </>
  )
}

export default Episode
