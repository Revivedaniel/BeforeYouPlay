import { useQuery, QueryResult } from "@apollo/client";
import { useRouter } from "next/router";
import { QUERY_FEATURED_GAME } from "../../utils/queries";
import css from "./FeaturedGame.module.css";
import Link from "next/link";
import { Skeleton } from "@mui/material";

export default function FeaturedGame(): JSX.Element {
  const { loading, data, error }: QueryResult = useQuery(QUERY_FEATURED_GAME);
  const router = useRouter();
  const handleGameSelect = (
    e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLImageElement>
  ): void => {
    e.preventDefault();
    if (data?.featuredGame?.title) {
      router.push(`/games/${encodeURI(data.featuredGame.title)}`);
    }
  };

  if (loading) {
    return (
      <Skeleton variant="rectangular" className={css.featuredGame} />
    );
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Link
        href={`/games/${data?.featuredGame?.title}`}
        className={css.featuredGame}
        style={{
          backgroundImage: `url('https://vgiapitest.blob.core.windows.net/game-images/${data?.featuredGame?.imageName}.webp')`,
        }}
      >
        <div className={css.nameContainer}>
          <h2>{data?.featuredGame?.title}</h2>
          <p>
            {`${data?.featuredGame?.shortDescription} ...`}
            <span>Click here to read more</span>
          </p>
        </div>
      </Link>
    </>
  );
}
