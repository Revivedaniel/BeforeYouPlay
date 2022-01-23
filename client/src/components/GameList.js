import styled from "styled-components";
import { Link } from "react-router-dom";

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  flex-direction: column;
  align-content: center;
`;

const GameImage = styled.img`
  height: 52.125vh;
  width: 18.0825vw;
  padding: 1.31vw;
`;

const GameInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 36.89vw;
  padding-right: 1.31vw;
  > * {
    margin-bottom: 20px;
  }
  p {
    font-size: 25px;
    word-break: break-word;
    display: flex;
    justify-content: center;
    background-color: white;
    width: 100%;
    height: 8.6vh;
    align-items: center;
  }
  div {
    width: 100%;
    height: 21.2vh;
    background-color: white;
  }
  div p {
    font-size: 20px;
  }
`;

const linkStyle = {
  display: "flex",
  width: "55vw",
  textDecoration: "none",
  backgroundColor: "lightgrey",
  margin: "2% 0px",
  height: "52.4vh",
};

export function GameList({ games, title, page }) {
  if (!games.length) {
    return <h3>No Games Found</h3>;
  }

  return (
    <ListContainer>
      {games.map((game, i) => {
        let genres = JSON.parse(game.genres);
        if (genres.length < 3) {
          switch (genres.length) {
            case 1:
              genres = [...genres, " ", " "];
              break;
            case 2:
              genres = [...genres, " "];
              break;

            default:
              genres = [" ", " ", " "];
              break;
          }
          console.log(genres);
        }
        return (
          <Link key={i} to={`/games/${game.slug}`} style={linkStyle}>
            <GameImage
              src={`https://images.igdb.com/igdb/image/upload/t_1080p/${game.cover_id}.jpg`}
              alt={`${game.title} cover art`}
            />
            <GameInfo>
              <p style={{ marginTop: "20px" }}>{game.title}</p>
              <p>{game.release_year}</p>
              <div>
                {genres.map((genre, i) => {
                  if (i < 3) {
                    return <p key={i}>{genre}</p>;
                  }
                  return ""
                })}
              </div>
            </GameInfo>
          </Link>
        );
      })}
    </ListContainer>
  );
}
