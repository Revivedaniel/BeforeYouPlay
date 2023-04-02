interface Game {
  imageName: string;
  title: string;
}

interface GameImageProps {
  game: Game;
}

export default function GameImage(props: GameImageProps) {
  return (
    <>
      <img
        src={`https://vgiapitest.blob.core.windows.net/game-images/${props.game.imageName}.webp`}
        alt={`Cover art for the video game ${props.game.title}`}
      />
    </>
  );
}
