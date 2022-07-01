// NEXT IMPORTS
import Image from 'next/image'

// APOLLO IMPORTS
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

function Post({ post }: any) {
  return (
    <div className="container border w-screen px40">
      <div className="flex">
        <Image src={post.thumbnail.url} 
                  width={150} height={150}
                  alt="character"
        />
        <div>
          <h1 className="title">
            {post.name}
          </h1>
          <p className="">
            {post.tagline}
          </p>
        </div>
      </div>

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
