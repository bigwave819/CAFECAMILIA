import React, { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";

const ViewAllPost = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem("token");
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (!storedUser) {
        setError("User not authenticated");
        return;
      }

      setUser(storedUser);

      const endpoint = storedUser.role === "admin"
        ? "http://localhost:5000/api/v1/posts/view"
        : `http://localhost:5000/api/v1/posts/view/${storedUser._id}`;

      try {
        const response = await fetch(endpoint, {
          headers: {
            authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Failed to fetch the posts");
        } else {
          setPosts(data.post);
        }
      } catch (error) {
        setError("Failed to fetch the data");
        console.error(error);
      }
    };

    fetchPost();
  }, []);

   const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/posts/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message)
        }
        if (response.ok) {
          setPosts(prevPosts => prevPosts.filter(posts => posts._id !== id ));
        }
    } catch (error) {
      setError("failed to delete the data");
      console.error(error);
      
    }
  }

  if (!localStorage.getItem("user")) {
    return <Navigate to="/login" />;
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6'>
      <h2 className='text-3xl font-bold mb-6'>
        All Posts
      </h2>

      {error && (
        <div className="text-red-500 text-center mb-4">{error}</div>
      )}

      <div className='max-w-xl w-full shadow-lg rounded-lg bg-white p-6'>
        <ul className='space-y-4'>
          {posts.length === 0 ? (
            <li className="text-center text-gray-500">No records found</li>
          ) : (
            posts.map((post) => (
              <li
                key={post._id}
                className='flex items-center justify-between p-4 border rounded hover:bg-gray-50'
              >
                <span className="font-medium">{post.postname}</span>
                <div className="space-x-2">
                  <button className="bg-blue-600 py-1 px-5 text-white font-bold rounded-lg cursor-pointer">Edit</button>
                  <button className="bg-red-600 py-1 px-5 text-white font-bold rounded-lg cursor-pointer" onClick={() => handleDelete(post._id)}>Delete</button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default ViewAllPost;
