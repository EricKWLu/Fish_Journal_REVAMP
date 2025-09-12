import { Link } from "react-router-dom"
import ImageCarousel from "../components/ImageCarousel"
import ImageDefault from "../components/ImageDefault"
import ActionList from "../components/ActionList"
import Search from "../components/Search"
import CommentSection from "../components/CommentSection"

const SinglePostPage = () => {
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
          <h1 className="mt-4 text-gray-800 text-2xl md:text-5xl lg:text-6xl font-bold">Lorem ipsum dolor sit amet consectetur</h1>
          <div className='mt-8 flex items-center gap-2 text-gray-400 text-small'>
            <span>Written by</span>
              <Link to="/tests" className="text-blue-400">John Smith</Link>
              <span>2 days ago</span>
            </div>
        </div>
        {/*Carousel*/}
        <div className="xl:block xl:w-1/4">
          <ImageCarousel imagePaths={["fishPlaceholder.png", "fishPlaceholder.png", "fishPlaceholder.png"]} height={300}/>
        </div>
      </div>

      {/*BOTTOM*/}
      <div className = 'flex flex-row mt-12'>
        {/*Content*/}
        <div className='w-full lg:w-3/4'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis sapiente non soluta nesciunt voluptas sit pariatur temporibus consectetur, recusandae iure. Enim perferendis laborum quisquam distinctio commodi pariatur dolor vero expedita.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda ullam saepe rem error libero numquam. Temporibus obcaecati ex eaque tempora unde, cum, nam itaque minima vero aliquid, nihil iste possimus.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis sapiente non soluta nesciunt voluptas sit pariatur temporibus consectetur, recusandae iure. Enim perferendis laborum quisquam distinctio commodi pariatur dolor vero expedita.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda ullam saepe rem error libero numquam. Temporibus obcaecati ex eaque tempora unde, cum, nam itaque minima vero aliquid, nihil iste possimus.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis sapiente non soluta nesciunt voluptas sit pariatur temporibus consectetur, recusandae iure. Enim perferendis laborum quisquam distinctio commodi pariatur dolor vero expedita.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda ullam saepe rem error libero numquam. Temporibus obcaecati ex eaque tempora unde, cum, nam itaque minima vero aliquid, nihil iste possimus.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis sapiente non soluta nesciunt voluptas sit pariatur temporibus consectetur, recusandae iure. Enim perferendis laborum quisquam distinctio commodi pariatur dolor vero expedita.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda ullam saepe rem error libero numquam. Temporibus obcaecati ex eaque tempora unde, cum, nam itaque minima vero aliquid, nihil iste possimus.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis sapiente non soluta nesciunt voluptas sit pariatur temporibus consectetur, recusandae iure. Enim perferendis laborum quisquam distinctio commodi pariatur dolor vero expedita.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda ullam saepe rem error libero numquam. Temporibus obcaecati ex eaque tempora unde, cum, nam itaque minima vero aliquid, nihil iste possimus.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis sapiente non soluta nesciunt voluptas sit pariatur temporibus consectetur, recusandae iure. Enim perferendis laborum quisquam distinctio commodi pariatur dolor vero expedita.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda ullam saepe rem error libero numquam. Temporibus obcaecati ex eaque tempora unde, cum, nam itaque minima vero aliquid, nihil iste possimus.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis sapiente non soluta nesciunt voluptas sit pariatur temporibus consectetur, recusandae iure. Enim perferendis laborum quisquam distinctio commodi pariatur dolor vero expedita.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda ullam saepe rem error libero numquam. Temporibus obcaecati ex eaque tempora unde, cum, nam itaque minima vero aliquid, nihil iste possimus.</p>
        </div>
        {/*Sidebar*/}
        <div className="hidden lg:flex lg:w-1/4 flex flex-col ml-8 sticky top-8 h-fit">
          <h1 className="text-sm font-medium">Author</h1>

          {/*Titlecard*/}
          <div className = "flex flex-row items-center gap-2 mt-4">
            <div className="w-[50px] h-[50px] overflow-hidden rounded-full">
              <ImageDefault 
                src="fishPlaceholder.png"
                w={50}
                h={50}
                className="w-full h-full object-cover"
              />
            </div>
            <Link to = "/">John Smith</Link>
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
      <CommentSection />
    </div>
  ) 
}

export default SinglePostPage