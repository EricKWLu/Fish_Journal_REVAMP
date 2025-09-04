import { Link } from "react-router-dom"
import ImageCarousel from "../components/ImageCarousel"

const SinglePostPage = () => {
  return (
    //Things I want to be shown:
    //Windowed images top
    //Post contents
    //Sidebar with post users information
    //saved posts and delete post button on sidebar
    <div>
      <div className = 'flex flex-col xl:flex-row'>
        <div>
          {/*Title*/}
          <h1 className="mt-4 text-gray-800 text-2xl md:text-5xl lg:text-6xl font-bold">Lorem ipsum dolor sit amet consectetur</h1>
          <div className='mt-8 flex items-center gap-2 text-gray-400 text-small'>
            <span>Written by</span>
              <Link to="/tests" className="text-blue-400">John Smith</Link>
              <span>2 days ago</span>
            </div>
        </div>
        {/*Carousel*/}
        <div className="xl:block xl:w-1/3">
          <ImageCarousel imagePaths={["fishPlaceholder.png", "fishPlaceholder.png", "fishPlaceholder.png"]} height={300}/>
        </div>
      </div>

      <div className = 'flex flex-row mt-8'>
        {/*Content*/}
        <div className='w-full lg:w-3/4'>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus eum excepturi architecto? Nobis pariatur rem labore delectus. Quos impedit, magnam quas maxime nemo numquam quis consequatur explicabo ea id iure?</p>
        </div>
        {/*Sidebar*/}
        <div className="hidden lg:block lg:w-1/4">
          Test
        </div>
      </div>
    </div>
  ) 
}

export default SinglePostPage