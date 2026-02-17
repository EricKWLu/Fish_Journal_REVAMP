import axios from "axios"
import Comment from "./Comment"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { buildTransformationString } from "@imagekit/react";
import type {CommentSectionProps, NewComment, CommentType} from "../types/commentType"

const fetchComments = async (postId: string) => {
  console.log("Fetching comments for post:", postId);
  const res = axios.get(`${import.meta.env.VITE_API_URL}/comments/${postId}`);
  return (await res).data;
}

const CommentSection = ({postId}: CommentSectionProps) => {
  const {getToken} = useAuth();

  const {isPending, error, data} = useQuery<CommentType[]>({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId)
  })

  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, NewComment>({
    mutationFn: async (newComment) => {
      const token = await getToken();
      return axios.post(`${import.meta.env.VITE_API_URL}/comments/${postId}`, newComment, {
        headers:{
          Authorization: `Bearer ${token}`,
        }
      })
    },
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey: ["comments", postId]})
      toast.success("Comment created successfully")
    },
    onError:(error)=>{
      if (axios.isAxiosError(error)) {
        const serverMessage = error.response?.data?.error || error.response?.data;
        toast.error(serverMessage || "Something went wrong");
      } else {
        toast.error("Unexpected error");
      }
    }
  })

  if (isPending) return "loading...";
  if (error) return "Something went wrong: " + error.message;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = {
      desc: formData.get("desc") as string,
    };

    mutation.mutate(data);
  }

  return (
    <div className='flex flex-col mt-10 gap-8 lg:w-3/5'>
      <h1 className='underline text-xl text-gray-500'>
        Comments
      </h1>

      <form onSubmit={handleSubmit} className='flex items-center justify-between gap-8 w-full'>
        <textarea placeholder="Write a comment..." className="w-full rounded-xl p-4 bg-white" name="desc"/>
        <button className="bg-blue-800 px-4 py-3 text-white font-medium rounded-xl">Send</button>
      </form>

      <div className="">
        {isPending ? "Loading..." : error ? "Error loading comments!" : 
        data.map((comment) => (
          <Comment key={comment._id} comment={comment} postId={postId}/>
        ))}
      </div>
    </div>
  )
}

export default CommentSection