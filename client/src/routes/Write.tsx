import {useUser, useAuth} from "@clerk/clerk-react"
import 'react-quill-new/dist/quill.snow.css'
import ReactQuill, { Quill } from "react-quill-new"
import ReactQuillType from "react-quill-new"
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
import { useEffect } from "react"
import QuillResize from 'quill-resize-image'

const Write = () => {
  // State to keep track of the current upload progress (percentage)
  const [progress, setProgress] = useState(0);
  const [cover, setCover] = useState("");
  const [pendingEmbed, setPendingEmbed] = useState<"image" | "video" | null>(null);


  const quillRef = useRef<ReactQuillType | null>(null);

  // Create a ref for the file input element to access its files easily, one for editor one for cover
  const coverInputRef = useRef<HTMLInputElement>(null);
  const editorInputRef = useRef<HTMLInputElement>(null);

  // Create an AbortController instance to provide an option to cancel the upload if needed.
  const abortController = new AbortController();

  const {isLoaded, isSignedIn} = useUser();
  const [value, setValue] = useState('');
  const {getToken} = useAuth();

  const navigate = useNavigate();

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
  const uploadCoverImage = async (file: File): Promise<string | null> => {
    try {
      const { signature, expire, token, publicKey } = await authenticator();

      const res = await upload({
        file,
        fileName: file.name,
        signature,
        expire,
        token,
        publicKey,
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
        abortSignal: abortController.signal,
      });

      return typeof res.url === "string" ? res.url : null;
    } catch {
      toast.error("Image upload failed!");
      return null;
    }
  };

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
      img: cover || "",
      title,
      category,
      desc,
      content: value,
    };


    console.log(data);

    mutation.mutate(data)
  }

  const insertIntoEditor = (url: string, type: "image" | "video") => {
    const editor = quillRef.current?.getEditor();
    if (!editor) return;

    const range = editor.getSelection(true);
    editor.insertEmbed(range.index, type, url);
    editor.setSelection(range.index + 1);

    setValue(editor.root.innerHTML);
  };

  const uploadEditorFile = async (): Promise<string | null> => {
    const file = editorInputRef.current?.files?.[0];
    if (!file) return null;

    if (file.size > 50 * 1024 * 1024) {
      toast.error("File too large");
      return null;
    }

    const { signature, expire, token, publicKey } = await authenticator();

    const res = await upload({
      file,
      fileName: file.name,
      signature,
      expire,
      token,
      publicKey,
      onProgress: (e) =>
        setProgress((e.loaded / e.total) * 100),
    });

    if (!res.url) {
      toast.error("Upload succeeded but no URL returned");
      return null;
    }

    return res.url;
  };

  Quill.register('modules/resize', QuillResize);

    //Used for react quill video/image insert
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image", "video"],
        ["clean"],
      ],
      handlers: {
        image: () => {
          setPendingEmbed("image");
          editorInputRef.current?.click();
        },
        video: () => {
          setPendingEmbed("video");
          editorInputRef.current?.click();
        },
      },
    },
    resize: {
      modules: ['Resize', 'DisplaySize']
    },
  };

  return (
    <div className='min-h-[calc(100vh-64px) md:min-h-[calc(100vh-80px)] flex flex-col gap-6'>
      <h1 className="text-xl font-light text-gray-500">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 mb-6">

        <input
          type="file"
          ref={coverInputRef}
          hidden
          accept="image/*"
          onChange={async () => {
            const file = coverInputRef.current?.files?.[0];
            if (!file) return;

            if (file.size > 10 * 1024 * 1024) {
              toast.error("Cover image must be under 10MB");
              return;
            }

            const url = await uploadCoverImage(file);
            if (url) {
              setCover(url);
            }
                  }}
        />

        <button
          type="button"
          className="p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white w-max"
          onClick={() => coverInputRef.current?.click()}
        >
          Upload cover image
        </button>
        <br />
        {/* Display the current upload progress */}
        Upload progress: <progress value={progress} max={100}></progress>

        {cover && (
          <div className="w-full max-w-xl">
            <img
              src={cover}
              alt="Cover preview"
              className="rounded-xl shadow-md object-cover max-h-80 w-full"
            />
          </div>
        )}

        <input className="text-4xl font-semibold bg-transparent outline-none text-gray-400" type="text" placeholder="Insert Title" name="title"/>
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
          <input
            ref={editorInputRef}
            type="file"
            hidden
            accept="image/*,video/*"
            onChange={async () => {
              if (!pendingEmbed) return;

              const file = editorInputRef.current?.files?.[0];
              if (!file) return;

              const url = await uploadEditorFile();
              if (url) {
                insertIntoEditor(url, pendingEmbed);
              }

              // cleanup
              setPendingEmbed(null);
              editorInputRef.current!.value = "";
            }}
          />

          <ReactQuill theme="snow" ref={quillRef} className="flex-1 p-2 rounded-xl bg-white shadow-md" onChange={setValue} modules={modules} value={value}/>
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