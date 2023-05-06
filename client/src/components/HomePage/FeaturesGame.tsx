import { useQuery, QueryResult } from "@apollo/client";
import { useRouter } from "next/router";
import { QUERY_FEATURED_GAME } from "../../utils/queries";
import css from "./FeaturedGame.module.css";
import Link from "next/link";
import { Skeleton } from "@mui/material";

interface FeaturedGameProps {
  featuredGame: {
    title: string;
    imageName: string;
    shortDescription: string;
  };
}

export default function FeaturedGame(props: FeaturedGameProps): JSX.Element {
  // const { loading, data, error }: QueryResult = useQuery(QUERY_FEATURED_GAME);
  const router = useRouter();
  const handleGameSelect = (
    e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLImageElement>
  ): void => {
    e.preventDefault();
    if (props?.featuredGame?.title) {
      router.push(`/games/${encodeURI(props.featuredGame.title)}`);
    }
  };

  // if (loading) {
  //   return (
  //     <Skeleton variant="rectangular" className={css.featuredGame} />
  //   );
  // }
  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  return (
    <>
      <Link
        href={`/games/${props?.featuredGame?.title}`}
        className={css.featuredGame}
        style={{
          backgroundImage: `url('https://vgiapitest.blob.core.windows.net/game-images/${props?.featuredGame?.imageName}.webp')`,
        }}
      >
        <div className={css.nameContainer}>
          <h2>{props?.featuredGame?.title}</h2>
          <p>
            {`${props?.featuredGame?.shortDescription} ...`}
            <span>Click here to read more</span>
          </p>
        </div>
      </Link>
    </>
  );
}
