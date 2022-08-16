import { useNavigate } from "react-router-dom";

export default function SearchCard({ game, setGameTitle, setGameImage }) {
  let navigate = useNavigate();
  const handleGameSelect = (e) => {
    e.preventDefault();
    setGameTitle(game.title);
    setGameImage(game.image);
    navigate(`/games/${game.slug}`);
  }
  console.log(game);
  return (
    <div className="movie-item-style-2">
      <img
        src={game.image}
        alt={`${game.title} cover art`}
        style={{ cursor: "pointer" }}
        onClick={handleGameSelect}
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
