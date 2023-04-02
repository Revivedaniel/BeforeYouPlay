import { useQuery, QueryResult } from "@apollo/client";
import { useRouter } from 'next/router'
import { QUERY_FEATURED_GAME } from "../../utils/queries";

export default function FeaturedGame(): JSX.Element {
  const { loading, data, error }: QueryResult = useQuery(QUERY_FEATURED_GAME);
  const router = useRouter();
  const handleGameSelect = (e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLImageElement>): void => {
    e.preventDefault();
    if (data?.featuredGame?.title) {
      router.push(`/games/${encodeURI(data.featuredGame.title)}`);
    }
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
          src={`https://vgiapitest.blob.core.windows.net/game-images/${data?.featuredGame?.imageName || "byp-new-game"}.webp`}
          alt={` cover art`}
          style={{ cursor: "pointer" }}
          onClick={handleGameSelect}
        />
        <a href="/" onClick={handleGameSelect}>
          <h6>{data?.featuredGame?.title}</h6>
        </a>
      </div>
    </>
  );
}
