import GamepageGameCard from "../components/Gamepage/GamepageGameCard";
import GamepageHero from "../components/Gamepage/GamepageHero";
import Gamepageoverview from "../components/Gamepage/GamepageOverview";
import GamepageRating from "../components/Gamepage/GamepageRating";
import GamepageReviews from "../components/Gamepage/GamepageReviews";
import GamepageShareButtons from "../components/Gamepage/GamepageShareButtons";

export default function Gamepage() {
  return (
    <>
      <GamepageHero />
      <div class="page-single movie-single movie_single">
        <div class="container">
          <div class="row ipad-width2">
            <div class="col-md-4 col-sm-12 col-xs-12">
              <GamepageGameCard />
            </div>
            <div class="col-md-8 col-sm-12 col-xs-12">
              <div class="movie-single-ct main-content">
                <h1 class="bd-hd">
                  Skyfall: Quantum of Spectre <span>2015</span>
                </h1>
                <GamepageShareButtons />
                <GamepageRating />
                <div class="movie-tabs">
                  <div class="tabs">
                    <ul class="tab-links tabs-mv">
                      <li class="active">
                        <a href="#overview">Overview</a>
                      </li>
                      <li>
                        <a href="#reviews"> Reviews</a>
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
                    <div class="tab-content">
                      <Gamepageoverview />
                      <GamepageReviews />
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
