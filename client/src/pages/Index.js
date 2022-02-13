import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { perPage } from "../config";
import { QUERY_ALL_GAMES } from "../utils/queries";
import Homepage from "./Homepage";

export default function Index() {
  let { page } = useParams();

  const { loading, data } = useQuery(QUERY_ALL_GAMES, {
    variables: { page: parseInt(page) || 1, perPage: perPage },
  });
  const games = data?.games.games || [];
  if (page === undefined) {
    page = 1;
  } else {
    page = parseInt(page);
  }
  return loading ? (
    <div>Loading...</div>
  ) : (
    <Homepage games={games}/>
  )
}