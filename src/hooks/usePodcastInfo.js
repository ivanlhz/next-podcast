import { useEffect, useState } from "react";

export const usePodcastInfo = ({ id, service, adapter }) => {
  const [state, setState] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const response = await Promise.all([
        service.getPodcastDetailsById(id),
        service.getEpisodesByPodcastId(id),
      ]);
      const podcast = { ...response[0] };
      const episodes = response[1].results
        .slice(1)
        .map((episode) => adapter.formatPodcastEpisode(episode));
      setState({
        podcast: adapter.formatPodcastListPodcast(podcast),
        episodes,
      });
    };
    if (id) {
      getData();
    }
  }, [id, service, adapter]);

  return {
    ...state,
  };
};
