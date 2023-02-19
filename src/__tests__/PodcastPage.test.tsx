import { usePodcastInfo } from '@/hooks/usePodcastInfo'
import PodcastPage from '@/pages/podcast/[podcastId]'
import { render, screen } from '@testing-library/react'
import * as NestRouter from 'next/router'
import { EPISODE_LIST_FORMATTED, PODCAST_LIST_FORMATTED } from './fixtures'

jest.mock('@/hooks/usePodcastInfo')
const mockedUsePodcastInfo = usePodcastInfo as jest.MockedFunction<typeof usePodcastInfo>

describe('PodcastPage', () => {
  it('should render', () => {
    const podcast = PODCAST_LIST_FORMATTED[0]
    mockedUsePodcastInfo.mockReturnValue({
      podcast,
      episodes: EPISODE_LIST_FORMATTED
    })

    jest.spyOn(NestRouter, 'useRouter').mockImplementation(() => ({
      ...jest.requireActual('next/router'),
      query: { episodeId: '1000599494953', podcastId: podcast.id },
      isFallback: false
    }))
    render(<PodcastPage />)
    expect(screen.getByTestId('podcastLayout')).toBeInTheDocument()
  })
})
