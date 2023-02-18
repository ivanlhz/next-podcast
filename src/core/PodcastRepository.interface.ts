import { EpisodeEntity } from './EpisodeEntity'
import { PodcastEntity } from './PodcastEntity'

export interface PodcastRepository {
  getPodcastList(): Promise<PodcastEntity[]>
  getPodcastDetailsById(id: string): Promise<PodcastEntity>
  getEpisodesByPodcastId(id: string): Promise<EpisodeEntity[]>
}
