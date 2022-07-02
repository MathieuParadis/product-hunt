import { gql } from '@apollo/client';

  const GET_POSTS = gql`
    query GetPosts ($topic: String, $cursor: String) {
      posts(topic: $topic, after: $cursor) {
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
        url, 
        website,
        media {url}, 
        thumbnail {url},
        makers {
          name
        }
      }
    }
  `;

export { GET_POSTS, GET_POST};
