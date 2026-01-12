import { gql } from "@apollo/client";

export const GET_THEME_CUSTOMIZATION = gql`
  query ThemeCustomization {
    themeCustomization {
      id
      type
      name
      status
      translations {
        id
        options {
          title
          css
          html
        }
      }
    }
  }
`;
