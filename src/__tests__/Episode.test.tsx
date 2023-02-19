import Episode from '@/components/Episode'
import { render, screen } from '@testing-library/react'
import { EPISODE_LIST_FORMATTED } from './fixtures'

describe('Episode component', () => {
  it('should render', () => {
    const episode = EPISODE_LIST_FORMATTED[0]
    render(<Episode data={episode} />)

    expect(screen.getByText(episode.title)).toBeInTheDocument()
  })
})
