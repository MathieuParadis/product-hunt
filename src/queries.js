import { gql } from '@apollo/client';

  const GET_POSTS = gql`
    query GetPosts ($topic: String, $after: String) {
      posts(topic: $topic, after: $after) {
        pageInfo {
          endCursor,
          hasNextPage
        },
        edges { 
          node {
            id,
            name,
            tagline,
            slug,
            thumbnail {
              url
            }
          } 
        } 
      }
    }
  `

  const GET_POST = gql`
    query GetPostBySlug($slug: String) {
      post(slug: $slug) {
        id, 
        name,
        tagline,
        description,
        topics {
          edges {
            node {
              id,
              name
            }
          }
        },
        url, 
        website,
        media {
          url
        }, 
        thumbnail {
          url
        },
        makers {
          id,
          name
        }
      }
    }
  `;

const GET_TOPICS = gql`
  query GetPostBySlug {
    topics (first: 10) {
      edges {
        node {
          id, 
          name,
          slug
        }
      }
    }
  }
`;

export { GET_POSTS, GET_POST, GET_TOPICS };
