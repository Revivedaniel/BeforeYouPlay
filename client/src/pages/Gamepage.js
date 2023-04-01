import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import GamepageHero from "../components/Gamepage/GamepageHero";
//import the query here
import { QUERY_SINGLE_GAME } from "../utils/queries";
import { useState } from "react";
import FourOhFour from "../components/404";
import { Box, CircularProgress } from "@mui/material";
import css from "./Gamepage.module.css";
import GameImage from "../components/Gamepage/GameImage";
import Video from "../components/Gamepage/Video";
import InfoTabs from "../components/Gamepage/InfoTabs";

export default function Gamepage() {
  const { gameTitle } = useParams();
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
        <GamepageHero />
        <div className="page-single movie-single movie_single">
          <div className="container">
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  zIndex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h2 style={{ color: "var(--primary-font-color)" }}>
                  Congratulations! You found a new game!
                </h2>
                <h2 style={{ color: "var(--primary-font-color)" }}>
                  The data for {gameTitle} is being generated. Please wait...
                </h2>
                <CircularProgress />
              </div>
            </Box>
            <div style={{ height: "800px" }} />
          </div>
        </div>
        <p>Loading...</p>
      </>
    );
  } else if (game === null) {
    return <FourOhFour />;
  }

  return (
    <div className={css.div}>
      <GameImage game={game} />
      <h1>{game.title}</h1>
      {video && (
        <Video video={video} />
      )}
      <InfoTabs game={game} />
    </div>
  );
}
