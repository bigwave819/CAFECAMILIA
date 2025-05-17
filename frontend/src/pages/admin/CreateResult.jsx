import React, { useEffect, useState } from "react";
import axios from "axios";

const CreateResult = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedPost, setSelectedPost] = useState("");
  const [score, setScore] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch users and posts on mount
  useEffect(() => {
    const fetchUsersAndPosts = async () => {
      try {
        const token = localStorage.getItem("token");

        const [usersRes, postsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/v1/users/view", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/v1/posts/view", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setUsers(usersRes.data.user);
        setPosts(postsRes.data.post);
        setLoading(false);
      } catch (err) {
        setError("Failed to load users or posts.");
        setLoading(false);
      }
    };

    fetchUsersAndPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!selectedUser || !selectedPost || !score) {
      setError("Please select user, post and enter score.");
      return;
    }

    if (isNaN(score) || score < 0 || score > 100) {
      setError("Score must be a number between 0 and 100.");
      return;
    }

    try {
      setSubmitLoading(true);
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/v1/results/create",
        {
          user: selectedUser,
          post: selectedPost,
          score: Number(score),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccess("Result created successfully!");
      setSelectedUser("");
      setSelectedPost("");
      setScore("");
    } catch (err) {
      if (
        err.response &&
        err.response.data &&
        err.response.data.message
      ) {
        setError(err.response.data.message);
      } else {
        setError("Failed to create result.");
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) return <p>Loading users and posts...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 rounded shadow-md mt-20">
      <h2 className="text-2xl font-bold mb-6">Create Result</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* User Select */}
        <div>
          <label className="block mb-1 font-semibold">Select User:</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">-- Select User --</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username} ({user.email})
              </option>
            ))}
          </select>
        </div>

        {/* Post Select */}
        <div>
          <label className="block mb-1 font-semibold">Select Post:</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={selectedPost}
            onChange={(e) => setSelectedPost(e.target.value)}
          >
            <option value="">-- Select Post --</option>
            {posts.map((post) => (
              <option key={post._id} value={post._id}>
                {post.postname}
              </option>
            ))}
          </select>
        </div>

        {/* Score Input */}
        <div>
          <label className="block mb-1 font-semibold">Score:</label>
          <input
            type="number"
            min="0"
            max="100"
            className="w-full border rounded px-3 py-2"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            placeholder="Enter score (0-100)"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitLoading}
          className="w-full bg-[#ac1a3a] text-white py-2 rounded hover:bg-[#9a1834] transition"
        >
          {submitLoading ? "Saving..." : "Create Result"}
        </button>
      </form>
    </div>
  );
};

export default CreateResult;
