import { Link } from "react-router-dom"
import ImageDefault from "./ImageDefault"

const SinglePost = () => {
  return (
    <div className='flex flex-col xl:flex-row gap-8'>
        {/*Image*/}
        <div className="md:hidden xl:block xl:w-1/3">
            <ImageDefault src="/fishPlaceholder.png" className="rounded-2xl object-cover" w={800}/>
        </div>
        {/*Details*/}
        <div className='flex flex-col gap-4 xl:w-2/3'>
            <Link to="/test" className="text-4xl font-semibold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Link>
            <div className='flex items-center gap-2 text-gray-400 text-small'>
                <span>Written by</span>
                <Link to="/tests" className="text-blue-400">John Smith</Link>
                <span>2 days ago</span>
            </div>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, nobis distinctio, reprehenderit molestias cumque reiciendis debitis quae praesentium iste iusto magnam labore nemo enim ut provident ducimus earum eum at?
            </p>
            <Link to="/test" className="underline text-small">Read More</Link>
        </div>
    </div>
  )
}

export default SinglePost