import styled from "styled-components";

export const ContainerStyled = styled.div `
  display: flex;
  flex-wrap: wrap;
`;

export const PodcastCardStyled = styled.div `
  width: 200px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #CCC;
  border-radius:5px;
  cursor: pointer;
`;

export const SideBarStyled = styled.div `
  width: 200px;
  padding: 10px;
`;

export const PodcastImageStyled = styled.img `
  width: 100%;
  border-radius: 5px;
`;

export const PodcastTitleStyled = styled.h2 `
  margin-top: 10px;
`;

export const PodcastAuthorStyled = styled.p `
  font-size: 14px;
  font-weight: bold;
`;

export const PodcastDescriptionStyled = styled.p `
  margin-top: 20px;
`;

export const EpisodesListStyled = styled.ul `
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const EpisodeItemStyled = styled.li `
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
`;