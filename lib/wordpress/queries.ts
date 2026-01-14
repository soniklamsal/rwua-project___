// Basic WordPress GraphQL queries for future use

export const GET_GENERAL_SETTINGS = `
  query GetGeneralSettings {
    generalSettings {
      title
      description
      url
      language
      dateFormat
      timeFormat
    }
  }
`;

export const GET_IMPACT_HERO_DATA = `
query GetImpactHeroData {
  impactHeroes(first: 1) {
    nodes {
      title
      impactHeroFields {
        heroSubtitle
        heroTitle1
        heroTitleItalic
        heroTitle2
        heroTitleEnd
        heroVision
        heroMission
        heroBadgeNum
        heroQuote
        # Ensure 'heroImage' Return Format is set to "Image Array" in ACF
        heroImage {
          node {
            sourceUrl
            mediaItemUrl
            altText
            caption
          }
        }
      }
    }
  }
}
`;

export const GET_MISSION_SECTION = `
  query GetMissionSection {
    missions(first: 1) {
      nodes {
        missionFields {
          missionTitle1
          missionTitleItalic
          missionGoal
          missionCtaText
          missionCards {
            cardLabel
            cardImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_FOCUS_AREAS_SECTION = `
  query GetFocusAreasSection {
    focusArea(id: "focusarea", idType: SLUG) {
      title
      focusAreaFieldsType {
        focusCards {
          title
          desc
          metric
        }
      }
    }
  }
`;

export const GET_ALL_SHOWCASE_MEMBERS = `
  query GetAllShowcaseMembers {
  showcaseMembers {
    nodes {
      id
      title
      showcaseMemberFieldsType {
        members {
          name
          nepaliName
          role
          quote
          phone
          # Ensure Return Format in ACF is "Image Array"
          memberUrl {
            node {
              sourceUrl
              mediaItemUrl
            }
          }
          bgImage {
            node {
              sourceUrl
              mediaItemUrl
            }
          }
        }
      }
    }
  }
}
`;

export const GET_ABOUT_SECTION_DATA = `
  query GetAboutSectionData {
    aboutFields {
      nodes {
        aboutPageFieldsType {
          sectionTitle
          sectionTitleItalic
          nepaliDescription
          imageStack {
            tagline
            cardImage {
              node {
                id
                sourceUrl
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_GALLERY_DATA = `
  query GetGalleryData {
    galleryItems {
      nodes {
        id
        title
        galleryFields {
          galleryItems {
            title
            category
            image {
              node {
                id
                sourceUrl
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_RESOURCE_DATA = `
  query GetResourceData {
    resources {
      nodes {
        title
        resourceFields {
          category
          releaseDate
          file {
            node {
              mediaItemUrl
              fileSize
              mimeType
            }
          }
        }
      }
    }
  }
`;

export const GET_PARTNER_LOGOS = `
  query GetPartnerLogos {
    partners {
      nodes {
        id
        title
        partnerFields {
          partnersList {
            partnerName
            logo {
              node {
                sourceUrl
                mediaItemUrl
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_LATEST_NEWS = `
  query GetLatestNews {
    posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        title
        date
        excerpt
        slug
        categories {
          nodes {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;

export const GET_VOICES_OF_IMPACT = `
  query GetVoicesOfImpact {
    posts(where: { categoryName: "Voices of Impact" }, first: 3) {
      nodes {
        id
        title
        excerpt
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
          }
        }
      }
    }
  }
`;

export const GET_POSTS = `
  query GetPosts($first: Int = 10, $after: String) {
    posts(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        id
        title
        content
        excerpt
        slug
        date
        modified
        status
        author {
          node {
            name
            slug
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        tags {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;

export const GET_POST_BY_SLUG = `
  query GetPostBySlug($slug: String!) {
    postBy(slug: $slug) {
      id
      title
      content
      excerpt
      slug
      date
      modified
      status
      author {
        node {
          name
          slug
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      tags {
        nodes {
          name
          slug
        }
      }
    }
  }
`;

export const GET_PAGES = `
  query GetPages($first: Int = 10) {
    pages(first: $first) {
      nodes {
        id
        title
        content
        slug
        date
        modified
        status
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
      }
    }
  }
`;

export const GET_PAGE_BY_SLUG = `
  query GetPageBySlug($slug: String!) {
    pageBy(slug: $slug) {
      id
      title
      content
      slug
      date
      modified
      status
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
    }
  }
`;