import { useRouter } from "next/router";
import css from "./SearchCard.module.css";
import { Skeleton } from "@mui/material";
import { Game } from "@/components/Gamepage/Game.model";
import Link from "next/link";

interface SearchCardProps {
  game?: Game;
  loading?: boolean;
  setGames?: React.Dispatch<React.SetStateAction<Game[]>>
}

export default function SearchCard(props: SearchCardProps): JSX.Element {
  const router = useRouter();
  const handleGameSelect = (
    e:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLImageElement, MouseEvent>
  ): void => {
    e.preventDefault();
    if (props.game) {
      if (props.setGames) {
        props.setGames([])
      }
      router.push(`/games/${encodeURI(props.game.title)}`);
    }
  };
  return (
    <div className={css.div}>
      {props.loading ? (
        <>
          <img
            src={`https://vgiapitest.blob.core.windows.net/game-images/byp-new-game.webp`}
            alt={`Default cover art`}
            style={{ cursor: "pointer" }}
          />
          <Link href="/" onClick={handleGameSelect}>
            <h6>
              Loading...
            </h6>
          </Link>
        </>
      ) : null}
      {props.game ? (
        <>
          <img
            src={`https://vgiapitest.blob.core.windows.net/game-images/${
              props.game.imageName || "byp-new-game"
            }.webp`}
            alt={`${props.game.title} cover art`}
            style={{ cursor: "pointer" }}
            onClick={handleGameSelect}
          />
          <Link href="/" onClick={handleGameSelect}>
            <h6>{props.game.title}</h6>
          </Link>
        </>
      ) : null}
    </div>
  );
}
