import { Row, Col } from "react-bootstrap";

import { useState, useRef, useEffect } from "react";

import { useQuery } from "@apollo/client";
import { SONG } from "../../graphql/queries/index";

import { formatSong, convertDuration } from "../../utils/index";

import { uri as apiUri } from "../../apollo/api";

import Image from "next/image";

// store
import { useStoreActions, useStoreState } from "easy-peasy";

// player components
import ReactAudioPlayer from "react-audio-player";
import Draggable from "react-draggable";

// svgs
import Heart from "../../assets/bar/heart.svg";
import HeartFill from "../../assets/bar/heart-fill.svg";
import Play from "../../assets/bar/play-button.svg";
import Pause from "../../assets/bar/pause-button.svg";

export default function PlayingNowBar() {
  // TODO: check length of songName and artist and add horizontal scrolling text animation (22 chars max length)
  // const songNameRef = useRef(null);
  // useEffect(() => {
  //   if (songNameRef.current) {
  //     console.log(songNameRef.current);
  //   }
  // });

  // store
  const storeState = useStoreState((state) => state);
  const setCurrentSongInfo = useStoreActions(
    (actions) => actions.setCurrentSongInfo
  );

  const [song, setSong] = useState();
  const { loading } = useQuery(SONG, {
    onCompleted: (d) => setSong(formatSong(d.song)),
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const togglePlaying = (audio) => {
    setIsPlaying(!isPlaying);
    isPlaying ? audio?.pause() : audio?.play();
  };

  const [audio, setAudio] = useState(); // audio object
  const [time, setTime] = useState(
    storeState.user.queue.currentSong?.time
      ? storeState.user.queue.currentSong.time
      : {}
  ); // duration, currentDuration, progress

  const draggerRef = useRef();
  const [draggerPosition, setDraggerPosition] = useState({
    x: storeState.user.queue.currentSong?.draggerPosition?.x
      ? storeState.user.queue.currentSong.draggerPosition.x
      : 0,
    y: 0,
  });

  // init store
  useEffect(() => {
    setCurrentSongInfo({ time, draggerPosition });
  }, []);

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

    setCurrentSongInfo({ time, draggerPosition });
  };

  const moveDragger = () => {
    const barWidth = draggerRef.current.parentElement.offsetWidth; // larghezza barra in px
    const draggerXpos = (time.progress * barWidth) / 100; // posizione dragger in px
    setDraggerPosition({ x: Math.ceil(draggerXpos), y: 0 });

    setCurrentSongInfo({ time, draggerPosition });
  };

  // handle dragger position on window resize
  useEffect(() => {
    window.addEventListener("resize", moveDragger);
    return () => {
      window.removeEventListener("resize", moveDragger);
    };
  });

  if (song && !loading) {
    // console.log(song);
    const coverUrl = song.cover.url ? song.cover.url : song.album.cover.url;
    const songName = song.name,
      artist = song.album.artist.artname,
      songFile = song.file.url;

    return (
      <div className="player-main__bar bg-bar">
        <Row className="h-100 g-0 px-4">
          <Col
            style={{ border: "2px solid red" }}
            xs={3}
            className="d-flex align-items-center"
          >
            <div className="position-relative">
              <Image src={apiUri + coverUrl} width={55} height={55} />
            </div>
            <div className="song-details ms-3">
              {/* TODO: add links to the current album and artist page */}
              <p className="text-white song-details__name">{songName}</p>
              <p className="text-white song-details__artist">{artist}</p>
            </div>
            <button className="border-0 bg-unset ms-3">
              <Heart />
            </button>
          </Col>

          <Col style={{ border: "2px solid green" }} xs={6}>
            <div className="wrapper-player d-flex flex-column align-items-center justify-content-center">
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
                    onDrag={() => {
                      handleDrag();
                    }}
                    position={draggerPosition}
                  >
                    <div ref={draggerRef} className="dragger"></div>
                  </Draggable>
                </div>

                <p className="playback-bar__time me-2">{time.duration}</p>
              </div>

              <ReactAudioPlayer
                ref={(e) => {
                  setAudio(e?.audioEl.current);
                }}
                src={apiUri + songFile}
                listenInterval={500}
                onLoadedMetadata={() => {
                  setTime(
                    Object.keys(storeState.user.queue.currentSong.time).length >
                      0
                      ? storeState.user.queue.currentSong.time
                      : {
                          duration: convertDuration(audio?.duration),
                          currentDuration: "0:00",
                          currentRawDuration: Math.ceil(audio.currentTime),
                          progress: 0,
                        }
                  );
                  audio.currentTime = time.currentRawDuration
                    ? time.currentRawDuration
                    : 0;
                }}
                onListen={() => {
                  setTime({
                    ...time,
                    currentDuration: convertDuration(audio?.currentTime),
                    currentRawDuration: Math.ceil(audio.currentTime),
                    progress: (audio?.currentTime / audio?.duration) * 100,
                  });
                  moveDragger();
                }}
                // onPlay={() => {
                //   console.log("play");
                // }}
                // onPause={() => {
                //   console.log("pause");
                // }}
                // autoPlay
                // controls
              />
            </div>
          </Col>

          <Col style={{ border: "2px solid yellow" }} xs={3} className="">
            right
          </Col>
        </Row>
      </div>
    );
  } else {
    return null;
  }
}
