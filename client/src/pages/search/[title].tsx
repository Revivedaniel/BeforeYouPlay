import { NextRouter, useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import css from "./[title].module.css";
import { QUERY_SEARCH_GAME } from "../../utils/queries";
import SearchCard, { GameTitle } from "../../components/partials/SearchCard";
import FourOhFour from "../../components/404";
import { useState, useRef, useEffect } from "react";
import Head from "next/head";

interface QueryData {
  searchGame: {
    games: GameTitle[];
  };
}

export default function Searchpage() {
  const router: NextRouter = useRouter();
  const { title } = router.query as { title: string };
  const [pages, setPages] = useState<number>(1);
  const { loading, data, error, fetchMore, refetch } = useQuery<QueryData>(
    QUERY_SEARCH_GAME,
    {
      variables: { search: title, page: pages },
    }
  );
  const [games, setGames] = useState<GameTitle[]>([]);
  const [fetchingMore, setFetchingMore] = useState<boolean>(false);
  const [refetching, setRefetching] = useState<boolean>(false);
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
    // Cleanup the event listener on component unmount
    return () => {
    };
  }, [
    lastGameRef,
  games,
  fetchMore,
  pages,
  data,
  endOfResults,
  fetchingMore,
  router,
  ]);

  useEffect(() => {
    if (title && !refetching && !loading) {
      setPages(1);
      setGames([]);
      setEndOfResults(false);
      setRefetching(true);
      refetch({ search: title, page: 1 }).then(() => {
        setRefetching(false);
      });
    }
  }, [title]);

  if (error) {
    return <FourOhFour />;
  }

  return loading || refetching ? (
    <>
      <Head>
        <title>Search Games | Before You Play</title>
        <meta name="robots" content="noindex, follow" />
        <meta name="description" content="Find your next favorite game on Before You Play by searching our extensive library of video game reviews, ratings, and details. Discover, compare, and play!" />
        <meta property="og:title" content="Search Games | Before You Play" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://www.beforeyouplay.info/search/${title}`} />
        <meta property="og:image" content={`https://vgiapitest.blob.core.windows.net/game-images/logo1.webp`} />
        <meta property="og:description" content={`Search results for ${title} on BeforeYouPlay.info`} />
      </Head>
      <div className={css.div} style={{ paddingTop: "160px" }}>
        <h2>Loading Search Results...</h2>
      </div>
    </>
  ) : (
    <>
      <Head>
        <title>Search Games | Before You Play</title>
        <meta name="robots" content="noindex, follow" />
        <meta name="description" content="Find your next favorite game on Before You Play by searching our extensive library of video game reviews, ratings, and details. Discover, compare, and play!" />
      </Head>
      <div className={css.div}>
        <div className={css.innerContainer}>
          {games && !refetching
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
    </>
  );
}
