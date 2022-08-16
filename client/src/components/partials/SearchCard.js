import { Link } from "react-router-dom";
import gameRating from "../../utils/gameRating";

export default function SearchCard({ game, setGameTitle }) {
  const handleGameSelect = (e) => {
    e.preventDefault();
    setGameTitle(game.title);
    window.location.href = `/games/${game.slug}`;
  }
  console.log(game);
  return (
    <div className="movie-item-style-2">
      <img
        src={game.image}
        alt={`${game.title} cover art`}
        style={{ cursor: "pointer" }}
        onClick={() => {
          window.location.href = `/games/${game.slug}`;
        }}
      />
      <div className="mv-item-infor">
        <h6>
          <a href="/" onClick={handleGameSelect}>
            {game.title} <span>({game.release_year})</span>
          </a>
        </h6>
        {/* <p className="rate">
          <i className="ion-android-star"></i>
          <span>8.1</span> /10
        </p> */}
        {game.summary && (
          <p className="describe">
            {game.summary.length > 100
              ? game.summary.slice(0, 100)
              : game.summary}
            ...
          </p>
        )}
        <p className="run-time">{game.age_rating}{" "}
          <span>Release: {game.release_year}</span>
        </p>
        <div>
          {/* {JSON.parse(game.genres).map((genre, i) => {
            return <p>{genre}</p>;
          })} */}
        </div>
      </div>
    </div>
  );
}
