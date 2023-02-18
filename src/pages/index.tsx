import { ChangeEvent, useState } from 'react'
import Link from 'next/link'
import { ContainerStyled, PodcastCardStyled } from '@/components/styled'
import Image from 'next/image'
import { usePodcastList } from '@/hooks/usePodcastList'
import { ItunesAppleApiService } from '@/services/ItunesAppleApiService'

const service = new ItunesAppleApiService()

export default function Home() {
  const { podcasts } = usePodcastList({
    service
  })
  const [filter, setFilter] = useState('')

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value)
  }

  const filteredPodcasts = podcasts.filter(
    (podcast) =>
      podcast.title.toLowerCase().includes(filter.toLowerCase()) ||
      podcast.artist.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <input type='text' placeholder='Filter podcasts' onChange={handleFilterChange} />
      <ContainerStyled>
        {filteredPodcasts.map((podcast) => (
          <Link href={`/podcast/${podcast.id}`} key={podcast.id}>
            <PodcastCardStyled>
              <Image width={170} height={170} src={podcast.imageURL} alt={podcast.title} />
              <h3>{podcast.title}</h3>
              <p>{podcast.artist}</p>
              <p>{podcast.description}</p>
            </PodcastCardStyled>
          </Link>
        ))}
      </ContainerStyled>
    </div>
  )
}
