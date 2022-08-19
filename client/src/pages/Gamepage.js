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

export default function Gamepage({ setLogin, gameTitle, gameImage }) {
  const [customDataPoints, setCustomDataPoints] = useState(null);
  const { slug } = useParams();
  const [overview, setOverview] = useState(true);
  const [reviews, setReviews] = useState(false);
  const [gameTeam, setGameTeam] = useState(false);
  const { loading, data } = useQuery(QUERY_SINGLE_GAME, {
    variables: { slug: slug, title: gameTitle, gameImage: gameImage },
    onCompleted: (data) => {
      setCustomDataPoints(JSON.parse(data.game.custom_datapoints));
    }
  });

  const game = data?.game;

  if (loading) {
    return (
      <>
        <GamepageHero />
        <div className="page-single movie-single movie_single">
          <div className="container">
            <h3>Loading...</h3>
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
  };
  const handleReviews = (e) => {
    e.preventDefault();
    setReviews(true);
    setGameTeam(false);
    setOverview(false);
  };
  const handleOverview = (e) => {
    e.preventDefault();
    setOverview(true);
    setReviews(false);
    setGameTeam(false);
  };
  return (
    <>
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
                  {game.title} <span>{game.release_year}</span>
                </h1>
                <GamepageShareButtons />
                <GamepageRating />
                <div className="movie-tabs">
                  <div className="tabs">
                    <ul className="tab-links tabs-mv">
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
                      </li>
                      <li>
                        <a href="#moviesrelated"> Related Movies</a>
                      </li> */}
                    </ul>
                    <div className="tab-content">
                      {reviews ? (
                        <GamepageReviews game={game} setLogin={setLogin} />
                      ) : gameTeam ? (
                        <GamepageGameTeam game={game} />
                      ) : (
                        <Gamepageoverview game={game} customDataPoints={customDataPoints} />
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
