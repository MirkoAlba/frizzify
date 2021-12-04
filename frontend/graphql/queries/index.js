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
