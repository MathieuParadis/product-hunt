// NEXT IMPORTS
import Head from 'next/head';

// REACT IMPORTS
import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';

// APOLLO IMPORTS
import { useQuery } from "@apollo/client";
import client from '../apolloConfig';
import { GET_POSTS, GET_TOPICS } from '../queries';

// COMPONENTS IMPORTS
import Footer from '../components/Footer';
import PostCard from '../components/PostCard';

function Home({ topics }: any) {
  const [posts, setPosts] = useState<any[]>([]);
  const [category, setCategory] = useState(false);

  const GetPostsVariables = { topic: "", after: "" };
  const { data, loading, error, refetch } = useQuery(GET_POSTS, {client: client, variables: GetPostsVariables, fetchPolicy: 'network-only'});

  const loadMore = () => {
    refetch({ 
      after: data.posts.pageInfo.endCursor,
    });
  }

  const changeCategory = (cat: string) => {
    setCategory(true);
    window.scrollTo({top: 0, behavior: 'smooth'});
    refetch({ 
      after: "",
      topic: cat
    });
  }

  useEffect(() => { 
    if (data && !category)  {
      const previousPosts = posts;
      setPosts([...previousPosts, ...data.posts.edges]);
    } else if (data && category) {
      setCategory(false);
      setPosts(data.posts.edges);
    }
  }, [data]);

  return (
    <>
      <div className="container grow">
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

          {
            loading && (
              (
                <div>
                  <p className="mb-3">
                    Loading
                  </p>
                  <ReactLoading type="spinningBubbles" color="#3385d6" height="50%" width="50%"/>
                </div>
              )
            )
          }

          {
            error && (
              (
                <p className="text-2xl">
                  Something wrong happened. Please try again!
                </p>
              )
            )
          }

          { data && topics && 
            (
              // <select className="mb-10" onChange={(e) => changeCategory(e.target.value)}>
              <select className="mb-10" onChange={(e) => changeCategory(e.target.value)}>
                <option defaultValue=""> -- Select a topic -- </option>
                {
                  topics?.map((topic:any) =>
                    (
                      <option key={topic.node.id} value={topic.node.slug}>{topic.node.name}</option>
                    )
                  )
                } 
              </select>
            )
          }

          {
            data && (
              (
                <div className="posts mb-10">
                  { 
                    posts?.map((post:any) => 
                      <PostCard post={post} key={post.node.id} />
                    )
                  }
                </div>
              )
            )
          }

          {
            data?.posts.pageInfo.hasNextPage && (
              <div>
                <button 
                  type="button"
                  className="button bg-blue-600 w-40"
                  onClick={() => loadMore()}
                >
                  Load More
                </button>
              </div>
            )
          }
        </main>
      </div>
      <Footer />
    </>
  )
};

export default Home;

export async function getServerSideProps() {
  const { data } = await client.query({ query: GET_TOPICS });
  
  return {
    props: {
      topics: data?.topics.edges
    }
  }
}
