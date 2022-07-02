// NEXT IMPORTS
import Image from 'next/image';

// APOLLO IMPORTS
import client from '../../apolloConfig';
import { GET_POST } from '../../queries';

function Post({ post }: any) {
  return (
    <div className="container border w-screen px40">
      <div className="flex">
        <Image 
          src={post.thumbnail.url} 
          width={150} height={150}
          alt="post icon"
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
  const { postSlug } = context.params;
  const GetPostVariables = { slug: postSlug };
  const { data } = await client.query({ query: GET_POST, variables: GetPostVariables });
  
  return {
    props: {
      post: data?.post,
    }
  }
}
