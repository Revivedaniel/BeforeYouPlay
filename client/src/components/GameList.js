import styled from "styled-components";
import { Link } from 'react-router-dom';

const GameImage = styled.img`
  max-height: 150px;
  width: 108px;
`;

export function GameList({ games, title }) {
  if (!games.length) {
    return <h3>No Games Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {games.map((game) => {
        return (
          <Link key={game._id} to={`/games/${game.slug}`}>
            <GameImage
              src={`https://images.igdb.com/igdb/image/upload/t_1080p/${game.cover_id}.jpg`}
              alt={`${game.title} cover art`}
            />
            <div>
              <p>{game.title}</p>
              <p>{game.release_year}</p>
              <div>
                {JSON.parse(game.genres).map((genre, i) => {
                  return <p key={i}>{genre}</p>;
                })}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
