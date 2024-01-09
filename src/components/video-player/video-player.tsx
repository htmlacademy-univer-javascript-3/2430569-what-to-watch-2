import React, { useEffect, useRef } from 'react';

interface Props {
  src: string;
  poster: string;
}

const VideoPlayerComponent = (props: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const ONE_SECOND = 1000;

  useEffect(() => {
    setTimeout(() => {
      videoRef.current?.play();
    }, ONE_SECOND);
  }, []);

  return (
    <video ref={videoRef} src={props.src} poster={props.poster} className="player__video" loop muted>
      <source src={props.src} type="video/mp4" />
    </video>
  );
};
export const VideoPlayer = React.memo(VideoPlayerComponent);
