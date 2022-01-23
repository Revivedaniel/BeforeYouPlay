import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GameList } from "../components/GameList";
import Pagination from "../components/Pagination";
import { perPage } from "../config";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import { QUERY_SEARCH_GAME } from "../utils/queries";

const SearchPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    font-size: 2rem;
    margin-top: 2rem;
  }
`;

export function Searchpage() {
  // Get the pathname from router
  const location = useLocation();
  console.log(location);
  // Get search and page from the pathname
  let { search, page } = useParams();
  if (page === undefined) {
    page = 1;
  } else {
    page = parseInt(page);
  }
  const { loading, data } = useQuery(QUERY_SEARCH_GAME, {
    variables: { search: search, page: page },
  });
  const { games, count } = data?.searchGame || [];

  return loading ? (
    <div>Loading...</div>
  ) : (
    <SearchPage >
      <h2>Search Results for {search}</h2>
      <Pagination page={page} count={count} route={`/search/${search}`} />
      <GameList games={games} title="Here  are the search results" />
      <Pagination page={page} count={count} route={`/search/${search}`} />
    </SearchPage>
  );
}
