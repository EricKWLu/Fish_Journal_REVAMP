import { Link } from "react-router-dom"
import ImageCarousel from "../components/ImageCarousel"
import ImageDefault from "../components/ImageDefault"

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
      <div className = 'flex flex-row mt-10'>
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
        <div className="hidden lg:flex lg:w-1/4 flex flex-col text-center ml-4 bg-red-400 sticky top-8 h-fit">
          <p>Author</p>
          <div className = "flex flex-row items-center justify-center gap-2 mt-4">
            <ImageDefault src={"fishPlaceholder.png"} w={75}/>
            <p>John Smith</p>
          </div>
        </div>
      </div>
    </div>
  ) 
}

export default SinglePostPage