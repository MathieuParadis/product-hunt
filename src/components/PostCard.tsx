// NEXT IMPORTS
import Image from 'next/image'
import Link from 'next/link';

function PostCard ({ post }: any) {
  return (
    <div className="card" key={post.node.id}>
      <Image src={post.node.thumbnail.url} 
        width={200} height={200}
        alt="character"
      />
      <div className="overlay" />
      <div className="post-details">
        <h2 className="post-details-title">
          {post.node.name}
        </h2>
        <p className="post-details-tagline">
          {post.node.tagline}
        </p>
        <Link href={`/posts/${post.node.slug}`}>
          <a className="button">
            Learn more
          </a>
        </Link>
      </div>
    </div>
  )
};

export default PostCard;