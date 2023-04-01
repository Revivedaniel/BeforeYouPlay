export default function GameImage(props) {
  return (
    <>
      <img
        src={`https://vgiapitest.blob.core.windows.net/game-images/${props.game.imageName}.webp`}
        alt={`Cover art for the video game ${props.game.title}`}
      />
    </>
  );
}
