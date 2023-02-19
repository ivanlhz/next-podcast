import {
  EpisodesListStyled,
  EpisodeItemStyled,
  EpisodeDurationStyled,
  EpisodeTitleStyled,
  EpisodeDateStyled
} from '@/components/styled'
import Link from 'next/link'
import PodcastLayout from '@/components/PodcastLayout'
import { useRouter } from 'next/router'

export default function Podcast() {
  const router = useRouter()
  const episodeId = router.query['episodeId'] as string
  const podcastId = router.query['podcastId'] as string
  return (
    <PodcastLayout episodeId={episodeId} podcastId={podcastId} isFallback={router.isFallback}>
      {({ episodes }) => {
        return (
          <>
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
          </>
        )
      }}
    </PodcastLayout>
  )
}
