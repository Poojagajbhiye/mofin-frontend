import { gql } from 'apollo-angular';

export const REGISTER_MUTATION = gql`
  mutation Register(
    $name: String!
    $email: String!
    $password: String!
    $parentId: ID
  ) {
    register(name: $name, email: $email, password: $password, parentId: $parentId) {
      token
      user {
        id
        name
        role
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        role
      }
    }
  }
`;

