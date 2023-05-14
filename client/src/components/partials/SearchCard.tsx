import { useRouter } from "next/router";
import css from "./SearchCard.module.css";
import Link from "next/link";
import Image from "next/image";

export interface GameTitle {
  title: string;
  gameGenerated: boolean;
  imageName: string;
  lazyAfternoonContent: boolean;
  contentAddedDate?: Date;
  platforms: string[];
  genres: string[];
}

interface SearchCardProps {
  game?: GameTitle;
  loading?: boolean;
  setGames?: React.Dispatch<React.SetStateAction<GameTitle[]>>
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
      // If the game has been generated then it should be rendered on the SSR page.
      // Else, it should generate the game and render dynamically.
      if (props.game.gameGenerated) {
        router.push(`/games/${encodeURI(props.game.title)}`);
      } else {
        router.push(`/generate/${encodeURI(props.game.title)}`);
      }
    }
  };
  return (
    <div className={css.div}>
      {props.loading ? (
        <>
          <Image
          src={`https://vgiapitest.blob.core.windows.net/game-images/byp-new-game.webp`}
          alt={`Default cover art`}
          width={150}
          height={200}
          style={{ cursor: "pointer" }}
          sizes="(min-width: 768px) 315px, (min-width: 1024px) 150px, (min-width: 2560px) 315px, 150px"
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
          <Image
          src={`https://vgiapitest.blob.core.windows.net/game-images/${
            props.game.imageName || "byp-new-game"
          }.webp`}
          alt={`${props.game.title} cover art`}
          width={150}
          height={200}
          style={{ cursor: "pointer" }}
          sizes="(min-width: 768px) 315px, (min-width: 1024px) 150px, (min-width: 2560px) 315px, 150px"
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
