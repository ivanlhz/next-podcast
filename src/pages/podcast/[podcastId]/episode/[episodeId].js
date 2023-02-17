import { useRouter } from "next/router";
import {
    ContainerStyled,
    PodcastAuthorStyled,
    SideBarStyled,
    PodcastDescriptionStyled,
    PodcastImageStyled,
    PodcastTitleStyled,
    AudioPlayerStyled,
    EpisodeDetailsTitleStyled,
    EpisodeDetailsDescriptionStyled,
    MainSectionStyled
  } from "@/components/styled";
  import { usePodcastInfo } from "@/hooks/usePodcastInfo";
  import { ItunesAppleApiAdapter } from "@/adapters/itunesAppleApiAdapter";
import { ItunesAppleApiService } from "@/services/itunesAppleApiService";

export default function Episode() {
  const router = useRouter();
  const podcastId = router.query.podcastId;
  const episodeId = router.query.episodeId;
  const { podcast, episodes } = usePodcastInfo({
    id: podcastId,
    service: ItunesAppleApiService,
    adapter: ItunesAppleApiAdapter,
  });

  const episode = episodes?.length ? episodes.find(p => p.id === parseInt(episodeId)) : null

  if (router.isFallback || !podcast) {
    return <div>Loading...</div>;
  }

    return(
        <ContainerStyled>
        <SideBarStyled>
          <PodcastImageStyled
            src={podcast.imageURL}
            alt={podcast.title}
          />
          <PodcastTitleStyled>{podcast.title}</PodcastTitleStyled>
          <PodcastAuthorStyled>{podcast.artist}</PodcastAuthorStyled>
          <PodcastDescriptionStyled>
            {podcast.description}
          </PodcastDescriptionStyled>
        </SideBarStyled>
      <MainSectionStyled>
      { episodes.length ? (<>
        <EpisodeDetailsTitleStyled>{episode.title}</EpisodeDetailsTitleStyled>
        <EpisodeDetailsDescriptionStyled
          className="prose"
          dangerouslySetInnerHTML={{ __html: episode.description }}
        />
        <AudioPlayerStyled src={episode.episodeURL} controls /></>) : null}
      </MainSectionStyled>
    </ContainerStyled>
    )
}