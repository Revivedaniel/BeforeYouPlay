export default function Video(props) {
  return (
    <>
      <iframe
        width="100%"
        height="315"
        src={`https://www.youtube.com/embed/${props.video.split("v=")[1]}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </>
  );
}
