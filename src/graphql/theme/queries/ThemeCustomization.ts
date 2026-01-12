import { gql } from "@apollo/client";

export const GET_THEME_CUSTOMIZATION = gql`
  query ThemeCustomization {
    themeCustomization {
      id
      themeCode
      type
      name
      sortOrder
      status
      channelId
      createdAt
      updatedAt
      translations {
        id
        themeCustomizationId
        localeCode
        options {
          title
          css
          html

          links {
            url
            slug
            type
            id
          }

          images {
            link
            image
            title
            imageUrl
          }

          column_1 {
            url
            title
            sortOrder
          }

          column_2 {
            url
            title
            sortOrder
          }

          column_3 {
            url
            title
            sortOrder
          }

          services {
            title
            description
            serviceIcon
          }
        }
      }
    }
  }
`;
