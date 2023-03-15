import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import css from "./Searchpage.module.css";
import { QUERY_SEARCH_GAME } from "../utils/queries";
import SearchCard from "../components/partials/SearchCard";
import FourOhFour from "../components/404.js";
import { useState, useRef, useEffect } from "react";
import { Button } from "@mui/material";

export function Searchpage({ gameTitle, setGameTitle, setGameImage }) {
  // Get search and page from the pathname
  let { search } = useParams();
  const [pages, setPages] = useState(1);
  const { loading, data, error, fetchMore } = useQuery(QUERY_SEARCH_GAME, {
    variables: { search: search, page: pages },
  });
  // const { games, count } = data?.searchGame || { games: [], count: 1 };
  const [games, setGames] = useState([]);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [endOfResults, setEndOfResults] = useState(false);

  const observer = useRef();
  const lastGameRef = useRef(null);

  useEffect(() => {
    if (data && data.searchGame) {
      setGames(data.searchGame.games);
    }

    const handleObserver = (entries) => {
      if (entries[0].isIntersecting && !endOfResults && !fetchingMore) {
        setFetchingMore(true);
        fetchMore({
          variables: { search: search, page: pages + 1 },
        }).then((res) => {
          setFetchingMore(false);
          if (res.data.searchGame.games.length === 0) setEndOfResults(true);
        });
        setPages((prevPages) => prevPages + 1);
      }
    };

    observer.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    });
    if (lastGameRef.current) {
      observer.current.observe(lastGameRef.current);
    }
  }, [lastGameRef, games, fetchMore, pages, search, data, endOfResults, fetchingMore]);

  if (error) {
    return <FourOhFour />;
  }

  return loading ? (
    <div className={css.div} style={{ paddingTop: "160px" }}>
      <h2>Loading Search Results...</h2>
    </div>
  ) : (
    <div className={css.div}>
      {games
        ? games?.map((game, i) => {
            if (i === games.length - 1) {
              return (
                <div key={i} ref={lastGameRef}>
                  <SearchCard
                    game={game}
                    setGameTitle={setGameTitle}
                    setGameImage={setGameImage}
                  />
                </div>
              );
            } else {
              return (
                <SearchCard
                  game={game}
                  setGameTitle={setGameTitle}
                  setGameImage={setGameImage}
                  key={i}
                />
              );
            }
          })
        : null}
      {games?.length === 0 ? <h2>No results found for {search}</h2> : null}
    </div>
  );
}
