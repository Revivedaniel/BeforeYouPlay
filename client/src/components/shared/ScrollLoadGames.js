import { useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import FourOhFour from "../404";
import SearchCard from "../partials/SearchCard";

export default function ScrollLoadGames(props) {
  const pages = useRef(1);
  const { loading, data, error, fetchMore } = useQuery(props.query, {
    variables: { ...props.variables, page: pages.current },
  });
  const [games, setGames] = useState([]);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [endOfResults, setEndOfResults] = useState(false);

  const observer = useRef();
  const lastGameRef = useRef(null);

  useEffect(() => {
    if (data && data[Object.keys(data)[0]] && games.length === 0) {
      setGames(data[Object.keys(data)[0]].games);
    }

    const handleObserver = (entries) => {
      if (entries[0].isIntersecting && !endOfResults && !fetchingMore) {
        setFetchingMore(true);
        fetchMore({
          variables: { ...props.variables, page: pages.current + 1 },
        }).then((res) => {
          setFetchingMore(false);
          if (res.data[Object.keys(data)[0]].games.length === 0) {
            setEndOfResults(true);
          } else {
            setGames([...games, ...res.data[Object.keys(data)[0]].games]);
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

  return loading ? (
    <div style={{ paddingTop: "160px" }}>
      <h2>Loading Search Results...</h2>
    </div>
  ) : (
    <div>
      {games
        ? games.map((game, i, arr) => {
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
