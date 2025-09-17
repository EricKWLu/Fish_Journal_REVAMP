import { Link } from "react-router-dom"
import Search from "./Search"

const SideMenu = () => {
  return (
    <div className="px-4 h-max sticky top-8">
        <h1 className="mb-4 text-sm font-medium">Search</h1>
        <Search />
        {/*Navigation*/}
        <h1 className="mb-4 text-sm font-medium mt-8">Filter</h1>
        <div className='flex flex-col gap-2 text-sm'>
            <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="sort" value="newest" className="bg-white appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800"/>
                Newest
            </label>
            <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="sort" value="popular" className="bg-white appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800"/>
                Most Popular
            </label>
            <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="sort" value="trending" className="bg-white appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800"/>
                Trending
            </label>
            <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="sort" value="oldest" className="bg-white appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800"/>
                Oldest
            </label>
        </div>
        <h1 className="mt-8 text-sm font-medium mb-4">Categories</h1>
        <div className='flex flex-col gap-2 text-sm'>
            <Link className="underline" to ="/posts">All</Link>
            <Link className="underline" to ="/posts?cat=discussion">Discussion</Link>
            <Link className="underline" to ="/posts?cat=report">Report</Link>
        </div>
    </div>
  )
}

export default SideMenu