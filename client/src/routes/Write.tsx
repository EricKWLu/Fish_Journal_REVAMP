import {useUser} from "@clerk/clerk-react"
import 'react-quill-new/dist/quill.snow.css'
import ReactQuill from "react-quill-new"

const Write = () => {

  const {isLoaded, isSignedIn} = useUser()

  if(!isLoaded) {
    return <div className="min-h-[calc(100vh-64px) md:min-h-[calc(100vh-80px)]">Loading...</div>
  }

  if(isLoaded && !isSignedIn) {
    return <div className="min-h-[calc(100vh-64px) md:min-h-[calc(100vh-80px)]">Sign In To Create A Post</div>
  }

  return (
    <div className='min-h-[calc(100vh-64px) md:min-h-[calc(100vh-80px)] flex flex-col gap-6'>
      <h1 className="text-xl font-light text-gray-500">Create a New Post</h1>
      <form className="flex flex-col gap-6 mb-6">
        <button className="p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white w-max">Add cover images</button>
        <input className="text-4xl font-semibold bg-transparent outline-none text-gray-400" type="text" placeholder="My Awesome Post"/>
        <div className="flex items-center gap-4">
          <label htmlFor="text-sm">Choose a category:</label>
          <select name="cat" id="" className="p-2 rounded-xl bg-white shadow-md">
            <option value="general">General</option>
            <option value="reports">Reports</option>
            <option value="discussions">Discussions</option>
          </select>
        </div>
        <textarea className="p-4 rounded-xl bg-white shadow-md" name="desc" placeholder="A Short Description" />
        <ReactQuill theme="snow" className="flex-1 p-2 rounded-xl bg-white shadow-md"/>
        <button className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 mb-4">Send</button>
      </form>
    </div>
  )
}

export default Write