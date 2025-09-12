const ActionList = () => {
  return (
    <div>
      <h1 className="text-sm font-medium mt-8 mb-4">Actions</h1>
      {/*Save*/}
      <div className="flex items-center gap-2 py-2 text-xs cursor-pointer">
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
          />
        </svg>
        <p>Save Post</p>
      </div>
      {/*Delete*/}
      <div className="flex items-center gap-2 py-2 text-xs cursor-pointer">
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
      </div>
    </div>
  )
}

export default ActionList