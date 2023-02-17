import axios from "axios";
const baseURL = "https://cors-anywhere.herokuapp.com/";

export const ItunesAppleApiService = {
  getPodcastList: async () => {
    const response = await axios.get(
      "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
    );
    return response.data;
  },

  getPodcastDetailsById: async (id) => {
    const response = await ItunesAppleApiService.getPodcastList()
    return response.feed.entry.find(p => p.id.attributes["im:id"] === id);
  },

  getEpisodesByPodcastId: async (id) => {
    const response = await axios.get(
      baseURL +
        `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode`
    );
    return response.data;
  },
};
