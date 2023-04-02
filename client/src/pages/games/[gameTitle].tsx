import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
//import the query here
import { QUERY_SINGLE_GAME } from "../../utils/queries";
import { useState } from "react";
import FourOhFour from "../../components/404";
import { Box, CircularProgress } from "@mui/material";
import css from "./Gamepage.module.css";
import GameImage from "../../components/Gamepage/GameImage";
import Video from "../../components/Gamepage/Video";
import InfoTabs from "../../components/Gamepage/InfoTabs";

export default function Gamepage() {
    const router = useRouter();
  const { gameTitle } = router.query;
  const [game, setGame] = useState(null);
  const [video, setVideo] = useState(null);
  const { loading, data } = useQuery(QUERY_SINGLE_GAME, {
    variables: { title: gameTitle },
    onCompleted: (data) => {
      setGame(data.game);
      setVideo(data.video.videoUrl);
    },
  });
  console.log(data);
  // const game = data?.game;

  if (loading) {
    return (
      <>
        <p>Loading...</p>
        <CircularProgress />
      </>
    );
  } else if (game === null) {
    return <FourOhFour />;
  }

  return (
    <div className={css.div}>
      <GameImage game={game} />
      <h1>{game.title}</h1>
      {video && <Video video={video} />}
      <InfoTabs game={game} />
    </div>
  );
}
