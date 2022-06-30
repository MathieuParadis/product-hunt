// APOLLO IMPORTS
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

function Post({ post }: any) {
  return (
    <div>
      <h1>{post.name}</h1>
    </div>
  )
}

export default Post;

export async function getServerSideProps(context:any) {
  const { postSlug = "" } = context.params;
  
  const client = new ApolloClient({
    uri: "https://api.producthunt.com/v2/api/graphql",
    cache: new InMemoryCache(), 
    headers: {
      authorization: `Bearer ${process.env.API_KEY}`
    }
  })

  const { data } = await client.query({
    query: gql`
      query GetPostBySlug($slug: String!) {
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
      `,
      variables: {
          slug: postSlug
      }
  });

  return {
    props: {
      post: data?.post,
    }
  }
}
