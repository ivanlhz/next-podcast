import { useRouter } from 'next/router'
import {
  ContainerStyled,
  PodcastAuthorStyled,
  SideBarStyled,
  PodcastDescriptionStyled,
  PodcastImageStyled,
  PodcastTitleStyled,
  AudioPlayerStyled,
  EpisodeDetailsTitleStyled,
  EpisodeDetailsDescriptionStyled,
  MainSectionStyled
} from '@/components/styled'
import { usePodcastInfo } from '@/hooks/usePodcastInfo'
import { ItunesAppleApiService } from '@/services/itunesAppleApiService'

const service = new ItunesAppleApiService()

export default function Episode() {
  const router = useRouter()
  const episodeId = router.query['episodeId'] as string
  const id = router.query['podcastId'] as string
  const { podcast, episodes } = usePodcastInfo({
    id,
    service
  })

  const episode = episodes?.length ? episodes.find((p) => p.id === episodeId) : null

  if (router.isFallback || !podcast) {
    return <div>Loading...</div>
  }

  return (
    <ContainerStyled>
      <SideBarStyled>
        <PodcastImageStyled src={podcast.imageURL} alt={podcast.title} />
        <PodcastTitleStyled>{podcast.title}</PodcastTitleStyled>
        <PodcastAuthorStyled>{podcast.artist}</PodcastAuthorStyled>
        <PodcastDescriptionStyled>{podcast.description}</PodcastDescriptionStyled>
      </SideBarStyled>
      <MainSectionStyled>
        {episode ? (
          <>
            <EpisodeDetailsTitleStyled>{episode.title}</EpisodeDetailsTitleStyled>
            <EpisodeDetailsDescriptionStyled
              className='prose'
              dangerouslySetInnerHTML={{ __html: episode.description }}
            />
            <AudioPlayerStyled src={episode.episodeURL} controls />
          </>
        ) : null}
      </MainSectionStyled>
    </ContainerStyled>
  )
}
