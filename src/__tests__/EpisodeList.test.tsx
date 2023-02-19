import EpisodeList from '@/components/EpisodeList'
import { render, screen } from '@testing-library/react'
import { EPISODE_LIST_FORMATTED } from './fixtures'

jest.mock('next/link', () => {
  return ({ children }: { children: React.ReactElement }) => {
    return children
  }
})
describe('EpisodeList component', () => {
  it('should render', () => {
    render(<EpisodeList episodes={EPISODE_LIST_FORMATTED} routerPath='' />)

    expect(screen.getByText(EPISODE_LIST_FORMATTED[0].title)).toBeInTheDocument()
  })
  it('should render error mesage', () => {
    render(<EpisodeList routerPath='' />)

    expect(screen.getByText('There is no episodes')).toBeInTheDocument()
  })
})
