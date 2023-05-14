import css from "./Gamepage.module.css";
import GameImage from "../../components/Gamepage/GameImage";
import Video from "../../components/Gamepage/Video";
import InfoTabs from "../../components/Gamepage/InfoTabs";
import { QUERY_SINGLE_GAME } from "../../utils/queries";
import { Game } from "@/components/Gamepage/Game.model";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import FourOhFour from "@/components/404";


interface VideoData {
  videoUrl: string;
}

interface QueryData {
  game: Game;
  video: VideoData;
  errors?: string
}

interface GamePageProps {
  game: Game;
  video: VideoData;
}

export default function Gamepage(props: GamePageProps): JSX.Element {
  const router = useRouter();
  const { gameTitle } = router.query as { gameTitle: string };
  const [game, setGame] = useState<Game | null>(null);
  const [video, setVideo] = useState<string | null>(null);
  const [loadingStatement, setLoadingStatement] = useState<string>("Loading...");
  const { loading, error } = useQuery<QueryData>(QUERY_SINGLE_GAME, {
    variables: { title: gameTitle },
    onCompleted: (data) => {
      if (data?.errors) {
      } else {
        setGame(data.game);
        setVideo(data.video.videoUrl);
      }
    },
  });

  

  if (error) {
    return <FourOhFour />;
  } else if (loading || game === null) {
    const timeout = setTimeout(() => {
      setLoadingStatement("Generating Game...");
    }, 5000);
    return (
      <div className={css.div}>
      <GameImage />
      <div className={css.mainContent}>
        <h1>{loadingStatement}</h1>
        <InfoTabs />
      </div>
    </div>
    );
  }

  return (
    <>
    <Head>
      <title>{game.title} - Review, Platforms, and Details | Before You Play.</title>
      <meta name="description" content={`Learn everything about ${game.title}, including its storyline, gameplay, and reviews. Make an informed decision before you play, only at Before You Play.`} />
      <meta name="keywords" content={`${game.title}, video games, game reviews, game ratings, game recommendations, Before You Play`} />
      <meta property="og:title" content={`${game.title} - Review, Platforms, and Details | Before You Play.`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://www.beforeyouplay.info/games/${game.title}`} />
      <meta property="og:image" content={`https://vgiapitest.blob.core.windows.net/game-images/${game.imageName}.webp`} />
      <meta property="og:description" content={`Learn everything about ${game.title}, including its storyline, gameplay, and reviews. Make an informed decision before you play, only at Before You Play.`} />
    </Head>
    <div className={css.div}>
      <GameImage game={game} />
      <div className={css.mainContent}>
        <h1>{game.title}</h1>
        {video && <Video video={video} />}
        <InfoTabs game={game} />
      </div>
    </div>
    </>
  );
}