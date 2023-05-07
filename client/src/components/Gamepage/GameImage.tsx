import Image from "next/image";
import css from "./GameImage.module.css";

interface Game {
  imageName: string;
  title: string;
}

interface GameImageProps {
  game?: Game;
}

export default function GameImage(props: GameImageProps) {
  return (
    <>
      {props.game ? (
        <Image
          src={`https://vgiapitest.blob.core.windows.net/game-images/${props.game.imageName}.webp`}
          alt={`Cover art for the video game ${props.game.title}`}
          width={357}
          height={476}
          className={css.img}
          sizes="(min-width: 769px) 18.62vw, 84.62vw"
        />
      ) : (
        <Image
          src={`https://vgiapitest.blob.core.windows.net/game-images/byp-new-game.webp`}
          alt={
            "Generic cover art which displays when a game is loading or the game has not been reviewed by an admin."
          }
          width={357}
          height={476}
          className={css.img}
          sizes="(min-width: 769px) 18.62vw, 84.62vw"
        />
      )}
    </>
  );
}
