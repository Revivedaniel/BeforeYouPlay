import styled from "styled-components";
import gameRating from "../utils/gameRating";
import PlayTime from "./PlayTime";

const GameInfoContainer = styled.div`
  width: 70%;
  height: auto;
`;

const UpperInfo = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 1%;
`;

const GameCover = styled.img`
  width: 291.6px;
  height: 390.96px;
`;

const GameData = styled.div`
  width: 77%;
  height: 390.96px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 2%;
`;

const Heading = styled.div``;

const Title = styled.div`
  width: auto;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 50px;
  line-height: 68px;
  display: flex;
  align-items: center;
  text-align: center;
`;

const Year = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  padding: 0 13px 0 0;
`;

const Genres = styled.div`
  display: flex;
  margin: 0.5%;
  p {
    font-size: 19px;
    margin-right: 1%;
    padding: 0.3%;
    text-align: center;
  }
`;

const AgeRating = styled.img`
  width: 167px;
  height: 230px;
  margin-left: 4%;
`;

const InfoBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
`;

const AverageUserRating = styled.span`
  display: flex;
  height: inherit;
  align-items: center;
  span {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 52px;
    line-height: 61px;
    display: flex;
    align-items: center;
    text-align: center;
  }
  span[name="average-user-rating"] {
    width: 489px;
    height: 119px;
  }
`;

const Summary = styled.div`
  width: 100%;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 23px;
  line-height: 27px;
  display: flex;
  align-items: flex-start;
  max-height: 200px;
  overflow: hidden;
`;

export function GameInfo({ game }) {
  let titleSize;

  if (game.title.length > 26) {
    titleSize = {
      fontSize: "30px",
    };
  }

  // if

  return (
    <GameInfoContainer id="GameInfoContainer">
      <Heading>
        <Title>{game.title}</Title>
        <div>
          <Year>{game.release_year}</Year>
          <Year>{gameRating(game.age_rating)}</Year>
        </div>
      </Heading>
      <UpperInfo>
        <div>
          <GameCover
            src={`https://images.igdb.com/igdb/image/upload/t_1080p/${game.cover_id}.jpg`}
            alt={`${game.title} cover art`}
          />
        </div>
        <GameData>
          <InfoBody>
            <PlayTime />
            <AgeRating src={`/images/${game.age_rating}.svg`} />
          </InfoBody>
          <AverageUserRating>
            <span name="average-user-rating">Average User Rating</span>
            <span>9/10</span>
          </AverageUserRating>
        </GameData>
      </UpperInfo>
      <Genres>
        {JSON.parse(game.genres).map((genre, i) => {
          return <p key={i}>{genre}</p>;
        })}
      </Genres>
      <Summary>{game.summary}</Summary>
    </GameInfoContainer>
  );
}
