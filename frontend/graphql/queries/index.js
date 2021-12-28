import { gql } from "@apollo/client";

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
                name
                url
              }
            }
          }
          cover {
            data {
              attributes {
                name
                url
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
