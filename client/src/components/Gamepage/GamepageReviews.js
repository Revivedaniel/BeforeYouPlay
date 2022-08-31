import { useState } from "react";
import auth from "../../utils/auth";
import Login from "../Login";
import NewReview from "../NewReview";
import GamepageGameCard from "./GamepageReviewCard";

export default function GamepageReviews({game}) {
  const [login, setLogin] = useState(false);
  const [reviews] = useState(game.reviews);
  const [reviewModal, setReviewModal] = useState(false);
  const handleNewReview = (e) => {
    e.preventDefault();
    setReviewModal(true);
    setLogin(true);
  }
  return (
    <div id="reviews" classname="tab review">
      <div classname="row">
        <div classname="rv-hd">
          <a
            onClick={handleNewReview}
            classname="redbtn"
            style={{
              fontFamily: "'Dosis', sans-serif",
              fontSize: "14px",
              color: "var(--font-color-light)",
              fontWeight: "bold",
              textTransform: "uppercase",
              backgroundColor: "var(--cta-dark)",
              padding: "13px 25px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            href="/"
          >
            Write Review
          </a>
          {(reviewModal && auth.loggedIn()) && <NewReview game={game} setReviewModal={setReviewModal}/>}
          {(reviewModal && !auth.loggedIn() && login) && <Login setLogin={setLogin} />}
        
        </div>
        <br />
        <div classname="topbar-filter">
          <p>
            Found <span>{game.reviews.length} reviews</span> in total
          </p>
          {/* <label>Filter by:</label>
          <select>
            <option value="popularity">Popularity Descending</option>
            <option value="popularity">Popularity Ascending</option>
            <option value="rating">Rating Descending</option>
            <option value="rating">Rating Ascending</option>
            <option value="date">Release date Descending</option>
            <option value="date">Release date Ascending</option>
          </select> */}
        </div>
        {reviews.map((review, i) => {
          return (
            <GamepageGameCard review={review} key={i}/>
          )
        })}
        
      </div>
    </div>
  );
}
