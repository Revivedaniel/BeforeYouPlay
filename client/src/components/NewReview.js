import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_REVIEW } from "../utils/mutations";
import styled from "styled-components";
import Rating from "@mui/material/Rating";

const StarsContainer = styled.div`
  display: flex;
  padding: 2%;
  align-self: flex-start;
  p {
    padding-left: 6%;
    margin-bottom: 0 !important;
  }
  label {
    font-size: 25px !important;
    margin-bottom: 0 !important;
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

export default function NewReview({ game, setReviews, reviews, setReviewModal }) {
  let handleClose = (e) => {
    if (e.target.classList.contains("openform")) {
      e.preventDefault();
      setReviewModal(false);
    }
  };
  const starsArray = ["Terrible", "Bad", "Average", "Good", "Excellent"];
  const [addReview] = useMutation(ADD_REVIEW);
  // rating word
  const [ratingWord, setRatingWord] = useState("");
  //review input state
  const [review, setReview] = useState("");
  //create state for stars selected
  const [stars, setStars] = useState(0);
  const handleSubmit = async (event) => {
    try {
      console.log([game._id, Number(stars), review]);
      const mutationResponse = await addReview({
        variables: {
          game_id: game._id,
          stars: Number(stars),
        },
      });
      setReviews([...reviews, mutationResponse.data.addReview]);
      setReview("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="overlay openform" onClick={handleClose}>
      <div className="login-wrapper" id="login-content">
        <div className="login-content">
          {/* <a href="#" className="close">
            x
          </a> */}
          <h3>New Review</h3>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <StarsContainer id="stars">
                <Rating
                  name="simple-controlled"
                  onChange={(event) => {
                    setStars(event.target.value);
                    setRatingWord(starsArray[event.target.value - 1]);
                  }}
                />

                <p>{ratingWord}</p>
              </StarsContainer>
            </div>
            {/* <div className="row">
            <div className="remember">
              <div>
                <input type="checkbox" name="remember" value="Remember me" />
                <span>Remember me</span>
              </div>
              <a href="#">Forget password ?</a>
            </div>
          </div> */}
            <div className="row">
              <button type="submit">Submit</button>
            </div>
          </form>
          {/* <div className="row">
          <p>Or via social</p>
          <div className="social-btn-2">
            <a className="fb" href="#">
              <i className="ion-social-facebook"></i>Facebook
            </a>
            <a className="tw" href="#">
              <i className="ion-social-twitter"></i>twitter
            </a>
          </div>
        </div> */}
        </div>
      </div>
    </div>
  );
}
