import { usePodcastInfo } from '@/hooks/usePodcastInfo'
import EpisodePage from '@/pages/podcast/[podcastId]/episode/[episodeId]'
import { render, screen } from '@testing-library/react'
import * as NestRouter from 'next/router'
import { EPISODE_LIST_FORMATTED, PODCAST_LIST_FORMATTED } from './fixtures'

jest.mock('@/hooks/usePodcastInfo')
const mockedUsePodcastInfo = usePodcastInfo as jest.MockedFunction<typeof usePodcastInfo>

describe('EpisodePage', () => {
  it('should render', () => {
    const podcast = PODCAST_LIST_FORMATTED[0]
    jest.spyOn(NestRouter, 'useRouter').mockImplementation(() => ({
      ...jest.requireActual('next/router'),
      query: { episodeId: '1000599494953', podcastId: podcast.id },
      isFallback: false
    }))
    mockedUsePodcastInfo.mockReturnValue({
      podcast,
      episodes: EPISODE_LIST_FORMATTED
    })
    render(<EpisodePage />)
    expect(screen.getByTestId('podcastLayout')).toBeInTheDocument()
    expect(screen.getByText(podcast.title)).toBeInTheDocument()
    expect(screen.getByText(podcast.artist)).toBeInTheDocument()
    expect(screen.getByText(podcast.description)).toBeInTheDocument()
    expect(screen.getByText(EPISODE_LIST_FORMATTED[1].title)).toBeInTheDocument()
  })
  it('should not render the episode because not exists', () => {
    const podcast = PODCAST_LIST_FORMATTED[0]
    jest.spyOn(NestRouter, 'useRouter').mockImplementation(() => ({
      ...jest.requireActual('next/router'),
      query: { episodeId: '100059942223', podcastId: podcast.id },
      isFallback: false
    }))
    mockedUsePodcastInfo.mockReturnValue({
      podcast,
      episodes: EPISODE_LIST_FORMATTED
    })
    render(<EpisodePage />)
    expect(screen.getByTestId('podcastLayout')).toBeInTheDocument()
    expect(screen.getByText(podcast.title)).toBeInTheDocument()
    expect(screen.getByText(podcast.artist)).toBeInTheDocument()
    expect(screen.getByText(podcast.description)).toBeInTheDocument()
    expect(screen.queryByText(EPISODE_LIST_FORMATTED[1].title)).toBeNull()
  })
})
