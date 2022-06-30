// NEXT IMPORTS
import Head from 'next/head';
import Image from 'next/image'
import Link from 'next/link';

// APOLLO IMPORTS
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

// STYLES IMPORTS
import styles from '../styles/Home.module.css';

function Home({ posts }: any) {
  console.log('posts', posts)
  return (
    <div className={styles.container}>
      <Head>
        <title>Neo Hunt</title>
        <meta name="description" content="Product Hunt Neo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Neo Hunt
        </h1>

        <p className="text-3xl font-bold">
          Posts from Product Hunt
        </p>

        <div className={styles.grid}>
        {
          posts.map((post:any) => 
            <Link href={`/posts/${post.node.slug}`} key={post.node.id}>
              <a>
                <Image src={post.node.thumbnail.url} 
                  width={300} height={300}
                  className={styles.card}
                  alt="character"
                />
              </a>
            </Link>
          )
        }
        </div>
      </main>

      <footer className={styles.footer}>
        Coded with &#x1F9E1; by&nbsp;
        <a
          href="https://github.com/MathieuParadis"
          target="_blank"
          rel="noopener noreferrer"
          className="h1"
        >
          Mathieu
        </a>
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
