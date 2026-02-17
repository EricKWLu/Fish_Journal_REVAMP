import { format } from "timeago.js";
import type { CommentType } from "../types/commentType";
import ImageDefault from "./ImageDefault"
import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";

type InputCommentType = {
  comment: CommentType;
  postId: string;
};

const Comment = ({comment, postId}: InputCommentType) => {
  const {user} = useUser();
  const {getToken} = useAuth();

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.delete(`${import.meta.env.VITE_API_URL}/comments/${comment._id}`, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
    },
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey: ["comments", postId]})
      toast.success("Comment deleted successfully")
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

  return (
    <div className='p-4 bg-slate-50 rounded-xl mb-8'>
      <div className="flex items-center gap-4">
        <div className="w-[40px] h-[40px] overflow-hidden rounded-full">
          {comment.user.img && <ImageDefault src={comment.user.img} className="w-10 h-10 rounded-full object-cover" w={40}/>}
        </div>
        <span className="font-medium">{comment.user.username}</span>
        <span className="text-sm text-gray-500">{format(comment.createdAt)}</span>
        {user &&
        (comment.user.username === user.username) && (
          <span
            className="text-xs text-red-300 hover:text-red-500 cursor-pointer"
            onClick={() => deleteMutation.mutate()}
          >
            delete
            {deleteMutation.isPending && <span>(in progress)</span>}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p>
          {comment.desc}
        </p>
      </div>
    </div>
  )
}

export default Comment