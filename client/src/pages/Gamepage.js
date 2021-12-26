import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

//import the query here
import { QUERY_SINGLE_GAME } from "../utils/queries";

export function Gamepage() {
  const { slug } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_GAME, {
    variables: { slug: slug },
  });

  const game = data?.game || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <h1>This is the Gamepage</h1>
      <div>
        <img
          src={`https://images.igdb.com/igdb/image/upload/t_1080p/${game.cover_id}.jpg`}
          alt={"Video game cover art"}
        />
        <div>
          <div>
            <span>{game.title}</span>
            <span>{game.release_year}</span>
          </div>
          <div>
            <span>Playtime</span>
            <span>{JSON.parse(game.genres).map((genre, i) => {
              return (
                <p key={i}>{genre}</p>
              )
            })}</span>
            <span>{game.age_rating}</span>
          </div>
          <div>average user rating</div>
        </div>
      </div>
      <div>{game.summary}</div>
    </>
  );
}
