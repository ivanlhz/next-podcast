import { PodcastEntity } from '@/core/PodcastEntity'
import { Card, CardBody, Divider, Heading, Image, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

type SideBarProps = {
  podcast: PodcastEntity
}

export default function Sidebar({ podcast }: SideBarProps) {
  return (
    <Link href={`/podcast/${podcast.id}`}>
      <Card>
        <Image width='full' src={podcast.imageURL} alt={podcast.title} />
        <CardBody>
          <Heading as='h3' size='sm'>
            {podcast.title}
          </Heading>
          <Text>{podcast.artist}</Text>
          <Divider marginY='4' />
          <Text>{podcast.description}</Text>
        </CardBody>
      </Card>
    </Link>
  )
}
