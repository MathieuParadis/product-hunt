// NEXT IMPORTS
import Head from 'next/head';

// APOLLO IMPORTS
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

// COMPONENTS IMPORTS
import PostCard from '../components/PostCard.tsx';

function Home({ posts, startCursor, endCursor }: any) {
  console.log('posts', posts, startCursor, endCursor);
  return (
    <div className="container">
      <Head>
        <title>Neo Hunt</title>
        <meta name="description" content="Product Hunt Neo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className="title">
          Welcome to&nbsp;
          <span className="text-orange-500">
          Neo Hunt
          </span>
        </h1>

        <p className="text-3xl text-center font-bold mt-4 mb-8">
          Popular posts from Product Hunt
        </p>

        <div className="posts">
        {
          posts.map((post:any) => 
            <PostCard post={post} key={post.node.id} />
          )
        }
        </div>
      </main>

      <footer className="footer">
        <div>
          Coded with &#x1F9E1; by&nbsp;
          <a 
            href="https://github.com/MathieuParadis"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mathieu
          </a>
        </div>
        &nbsp;&nbsp; &#8212; &nbsp;&nbsp;
        <div>
          Credits:&nbsp;
          <a 
            href="https://www.producthunt.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Product Hunt
          </a>
        </div>
      </footer>
    </div>
  )
};

export default Home;

export async function getServerSideProps() {
  const client = new ApolloClient({
    uri: "https://api.producthunt.com/v2/api/graphql",
    cache: new InMemoryCache(), 
    headers: {
      authorization: `Bearer ${process.env.API_KEY}`
    }
  })

  const { data } = await client.query({
    query: gql`
      query GetPosts {
        posts(topic: "", after: "") {
          pageInfo {
            endCursor,
            startCursor
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
  });

  return {
    props: {
      posts: data?.posts.edges,
      startCursor: data?.posts.pageInfo.startCursor,
      endCursor: data?.posts.pageInfo.endCursor
    }
  }
}
