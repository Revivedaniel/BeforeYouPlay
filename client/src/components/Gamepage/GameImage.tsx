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
        <img
        src={`https://vgiapitest.blob.core.windows.net/game-images/${props.game.imageName}.webp`}
        alt={`Cover art for the video game ${props.game.title}`}
        className={css.img}
      />
      ) : (
        <img
        src={`https://vgiapitest.blob.core.windows.net/game-images/byp-new-game.webp`}
        alt={"Generic cover art which displays when a game is loading or the game has not been reviewed by an admin."}
        className={css.img}
      />
      )}
    </>
  );
}
