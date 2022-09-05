import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { perPage } from "../config";
import { QUERY_ALL_GAMES } from "../utils/queries";
import Homepage from "./Homepage";


export default function Index({ gameTitle, setGameTitle }) {
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
    <>
      <div className="slider movie-items" style={{height: "717px"}}>
        <div className="container">
          <div className="row">
            {/* <div className="social-link">
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
          </div> */}
            <div className="slick-multiItemSlider" style={{ display: "flex" }}>
              <h1>Loading...</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="movie-items">
        <div className="container">
          <div className="row ipad-width" style={{height: "600px"}}>
            Loading...
          </div>
        </div>
      </div>
    </>
  ) : (
    <Homepage games={games} setGameTitle={setGameTitle} />
  );
}
