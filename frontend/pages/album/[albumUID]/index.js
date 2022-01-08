import {
  GET_ALBUMS_UID,
  GET_ALBUM_BY_UID,
} from "../../../graphql/queries/index";
import { queryClient } from "../../../apollo/utils";
import { formatAlbum } from "../../../utils";

export default function AlbumPage({ album }) {
  return (
    <div>
      <h1 className="text-white">album</h1>
    </div>
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
    fallback: false,
  };
}
