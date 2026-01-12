import { gql } from "@apollo/client";

export const GET_HOME_CATEGORIES = gql`
  query HomeCategories {
    homeCategories(
      getCategoryTree: false
      input: [{ key: "status", value: "1" }]
    ) {
      id
      position
      logoPath
      logoUrl
      status
      name
      slug
      urlPath
    }
  }
`;
