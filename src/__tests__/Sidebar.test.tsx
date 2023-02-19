import Sidebar from '@/components/Sidebar'
import { render, screen } from '@testing-library/react'
import { PODCAST_LIST_FORMATTED } from './fixtures'

describe('Sidebar component', () => {
  it('should render the component', () => {
    const podcast = PODCAST_LIST_FORMATTED[0]
    render(<Sidebar podcast={podcast} />)
    expect(screen.getByText(podcast.title)).toBeInTheDocument()
    expect(screen.getByText(podcast.artist)).toBeInTheDocument()
    expect(screen.getByText(podcast.description)).toBeInTheDocument()
  })
})
