import { useEffect, useState } from "react";

export const usePodcastList = ({
  service,
  adapter,
}) => {
  const [podcasts, setPodcasts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await service.getPodcastList();
      setPodcasts(
        response.feed.entry.map((podcast) =>
        adapter.formatPodcastListPodcast(podcast)
        )
      );
    };
    fetchData();
  }, [service, adapter]);

  return { podcasts };
};
