import { EpisodeEntity } from '@/core/EpisodeEntity'
import {
  Card,
  CardBody,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack
} from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

type EpisodeListProps = {
  episodes?: EpisodeEntity[]
  routerPath: string
}

function EpisodeList({ episodes, routerPath }: EpisodeListProps) {
  if (!episodes) {
    return <h2>There is no episodes</h2>
  }
  return (
    <VStack spacing={4} m='0'>
      <Card width='full'>
        <CardBody>
          <Heading size='md'>Episodes: {episodes?.length}</Heading>
        </CardBody>
      </Card>
      <Card width='full'>
        <CardBody>
          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>Title</Th>
                  <Th>Date</Th>
                  <Th>Duration</Th>
                </Tr>
              </Thead>
              <Tbody>
                {episodes?.map((episode) => (
                  <Tr key={episode.id}>
                    <Td color='blue.400'>
                      <Link href={`${routerPath}/episode/${episode.id}`}>{episode.title}</Link>
                    </Td>
                    <Td>{episode.date}</Td>
                    <Td>{episode.duration}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </VStack>
  )
}

export default EpisodeList
