import { useRouter } from "next/router";
import {
  PodcastAuthorStyled,
  SideBarStyled,
  PodcastDescriptionStyled,
  PodcastImageStyled,
  PodcastTitleStyled,
  EpisodesListStyled,
  EpisodeItemStyled,
  EpisodeDurationStyled,
  EpisodeTitleStyled,
  EpisodeDateStyled,
} from "@/components/styled";
import { usePodcastInfo } from "@/hooks/usePodcastInfo";

import { ItunesAppleApiAdapter } from "@/adapters/itunesAppleApiAdapter";
import { ItunesAppleApiService } from "@/services/itunesAppleApiService";

export default function Podcast() {
  const router = useRouter();
  const id = router.query.id;
  const { podcast, episodes } = usePodcastInfo({
    id,
    service: ItunesAppleApiService,
    adapter: ItunesAppleApiAdapter,
  });

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    podcast && (
      <div>
        <SideBarStyled>
          <PodcastImageStyled
            src={podcast.artworkUrl600}
            alt={podcast.collectionName}
          />
          <PodcastTitleStyled>{podcast.collectionName}</PodcastTitleStyled>
          <PodcastAuthorStyled>{podcast.artistName}</PodcastAuthorStyled>
          <PodcastDescriptionStyled>
            {podcast.collectionName}
          </PodcastDescriptionStyled>
        </SideBarStyled>
        <div>
          <h3>{episodes.length} Episodes</h3>
          <EpisodesListStyled>
            {episodes.map((episode) => (
              <EpisodeItemStyled key={episode.id}>
                <EpisodeTitleStyled>{episode.title}</EpisodeTitleStyled>
                <EpisodeDateStyled>{episode.date}</EpisodeDateStyled>
                <EpisodeDurationStyled>
                  {episode.duration}
                </EpisodeDurationStyled>
              </EpisodeItemStyled>
            ))}
          </EpisodesListStyled>
        </div>
      </div>
    )
  );
}
