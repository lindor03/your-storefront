import { gql } from "@apollo/client";

export const GET_TREE_CATEGORIES = gql`
  query TreeCategories($parentId: Int) {
    homeCategories(
      getCategoryTree: true
      input: [
        { key: "status", value: "1" }
        { key: "parent_id", value: $parentId }
      ]
    ) {
      id
      position
      logoPath
      logoUrl
      status
      displayMode
      parentId
      name
      slug
      urlPath
      description
      metaTitle
      metaDescription
      metaKeywords

      children {
        id
        position
        logoPath
        logoUrl
        status
        displayMode
        parentId
        name
        slug
        urlPath
        description
        metaTitle
        metaDescription
        metaKeywords
      }
    }
  }
`;
