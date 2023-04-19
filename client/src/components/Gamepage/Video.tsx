import React from 'react';
import css from './Video.module.css';

interface Props {
  video: string;
}

const Video: React.FC<Props> = ({ video }) => {
  const videoId = video.split("v=")[1];

  return (
    <div className={css.videoResponsive}>
    <iframe
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${videoId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
  );
};

export default Video;
