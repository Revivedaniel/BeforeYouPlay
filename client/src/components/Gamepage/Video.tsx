import React from 'react';

interface Props {
  video: string;
}

const Video: React.FC<Props> = ({ video }) => {
  const videoId = video.split("v=")[1];

  return (
    <>
      <iframe
        width="100%"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </>
  );
};

export default Video;
