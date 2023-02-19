import {
  AudioPlayerStyled,
  EpisodeDetailsTitleStyled,
  EpisodeDetailsDescriptionStyled
} from '@/components/styled'
import PodcastLayout from '@/components/PodcastLayout'
import { useRouter } from 'next/router'

export default function Episode() {
  const router = useRouter()
  const episodeId = router.query['episodeId'] as string
  const podcastId = router.query['podcastId'] as string
  return (
    <PodcastLayout episodeId={episodeId} podcastId={podcastId} isFallback={router.isFallback}>
      {({ episode }) => {
        return episode ? (
          <>
            <EpisodeDetailsTitleStyled>{episode.title}</EpisodeDetailsTitleStyled>
            <EpisodeDetailsDescriptionStyled
              className='prose'
              dangerouslySetInnerHTML={{ __html: episode.description }}
            />
            <AudioPlayerStyled src={episode.episodeURL} controls />
          </>
        ) : null
      }}
    </PodcastLayout>
  )
}
