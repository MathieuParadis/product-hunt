// NEXT IMPORTS
import Head from 'next/head';
import Image from 'next/image'
import Link from 'next/link';

// APOLLO IMPORTS
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

function Home({ posts }: any) {
  console.log('posts', posts)
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
            <div className="card">
              <Image src={post.node.thumbnail.url} 
                width={200} height={200}
                alt="character"
              />
              <div className="overlay" />
              <div className="post-details">
                <h2 className="text-white text-center text-3xl pb-6">
                  {post.node.name}
                </h2>
                <p className="text-white text-center pb-4">
                  {post.node.tagline}
                </p>
                <Link href={`/posts/${post.node.slug}`} key={post.node.id}>
                  <a className="button">
                    Learn more
                  </a>
                </Link>
              </div>
            </div>
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
        posts(topic: "") {
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

  console.log('data', data);

  return {
    props: {
      posts: data?.posts.edges,
    }
  }
}
