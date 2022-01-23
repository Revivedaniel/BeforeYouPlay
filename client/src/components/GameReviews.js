import { useState } from "react";

import NewReview, { Star } from "./NewReview";

export function GameReviews({ game }) {
  const [reviews, setReviews] = useState(game.reviews);
  return (
    <>
      <h1>This is the GameReviews component</h1>
      <NewReview game={game} setReviews={setReviews} reviews={reviews} />
      <div>
        <h2>This is the area where reviews render</h2>
        {reviews.map((review, i) => {
          const starsArr = new Array(review.stars).fill(1);
          return (
            <div key={i}>
              <p>{review.title}</p>
              <span style={{display: "flex",}}>
                {starsArr.map((star, i) => {
                  return (
                    <Star key={i} id="star1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#000000"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                        <path d="M0 0h24v24H0z" fill="none"></path>
                      </svg>
                    </Star>
                  );
                })}
                <span>{review.username}</span>
              </span>
              <p>{review.review_body}</p>
              <p></p>
            </div>
          );
        })}
      </div>
    </>
  );
}
