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

export default function Gamepage({ setLogin }) {
    const { slug } = useParams();
    const [reviews, setReviews] = useState(false);
    const { loading, data, error } = useQuery(QUERY_SINGLE_GAME, {
        variables: { slug: slug },
      });
    
      const game = data?.game;

      console.log(game)
    
      if (loading) {
        return <>
        <GamepageHero />
        <div className="page-single movie-single movie_single">
          <div className="container">
            <h3>Loading...</h3>
            <div style={{height: "800px"}} />
          </div>
        </div>
      </>;
      } else if (game === null) {
        return <FourOhFour />
      }

      const handleReviews = (e) => {
        e.preventDefault();
        setReviews(true);
      }
      const handleOverview = (e) => {
        e.preventDefault();
        setReviews(false);
      }
  return (
    <>
      <GamepageHero />
      <div className="page-single movie-single movie_single">
        <div className="container">
          <div className="row ipad-width2">
            <div className="col-md-4 col-sm-12 col-xs-12">
              <GamepageGameCard game={game}/>
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
                      <li className={reviews ? "" : "active"} style={{cursor: "pointer"}}>
                        <a onClick={handleOverview}>Overview</a>
                      </li>
                      <li className={reviews ? "active" : ""} style={{cursor: "pointer"}}>
                        <a onClick={handleReviews}> Reviews</a>
                      </li>
                      {/* <li>
                        <a href="#cast"> Cast & Crew </a>
                      </li>
                      <li>
                        <a href="#media"> Media</a>
                      </li>
                      <li>
                        <a href="#moviesrelated"> Related Movies</a>
                      </li> */}
                    </ul>
                    <div className="tab-content">
                      {reviews ? <GamepageReviews game={game} setLogin={setLogin}/> : <Gamepageoverview game={game}/>}
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
