export const breakpoint = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

export async function validLoginRegister(operation, input, callback) {
  return fetch("/api/validate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      operation,
      input,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.valid) {
        // console.log("data yes: ", data);
        callback();
      } else {
        // console.log("data no: ", data);
        return data;
      }
    });
}

export function extractSongsMetadata(songs) {
  return songs.map((song) => {
    return {
      id: song.id,
      name: song.attributes.name,
      description: song.attributes.description,
      file: {
        url: song.attributes.file.data.attributes.url,
      },
      album: {
        id: song.attributes.album.data.id,
        name: song.attributes.album.data.attributes.name,
        description: song.attributes.album.data.attributes.description,
        genre: song.attributes.album.data.attributes.genre,
        coverUrl:
          song.attributes.album.data.attributes.cover.data.attributes.url,
      },
      artist: {
        id: song.attributes.album.data.attributes.artist.data.id,
        artname:
          song.attributes.album.data.attributes.artist.data.attributes.artname,
        description:
          song.attributes.album.data.attributes.artist.data.attributes
            .description,
      },
    };
  });
}

export function extractSongMetadata(song) {
  return {
    id: song.data.id,
    name: song.data.attributes.name,
    description: song.data.attributes.description,
    file: {
      url: song.data.attributes.file.data.attributes.url,
    },
    cover: {
      url: song.data.attributes.cover.data?.attributes.url,
    },
    album: {
      id: song.data.attributes.album.data.id,
      name: song.data.attributes.album.data.attributes.name,
      description: song.data.attributes.album.data.attributes.description,
      genre: song.data.attributes.album.data.attributes.genre,
      releaseDate: song.data.attributes.album.data.attributes.releaseDate,
      cover: {
        url: song.data.attributes.album.data.attributes.cover.data.attributes
          .url,
      },
      artist: {
        id: song.data.attributes.album.data.attributes.artist.data.id,
        artname:
          song.data.attributes.album.data.attributes.artist.data.attributes
            .artname,
        description:
          song.data.attributes.album.data.attributes.artist.data.attributes
            .description,
      },
    },
  };
}
