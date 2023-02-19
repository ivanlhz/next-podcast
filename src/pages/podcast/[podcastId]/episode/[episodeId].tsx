import PodcastLayout from '@/components/PodcastLayout'
import { useRouter } from 'next/router'
import Episode from '@/components/Episode'

export default function EpisodePage() {
  const router = useRouter()
  const episodeId = router.query['episodeId'] as string
  const podcastId = router.query['podcastId'] as string
  return (
    <PodcastLayout
      data-testid='podcastLayout'
      episodeId={episodeId}
      podcastId={podcastId}
      isFallback={router.isFallback}>
      {({ episode }) => {
        return episode ? <Episode data={episode} /> : null
      }}
    </PodcastLayout>
  )
}
