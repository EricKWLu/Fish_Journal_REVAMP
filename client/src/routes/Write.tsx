import {useUser, useAuth} from "@clerk/clerk-react"
import 'react-quill-new/dist/quill.snow.css'
import ReactQuill from "react-quill-new"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import type React from "react"
import { useState } from "react"

const Write = () => {

  const {isLoaded, isSignedIn} = useUser();
  const [value, setValue] = useState('');
  const {getToken} = useAuth();

  type NewPost = {
    title: string;
    category: string;
    desc: string;
    content: string;
  };

  const mutation = useMutation({
    mutationFn: async (newPost: NewPost) => {
      const token = await getToken();
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        headers:{
          Authorization: `Bearer ${token}`,
        }
      })
    },
  })

  if(!isLoaded) {
    return <div className="min-h-[calc(100vh-64px) md:min-h-[calc(100vh-80px)]">Loading...</div>
  }

  if(isLoaded && !isSignedIn) {
    return <div className="min-h-[calc(100vh-64px) md:min-h-[calc(100vh-80px)]">Sign In To Create A Post</div>
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const title = formData.get("title");
    const category = formData.get("category");
    const desc = formData.get("desc");

    if (typeof title !== "string" || typeof category !== "string" || typeof desc !== "string") {
      return;
    }

    const data = {
      title,
      category,
      desc,
      content: value,
    };


    console.log(data);

    mutation.mutate(data)
  }

  return (
    <div className='min-h-[calc(100vh-64px) md:min-h-[calc(100vh-80px)] flex flex-col gap-6'>
      <h1 className="text-xl font-light text-gray-500">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 mb-6">
        <button className="p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white w-max">Add cover images</button>
        <input className="text-4xl font-semibold bg-transparent outline-none text-gray-400" type="text" placeholder="My Awesome Post" name="title"/>
        <div className="flex items-center gap-4">
          <label htmlFor="text-sm">Choose a category:</label>
          <select name="category" id="" className="p-2 rounded-xl bg-white shadow-md">
            <option value="general">General</option>
            <option value="reports">Reports</option>
            <option value="discussions">Discussions</option>
          </select>
        </div>
        <textarea className="p-4 rounded-xl bg-white shadow-md" name="desc" placeholder="A Short Description" />
        <ReactQuill theme="snow" className="flex-1 p-2 rounded-xl bg-white shadow-md" onChange={setValue}/>
        <button className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 mb-4">Send</button>
      </form>
    </div>
  )
}

export default Write