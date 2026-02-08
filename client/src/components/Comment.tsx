import { format } from "timeago.js";
import type { CommentType } from "../types/commentType";
import ImageDefault from "./ImageDefault"

type InputCommentType = {
  comment: CommentType;
  postId: string;
};

const Comment = ({comment, postId}: InputCommentType) => {
  return (
    <div className='p-4 bg-slate-50 rounded-xl mb-8'>
      <div className="flex items-center gap-4">
        <div className="w-[40px] h-[40px] overflow-hidden rounded-full">
          {comment.user.img && <ImageDefault src={comment.user.img} className="w-10 h-10 rounded-full object-cover" w={40}/>}
        </div>
        <span className="font-medium">{comment.user.username}</span>
        <span className="text-sm text-gray-500">{format(comment.createdAt)}</span>
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