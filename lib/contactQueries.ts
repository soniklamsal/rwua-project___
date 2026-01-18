import { gql } from '@apollo/client';

// GraphQL query to fetch contact posts with ACF fields
export const GET_CONTACT_CARDS = gql`
  query GetContactCards {
    contactUs(first: 100, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        id
        title
        slug
        menuOrder
        contactCardFields {
          label
          value
          link
          icon
        }
      }
    }
  }
`;