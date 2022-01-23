import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_REVIEW } from "../utils/mutations";
import styled from "styled-components";
import Rating from "@mui/material/Rating";

const Title = styled.textarea`
  padding: 8px 68px 8px 16px;
    background-color: transparent;
    resize: none;
    box-sizing: border-box;
    overflow: hidden;
    display: block;
    width: 95%;
    outline: none;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    font-family: inherit;
}
`;

const ReviewBody = styled.textarea`
  padding: 8px 68px 8px 16px;
  background-color: transparent;
  resize: vertical;
  box-sizing: border-box;
  overflow: hidden;
  display: block;
  width: 95%;
  outline: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  font-family: inherit;
  margin-top: 1%;
  height: 100px;
`;

const StarsContainer = styled.div`
  display: flex;
  padding: 2%;
  align-self: flex-start;
  p {
    padding-left: 6%;
  }
`;

const NewReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 35%;
  background-color: #c4c4c4;
  h3 {
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
`;

export const Star = styled.div`
  &:hover {
    path {
      &[name="colorStar"] {
        fill: #ffb400;
      }
    }
  }
  cursor: pointer;
  svg {
    pointer-events: none;
    path {
      &[name="colorStar"] {
        fill: white;
      }
    }
  }
`;

export default function NewReview({ game, setReviews, reviews }) {
  const starsArray = ["Terrible", "Bad", "Average", "Good", "Excellent"];
  const [addReview, { error }] = useMutation(ADD_REVIEW);
  // rating word
  const [ratingWord, setRatingWord] = useState("");
  //review input state
  const [review, setReview] = useState("");
  const handleReviewChange = (event) => {
    const { value } = event.target;
    if (value.length < 450) {
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
    if (value.length <= 70) {
    setReviewTitle(value);
    }
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
    <NewReviewContainer>
      <h3>New Review</h3>
      <StarsContainer id="stars">
        <Rating
          name="simple-controlled"
          onChange={(event) => {
            setStars(event.target.value);
            setRatingWord(starsArray[event.target.value - 1]);
          }}
        />
        {/* {starsArray.map((star) => {
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
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path name="colorStar" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                <path d="M0 0h24v24H0z" fill="none"></path>
              </svg>
            </Star>
            
          );
        })} */}

        <p>{ratingWord}</p>
      </StarsContainer>
      <Title
        placeholder="Title"
        rows="1"
        style={{
          overflowX: "hidden",
          overflowWrap: "break-word",
          height: "39px",
        }}
        value={reviewTitle}
        onChange={handleReviewTitleChange}
      ></Title>
      <ReviewBody
        placeholder="Review Body"
        value={review}
        onChange={handleReviewChange}
      ></ReviewBody>
      {/* <Title value={reviewTitle} onChange={handleReviewTitleChange}></Title>
      <textarea value={review} onChange={handleReviewChange} /> */}
      <button onClick={handleSubmit}>Submit</button>
    </NewReviewContainer>
  );
}
