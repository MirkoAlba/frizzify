import { Ratio } from "react-bootstrap";

import Link from "next/link";
import Image from "next/image";

import { usePalette } from "react-palette";

import { uri as apiUrl } from "../../apollo/api";

import dayjs from "dayjs";

export default function AlbumHero({ album }) {
  const { data, loading } = usePalette(apiUrl + album.coverUrl);
  const { artist } = album;
  const releaseDateFormatted = dayjs(album.releaseDate).format("YYYY");
  // console.log(album);

  return (
    <div
      style={{
        background: `linear-gradient(180deg, ${
          loading ? "black" : data.darkVibrant
        } 10%, black 100%)`,
      }}
      className="album-hero p-3 d-flex align-items-end"
    >
      <Ratio aspectRatio="1x1" className="position-relative">
        <Image
          src={apiUrl + album?.coverUrl}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          placeholder="blur"
          blurDataURL={album.blurredCover}
          alt={"Frizzifi Album - " + album.name}
        />
      </Ratio>

      <div className="text-white ms-3">
        <p className="text-uppercase mb-0">Album</p>
        <h1>{album.name}</h1>

        <div className="d-flex align-items-center">
          <div className="position-relative artist-icon">
            <Image
              src={apiUrl + artist.picture}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              placeholder="blur"
              blurDataURL={artist.blurredPicture}
              alt={"Frizzifi Artist - " + artist.artname}
            />
          </div>

          <Link href={"/artist/" + artist.uid}>
            <a className="text-decoration-none link-animation">
              <p className="mb-0 ms-2 position-relative">
                {artist.artname}
                <span data-content={artist.artname} aria-hidden="true"></span>
              </p>
            </a>
          </Link>

          <p className="mb-0 ms-2 opacity-50">{releaseDateFormatted}</p>
          <p className="mb-0 ms-2 opacity-50">{album.songs.length} brani</p>
        </div>
      </div>
    </div>
  );
}
