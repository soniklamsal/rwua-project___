// GraphQL queries specifically for Success Stories

import { gql } from '@apollo/client';

// GraphQL query to fetch WordPress posts with category information for success stories
export const GET_SUCCESS_STORY_POSTS = gql`
  query GetSuccessStoryPosts {
    posts(first: 50, where: { 
      orderby: { field: DATE, order: DESC },
      status: PUBLISH
    }) {
      nodes {
        id
        title
        excerpt
        content
        date
        slug
        featuredImage {
          node {
            sourceUrl
            mediaItemUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
            parent {
              node {
                name
                slug
              }
            }
          }
        }
        author {
          node {
            name
          }
        }
      }
    }
  }
`;

// GraphQL query to fetch a specific success story post by slug
export const GET_SUCCESS_STORY_BY_SLUG = gql`
  query GetSuccessStoryBySlug($slug: String!) {
    postBy(slug: $slug) {
      id
      title
      excerpt
      content
      date
      slug
      featuredImage {
        node {
          sourceUrl
          mediaItemUrl
          altText
        }
      }
      categories {
        nodes {
          name
          slug
          parent {
            node {
              name
              slug
            }
          }
        }
      }
      author {
        node {
          name
        }
      }
    }
  }
`;

// Test query for WordPress connection (reusable)
export const TEST_WORDPRESS_CONNECTION = gql`
  query TestWordPressConnection {
    generalSettings {
      title
      url
      description
    }
  }
`;