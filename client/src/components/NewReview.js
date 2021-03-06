import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_REVIEW } from "../utils/mutations";
import styled from "styled-components";
import Rating from "@mui/material/Rating";
import { formatMuiErrorMessage } from "@mui/utils";
import DisplayError from "./ErrorMessage";

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
    margin-bottom: 0 !important;
  }
  label {
    font-size: 25px !important;
    margin-bottom: 0 !important;
  }
`;

const NewReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  background-color: #c4c4c4;
  margin-top: 4%;
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

export default function NewReview({ game, setReviews, reviews, setReviewModal }) {
  let handleClose = (e) => {
    if (e.target.classList.contains("openform")) {
      e.preventDefault();
      setReviewModal(false);
    }
  };
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
    <div className="overlay openform" onClick={handleClose}>
      <div className="login-wrapper" id="login-content">
        <div className="login-content">
          <a href="#" className="close">
            x
          </a>
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
              <label for="title">
                Title:
                <input
                  type="text"
                  name="title"
                  id="title"
                  required="required"
                />
              </label>
            </div>

            <div className="row">
              <label for="password">
                Review body:
                <textarea
                  value={review}
                  style={{
                    fontFamily: "'Dosis', sans-serif",
                    fontSize: "14px",
                    color: "#222222",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    marginTop: "10px",
                    height: "42px",
                    border: "1px solid #e1e1e1",
                    maxHeight: "500px",
                  }}
                  onChange={handleReviewChange}
                />
              </label>
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
