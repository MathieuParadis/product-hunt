// NEXT IMPORTS
import Image from 'next/image'
import Link from 'next/link';

// APOLLO IMPORTS
import client from '../../apolloConfig';
import { GET_POST } from '../../queries';

// COMPONENTS IMPORTS
import Footer from '../../components/Footer';

function Post({ post }: any) {
  return (
    <div className="container flex flex-col border">
      <div className="flex flex-col items-center">
        <Image 
          src={post.thumbnail.url} 
          width={180} height={180}
          className=""
          alt="post icon"
        />
        <div>
          <h1 className="title">
            {post.name}
          </h1>
          <p className="text-2xl">
            {post.tagline}
          </p>
        </div>
      </div>
      <div className="my-8 flex justify-center space-x-4">
        <Link href={post.website} className="">
          <a target="_blank" className="button w-40">
            Visit website
          </a>
        </Link>
        <Link href={post.url} className="">
          <a target="_blank" className="button w-40">
            See on PH
          </a>
        </Link>
      </div>
      <Footer />
    </div>
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
