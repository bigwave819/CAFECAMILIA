import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };
  return (
    <header className="p-6 bg-white shadow-md">
      <nav className="flex items-center justify-between w-full">
        {/* Desktop */}
        <div>
          <h1 className="text-3xl font-bold text-[#ac1a3a]">CAFECAMERIA</h1>
        </div>
        <div>
          <ul className="hidden md:flex space-x-10 text-xl">
            <li>
              <Link to="/">Home</Link>
            </li>
            {user && (
              <>
                {user.role === "user" && (
                  <li>
                    <Link to={`/viewresults/${user._id}`}>View Result</Link>
                  </li>
                )}

                {user.role === "admin" && (
                  <>
                    <li>
                      <Link to="/allresults">Results</Link>
                    </li>
                    <li>
                      <Link to="/allposts">Posts</Link>
                    </li>
                    <li>
                      <Link to="/allusers">Users</Link>
                    </li>
                  </>
                )}
              </>
            )}
          </ul>
        </div>
        {/* Logout button for the desktop */}
        {user && (
          <>
            <div className="hidden md:block">
              <button
                onClick={() => {
                  handleLogout();
                }}
                className="bg-[#ac1a3a] cursor-pointer text-white py-2 px-5 rounded-md hover:bg-[#ac1a3a]"
              >
                Logout
              </button>
            </div>
          </>
        )}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col items-start space-y-4 text-xl">
          <ul className="hidden md:flex space-x-10 text-xl">
            <li>
              <Link to="/">Home</Link>
            </li>
            {user && (
              <>
                {user.role === "user" && (
                  <li>
                    <Link to={`/viewresults/${user._id}`}>View Result</Link>
                  </li>
                )}

                {user.role === "admin" && (
                  <>
                    <li>
                      <Link to="/allresults">Results</Link>
                    </li>
                    <li>
                      <Link to="/allposts">Posts</Link>
                    </li>
                    <li>
                      <Link to="/allusers">Users</Link>
                    </li>
                  </>
                )}
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
