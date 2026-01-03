import {useUser, useAuth} from "@clerk/clerk-react"
import 'react-quill-new/dist/quill.snow.css'
import ReactQuill from "react-quill-new"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import type React from "react"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import {toast} from "react-toastify"
import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/react";


const Write = () => {
  // State to keep track of the current upload progress (percentage)
  const [progress, setProgress] = useState(0);

  // Create a ref for the file input element to access its files easily
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Create an AbortController instance to provide an option to cancel the upload if needed.
  const abortController = new AbortController();

  /**
   * Authenticates and retrieves the necessary upload credentials from the server.
   *
   * This function calls the authentication API endpoint to receive upload parameters like signature,
   * expire time, token, and publicKey.
   *
   * @returns {Promise<{signature: string, expire: string, token: string, publicKey: string}>} The authentication parameters.
   * @throws {Error} Throws an error if the authentication request fails.
   */
  const authenticator = async () => {
      try {
          // Perform the request to the upload authentication endpoint.
          const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/upload-auth`);
          if (!response.ok) {
              // If the server response is not successful, extract the error text for debugging.
              const errorText = await response.text();
              throw new Error(`Request failed with status ${response.status}: ${errorText}`);
          }

          // Parse and destructure the response JSON for upload credentials.
          const data = await response.json();
          const { signature, expire, token, publicKey } = data;
          return { signature, expire, token, publicKey };
      } catch (error) {
          // Log the original error for debugging before rethrowing a new error.
          console.error("Authentication error:", error);
          throw new Error("Authentication request failed");
      }
  };

  /**
   * Handles the file upload process.
   *
   * This function:
   * - Validates file selection.
   * - Retrieves upload authentication credentials.
   * - Initiates the file upload via the ImageKit SDK.
   * - Updates the upload progress.
   * - Catches and processes errors accordingly.
   */
  const handleUpload = async () => {
      // Access the file input element using the ref
      const fileInput = fileInputRef.current;
      if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
          alert("Please select a file to upload");
          return;
      }

      // Extract the first file from the file input
      const file = fileInput.files[0];

      // Retrieve authentication parameters for the upload.
      let authParams;
      try {
          authParams = await authenticator();
      } catch (authError) {
          console.error("Failed to authenticate for upload:", authError);
          return;
      }
      const { signature, expire, token, publicKey } = authParams;

      // Call the ImageKit SDK upload function with the required parameters and callbacks.
      try {
          const uploadResponse = await upload({
              // Authentication parameters
              expire,
              token,
              signature,
              publicKey,
              file,
              fileName: file.name, // Optionally set a custom file name
              // Progress callback to update upload progress state
              onProgress: (event) => {
                  setProgress((event.loaded / event.total) * 100);
              },
              // Abort signal to allow cancellation of the upload if needed.
              abortSignal: abortController.signal,
          });
          console.log("Upload response:", uploadResponse);

          toast.success("Image upload succeeded!");

      } catch (error) {
          // Handle specific error types provided by the ImageKit SDK.
          if (error instanceof ImageKitAbortError) {
              console.error("Upload aborted:", error.reason);
          } else if (error instanceof ImageKitInvalidRequestError) {
              console.error("Invalid request:", error.message);
          } else if (error instanceof ImageKitUploadNetworkError) {
              console.error("Network error:", error.message);
          } else if (error instanceof ImageKitServerError) {
              console.error("Server error:", error.message);
          } else {
              // Handle any other errors that may occur.
              console.error("Upload error:", error);
          }

          toast.error("Image upload failed!");
      }
  };

  const {isLoaded, isSignedIn} = useUser();
  const [value, setValue] = useState('');
  const {getToken} = useAuth();

  const navigate = useNavigate();

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
    onSuccess:(res)=>{
      toast.success("Post has been created");
      navigate(`/${res.data.slug}`);
    }
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

        <input
          type="file"
          ref={fileInputRef}
          hidden
          accept="image/*"
          onChange={() => {
            // optional: auto-upload after picking
            handleUpload();
          }}
        />

        <button
          type="button"
          className="p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white w-max"
          onClick={() => fileInputRef.current?.click()}
        >
          Add cover images
        </button>
        <br />
        {/* Display the current upload progress */}
        Upload progress: <progress value={progress} max={100}></progress>

        <input className="text-4xl font-semibold bg-transparent outline-none text-gray-400" type="text" placeholder="My Awesome Post" name="title"/>
        <div className="flex items-center gap-4">
          <label className="text-sm">Choose a category:</label>
          <select name="category" id="" className="p-2 rounded-xl bg-white shadow-md">
            <option value="general">General</option>
            <option value="reports">Reports</option>
            <option value="discussions">Discussions</option>
          </select>
        </div>
        <textarea className="p-4 rounded-xl bg-white shadow-md" name="desc" placeholder="A Short Description" />
        <div className="flex">
          <div className="flex flex-col gap-2 mr-2">
            <div className='cursor-pointer'>🖼️</div>
            <div className="cursor-pointer">🎥</div>
          </div>
          <ReactQuill theme="snow" className="flex-1 p-2 rounded-xl bg-white shadow-md" onChange={setValue}/>
        </div>
        <button disabled={mutation.isPending} className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 mb-4 disabled:bg-blue-400 disabled:cursor-not-allowed">
          {mutation.isPending ? "Loading..." : "Send"}
        </button>
        {mutation.isError && <span>{mutation.error.message}</span>}
      </form>
    </div>
  )
}

export default Write