import { useQuery } from "@apollo/client";
import { GameList } from "../components/GameList";
import { QUERY_ALL_GAMES } from "../utils/queries";

export function Homepage() {
  const { loading, data } = useQuery(QUERY_ALL_GAMES);
  const games = data?.games || [];

  return (
    <main>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <GameList games={games} title="Here is the latest games" />
      )}
    </main>
  );
}
