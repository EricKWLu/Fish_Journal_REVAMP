const CommentSection = () => {
  return (
    <div className='flex flex-col mt-10'>
        <h1 className='underline text-xl'>
            Comments
        </h1>

        <div className='flex flex-row mt-8'>
            <input type="text" placeholder="Write a comment..." className="rounded-xl w-2/4 h-15 align-top bg-white"/>
        </div>

        <div className="mt-8">
            Placeholder
        </div>
    </div>
  )
}

export default CommentSection