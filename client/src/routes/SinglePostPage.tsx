import { Link, useParams } from "react-router-dom"
import ImageDefault from "../components/ImageDefault"
import ActionList from "../components/ActionList"
import Search from "../components/Search"
import CommentSection from "../components/CommentSection"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { format } from "timeago.js"
import DOMPurify from "dompurify"

const fetchPost = async (slug: String) => {
  const res = axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
  return (await res).data
}

const SinglePostPage = () => {
  const {slug} = useParams();

  if (typeof slug !== 'string') {
    return 'Slug not a string'
  }

  const {isPending, error, data} = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  })

  if (isPending) return "loading...";
  if (error) return "Something went wrong: " + error.message;
  if (!data) return "Post not found!";

  return (
    //Things I want to be shown:
    //Windowed images top
    //Post contents
    //Sidebar with post users information
    //saved posts and delete post button on sidebar
    <div className="container mx-auto px-4">
      {/*TOP*/}
      <div className = 'flex flex-col xl:flex-row'>
        <div>
          {/*Title*/}
          <h1 className="mt-4 text-gray-800 text-2xl md:text-5xl lg:text-6xl font-bold">{data.title}</h1>
          <div className='mt-8 flex items-center gap-2 text-gray-400 text-small'>
            <span>Written by</span>
              <Link to="/tests" className="text-blue-800">{data.user.username}</Link>
              <span>on</span>
              <Link to="/tests" className="text-blue-800">{data.category}</Link>
              <span>{format(data.createdAt)}</span>
            </div>
            <p className="text-gray-500 font-medium">
              {data.desc}
            </p>
        </div>
        {/*Image*/}
        {data.img && <div className="xl:block xl:w-1/4">
          <ImageDefault src={data.img} className="rounded-2xl w-600px"/>
        </div>}
      </div>

      {/*BOTTOM*/}
      <div className = 'flex flex-row mt-12'>
        {/*Content*/}
        <div className='w-full lg:w-3/4'>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.content), }}
          />
        </div>
        {/*Sidebar*/}
        <div className="hidden lg:flex lg:w-1/4 flex flex-col ml-8 sticky top-8 h-fit">
          <h1 className="text-sm font-medium">Author</h1>

          {/*Titlecard*/}
          <div className = "flex flex-row items-center gap-2 mt-4">
            <div className="w-[50px] h-[50px] overflow-hidden rounded-full">
              {data.user.img && <ImageDefault 
                src={data.user.img}
                w={50}
                h={50}
                className="w-full h-full object-cover"
              />}
            </div>
            <Link to = "/">{data.user.username}</Link>
          </div>

          {/*Actions*/}
          <ActionList />

          {/*Navigation*/}
          <div className="flex flex-col gap-y-2 text-sm">
            <h1 className="font-medium mt-8">Navigation</h1>
            <Link to = "/" className="underline">Home</Link>
            <Link to = "/" className="underline">Reports</Link>
            <Link to = "/" className="underline">Discussion</Link>
          </div>

          {/*Search*/}
          <div className="text-sm gap-y-4 flex flex-col mt-8">
            <h1 className="font-medium">Search</h1>
            <Search />
          </div>
        </div>
      </div>
      {/*Comments*/}
      <CommentSection postId={data._id}/>
    </div>
  ) 
}

export default SinglePostPage