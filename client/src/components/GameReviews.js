import { useMutation } from "@apollo/client";
import { useState } from "react";

//Import mutation
import { ADD_REVIEW } from "../utils/mutations";

export function GameReviews({ game }) {
  const [addReview, { error }] = useMutation(ADD_REVIEW);
  //create state for stars selected
  const [stars, setStars] = useState(0);
  //if  stars state is greater than 1, color the stars before it.
  const handleStars = (event) => {
    setStars(event.target.dataset.star);
  };
  //review input state
  const [review, setReview] = useState("");
  const handleReviewChange = (event) => {
    const { value } = event.target;
    if (value.length < 1000) {
      setReview(value);
    }
  };

  const handleSubmit = async (event) => {
      try {
          console.log([game._id, Number(stars), review])
          const mutationResponse = await addReview({
            variables: {
                game_id: game._id,
                stars: Number(stars),
                review_body: review
            }
          });
          console.log(mutationResponse)
      } catch (err) {
          console.log(err)
      }
  };

  return (
    <>
      <h1>This is the GameReviews component</h1>
      <div>
        <h2>stars{stars}</h2>
        <div id="stars">
          <div id="star1" data-star={1} onClick={handleStars}>
            *
          </div>
          <div id="star2" data-star={2} onClick={handleStars}>
            *
          </div>
          <div id="star3" data-star={3} onClick={handleStars}>
            *
          </div>
          <div id="star4" data-star={4} onClick={handleStars}>
            *
          </div>
          <div id="star5" data-star={5} onClick={handleStars}>
            *
          </div>
        </div>
        <textarea value={review} onChange={handleReviewChange} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
}
