import { fireEvent, render, screen } from '@testing-library/react'
import Home from '@/pages/index'
import '@testing-library/jest-dom'
import { usePodcastList } from '@/hooks/usePodcastList'
import { PODCAST_LIST_FORMATTED } from './fixtures'

jest.mock('@/hooks/usePodcastList')
const mockuUePodcastList = usePodcastList as jest.MockedFunction<typeof usePodcastList>

describe('Home', () => {
  it('Should render a input search box', () => {
    mockuUePodcastList.mockReturnValue({ podcasts: [] })
    render(<Home />)

    const searchInput = screen.getByPlaceholderText('Filter podcasts')

    expect(searchInput).toBeInTheDocument()
  })

  it('Should render links', () => {
    mockuUePodcastList.mockReturnValue({ podcasts: PODCAST_LIST_FORMATTED })
    render(<Home />)

    const links = screen.queryAllByTestId('link')

    expect(links).not.toBeNull()
  })

  it('Should filter podcasts', () => {
    mockuUePodcastList.mockReturnValue({ podcasts: PODCAST_LIST_FORMATTED })
    render(<Home />)

    const searchInput = screen.getByPlaceholderText('Filter podcasts')
    fireEvent.change(searchInput, { target: { value: 'uno' } })
    const links = screen.queryAllByTestId('link')
    expect(links).toHaveLength(1)
  })
})
