import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GameList } from "../components/GameList";
import Pagination from "../components/Pagination";
import { perPage } from "../config";
import { QUERY_ALL_GAMES } from "../utils/queries";

export function Homepage() {
  let { page } = useParams();

  const { loading, data } = useQuery(QUERY_ALL_GAMES, {
    variables: { page: parseInt(page) || 1, perPage: perPage },
  });
  const games = data?.games || [];
  if (page === undefined) {
    page = 1;
  } else {
    page = parseInt(page);
  }
  return loading ? (
    <div>Loading...</div>
  ) : (
    <main style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
      <Pagination page={page} count={games.count} />
      <GameList games={games.games} title="Here is the latest games" />
      <Pagination page={page} count={games.count} />
    </main>
  );
}
