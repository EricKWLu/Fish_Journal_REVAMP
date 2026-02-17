import { useAuth, useUser } from "@clerk/clerk-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { AxiosError } from "axios"

const ActionList = ({post}: any) => {
  const {user} = useUser();
  const {getToken} = useAuth();
  const navigate = useNavigate();

  const {isPending, error, data:savedPosts} = useQuery({
    queryKey: ["savedPosts"],
    queryFn: async () => {
      const token = await getToken();
      return axios.get(`${import.meta.env.VITE_API_URL}/users/saved`, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
    },
  });

  const isSaved = savedPosts?.data.some((p: string) => p === post._id) || false;

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.delete(`${import.meta.env.VITE_API_URL}/posts/${post._id}`, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
    },
    onSuccess:()=>{
      toast.success("Post deleted successfully")
      navigate("/")
    },
    onError: (error)=>{
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
      else {
        toast.error(error.message);
      }
    }
  });

  const queryClient = useQueryClient()

  const savedMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.patch(
        `${import.meta.env.VITE_API_URL}/users/save`,
        {
          postId: post._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["savedPosts"]})
    },
    onError: (error)=>{
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
      else {
        toast.error(error.message);
      }
    }
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  }

  const handleSave = () => {
    if(!user){
      toast.error("Log in to save posts!")
    }
    savedMutation.mutate();
  }

  return (
    <div>
      <h1 className="text-sm font-medium mt-8 mb-4">Actions</h1>
      {/*Save*/}
      <div className="flex items-center gap-2 py-2 text-xs cursor-pointer" onClick={handleSave}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-gray-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 2.25h12a.75.75 0 01.75.75v18l-7.5-4.5L5.25 21V3a.75.75 0 01.75-.75z"
            fill={isSaved ? "black" : "none"}
          />
        </svg>
        <p>Save Post</p>
      </div>
      {/*Delete*/}
      {user && (post.user.username === user.username) && (<div className="flex items-center gap-2 py-2 text-xs cursor-pointer" onClick={handleDelete}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-gray-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 9l.01 6M15 9l-.01 6M4 7h16M10 3h4a1 1 0 011 1v2H9V4a1 1 0 011-1zM5 7h14l-1 12a2 2 0 01-2 2H8a2 2 0 01-2-2L5 7z"
          />
        </svg>
        <p>Delete this Post</p>
        {deleteMutation.isPending && <span className="text-xs">(in progress)</span>}
      </div>)}
    </div>
  )
}

export default ActionList