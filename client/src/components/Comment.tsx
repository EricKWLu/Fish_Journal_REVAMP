import ImageDefault from "./ImageDefault"

const Comment = () => {
  return (
    <div className='p-4 bg-slate-50 rounded-xl mb-8'>
      <div className="flex items-center gap-4">
        <div className="w-[40px] h-[40px] overflow-hidden rounded-full">
          <ImageDefault src="fishPlaceholder.png" className="w-10 h-10 rounded-full object-cover" w={40}/>
        </div>
        <span className="font-medium">John Smith</span>
        <span className="text-sm text-gray-500">2 days ago</span>
      </div>
      <div className="mt-4">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat fuga impedit pariatur, quo non ratione, deserunt velit reiciendis neque iusto consequatur at nulla aspernatur, quasi sit! Id alias molestiae iure.
        </p>
      </div>
    </div>
  )
}

export default Comment