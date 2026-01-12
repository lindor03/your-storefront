import { gql } from "@apollo/client";

export const GET_HOME_CATEGORIES = gql`
  query HomeCategories {
    homeCategories {
      id
      position
      logoPath
      translation {
        id
        name
        slug
      }
    }
  }
`;
