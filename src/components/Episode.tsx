import { EpisodeEntity } from '@/core/EpisodeEntity'
import { Card, CardBody, Heading, Text } from '@chakra-ui/react'
import React from 'react'

type EpisodeProps = {
  data: EpisodeEntity
}

function Episode({ data }: EpisodeProps) {
  return (
    <Card>
      <CardBody>
        <Heading mb={'24px'} size='lg'>
          {data.title}
        </Heading>
        <Text mb={'24px'} dangerouslySetInnerHTML={{ __html: data.description }} />
        <audio src={data.episodeURL} controls />
      </CardBody>
    </Card>
  )
}

export default Episode
