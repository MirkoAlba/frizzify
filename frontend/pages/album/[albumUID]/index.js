import { Fragment } from "react";

import {
  GET_ALBUMS_UID,
  GET_ALBUM_BY_UID,
} from "../../../graphql/queries/index";
import { queryClient } from "../../../apollo/utils";
import { formatAlbum } from "../../../utils";

import AlbumHero from "../../../components/album/hero";

export default function AlbumPage({ album }) {
  return (
    <Fragment>
      <AlbumHero album={album} />
    </Fragment>
  );
}

export async function getStaticProps(ctx) {
  const { albumUID } = ctx.params;
  const { data } = await queryClient({
    query: GET_ALBUM_BY_UID,
    variables: {
      uid: {
        eq: albumUID,
      },
    },
  });

  return {
    props: { album: formatAlbum(data.albums.data[0]) },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const { data } = await queryClient({ query: GET_ALBUMS_UID });

  return {
    // ritorno tutti i possibili path da pre-renderizzare
    paths: data.albums.data.map((a) => {
      return {
        params: {
          albumUID: a.attributes.uid,
        },
      };
    }),
    fallback: true,
  };
}
