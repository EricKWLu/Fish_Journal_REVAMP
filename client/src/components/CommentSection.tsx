import Comment from "./Comment"

const CommentSection = () => {
  return (
    <div className='flex flex-col mt-10 gap-8 lg:w-3/5'>
        <h1 className='underline text-xl text-gray-500'>
            Comments
        </h1>

        <div className='flex items-center justify-between gap-8 w-full'>
            <textarea placeholder="Write a comment..." className="w-full rounded-xl p-4 bg-white"/>
            <button className="bg-blue-800 px-4 py-3 text-white font-medium rounded-xl">Send</button>
        </div>

        <div className="">
            <Comment />
            <Comment />
            <Comment />
        </div>
    </div>
  )
}

export default CommentSection