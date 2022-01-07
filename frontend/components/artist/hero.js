import { Fragment } from "react";
import { Row, Col } from "react-bootstrap";

import Image from "next/image";

import Verified from "../../assets/verified.svg";

import { uri as apiUrl } from "../../apollo/api";

export default function ArtistHero({ artist }) {
  const data = artist[0];

  return (
    <Fragment>
      <div className="artist-hero position-relative d-flex align-items-end justify-content-center justify-content-xl-start px-3">
        <Image
          src={apiUrl + data.picture}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          placeholder="blur"
          blurDataURL={data.blurredPicture}
          alt={"Frizzifi Artist - " + data.artname}
        />
        <h1 className="position-relative text-white">{data.artname}</h1>
      </div>
    </Fragment>
  );
}
