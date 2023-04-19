import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import css from "./[title].module.css";
import { QUERY_SEARCH_GAME } from "../../utils/queries";
import SearchCard from "../../components/partials/SearchCard";
import FourOhFour from "../../components/404";
import { useState, useRef, useEffect } from "react";
import { Game } from "@/components/Gamepage/Game.model";

interface QueryData {
  searchGame: {
    games: Game[];
  };
}

export default function Searchpage() {
  const router = useRouter();
  const { title } = router.query as { title: string };
  const [pages, setPages] = useState<number>(1);
  const { loading, data, error, fetchMore } = useQuery<QueryData>(QUERY_SEARCH_GAME, {
    variables: { search: title, page: pages },
  });
  const [games, setGames] = useState<Game[]>([]);
  const [fetchingMore, setFetchingMore] = useState<boolean>(false);
  const [endOfResults, setEndOfResults] = useState<boolean>(false);

  const observer = useRef<IntersectionObserver>();
  const lastGameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data && data.searchGame) {
      setGames(data.searchGame.games);
    }

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !endOfResults && !fetchingMore) {
        setFetchingMore(true);
        fetchMore({
          variables: { search: title, page: pages + 1 },
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
  }, [lastGameRef, games, fetchMore, pages, title, data, endOfResults, fetchingMore]);

  if (error) {
    return <FourOhFour />;
  }

  return loading ? (
    <div className={css.div} style={{ paddingTop: "160px" }}>
      <h2>Loading Search Results...</h2>
    </div>
  ) : (
    <div className={css.div}>
      <div className={css.innerContainer}>
      {games
        ? games?.map((game, i) => {
            if (i === games.length - 1) {
              return (
                <div key={i} ref={lastGameRef}>
                  <SearchCard game={game} setGames={setGames} />
                </div>
              );
            } else {
              return <SearchCard game={game} key={i} setGames={setGames} />;
            }
          })
        : null}
      {games?.length === 0 ? <h2>No results found for {title}</h2> : null}
      </div>
    </div>
  );
}

