import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ViewAllResults = () => {
  const [results, setResult] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      const token = localStorage.getItem("token");
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (!storedUser) {
        setError("User not authenticated");
        return;
      }

      setUser(storedUser);

      const endpoint =
        storedUser.role === "admin"
          ? "http://localhost:5000/api/v1/results/view"
          : `http://localhost:5000/api/v1/results/view/${storedUser._id}`;

      try {
        const response = await fetch(endpoint, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Failed to fetch the results");
        } else {
          setResult(data.results);
        }
      } catch (error) {
        setError("Failed to fetch the data");
        console.error(error);
      }
    };

    fetchResult();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/results/delete/${id}`,
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
          setResult(prevUsers => prevUsers.filter(users => users._id !== id ));
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
    <div className="min-h-screen items-center justify-center bg-gray-100">
      <div className="px-6">
        <h2 className="text-3xl font-bold mb-6">All Results</h2>
      </div>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <div className="max-w-xl mx-auto overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#ac1a3a] text-white">
              <th className="p-4">Username</th>
              <th className="p-4">Post or Position</th>
              <th className="p-4">score</th>
              <th className="p-4">decision</th>
              <th colSpan="2" className="p-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {results.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
                  No records found
                </td>
              </tr>
            ) : (
              results.map((result) => (
                <tr key={result._id}>
                  <td className="p-4">{result.user?.username}</td>
                  <td className="p-4">{result.post?.postname}</td>
                  <td className="p-4">{result.score}</td>
                  <td className="p-4">
                    {result.decision == "fail" ? (
                      <p className="text-lg text-red-600">{result.decision}</p>
                    ) : (
                      <p className="text-lg text-green-600">
                        {result.decision}
                      </p>
                    )}
                  </td>
                  <td className="p-4">
                    <button className="bg-blue-600 text-white py-1 px-5 rounded-md cursor-pointer">
                      Edit
                    </button>
                  </td>
                  <td className="p-4">
                    <button className="bg-red-600 text-white py-1 px-5 rounded-md cursor-pointer" onClick={() => handleDelete(result._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAllResults;
