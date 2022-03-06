import { Row, Col } from "react-bootstrap";

import { useState, useRef, useEffect } from "react";
import useWindowDimensions from "../../hooks/use-viewport-dimensions";
import { breakpoint } from "../../utils/index";

import { useQuery } from "@apollo/client";
import { SONGS, QUEUES } from "../../graphql/queries/index";

import { formatSong, convertDuration, formatSongs } from "../../utils/index";

import { uri as apiUri } from "../../apollo/api";

import Image from "next/image";
import Link from "next/link";

// store
import { useStoreActions, useStoreState } from "easy-peasy";

// player components
import ReactAudioPlayer from "react-audio-player";

// svgs
import Heart from "../../assets/bar/heart.svg";
import HeartFill from "../../assets/bar/heart-fill.svg";
import Play from "../../assets/bar/play-button.svg";
import Pause from "../../assets/bar/pause-button.svg";
import Rewind from "../../assets/bar/rewind.svg";

import { io } from "socket.io-client";
import { browserName } from "react-device-detect";

var socket = io(apiUri + "/");

export default function PlayingNowBar({ token }) {
  // TODO: check length of songName and artist and add horizontal scrolling text animation (22 chars max length)

  // GLOBAL STATE
  const globalQueueState = useStoreState((state) => state.user.queue);
  const setCurrentSongInfo = useStoreActions(
    (actions) => actions.setCurrentSongInfo
  );

  // responsive
  const { width } = useWindowDimensions();
  const isMobile = width < breakpoint.xl;
  const imageDimensions = isMobile
    ? { width: 35, height: 35 }
    : { width: 55, height: 55 };

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

  // AUDIO PLAYER
  const [audio, setAudio] = useState(); // audio object
  const [progress, setProgress] = useState();

  const [isHost, setIsHost] = useState("");

  // HANDLE PLAYING
  const [isPlaying, setIsPlaying] = useState(false);
  const togglePlaying = (audio) => {
    // setIsPlaying(!isPlaying);

    socket.emit("post_is_host", {
      token,
      isHost: browserName,
      isPlaying: !isPlaying,
    });

    socket.on("get_is_host", (data) => {
      setIsHost(data.isHost);
      setIsPlaying(data.isPlaying);
    });
  };

  // ---------- HANDLE CURR SONG POSITION ----------
  const nextSong = (currentSongIndex) => {
    const index =
      currentSongIndex + 1 > songs.length - 1 ? 0 : currentSongIndex + 1;
    setCurrentSong(songs[index]);
  };
  const prevSong = (currentSongIndex) => {
    const index =
      currentSongIndex - 1 === -1 ? songs.length - 1 : currentSongIndex - 1;
    setCurrentSong(songs[index]);
  };
  // ---------- HANDLE CURR SONG POSITION ----------

  // serve per avere defined audio obejct
  const [loadedMeta, setLoadedMeta] = useState(false);

  // RANGE INPUT
  const rangeInputRef = useRef();
  const [mouseDownOnSlider, setMouseDownOnSlider] = useState(false);

  // EVENT HANDLERS FUNCTIONS
  const handleOnLoadMetadata = () => {
    setProgress((audio.currentTime * 100) / audio.duration);
    setLoadedMeta(true);
    rangeInputRef.current && (rangeInputRef.current.value = audio.currentTime);
  };

  const handleOnListen = () => {
    if (!mouseDownOnSlider) {
      socket.emit("post_song_data", {
        token,
        songData: {
          isPlaying,
          currentTime: audio.currentTime,
          duration: audio.duration,
          progress,
        },
        device: browserName,
      });

      setProgress((audio.currentTime * 100) / audio.duration);

      rangeInputRef.current &&
        (rangeInputRef.current.value = audio.currentTime);
    }
  };

  const handleOnMouseDown = () => {
    setMouseDownOnSlider(true);
  };

  const handleOnMouseUp = (e) => {
    setMouseDownOnSlider(false);
    audio.currentTime = parseInt(e.target.value);
  };

  useEffect(() => {
    // join this user's room
    socket.emit("join", { token, device: browserName });

    socket.on("get_is_host", ({ isHost, isPlaying }) => {
      setIsHost(isHost);
      setIsPlaying(isPlaying);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log("h: ", isHost);
    console.log("b: ", browserName);

    if (isHost === browserName) {
      isPlaying ? audio?.play() : audio?.pause();
      console.log("premuto in host");
    } else {
      console.log("premuto in other session");
      !isPlaying && audio?.pause();
    }
  }, [isPlaying]);

  if (loadedMeta && isHost) {
    socket.on(
      "get_song_data",
      ({ isPlaying, currentTime, duration, progress }) => {
        rangeInputRef.current.value = currentTime; // error on mobile
        setProgress((currentTime * 100) / duration);

        if (browserName !== isHost) {
          audio.currentTime = currentTime;
        }
      }
    );
  }

  if (currentSong && !loading) {
    // song data
    const coverUrl = currentSong.cover.url
        ? currentSong.cover.url
        : currentSong.album.cover.url,
      currentSongName = currentSong.name,
      artist = currentSong.album.artist.artname,
      artistUID = currentSong.album.artist.uid,
      currentSongFile = currentSong.file.url,
      songIndex = currentSong.index,
      explicitContent = currentSong.explicit;

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
              <p className="text-white song-details__name">{currentSongName}</p>
              <Link href={"/artist/" + artistUID}>
                <a className="text-decoration-none link-animation">
                  <p className="text-white song-details__artist">
                    {artist}
                    <span data-content={artist} aria-hidden="true"></span>
                  </p>
                </a>
              </Link>
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
                  onClickCapture={() => {
                    togglePlaying(audio);
                  }}
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
                    nextSong(songIndex);
                  }}
                  className="btn- bg-unset border-0"
                >
                  <Rewind className="btn-next" />
                </button>
              </div>

              <ReactAudioPlayer
                ref={(e) => {
                  setAudio(e?.audioEl.current);
                }}
                src={apiUri + currentSongFile}
                listenInterval={500}
                onLoadedMetadata={handleOnLoadMetadata}
                onListen={handleOnListen}
                // onSeeked={() => {}}
                // quando ha scaricato abbastanza per poter partire
                // onCanPlay={() => {
                //   console.log("can play");
                // }}
                // onPlay={() => {}}
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

              {loadedMeta && !isMobile && (
                <div className="playback-bar">
                  <input
                    className="form-range"
                    onMouseDown={handleOnMouseDown}
                    onMouseUp={handleOnMouseUp}
                    onChange={(e) => {
                      setProgress((e.target.value * 100) / audio.duration);
                    }}
                    min={0}
                    max={parseInt(audio.duration)}
                    ref={rangeInputRef}
                    type="range"
                    step="any"
                  />
                  <div
                    style={{
                      transform: `translateX(calc(-100% + ${progress}%))`,
                    }}
                    className="playback-bar__current-time"
                  ></div>
                </div>
              )}
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
                    transform: `translateX(calc(-100% + ${progress}%))`,
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
