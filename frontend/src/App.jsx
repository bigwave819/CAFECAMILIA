import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import PrivateRoute from "./components/PrivateRoute"
import AdminRoute from "./components/AdminRoute"
import Home from "./pages/users/Home";
import ViewResults from "./pages/users/ViewResult";
import ViewAllResults from "./pages/admin/ViewAllResult";
import ViewAllPosts from "./pages/admin/ViewAllPost";
import ViewAllUsers from "./pages/admin/ViewAllUsers";
import Navbar from "./components/Navbar"
import CreateResult from "./pages/admin/CreateResult"
import CreatePost from "./pages/admin/CreatePost"
import CreateUser from "./pages/admin/CreateUser"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Private Routes For the user */}
        <Route path="/" element={
          <PrivateRoute>
            <Navbar />
            <Home />
          </PrivateRoute>
        } />
        <Route path="/viewresults/:id" element={
          <PrivateRoute>
            <Navbar />
            <ViewResults />
          </PrivateRoute>
        } />

        {/* Admin Routes */}
        <Route path="/allusers" element={
          <AdminRoute>
            <Navbar />
            <ViewAllUsers />
          </AdminRoute>
        } />
        <Route path="/allposts" element={
          <AdminRoute>
            <Navbar />
            <ViewAllPosts />
          </AdminRoute>
        } />
        <Route path="/allresults" element={
          <AdminRoute>
            <Navbar />
            <ViewAllResults />
          </AdminRoute>
        } />
        <Route path="/createResult" element={
          <AdminRoute>
            <Navbar />
            <CreateResult />
          </AdminRoute>
        } />
        <Route path="/createPost" element={
          <AdminRoute>
            <Navbar />
            <CreatePost />
          </AdminRoute>
        } />
        <Route path="/createUser" element={
          <AdminRoute>
            <Navbar />
            <CreateUser />
          </AdminRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App
