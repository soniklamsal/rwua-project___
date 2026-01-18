import { gql } from '@apollo/client';

// Clean GraphQL query using vacancyFields ACF group
// Field names match WPGraphQL schema exactly
export const GET_VACANCIES = gql`
  query GetVacancies {
    vacancies(first: 100) {
      nodes {
        id
        title
        slug
        vacancyFields {
          jobTitle
          shortDescription
          employmentType
          jobCategory
          jobLocation
          applicationDeadline
          vacancyStatus
          cardImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  }
`;
