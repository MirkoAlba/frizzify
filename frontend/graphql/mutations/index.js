import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation register($input: UsersPermissionsRegisterInput!) {
    register(input: $input) {
      user {
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
        username
        email
      }
    }
  }
`;
