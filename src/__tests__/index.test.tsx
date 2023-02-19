import { render, screen } from '@testing-library/react'
import Home from '@/pages/index'
import '@testing-library/jest-dom'

describe('Home', () => {
  it('Should render a input search box', () => {
    render(<Home />)

    const searchInput = screen.getByPlaceholderText('Filter podcasts')

    expect(searchInput).toBeInTheDocument()
  })
  it('Should render a podcast list', () => {})
})
