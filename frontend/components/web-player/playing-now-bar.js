import { Row, Col } from "react-bootstrap";

import { useState, useRef, useEffect } from "react";

import { useQuery } from "@apollo/client";
import { SONGS, QUEUES } from "../../graphql/queries/index";

import { formatSong, convertDuration, formatSongs } from "../../utils/index";

import { uri as apiUri } from "../../apollo/api";

import Image from "next/image";

// store
import { useStoreActions, useStoreState } from "easy-peasy";

// player components
import ReactAudioPlayer from "react-audio-player";
import Draggable from "react-draggable";

import useWindowDimensions from "../../hooks/use-viewport-dimensions";
import { breakpoint } from "../../utils/index";

// svgs
import Heart from "../../assets/bar/heart.svg";
import HeartFill from "../../assets/bar/heart-fill.svg";
import Play from "../../assets/bar/play-button.svg";
import Pause from "../../assets/bar/pause-button.svg";
import Rewind from "../../assets/bar/rewind.svg";

export default function PlayingNowBar() {
  // TODO: check length of songName and artist and add horizontal scrolling text animation (22 chars max length)
  // const songNameRef = useRef(null);
  // useEffect(() => {
  //   if (songNameRef.current) {
  //   }
  // });

  // useQuery(QUEUES, {
  //   onCompleted: (data) => {
  //     console.log(data.queues.data);
  //   },
  // });

  // responsive
  const { width } = useWindowDimensions();
  const isMobile = width < breakpoint.xl;
  const imageDimensions = isMobile
    ? { width: 35, height: 35 }
    : { width: 55, height: 55 };

  // global state
  const storeState = useStoreState((state) => state);
  const setCurrentQueue = useStoreActions((actions) => actions.setCurrentQueue);

  // set queue global state
  const setQueueInGlobalState = () => {
    setCurrentQueue({
      currentSong: {
        currentSongIndex: currentSong.index,
        draggerPosition,
        time,
      },
      songs,
    });
  };
  // retrieve queue values from global state
  const getQueuePropsFromState = () => {
    return {
      currentSongIndex: storeState.user.queue.currentSong.currentSongIndex,
      draggerPosition: storeState.user.queue.currentSong.draggerPosition,
      time: storeState.user.queue.currentSong.time,
      songs: storeState.user.queue.songs,
    };
  };

  // handle playing
  const [isPlaying, setIsPlaying] = useState(false);
  const togglePlaying = (audio) => {
    setIsPlaying(!isPlaying);
    isPlaying ? audio?.pause() : audio?.play();
  };

  // fetch data
  const [songs, setSongs] = useState();
  const [currentSong, setCurrentSong] = useState();

  const { loading } = useQuery(SONGS, {
    onCompleted: (d) => {
      const songs = formatSongs(d.songs.data);
      setSongs(songs);
      setCurrentSong(songs[0]);
    },
  });

  const [audio, setAudio] = useState(); // audio object
  const [time, setTime] = useState(getQueuePropsFromState().time); // duration, currentDuration, progress

  const draggerRef = useRef();
  const [draggerPosition, setDraggerPosition] = useState(
    getQueuePropsFromState().draggerPosition
  );

  const handleDrag = () => {
    const rawDuration = Math.ceil(audio?.duration); // durata in secondi
    const barWidth = draggerRef.current.parentElement.offsetWidth; // larghezza barra in px
    const draggerCurrentPosition = window
      .getComputedStyle(draggerRef.current)
      .getPropertyValue("transform")
      .match(/(-?[0-9\.]+)/g)[4]; // posizione X del dragger nella barra in px

    const perc =
      (draggerCurrentPosition * 100) / barWidth < 0
        ? 0
        : (draggerCurrentPosition * 100) / barWidth;
    const finalDuration =
      (rawDuration * perc) / 100 < 0 ? 0 : (rawDuration * perc) / 100; // posizione dragger nella barra in %

    setTime({
      ...time,
      currentDuration: convertDuration(finalDuration),
      currentRawDuration: Math.ceil(audio.currentTime),
      progress: perc,
    });

    audio.currentTime = Math.ceil(finalDuration);
    setDraggerPosition({ x: parseInt(draggerCurrentPosition), y: 0 });

    setQueueInGlobalState();
  };

  const moveDragger = () => {
    const barWidth = draggerRef?.current?.parentElement?.offsetWidth; // larghezza barra in px
    const draggerXpos = (time.progress * barWidth) / 100; // posizione dragger in px
    setDraggerPosition({ x: Math.ceil(draggerXpos), y: 0 });

    setQueueInGlobalState();
  };

  const nextSong = (currentSongIndex) => {
    const index =
      currentSongIndex + 1 > songs.length - 1 ? 0 : currentSongIndex + 1;
    setCurrentSong(songs[index]);
    setTime({
      duration: convertDuration(audio?.duration),
      currentDuration: "0:00",
      currentRawDuration: 0,
      progress: 0,
    });
    audio.currentTime = 0;
    setDraggerPosition({ x: 0, y: 0 });

    // reset in global state the time values
    setCurrentQueue({
      currentSong: {
        currentSongIndex: index,
        draggerPosition,
        time: {
          currentDuration: "0:00",
          currentRawDuration: 0,
          duration: time.duration,
          progress: 0,
        },
      },
      songs,
    });
  };

  const prevSong = (currentSongIndex) => {
    const index =
      currentSongIndex - 1 === -1 ? songs.length - 1 : currentSongIndex - 1;
    setCurrentSong(songs[index]);
    setTime({
      duration: convertDuration(audio?.duration),
      currentDuration: "0:00",
      currentRawDuration: 0,
      progress: 0,
    });
    audio.currentTime = 0;
    setDraggerPosition({ x: 0, y: 0 });

    // reset in global state the time values
    setCurrentQueue({
      currentSong: {
        currentSongIndex: index,
        draggerPosition,
        time: {
          currentDuration: "0:00",
          currentRawDuration: 0,
          duration: time.duration,
          progress: 0,
        },
      },
      songs,
    });
  };

  // handle dragger position on window resize
  useEffect(() => {
    window.addEventListener("resize", moveDragger);
    return () => {
      window.removeEventListener("resize", moveDragger);
    };
  }, []);

  if (currentSong && !loading) {
    const coverUrl = currentSong.cover.url
        ? currentSong.cover.url
        : currentSong.album.cover.url,
      currentSongName = currentSong.name,
      artist = currentSong.album.artist.artname,
      currentSongFile = currentSong.file.url,
      songIndex = currentSong.index;

    return (
      <div className="player-main__bar bg-bar">
        <Row className="h-100 g-0 px-2 px-xl-4">
          <Col xs={7} xl={3} className="d-flex align-items-center">
            <div className="position-relative d-flex">
              <Image
                src={apiUri + coverUrl}
                width={imageDimensions.width}
                height={imageDimensions.height}
              />
            </div>
            <div className="song-details ms-3">
              {/* TODO: add links to the current album and artist page */}
              <p className="text-white song-details__name">{currentSongName}</p>
              <p className="text-white song-details__artist">{artist}</p>
            </div>
            <button className="border-0 bg-unset ms-3">
              <Heart />
            </button>
          </Col>

          <Col xs={5} xl={6}>
            <div className="wrapper-player d-flex flex-column align-items-end align-items-xl-center justify-content-center">
              <div className="d-flex">
                <button
                  onClick={() => prevSong(songIndex)}
                  className="btn- bg-unset border-0"
                >
                  <Rewind className="btn-prev" />
                </button>

                <button
                  onClick={() => togglePlaying(audio)}
                  className="btn- bg-unset border-0"
                >
                  {!isPlaying ? (
                    <Play className="btn-play" />
                  ) : (
                    <Pause className="btn-pause" />
                  )}
                </button>

                <button
                  onClick={async () => {
                    // await saveQueue();
                    nextSong(songIndex);
                  }}
                  className="btn- bg-unset border-0"
                >
                  <Rewind className="btn-next" />
                </button>
              </div>

              {!isMobile && (
                <div className="playback-bar w-100 d-flex justify-content-center align-items-center pt-1">
                  <p className="playback-bar__time ms-2">
                    {time.currentDuration}
                  </p>

                  <div className="wrapper-playback-bar">
                    <div className="playback-bar__progress">
                      <div
                        style={{
                          transform: `translateX(calc(-100% + ${time?.progress}%))`,
                        }}
                        className="playback-bar__progress--current-time"
                      ></div>
                    </div>
                    <Draggable
                      axis="x"
                      bounds="parent"
                      nodeRef={draggerRef}
                      onStart={() => {
                        // setIsPlaying(false);
                        // audio.pause();

                        if (isPlaying) {
                          setIsPlaying(false);
                          audio.pause();
                        }
                      }}
                      onStop={() => {
                        // setIsPlaying(true);
                        // audio.play();

                        if (!isPlaying) {
                          setIsPlaying(true);
                          audio.play();
                        }
                      }}
                      onDrag={() => handleDrag()}
                      position={draggerPosition}
                    >
                      <div ref={draggerRef} className="dragger"></div>
                    </Draggable>
                  </div>

                  <p className="playback-bar__time me-2">
                    {convertDuration(audio?.duration)}
                  </p>
                </div>
              )}

              <ReactAudioPlayer
                ref={(e) => {
                  setAudio(e?.audioEl.current);
                }}
                src={apiUri + currentSongFile}
                listenInterval={500}
                onLoadedMetadata={() => {
                  // setTime({
                  //   duration: convertDuration(audio?.duration),
                  //   currentDuration: "0:00",
                  //   currentRawDuration: Math.ceil(audio.currentTime),
                  //   progress: 0,
                  // });
                  setTime(getQueuePropsFromState().time);
                  audio.currentTime = time.currentRawDuration
                    ? time.currentRawDuration
                    : 0;
                }}
                onListen={async () => {
                  setTime({
                    ...time,
                    currentDuration: convertDuration(audio?.currentTime),
                    currentRawDuration: Math.ceil(audio.currentTime),
                    progress: (audio?.currentTime / audio?.duration) * 100,
                  });
                  moveDragger();
                  setQueueInGlobalState();
                }}
                // quando ha scaricato abbastanza per poter partire
                onCanPlay={() => {
                  setQueueInGlobalState();
                }}
                // traccia finita
                onEnded={() => nextSong(songIndex)}
                // unload src file
                onAbort={() => {
                  if (audio.paused && isPlaying) {
                    audio.play();
                  } else if (audio.paused && !isPlaying) {
                    audio.pause();
                  }
                }}
              />
            </div>
          </Col>

          <Col xs={3} className="d-none d-xl-block">
            right
          </Col>
        </Row>
        {isMobile && (
          <Row className="g-0">
            <div className="playback-bar--mobile">
              <div className="playback-bar--mobile__progress">
                <div
                  style={{
                    transform: `translateX(calc(-100% + ${time?.progress}%))`,
                  }}
                  className="playback-bar--mobile__progress__current-time"
                ></div>
              </div>
            </div>
          </Row>
        )}
      </div>
    );
  } else {
    return null;
  }
}
