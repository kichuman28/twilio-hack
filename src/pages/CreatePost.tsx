import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomBar from "../components/BottomBar";
import { app } from "../utils/Firebase";
import { createPost } from "../utils/FirebaseFunctions";

const CreatePost: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const auth = getAuth(app);
  const user = auth.currentUser;
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await createPost({ content: content, author: user?.uid }, image);
      navigate("/");
    } catch (error) {
      console.error("Error creating Post:", error);
    }
  };

  return (
    <>
      <BottomBar />
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
          <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="content"
              >
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter the content of your post"
                rows={5}
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="image"
              >
                Upload Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Image preview"
                    className="w-full h-auto rounded"
                  />
                </div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={!content}
                className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-textPrimary"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
