import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation register($input: UsersPermissionsRegisterInput!) {
    register(input: $input) {
      user {
        id
        username
        email
      }
      jwt
    }
  }
`;

export const LOGIN = gql`
  mutation login($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`;

// data: {
//     users_permissions_user: 29
//     songs: [2, 3, 4]
//     currentSongData: { ciao: "ciao" } <-- JSON
//   }
export const CREATE_QUEUE = gql`
  mutation createQueue($data: QueueInput!) {
    createQueue(data: $data) {
      data {
        id
        attributes {
          currentSongData
          songs {
            data {
              id
              attributes {
                file {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                name
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
                      releaseDate
                      genre
                      artist {
                        data {
                          id
                          attributes {
                            artname
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

// data: { users_permissions_user: 29, songs: [], currentSongData: { ciao: "ciaone" } }
export const UPDATE_QUEUE = gql`
  mutation updateQueue($id: ID!, $data: QueueInput!) {
    updateQueue(id: $id, data: $data) {
      data {
        id
        attributes {
          songs {
            data {
              id
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
