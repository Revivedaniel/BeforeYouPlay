import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { perPage } from "../config";
import { QUERY_ALL_GAMES } from "../utils/queries";
import SliderCard from "./partials/SliderCard";

export default function MovieSlider() {
  let { page } = useParams();

  const { loading, data } = useQuery(QUERY_ALL_GAMES, {
    variables: { page: parseInt(page) || 1, perPage: perPage },
  });
  const games = data?.games.games || [];
  if (page === undefined) {
    page = 1;
  } else {
    page = parseInt(page);
  }
  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="slider movie-items">
      <div className="container">
        <div className="row">
          <div className="social-link">
            <p>Follow us: </p>
            <a href="#">
              <i className="ion-social-facebook"></i>
            </a>
            <a href="#">
              <i className="ion-social-twitter"></i>
            </a>
            <a href="#">
              <i className="ion-social-googleplus"></i>
            </a>
            <a href="#">
              <i className="ion-social-youtube"></i>
            </a>
          </div>
          <div className="slick-multiItemSlider" style={{ display: "flex" }}>
            {games.map((game, i) => {
              if (i < 4) {
                return <SliderCard game={game} key={game._id} />;
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
