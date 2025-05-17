import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [postname, setPostname] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // Fetch all users to populate the 'createdBy' select
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/v1/users/view", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data.user);  // adjust this based on your actual response shape
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/v1/posts/create",
        { postname, createdBy },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(res.data.message);
      setPostname("");
      setCreatedBy("");
      navigate("/allposts")
    } catch (error) {
      console.error("Error creating post:", error);
      setMessage("Failed to create post.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6">Create New Post</h2>

      {message && <p className="mb-4 text-blue-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Postname input */}
        <div>
          <label className="block mb-1 font-medium">Post Name</label>
          <input
            type="text"
            value={postname}
            onChange={(e) => setPostname(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* CreatedBy select */}
        <div>
          <label className="block mb-1 font-medium">Created By</label>
          <select
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Select User --</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
