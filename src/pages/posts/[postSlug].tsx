// NEXT IMPORTS
import Image from 'next/image'
import Link from 'next/link';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

// APOLLO IMPORTS
import client from '../../apolloConfig';
import { GET_POST } from '../../queries';

// COMPONENTS IMPORTS
import Footer from '../../components/Footer';

function Post({ post }: any) {
  return (
    <>
      <div className="container flex flex-col lg:px-20">
        <Link href="/">
          <a className="link-back">
          &#8592; Back
          </a>
        </Link>
        <div className="post-head">
          <Image 
            src={post.thumbnail.url} 
            width={270} height={270}
            alt={`${post.name} thumbnail`}
          />
          <div className="flex flex-col justify-between min-h-full">
            <h1 className="post-title">
              {post.name}
            </h1>
            <p className="post-tagline">
              {post.tagline}
            </p>
            <div className="post-links">
              <Link href={post.website}>
                <a target="_blank" className="button w-40">
                  Visit website
                </a>
              </Link>
              <Link href={post.url}>
                <a target="_blank" className="button w-40">
                  See on PH
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className=" mb-3">
            <p className="flex flex-wrap">
            <span className="font-bold">
              Author
            </span>:&nbsp;
            { 
              post.makers.map((maker:any) => 
                <p key={maker.id}>
                  {maker.name}
                  {
                    post.makers[post.makers.length - 1].id !== maker.id && 
                    <span>,&nbsp;</span>
                  }
                </p>
              )
            }
          </p>
        </div>

        <div className=" mb-3">
          <p className="flex flex-wrap">
          <span className="font-bold">
            Category
          </span>:&nbsp;
            { 
              post.topics?.edges.map((topic:any) =>
                <p key={topic.node.id}>
                  {topic.node.name}
                  {
                    post.topics.edges[post.topics.edges.length - 1].node.id !== topic.node.id && 
                    <span>,&nbsp;</span>
                  }
                </p> 
              )
            }
          </p>
        </div>

        <section className="description">
          <div className="flex flex-wrap mb-3"> 
            <p className="mb-8">
              <span className="font-bold">
                Description
              </span>:&nbsp;
              {post.description}
            </p>
          </div>
          <Carousel>
            { 
              post.media?.map((media: (any)) =>
                <div key={media.url}>
                  <Image 
                    src={media.url} 
                    width={1000} height={600}
                    alt={`${post.name} media image`}
                  />
                </div> 
              )
            }

          </Carousel>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default Post;

export async function getServerSideProps(context:any) {
  const { postSlug } = context.params;
  const GetPostVariables = { slug: postSlug };
  const { data } = await client.query({ query: GET_POST, variables: GetPostVariables });
  
  return {
    props: {
      post: data?.post,
    }
  }
}
