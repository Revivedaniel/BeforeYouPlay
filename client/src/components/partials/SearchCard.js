import { useNavigate } from "react-router-dom";
import css from "./SearchCard.module.css";

export default function SearchCard(props) {

  let navigate = useNavigate();
  const handleGameSelect = (e) => {
    e.preventDefault();
    navigate(`/games/${encodeURI(props.game.title)}`);
  };
  return (
    <div className={css.div}>
      <img
        src={`https://vgiapitest.blob.core.windows.net/game-images/${props.game.imageName || "byp-new-game"}.webp`}
        alt={`${props.game.title} cover art`}
        style={{ cursor: "pointer" }}
        onClick={handleGameSelect}
      />
        <a href="/" onClick={handleGameSelect}>
          <h6>{props.game.title}</h6>
        </a>
      </div>
  );
}
