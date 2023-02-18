import { useRouter } from 'next/router'
import {
  PodcastAuthorStyled,
  SideBarStyled,
  PodcastDescriptionStyled,
  PodcastImageStyled,
  PodcastTitleStyled,
  EpisodesListStyled,
  EpisodeItemStyled,
  EpisodeDurationStyled,
  EpisodeTitleStyled,
  EpisodeDateStyled
} from '@/components/styled'
import { usePodcastInfo } from '@/hooks/usePodcastInfo'
import { ItunesAppleApiService } from '@/services/itunesAppleApiService'
import Link from 'next/link'

const service = new ItunesAppleApiService()

export default function Podcast() {
  const router = useRouter()
  const id = router.query['podcastId'] as string
  const { podcast, episodes } = usePodcastInfo({
    id,
    service
  })

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    podcast && (
      <div>
        <SideBarStyled>
          <PodcastImageStyled src={podcast.imageURL} alt={podcast.title} />
          <PodcastTitleStyled>{podcast.title}</PodcastTitleStyled>
          <PodcastAuthorStyled>{podcast.artist}</PodcastAuthorStyled>
          <PodcastDescriptionStyled>{podcast.description}</PodcastDescriptionStyled>
        </SideBarStyled>
        <div>
          <h3>{episodes?.length} Episodes</h3>
          <EpisodesListStyled>
            {episodes?.map((episode) => (
              <Link key={episode.id} href={`${router.asPath}/episode/${episode.id}`}>
                <EpisodeItemStyled>
                  <EpisodeTitleStyled>{episode.title}</EpisodeTitleStyled>
                  <EpisodeDateStyled>{episode.date}</EpisodeDateStyled>
                  <EpisodeDurationStyled>{episode.duration}</EpisodeDurationStyled>
                </EpisodeItemStyled>
              </Link>
            ))}
          </EpisodesListStyled>
        </div>
      </div>
    )
  )
}
