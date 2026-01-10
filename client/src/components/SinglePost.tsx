import { Link } from "react-router-dom"
import ImageDefault from "./ImageDefault"
import type { Post } from "../types/postType"
import { format } from "timeago.js"

interface SinglePostProps {
  post: Post
}

const SinglePost = ({ post }: SinglePostProps) => {
  return (
    <div className='flex flex-col xl:flex-row gap-8 mb-10'>
      {/*Image*/}
      {post.img && (
        <div className="md:hidden xl:block xl:w-1/3">
          <ImageDefault src={post.img} className="rounded-2xl object-cover" w={800}/>
        </div>
      )}
      {/*Details*/}
      <div className='flex flex-col gap-4 xl:w-2/3'>
        <Link to={`/${post.slug}`} className="text-4xl font-semibold">
          {post.title}
        </Link>
        <div className='flex items-center gap-2 text-gray-400 text-small'>
          <span>Written by</span>
          <Link to="/tests" className="text-blue-800">{post.user.username}</Link>
          <span>on</span>
          <Link to="/tests" className="text-blue-800">{post.category}</Link>
          <span>{format(post.createdAt)}</span>
        </div>
        <p>
          {post.desc}
        </p>
        <Link to={`/${post.slug}`} className="underline text-small">Read More</Link>
      </div>
    </div>
  )
}

export default SinglePost