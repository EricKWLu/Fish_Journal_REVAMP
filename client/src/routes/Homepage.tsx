import MainCategories from "../components/MainCategories"
import PostList from "../components/PostList"

const Homepage = () => {
  return (
    <div className='mt-4 flex flex-col gap-4'>
      {/* INTRO */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className = "mt-4 text-gray-800 text-2xl md:text-5xl lg:text-6xl font-bold">
            Welcome to Fish Journal
          </h1>
          <p className = "mt-8 text-md md:text-xl">
            Come share and blog your catches!
          </p>
        </div>
      </div>
      <MainCategories />
      <div className="">
        <h1 className="my-8 text-2xl text-gray-600">Recent Posts</h1>
        <PostList />
      </div>
    </div>
  )
}

export default Homepage