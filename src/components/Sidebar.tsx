import { PodcastEntity } from '@/core/PodcastEntity'
import Link from 'next/link'
import React from 'react'
import {
  SideBarStyled,
  PodcastImageStyled,
  PodcastTitleStyled,
  PodcastAuthorStyled,
  PodcastDescriptionStyled
} from './styled'

type SideBarProps = {
  podcast: PodcastEntity
}

export default function Sidebar({ podcast }: SideBarProps) {
  return (
    <Link href={`/podcast/${podcast.id}`}>
      <SideBarStyled>
        <PodcastImageStyled src={podcast.imageURL} alt={podcast.title} />
        <PodcastTitleStyled>{podcast.title}</PodcastTitleStyled>
        <PodcastAuthorStyled>{podcast.artist}</PodcastAuthorStyled>
        <PodcastDescriptionStyled>{podcast.description}</PodcastDescriptionStyled>
      </SideBarStyled>
    </Link>
  )
}
