import { ChangeEvent, useState } from 'react'
import Link from 'next/link'
//import Image from 'next/image'
import { usePodcastList } from '@/hooks/usePodcastList'
import { ItunesAppleApiService } from '@/services/itunesAppleApiService'
import {
  Card,
  CardBody,
  Divider,
  Flex,
  Grid,
  Heading,
  HStack,
  Input,
  Tag,
  Text,
  Image
} from '@chakra-ui/react'

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
    <Flex minHeight='100vh' flexDirection='column' padding={20}>
      <Heading color='blue.600'>Podcaster</Heading>
      <Divider color={'blue'} size='xl' my='4' />
      <HStack spacing={4} marginLeft='auto' marginBottom='6'>
        <Tag variant='solid' colorScheme={'linkedin'} justifyContent='center'>
          {podcasts.length}
        </Tag>
        <Input placeholder='Filter podcasts' onChange={handleFilterChange} />
      </HStack>

      <Grid templateColumns='repeat(5, 1fr)' gap={4}>
        {filteredPodcasts.map((podcast) => (
          <Link data-testid='link' href={`/podcast/${podcast.id}`} key={podcast.id}>
            <Card alignItems='center' textAlign='center'>
              <Image
                borderRadius='full'
                boxSize='150px'
                src={podcast.imageURL}
                alt={podcast.title}
              />
              <CardBody>
                <Heading as='h3' size='md'>
                  {podcast.title}
                </Heading>
                <Text color={'gray.400'}>Author: {podcast.artist}</Text>
              </CardBody>
            </Card>
          </Link>
        ))}
      </Grid>
    </Flex>
  )
}
