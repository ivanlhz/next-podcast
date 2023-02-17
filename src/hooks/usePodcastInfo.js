import { useEffect, useState } from "react";

export const usePodcastInfo = ({
  id,
  service,
  adapter,
}) => {
  const [state, setState] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const response = await service.getPodcast(id);
      const podcast = response.results[0];
      const episodes = response.results
        .slice(1)
        .map((episode) => adapter.formatPodcastEpisode(episode));

      setState({
        podcast,
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
