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
