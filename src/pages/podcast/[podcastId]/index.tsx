import {
  EpisodesListStyled,
  EpisodeItemStyled,
  EpisodeDurationStyled,
  EpisodeTitleStyled,
  EpisodeDateStyled
} from '@/components/styled'
import Link from 'next/link'
import PodcastLayout from '@/components/PodcastLayout'

export default function Podcast() {
  return (
    <PodcastLayout>
      {({ episodes, router }) => {
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
