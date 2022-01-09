import { gql } from "@apollo/client";

export const SONG = gql`
  query song {
    song(id: 2) {
      data {
        id
        attributes {
          explicit
          name
          description
          file {
            data {
              attributes {
                url
                size
              }
            }
          }
          cover {
            data {
              attributes {
                url
              }
            }
          }
          album {
            data {
              id
              attributes {
                uid
                name
                description
                releaseDate
                genre
                cover {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                artist {
                  data {
                    id
                    attributes {
                      verified
                      uid
                      artname
                      description
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const SONGS = gql`
  query {
    songs {
      data {
        id
        attributes {
          explicit
          name
          description
          file {
            data {
              attributes {
                url
                size
              }
            }
          }
          cover {
            data {
              attributes {
                url
              }
            }
          }
          album {
            data {
              id
              attributes {
                uid
                name
                cover {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                genre
                artist {
                  data {
                    id
                    attributes {
                      verified
                      uid
                      artname
                      description
                    }
                  }
                }
                description
              }
            }
          }
        }
      }
    }
  }
`;

export const BLOCCHI_TESTO_IMMAGINE = gql`
  query {
    landing {
      data {
        attributes {
          blocchiTestoImmagine {
            __typename
            ... on ComponentBloccoBloccoTestoImmagine {
              id
              layoutInvertito
              titolo
              testo
              backgroundColor
              immagine {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const SLIDER = gql`
  query {
    landing {
      data {
        attributes {
          slider {
            __typename
            ... on ComponentBloccoSlider {
              id
              titolo
              description
              slide {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const ME = gql`
  query Me {
    me {
      id
      username
    }
  }
`;

export const QUEUES = gql`
  query {
    queues {
      data {
        id
        attributes {
          users_permissions_user {
            data {
              id
              attributes {
                username
                email
              }
            }
          }
          songs {
            data {
              id
              attributes {
                explicit
                name
                description
                file {
                  data {
                    attributes {
                      url
                      size
                    }
                  }
                }
                cover {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                album {
                  data {
                    id
                    attributes {
                      uid
                      name
                      cover {
                        data {
                          attributes {
                            url
                          }
                        }
                      }
                      genre
                      artist {
                        data {
                          id
                          attributes {
                            verified
                            uid
                            artname
                            description
                          }
                        }
                      }
                      description
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

// filters: { users_permissions_user: { id: { contains: 29 } } }
export const USER_QUEUES = gql`
  query userQueues($filters: QueueFiltersInput) {
    queues(filters: $filters) {
      data {
        id
      }
    }
  }
`;

export const GET_ARTISTS = gql`
  query {
    artists {
      data {
        id
        attributes {
          verified
          uid
          artname
          picture {
            data {
              attributes {
                url
              }
            }
          }
          description
          albums {
            data {
              id
              attributes {
                uid
                releaseDate
                description
                songs {
                  data {
                    id
                    attributes {
                      name
                      description
                      file {
                        data {
                          attributes {
                            url
                            size
                          }
                        }
                      }
                      cover {
                        data {
                          attributes {
                            url
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

// { uid: { contains: "the-weeknd" } }
export const GET_ARTIST_BY_UID = gql`
  query artistsByUID($filters: ArtistFiltersInput) {
    artists(filters: $filters) {
      data {
        id
        attributes {
          artname
          verified
          description
          uid
          picture {
            data {
              attributes {
                url
              }
            }
          }
          albums {
            data {
              id
              attributes {
                uid
                releaseDate
                genre
                name
                cover {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                songs {
                  data {
                    id
                    attributes {
                      name
                      description
                      cover {
                        data {
                          attributes {
                            url
                          }
                        }
                      }
                      file {
                        data {
                          attributes {
                            url
                            size
                          }
                        }
                      }
                      explicit
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_ALBUMS_UID = gql`
  query {
    albums {
      data {
        id
        attributes {
          uid
        }
      }
    }
  }
`;

// { album: { uid: { eq: 1 } } }
export const GET_ALBUM_BY_UID = gql`
  query getAlbumsByUid($filters: AlbumFiltersInput) {
    albums(filters: $filters) {
      data {
        id
        attributes {
          name
          releaseDate
          genre
          uid
          description

          cover {
            data {
              attributes {
                url
              }
            }
          }

          artist {
            data {
              id
              attributes {
                artname
                description
                uid
                verified

                picture {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }

          songs {
            data {
              id
              attributes {
                name
                description

                explicit

                cover {
                  data {
                    attributes {
                      url
                    }
                  }
                }

                file {
                  data {
                    attributes {
                      url
                      size
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

// { artist: { id: { eq: 1 } } }
export const GET_ARTIST_ALBUMS = gql`
  query artistAlbums($filters: AlbumFiltersInput) {
    albums(filters: $filters) {
      data {
        id
        attributes {
          uid
          name
          releaseDate
          genre
          description
          cover {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;
