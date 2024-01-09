import {memo, useEffect, useRef, useState} from 'react';
import {Icon} from '../../components/icon/icon.tsx';
import {ICONS} from '../../components/icon/icons.ts';
import {useNavigate, useParams} from 'react-router-dom';
import {Film} from '../../types/film.ts';
import {NotFoundPage} from '../not-found-page/not-found-page.tsx';
import {Spinner} from '../../components/spinner/spinner.tsx';
import {fetchFilm} from '../../store/api-actions.ts';
import {useAppDispatch, useAppSelector} from '../../store/hooks.ts';
import {ReducerName} from '../../types/reducer-name.ts';

const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTE = 60;

const PlayerComponent = ({film}: {film: Film}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPause, setIsPause] = useState<boolean>(false);
  const [lastTime, setLastTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (videoRef.current && videoRef.current?.paused !== !isPause) {
      setIsPause(!isPause);
    }
  }, [isPause, videoRef.current?.paused]);

  const formatDuration = (timeInSeconds: number): string => {
    const hours = Math.floor(timeInSeconds / SECONDS_IN_HOUR);
    const minutes = Math.floor((timeInSeconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE);
    const seconds = Math.floor(timeInSeconds % SECONDS_IN_MINUTE);

    const formatTwoDigits = (value: number) => (value < 10 ? `0${value}` : `${value}`);

    if (hours > 0) {
      return `-${formatTwoDigits(hours)}:${formatTwoDigits(minutes)}:${formatTwoDigits(seconds)}`;
    } else {
      return `-${formatTwoDigits(minutes)}:${formatTwoDigits(seconds)}`;
    }
  };

  const handlePlayPauseButtonClick = () => {
    if (isPause) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
    setIsPause(!isPause);
  };

  const handleFullscreenClick = () => {
    videoRef.current?.requestFullscreen();
  };

  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      setLastTime(videoRef.current?.currentTime);
      setProgress((videoRef.current?.currentTime / film.runTime) * 100);
    }
  };

  const handleExitButtonClick = () => {
    navigate(-1);
  };

  return (
    <div className="player">
      <video
        autoPlay
        ref={videoRef}
        src={film.videoLink}
        className="player__video"
        poster={film.posterImage}
        onTimeUpdate={handleVideoTimeUpdate}
      >
        <source src={film.videoLink} type="video/mp4"/>
      </video>

      <button type="button" className="player__exit" onClick={handleExitButtonClick}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progress} max="100"></progress>
            <div className="player__toggler" style={{left: `${progress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{formatDuration(film.runTime - lastTime)}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={handlePlayPauseButtonClick}>
            {
              isPause ? <><Icon {...ICONS.PLAY_START}/><span>Play</span></>
                : <><Icon {...ICONS.PAUSE}/><span>Pause</span></>
            }
          </button>
          <div className="player__name">{film.name}</div>
          <button type="button" className="player__full-screen" onClick={handleFullscreenClick}>
            <Icon {...ICONS.FULL_SCREEN}/>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const PlayerPageWrapper = () => {
  const {id = ''} = useParams();
  const stateFilm = useAppSelector((state) => state[ReducerName.Film].film);
  const stateIsFilmLoading = useAppSelector((state) => state[ReducerName.Film].isLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(fetchFilm(id));
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, id]);

  if (stateIsFilmLoading) {
    return <Spinner/>;
  }

  if (!id || !stateFilm) {
    return (<NotFoundPage/>);
  }

  return (<PlayerComponent film={stateFilm}/>);
};

export const Player = memo(PlayerPageWrapper);
