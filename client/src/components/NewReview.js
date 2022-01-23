import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_REVIEW } from "../utils/mutations";
import styled from "styled-components";

const StarsContainer = styled.div`
  display: flex;
`;

export const Star = styled.div`
  cursor: pointer;
  svg {
    pointer-events: none;
  }
`;

export default function NewReview({ game, setReviews, reviews }) {
  const starsArray = [
    { star: 1, word: "Terrible" },
    { star: 2, word: "Bad" },
    { star: 3, word: "Average" },
    { star: 4, word: "Good" },
    { star: 5, word: "Excellent" },
  ];
  const [addReview, { error }] = useMutation(ADD_REVIEW);
  // rating word
  const [ratingWord, setRatingWord] = useState("");
  //review input state
  const [review, setReview] = useState("");
  const handleReviewChange = (event) => {
      const { value } = event.target;
    if (value.length < 1000) {
      setReview(value);
    }
  };
  //create state for stars selected
  const [stars, setStars] = useState(0);
  //if  stars state is greater than 1, color the stars before it.
  const handleStars = (event) => {
    setStars(event.target.dataset.star);
    setRatingWord(event.target.dataset.ratingWord);
  };
  const [reviewTitle, setReviewTitle] = useState("");
  const handleReviewTitleChange = (event) => {
      const { value } = event.target;
      setReviewTitle(value);
    };
    const handleSubmit = async (event) => {
      try {
        console.log([game._id, Number(stars), review]);
        const mutationResponse = await addReview({
          variables: {
            game_id: game._id,
            title: reviewTitle,
            stars: Number(stars),
            review_body: review,
          },
        });
        setReviews([...reviews, mutationResponse.data.addReview]);
        setReview("");
        setReviewTitle("");
      } catch (err) {
        console.log(err);
      }
    };
    return (
        <div>
      <StarsContainer id="stars">
        {starsArray.map((star) => {
          return (
            <Star
              key={star.star}
              id="star1"
              data-star={star.star}
              data-rating-word={star.word}
              onClick={handleStars}
            >
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

        <p>{ratingWord}</p>
      </StarsContainer>
      <input value={reviewTitle} onChange={handleReviewTitleChange}></input>
      <textarea value={review} onChange={handleReviewChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
