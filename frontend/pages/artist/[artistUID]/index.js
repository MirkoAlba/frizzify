import { Fragment } from "react";
import { Container, Row } from "react-bootstrap";

import {
  GET_ARTISTS,
  GET_ARTIST_BY_UID,
  GET_ARTIST_ALBUMS,
} from "../../../graphql/queries";
import { queryClient } from "../../../apollo/utils";
import { useQuery } from "@apollo/client";

import { formatArtists, formatAlbums } from "../../../utils/index";

import Hero from "../../../components/artist/hero";
import Card from "../../../components/card";

export default function ArtistPage({ artist }) {
  const artistData = artist[0];

  const { data, loading, error } = useQuery(GET_ARTIST_ALBUMS, {
    variables: {
      pagination: { limit: 5 },
      artist: { id: { eq: artistData.id } },
    },
  });

  data && (data = formatAlbums(data.albums.data));

  return (
    <Fragment>
      <Hero artist={artistData} />
      <section className="artist__albums">
        {error ? (
          <h2 className="text-white">errore....</h2>
        ) : loading && !data ? (
          <h2 className="text-white">loading....</h2>
        ) : (
          <Container fluid>
            <Row className="mb-30 mb-md-45">
              <h5 className="text-white">Albums</h5>
              {data.map((d) => {
                return <Card key={d.id} data={d} />;
              })}
            </Row>
          </Container>
        )}
      </section>
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
    revalidate: 60,
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
    fallback: true,
  };
}
