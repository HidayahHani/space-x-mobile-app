import { gql } from "@apollo/client";

export const GET_ROCKETS = gql`
  query GetRockets {
    rockets {
      id
      name
      country
      active
      company
    }
  }
`;

export const GET_ROCKET = gql`
  query GetRocket($id: ID!) {
    rocket(id: $id) {
      name
      description
      company
      country
      type
      active
    }
  }
`;
