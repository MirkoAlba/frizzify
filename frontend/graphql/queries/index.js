import { gql } from "@apollo/client";

export const SONG = gql`
  query song {
    song(id: 2) {
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
                name
                description
                file {
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
                      genre
                      releaseDate
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

export const QUEUE = gql`
  query {
    queue(id: 2) {
      data {
        attributes {
          songs {
            data {
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;
