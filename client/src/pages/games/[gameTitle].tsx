import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import css from "./Gamepage.module.css";
import GameImage from "../../components/Gamepage/GameImage";
import Video from "../../components/Gamepage/Video";
import InfoTabs from "../../components/Gamepage/InfoTabs";
import { QUERY_SINGLE_GAME } from "../../utils/queries";
import FourOhFour from "@/components/404";
import { Game } from "@/components/Gamepage/Game.model";

interface VideoData {
  videoUrl: string;
  // Add any other properties here
}

interface QueryData {
  game: Game;
  video: VideoData;
  errors?: string
}

export default function Gamepage() {
  const router = useRouter();
  const { gameTitle } = router.query as { gameTitle: string };
  const [game, setGame] = useState<Game | null>(null);
  const [video, setVideo] = useState<string | null>(null);
  const [loadingStatement, setLoadingStatement] = useState<string>("Loading...");
  const { loading, data, error } = useQuery<QueryData>(QUERY_SINGLE_GAME, {
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
    // <div className={css.div} style={{backgroundImage: `url(https://vgiapitest.blob.core.windows.net/game-images/${game.imageName}.webp)`}}>
    <div className={css.div}>
      <GameImage game={game} />
      <div className={css.mainContent}>
        <h1>{game.title}</h1>
        {video && <Video video={video} />}
        <InfoTabs game={game} />
      </div>
    </div>
  );
}
