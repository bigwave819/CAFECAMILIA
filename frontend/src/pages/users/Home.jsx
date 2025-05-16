import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import CustomLineChart from '../../components/CustomLineChart'
import moment from 'moment'

const Home = () => {
  const [user, setUser] = useState(null)
  const [usersCount, setUsersCount] = useState(0)
  const [postsCount, setPostsCount] = useState(0)
  const [results, setResults] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem('token')

    if (!storedUser) return

    setUser(storedUser)

    const fetchDashboardData = async () => {
      try {
        // Fetch Users
        const usersRes = await fetch("http://localhost:5000/api/v1/users/view", {
          headers: { authorization: `Bearer ${token}` }
        })
        const usersData = await usersRes.json()
        if (usersRes.ok) setUsersCount(usersData.user.length)

        // Fetch Posts
        const postsRes = await fetch("http://localhost:5000/api/v1/posts/view", {
          headers: { authorization: `Bearer ${token}` }
        })
        const postsData = await postsRes.json()
        if (postsRes.ok) setPostsCount(postsData.post.length)

        // Fetch Results
        const resultsRes = await fetch("http://localhost:5000/api/v1/results/view", {
          headers: { authorization: `Bearer ${token}` }
        })
        const resultsData = await resultsRes.json()
        if (resultsRes.ok) {
          setResults(resultsData.result || [])
        }

      } catch (err) {
        console.error(err)
        setError("Failed to load dashboard data")
      }
    }

    if (storedUser.role === "admin") {
      fetchDashboardData()
    }
  }, [])

  if (!localStorage.getItem('user')) {
    return <Navigate to="/login" />
  }

  // ✅ Group results per date safely
  const resultsByDate = results.length
    ? results.reduce((acc, curr) => {
        const date = moment(curr.createdAt).format('YYYY-MM-DD')
        acc[date] = (acc[date] || 0) + 1
        return acc
      }, {})
    : {}

  // ✅ Convert to array for chart data
  const chartData = Object.keys(resultsByDate).map(date => ({
    date,
    total: resultsByDate[date]
  }))

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-8">Welcome {user?.username}</h1>

      {user?.role === 'admin' && (
        <div className="space-y-10">

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
              <h3 className="text-gray-600 text-sm font-medium">Total Users</h3>
              <p className="text-3xl font-bold text-purple-700 mt-2">{usersCount}</p>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
              <h3 className="text-gray-600 text-sm font-medium">Total Posts</h3>
              <p className="text-3xl font-bold text-purple-700 mt-2">{postsCount}</p>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
              <h3 className="text-gray-600 text-sm font-medium">Total Results</h3>
              <p className="text-3xl font-bold text-purple-700 mt-2">{results.length}</p>
            </div>
          </div>

          {/* Line Chart */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Candidates' Performance Over Time</h2>
            {error && <p className="text-red-500">{error}</p>}
            <CustomLineChart data={chartData} />
          </div>

        </div>
      )}
    </div>
  )
}

export default Home
