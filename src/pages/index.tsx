// NEXT IMPORTS
import Head from 'next/head';

// REACT IMPORTS
import React, {useEffect, useState} from 'react';
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
  const [category, setCategory] = useState("");

  const GetPostsVariables = { topic: "", after: "" };
  const { data, loading, error, refetch } = useQuery(GET_POSTS, {client: client, variables: GetPostsVariables, fetchPolicy: 'network-only'});

  const next = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
    refetch({ 
      after: data.posts.pageInfo.endCursor,
      topic: category  
    })
  }

  const changeCategory = (category: any) => {
    window.scrollTo({top: 0, behavior: 'smooth'});
    refetch({ 
      topic: category
    })
  }

  useEffect(() => { 
    if (data)  {
      setPosts(data.posts.edges);
    }  
  }, [data]);

  useEffect(() => { 
    if (category)  {
      refetch({ 
        topic: category 
      })
    }  
  }, [category]);

  // if (loading) return <h3>Loading</h3>
  if (error) return <h3>Error</h3>

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
                <div className="">
                  <p className="mb-3">
                    Loading
                  </p>
                  <ReactLoading type="spinningBubbles" color="#3385d6" height="200%" width="200%"/>
                </div>
              )
            )
          }

          <select className="select-form-control" value={category} onChange={(e) => changeCategory(e.target.value)}>
            {
              topics?.map((topic:any) =>
              // <Fragment key={topic.node.id}>
              // {
              //   topics[0].node.id === topic.node.id && 
              //   <option defaultValue=""> -- Select a topic -- </option> 
              // }
              <option value={topic.node.name}>{topic.node.name}</option>
            // <Fragment />

              )
            }
          </select>



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
            data && posts && (
              <div>


                {/* <button 
                  type="button"
                  className="button bg-blue-600 w-24"
                  onClick={() => 
                    refetch({ 
                      before: data.posts.pageInfo.startCursor
                      // topic: "tech"  
                    })
                  }
                >
                  Previous
                </button> */}

                <button 
                  type="button"
                  className="button bg-blue-600 w-24"
                  onClick={() => next()}
                >
                  Next
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
