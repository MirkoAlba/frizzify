import { GET_ARTISTS, GET_ARTIST_BY_UID } from "../../../graphql/queries";
import { queryClient } from "../../../apollo/utils";
import { formatArtists } from "../../../utils/index";

import Hero from "../../../components/artist/hero";
import { Fragment } from "react";

export default function ArtistPage({ artist }) {
  return (
    <Fragment>
      <Hero artist={artist} />
    </Fragment>
  );
}

export async function getStaticProps(ctx) {
  const { artistUID } = ctx.params;
  const { data } = await queryClient({
    query: GET_ARTIST_BY_UID,
    variables: {
      uid: {
        contains: artistUID,
      },
    },
  });

  return {
    props: { artist: formatArtists(data.artists.data) },
  };
}

export async function getStaticPaths() {
  const { data } = await queryClient({ query: GET_ARTISTS });
  const artists = formatArtists(data.artists.data);

  return {
    // ritorno tutti i possibili path da pre-renderizzare
    paths: artists.map((a) => {
      return {
        params: {
          artistUID: a.uid,
        },
      };
    }),
    fallback: false,
  };
}
