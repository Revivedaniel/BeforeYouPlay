import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import GamepageGameCard from "../components/Gamepage/GamepageGameCard";
import GamepageHero from "../components/Gamepage/GamepageHero";
import Gamepageoverview from "../components/Gamepage/GamepageOverview";
import GamepageRating from "../components/Gamepage/GamepageRating";
import GamepageReviews from "../components/Gamepage/GamepageReviews";
import GamepageShareButtons from "../components/Gamepage/GamepageShareButtons";
//import the query here
import { QUERY_SINGLE_GAME } from "../utils/queries";
import { useState } from "react";
import FourOhFour from "../components/404";
import GamepageGameTeam from "../components/Gamepage/GamepageGameTeam";
import RelatedGames from "../components/Gamepage/RelatedGames";
import auth from "../utils/auth";
import RateData from "../components/Gamepage/RateData";
import { Box, CircularProgress } from "@mui/material";

export default function Gamepage({ setLogin, gameTitle, gameImage }) {
  const [customDataPoints, setCustomDataPoints] = useState(null);
  const { slug } = useParams();
  const [overview, setOverview] = useState(true);
  const [reviews, setReviews] = useState(false);
  const [gameTeam, setGameTeam] = useState(false);
  const [relatedGames, setRelatedGames] = useState(false);
  const [rateData, setRateData] = useState(null);
  const { loading, data } = useQuery(QUERY_SINGLE_GAME, {
    variables: { slug: slug, title: gameTitle, gameImage: gameImage },
    onCompleted: (data) => {
      setCustomDataPoints(JSON.parse(data.game.custom_datapoints));
    },
  });

  const game = data?.game;

  if (loading) {
    return (
      <>
        <GamepageHero />
        <div className="page-single movie-single movie_single">
          <div className="container">
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <div style={{zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center"}}>
                <h2 style={{color: "var(--primary-font-color)"}}>Congratulations! You found a new game!</h2>
                <h2 style={{color: "var(--primary-font-color)"}}>The data for {gameTitle} is being generated. Please wait...</h2>
                <CircularProgress />
              </div>
            </Box>
            <div style={{ height: "800px" }} />
          </div>
        </div>
      </>
    );
  } else if (game === null) {
    return <FourOhFour />;
  }

  const handleGameTeam = (e) => {
    e.preventDefault();
    setGameTeam(true);
    setReviews(false);
    setOverview(false);
    setRelatedGames(false);
  };
  const handleReviews = (e) => {
    e.preventDefault();
    setReviews(true);
    setGameTeam(false);
    setOverview(false);
    setRelatedGames(false);
  };
  const handleOverview = (e) => {
    e.preventDefault();
    setOverview(true);
    setReviews(false);
    setGameTeam(false);
    setRelatedGames(false);
  };
  const handleRelatedGames = (e) => {
    e.preventDefault();
    setOverview(false);
    setReviews(false);
    setGameTeam(false);
    setRelatedGames(true);
  };

  const handleNeedsEditing = (e) => {
    e.preventDefault();
    setRateData(true);
  }

  return (
    <>
    {rateData ? <RateData setRateData={setRateData} gameSlug={game.slug}/> : null}
      <GamepageHero />
      <div className="page-single movie-single movie_single">
        <div className="container">
          <div className="row ipad-width2">
            <div className="col-md-4 col-sm-12 col-xs-12">
              <GamepageGameCard game={game} />
            </div>
            <div className="col-md-8 col-sm-12 col-xs-12">
              <div className="movie-single-ct main-content">
                <h1 className="bd-hd">
                  {game.title} <span>{game.release_year}</span>{" "}
                  {auth.loggedIn() ? game?.needs_editing ? (
                    <a href="/" onClick={handleNeedsEditing}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-wrench-adjustable-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M6.705 8.139a.25.25 0 0 0-.288-.376l-1.5.5.159.474.808-.27-.595.894a.25.25 0 0 0 .287.376l.808-.27-.595.894a.25.25 0 0 0 .287.376l1.5-.5-.159-.474-.808.27.596-.894a.25.25 0 0 0-.288-.376l-.808.27.596-.894Z" />
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16Zm-6.202-4.751 1.988-1.657a4.5 4.5 0 0 1 7.537-4.623L7.497 6.5l1 2.5 1.333 3.11c-.56.251-1.18.39-1.833.39a4.49 4.49 0 0 1-1.592-.29L4.747 14.2a7.031 7.031 0 0 1-2.949-2.951ZM12.496 8a4.491 4.491 0 0 1-1.703 3.526L9.497 8.5l2.959-1.11c.027.2.04.403.04.61Z" />
                      </svg>
                    </a>
                  ): null : null}
                </h1>
                {window.innerWidth > 991 ? (
                  <GamepageShareButtons />
                  ) : null}
                {window.innerWidth > 991 ? (
                  <GamepageRating />
                  ) : null}
                
                <div className="movie-tabs">
                  <div className="tabs">
                    <ul className="tab-links tabs-mv" id="relatedGamesList" style={{display: "flex"}}>
                      <li
                        className={overview ? "active" : ""}
                        style={{ cursor: "pointer" }}
                      >
                        <a href="/" onClick={handleOverview}>
                          Overview
                        </a>
                      </li>
                      <li
                        className={reviews ? "active" : ""}
                        style={{ cursor: "pointer" }}
                      >
                        <a href="/" onClick={handleReviews}>
                          {" "}
                          Reviews
                        </a>
                      </li>
                      <li
                        className={gameTeam ? "active" : ""}
                        style={{ cursor: "pointer" }}
                      >
                        <a href="/" onClick={handleGameTeam}>
                          {" "}
                          Credits{" "}
                        </a>
                      </li>
                      {/* <li>
                        <a href="#media"> Media</a>
                      </li> */}
                      <li
                        className={relatedGames ? "active" : ""}
                        style={{ cursor: "pointer" }}
                      >
                        <a href="/" onClick={handleRelatedGames}>
                          {" "}
                          Related Games
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content">
                      {reviews ? (
                        <GamepageReviews game={game} setLogin={setLogin} />
                      ) : gameTeam ? (
                        <GamepageGameTeam game={game} />
                      ) : relatedGames ? (
                        <RelatedGames
                          game={game}
                          customDataPoints={customDataPoints}
                        />
                      ) : (
                        <Gamepageoverview
                          game={game}
                          customDataPoints={customDataPoints}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
