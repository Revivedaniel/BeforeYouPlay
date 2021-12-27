import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GameList } from "../components/GameList";

import { QUERY_SEARCH_GAME } from "../utils/queries";

export function Searchpage() {
  const { search } = useParams();
  const { loading, data } = useQuery(QUERY_SEARCH_GAME, {
    variables: { search: search },
  });
  const games = data?.searchGame || [];
  console.log(games[0])

  return (
    <main>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <GameList games={games} title="Here  are the search results" />
      )}
    </main>
  );
}
