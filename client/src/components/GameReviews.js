import { useState } from "react";
import styled from "styled-components";

import NewReview, { Star } from "./NewReview";
const ReviewCard = styled.div`
  display: flex;
  width: 702px;
  height: 248px;
  margin-top: 1%;
  [name="mainReviewContainer"] {
    width: 75%;
    background-color: #c4c4c4;
  }
  [name="title"] {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 26px;
    line-height: 30px;
    display: flex;
    align-items: center;
    padding-left: 2%;
    padding-top: 2%;
  }
  [name="username"] {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;
    padding-left: 2%;
  }
  [name="body"] {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 19px;
    line-height: 22px;
    display: flex;
    align-items: flex-start;
    margin: 2%;
    max-height: 167px;
    overflow: hidden;
  }
  [name="stars"] {
    width: 25%;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 124px;
    line-height: 145px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 2%;
    text-align: center;
    border: .6rem solid #c4c4c4;
    border-left: 0;
  }
`;

export function GameReviews({ game }) {
  const [reviews, setReviews] = useState(game.reviews);
  return (
    <>
      <h1>This is the GameReviews component</h1>
      <NewReview game={game} setReviews={setReviews} reviews={reviews} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "80%",
          flexWrap: "wrap",
        }}
      >
        {reviews.map((review, i) => {
          let ratingColor;
          switch (review.stars) {
            case 1:
              ratingColor = "#de2d2e";
              break;
            case 2:
              ratingColor = "#e47a2e";
              break;
            case 3:
              ratingColor = "#f6cc30";
              break;
            case 4:
              ratingColor = "#80c02b";
              break;
            case 5:
              ratingColor = "#01ad23";
              break;
            default:
              break;
          }
          return (
            <ReviewCard key={i}>
              <span name="mainReviewContainer">
                <p name="title">{review.title}</p>
                <span name="username">{review.username}</span>
                <div name="body">{review.review_body}</div>
              </span>
              <span name="stars" style={{ backgroundColor: ratingColor }}>
                {review.stars}
              </span>
            </ReviewCard>
          );
        })}
      </div>
    </>
  );
}
