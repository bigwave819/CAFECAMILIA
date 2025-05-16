import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ViewAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (!storedUser) {
        setError("User not authenticated");
        return;
      }

      setCurrentUser(storedUser);

      const endpoint =
        storedUser.role === "admin"
          ? "http://localhost:5000/api/v1/users/view"
          : `http://localhost:5000/api/v1/users/view/${storedUser._id}`;

      try {
        const response = await fetch(endpoint, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Failed to fetch the users");
        } else {
          setUsers(data.user);
        }
      } catch (error) {
        setError("Failed to fetch the data");
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  if (!localStorage.getItem("user")) {
    return <Navigate to="/login" />;
  }

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/users/delete/${id}`,
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
          setUsers(prevUsers => prevUsers.filter(users => users._id !== id ));
        }
    } catch (error) {
      setError("failed to delete the data");
      console.error(error);
      
    }
  }

  return (
    <div className="min-h-screen items-center justify-center bg-gray-100">
      <div className="px-6">
        <h2 className="text-3xl font-bold mb-6">All Users</h2>
      </div>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <div className="max-w-xl mx-auto overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#ac1a3a] text-white">
              <th className="p-4">Username</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th colSpan="2" className="p-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No records found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id}>
                  <td className="p-4">{user.username}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    {user.role === "admin" ? (
                      <p className="font-bold text-green-500">{user.role}</p>
                    ) : (
                      <p className="text-green-700">{user.role}</p>
                    )}
                  </td>
                  { user.role === "admin" && 
                    <>
                      <td className="p-4">
                    <button className="bg-blue-600 text-white py-1 px-5 rounded-md cursor-pointer">
                      Edit
                    </button>
                  </td>
                  <td className="p-4">
                    <button className="bg-red-600 text-white py-1 px-5 rounded-md cursor-pointer" onClick={() => handleDelete(user._id)}>
                      Delete
                    </button>
                  </td>
                    </>
                  }
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAllUsers;
