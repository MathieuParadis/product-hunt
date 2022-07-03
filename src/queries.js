import { gql } from '@apollo/client';

  const GET_POSTS = gql`
    query GetPosts ($topic: String, $before: String, $after: String) {
      posts(topic: $topic, before: $before, after: $after) {
        pageInfo {
          startCursor,
          endCursor
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

export { GET_POSTS, GET_POST};
