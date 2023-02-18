import {
  AudioPlayerStyled,
  EpisodeDetailsTitleStyled,
  EpisodeDetailsDescriptionStyled
} from '@/components/styled'
import PodcastLayout from '@/components/PodcastLayout'

export default function Episode() {
  return (
    <PodcastLayout>
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
