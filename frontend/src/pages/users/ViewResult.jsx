import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewResult = () => {
  const { id } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:5000/api/v1/results/view/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setResults(res.data); // res.data is array of results
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch results.");
        setLoading(false);
      }
    };

    fetchResults();
  }, [id]);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Your Results</h2>

      {loading && <p className="text-lg">Loading...</p>}
      {error && <p className="text-red-500 text-lg">{error}</p>}

      {!loading && results.length === 0 && (
        <p className="text-gray-600">No results found for this user.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((result) => (
          <div
            key={result._id}
            className="border p-4 rounded-lg shadow hover:shadow-lg transition duration-300"
          >
            {/* Display post ID - replace with post title if available */}
            <h3 className="text-2xl font-semibold mb-2">Post : {result.post.postname}</h3>

            <p className="text-lg">
              Score: <span className="font-bold">{result.score}</span>
            </p>

            <p className="text-gray-600">
              Decision: <span className="capitalize inline-flex">{result.decision == "pass" ? (<p className="text-green-600">{result.decision}</p>): (<p className="text-red-600">{result.decision}</p>)}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewResult;
