import Image from "next/image";

import Verified from "../../assets/verified.svg";

import { uri as apiUrl } from "../../apollo/api";

export default function ArtistHero({ artist }) {
  return (
    <div className="artist-hero position-relative d-flex align-items-end px-3">
      <Image
        src={apiUrl + artist.picture}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        placeholder="blur"
        blurDataURL={artist.blurredPicture}
        alt={"Frizzifi Artist - " + artist.artname}
      />
      <div className="artist__content position-relative">
        {artist.verified && <Verified />}
        <h1 className=" text-white">{artist.artname}</h1>
        {/* TODO: monthly listeners */}
        <p className="text-white">ascoltatori mensili</p>
      </div>
    </div>
  );
}
