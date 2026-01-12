import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query Categories {
    categories {
      data {
        id
        position
        logoPath
        status
        translation {
          name
          slug
          urlPath
          description
          metaTitle
        }
      }
    }
  }
`;
