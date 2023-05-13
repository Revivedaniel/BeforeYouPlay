import { useQuery, QueryResult } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import FourOhFour from "../404";
import SearchCard from "../partials/SearchCard";
import css from "./ScrollLoadGames.module.css";

interface ScrollLoadGamesProps {
  query: any;
  variables?: any;
}

export default function ScrollLoadGames(props: ScrollLoadGamesProps): JSX.Element {
  const pages = useRef<number>(1);
  const { loading, data, error, fetchMore }: QueryResult = useQuery(
    props.query,
    {
      variables: { ...props.variables, page: pages.current },
    }
  );
  const [games, setGames] = useState<any[]>([]);
  const [fetchingMore, setFetchingMore] = useState<boolean>(false);
  const [endOfResults, setEndOfResults] = useState<boolean>(false);

  const observer = useRef<IntersectionObserver>();
  const lastGameRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (data && data[Object.keys(data)[0]] && games.length === 0) {
      setGames(data[Object.keys(data)[0]].games);
    }

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !endOfResults && !fetchingMore) {
        setFetchingMore(true);
        fetchMore({
          variables: { ...props.variables, page: pages.current + 1 },
        }).then((res) => {
          setFetchingMore(false);
          if (res.data[Object.keys(res.data)[0]].games.length === 0) {
            setEndOfResults(true);
          } else {
            setGames([...games, ...res.data[Object.keys(res.data)[0]].games]);
          }

          pages.current += 1;
        });
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
  }, [lastGameRef, games, fetchMore, pages, data, endOfResults, fetchingMore, props.variables, props.query]);

  if (error) {
    return <FourOhFour />;
  }

  return loading && games.length === 0 ? (
      <SearchCard loading={true} />
  ) : (
    <div className={css.container}>
      {games
        ? games.map((game: any, i: number, arr: any[]) => {
            if (i === games.length - 1) {
              return (
                <div key={i} ref={lastGameRef}>
                  <SearchCard game={game} />
                </div>
              );
            } else {
              return <SearchCard game={game} key={i} />;
            }
          })
        : null}
    </div>
  );
}
