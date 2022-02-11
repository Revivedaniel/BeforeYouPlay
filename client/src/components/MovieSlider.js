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
          <div className="slick-multiItemSlider">
            {games.map((game) => {
              return <SliderCard game={game} key={game._id} />;
            })}

            <div class="movie-item">
              <div class="mv-img">
                <a href="#">
                  <img
                    src="images/uploads/slider1.jpg"
                    alt=""
                    width="285"
                    height="437"
                  />
                </a>
              </div>
              <div class="title-in">
                <div class="cate">
                  <span class="blue">
                    <a href="#">Sci-fi</a>
                  </span>
                </div>
                <h6>
                  <a href="#">Interstellar</a>
                </h6>
                <p>
                  <i class="ion-android-star"></i>
                  <span>7.4</span> /10
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
