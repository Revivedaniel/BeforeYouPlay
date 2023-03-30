import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { QUERY_FEATURED_GAME } from "../../utils/queries";

export default function FeaturedGame() {
  const { loading, data, error, fetchMore } = useQuery(QUERY_FEATURED_GAME);

  let navigate = useNavigate();
  const handleGameSelect = (e) => {
    e.preventDefault();
    // navigate(`/games/${encodeURI(game.title)}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <h2>Featured Game</h2>
      <div>
        <img
          src={`https://vgiapitest.blob.core.windows.net/game-images/${data.featuredGame.imageName}.webp`}
          alt={` cover art`}
          style={{ cursor: "pointer" }}
          onClick={handleGameSelect}
        />
        <a href="/" onClick={handleGameSelect}>
          <h6>{data.featuredGame.title}</h6>
        </a>
      </div>
    </>
  );
}
