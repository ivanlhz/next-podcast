import PodcastLayout from '@/components/PodcastLayout'
import { useRouter } from 'next/router'
import EpisodeList from '@/components/EpisodeList'

export default function PodcastPage() {
  const router = useRouter()
  const episodeId = router.query['episodeId'] as string
  const podcastId = router.query['podcastId'] as string
  return (
    <PodcastLayout
      data-testid='podcastLayout'
      episodeId={episodeId}
      podcastId={podcastId}
      isFallback={router.isFallback}>
      {({ episodes }) => {
        return <EpisodeList episodes={episodes} routerPath={router.asPath} />
      }}
    </PodcastLayout>
  )
}
