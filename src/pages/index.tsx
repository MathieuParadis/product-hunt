// NEXT IMPORTS
import Head from 'next/head';

// APOLLO IMPORTS
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

// STYLES IMPORTS
import styles from '../styles/Home.module.css';

function Home({ posts }) {
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

        <p className={styles.description}>
          Posts from Product Hunt
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
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

export async function getStaticProps() {
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
        posts(first: 50) { edges { node { id, name } } }
      }
    `
  });

  console.log('data', data);

  return {
    props: {
      posts: data.posts.edges,
    }
  }
}
