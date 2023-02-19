import PodcastLayout from '@/components/PodcastLayout'
import { render, screen } from '@testing-library/react'

describe('PodcastLayout component', () => {
  /*it('should render the children', async () => {
    jest
      .spyOn(axios, 'get')
      .mockImplementation(() => Promise.resolve({ data: { results: EPISODE_LIST_RESPONSE } }))
    render(
      <PodcastLayout episodeId='123' podcastId='123' isFallback={false}>
        {({ episode }) => <h1>{episode?.title}</h1>}
      </PodcastLayout>
    )
    await waitFor(() => {
      expect(screen.getByText(EPISODE_LIST_FORMATTED[1].title)).toBeInTheDocument()
    })
  })*/
  it('should render Loading message when the fallback is false and there is not podcast', () => {
    render(
      <PodcastLayout episodeId='' podcastId='' isFallback={false}>
        {() => <h1>Test</h1>}
      </PodcastLayout>
    )
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
  it('should render Loading message when the fallback is true', () => {
    render(
      <PodcastLayout episodeId='' podcastId=''>
        {() => <h1>Test</h1>}
      </PodcastLayout>
    )
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
})
