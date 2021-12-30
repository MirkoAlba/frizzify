import { useState, useEffect } from "react";

import { SONG } from "../../graphql/queries/index";
import { useQuery } from "@apollo/client";
import { extractSongMetadata } from "../../utils/index";
import { uri } from "../../apollo/api";

export default function PlayingNowBar() {
  const [song, setSong] = useState();
  useQuery(SONG, {
    onCompleted: (d) => setSong(extractSongMetadata(d.song)),
  });

  var audio;
  if (typeof Audio !== "undefined") {
    audio = new Audio();
  }

  console.log(audio);

  return <div className="player-main__bar bg-bar"></div>;
}
