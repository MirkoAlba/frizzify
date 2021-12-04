import { gql } from "@apollo/client";

export const SONGS = gql`
  query s {
    songs {
      id
      name
      description
    }
  }
`;
