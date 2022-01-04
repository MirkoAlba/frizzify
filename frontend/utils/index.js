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

export function formatSongs(songs) {
  return songs.map((song, index) => {
    return {
      index,
      id: song.id,
      name: song.attributes.name,
      description: song.attributes.description,
      explicit: song.attributes.explicit,
      file: {
        url: song.attributes.file.data.attributes.url,
      },
      cover: {
        url: song.attributes.cover.data?.attributes.url,
      },
      album: {
        id: song.attributes.album.data.id,
        name: song.attributes.album.data.attributes.name,
        description: song.attributes.album.data.attributes.description,
        genre: song.attributes.album.data.attributes.genre,
        releaseDate: song.attributes.album.data.attributes.releaseDate,
        cover: {
          url: song.attributes.album.data.attributes.cover.data.attributes.url,
        },
        artist: {
          id: song.attributes.album.data.attributes.artist.data.id,
          artname:
            song.attributes.album.data.attributes.artist.data.attributes
              .artname,
          description:
            song.attributes.album.data.attributes.artist.data.attributes
              .description,
        },
      },
    };
  });
}

export function formatSong(song) {
  return {
    index: song.index,
    id: song.data.id,
    name: song.data.attributes.name,
    description: song.data.attributes.description,
    explicit: song.data.attributes.explicit,
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

export const formatArtists = (artists) => {
  return artists.map((a) => {
    return {
      id: a.id,
      uid: a.attributes.uid,
      artname: a.attributes.artname,
      description: a.attributes.description,
      picture: a.attributes.picture.data.attributes.url,
    };
  });
};

export function convertDuration(time) {
  var mins = Math.floor(time / 60);
  mins = String(mins);
  var secs = Math.floor(time % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }

  return mins + ":" + secs;
}
