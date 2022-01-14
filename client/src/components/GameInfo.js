import styled from "styled-components";

const GameInfoContainer = styled.div`
  width: 1163px;
  height: 774px;
  background-color: #7c9f7c;
`;

const UpperInfo = styled.div`
  display: flex;
  flex-direction: row;
`;

const GameCover = styled.img`
  width: 405px;
  height: 543px;
`;

const GameData = styled.div`
  width: 740px;
  height: 543px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: red;
  margin-left: 2%;
`;

const Heading = styled.div`
  display: flex;
  background-color: rgba(204, 198, 198, 1);
`;

const Title = styled.div`
  width: 525px;
  height: 97px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 58px;
  line-height: 68px;
  display: flex;
  align-items: center;
  text-align: center;
`;

const Year = styled.div`
  width: 215px;
  height: 97px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 58px;
  line-height: 68px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

const PlayTime = styled.div`
  width: 333px;
  height: 232px;
  background-color: rgba(204, 198, 198, 1);
`;

const Genres = styled.div`
  width: 199px;
  height: 232px;
  background-color: rgba(204, 198, 198, 1);
`;

const AgeRating = styled.img`
  width: 167px;
  height: 230px;
`;

const InfoBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const AverageUserRating = styled.div`
  width: 740px;
  height: 180px;
  background-color: rgba(204, 198, 198, 1);
`;

const Summary = styled.div`
  width: 1169px;
  height: 204px;
`;

export function GameInfo({ game }) {
  let titleSize;

  if (game.title.length > 38) {
    titleSize = {
      fontSize: "30px",
    };
  }

  // if

  return (
    <GameInfoContainer id="GameInfoContainer">
      <UpperInfo>
        <GameCover
          src={`https://images.igdb.com/igdb/image/upload/t_1080p/${game.cover_id}.jpg`}
          alt={`${game.title} cover art`}
        />
        <GameData>
          <Heading>
            <Title style={titleSize}>{game.title}</Title>
            <Year>{game.release_year}</Year>
          </Heading>
          <InfoBody>
            <PlayTime>Playtime</PlayTime>
            <Genres>
              {JSON.parse(game.genres).map((genre, i) => {
                return <p key={i}>{genre}</p>;
              })}
            </Genres>
            <AgeRating src={`/images/${game.age_rating}.svg`} />
          </InfoBody>
          <AverageUserRating>average user rating</AverageUserRating>
        </GameData>
      </UpperInfo>
      <Summary>{game.summary}</Summary>
    </GameInfoContainer>
  );
}
