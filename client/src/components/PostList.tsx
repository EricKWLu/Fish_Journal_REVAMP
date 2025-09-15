import SinglePost from "./SinglePost"

const PostList = () => {
  return (
    <div className='flex flex-col gap-12 mb-4'>
        <SinglePost />
        <SinglePost />
        <SinglePost />
        <SinglePost />
        <SinglePost />
        <SinglePost />
    </div>
  )
}

export default PostList