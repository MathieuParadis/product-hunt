// NEXT IMPORTS
import Head from 'next/head';

// REACT IMPORTS
import React, {useEffect, useState} from 'react';

// APOLLO IMPORTS
import { useQuery } from "@apollo/client";
import client from '../apolloConfig';
import { GET_POSTS } from '../queries';

// COMPONENTS IMPORTS
import PostCard from '../components/PostCard';

function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [category, setCategory] = useState("");
  const [cursor, setCursor] = useState("");
  
  const GetPostsVariables = { topic: category, after: cursor };
  const { data, loading, error, refetch } = useQuery(GET_POSTS, {client: client, variables: GetPostsVariables});

  const test = () => {
    refetch({ topic: category, after: cursor });
    console.log("refetching", data.posts.pageInfo.startCursor);
  }

  useEffect(() => { 
    if (data)  {
      setPosts(data.posts.edges);
      setCursor(data.posts.pageInfo.startCursor);
      setCategory("");
      console.log(data.posts.pageInfo.startCursor);
      console.log("cursor", cursor)
    }  
  }, [data]);

  if (loading) return <h3>Loading</h3>
  if (error) return <h3>Error</h3>

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
          posts?.map((post:any) => 
            <PostCard post={post} key={post.node.id} />
          )
        }

      <button type="button" onClick={() => test()}>
        Next
      </button>


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
