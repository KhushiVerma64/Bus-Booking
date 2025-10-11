import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Check token in localStorage on page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove token
    setIsLoggedIn(false); // update UI
    navigate("/login"); // redirect to login
  };

  return (
    <nav
      className="navbar navbar-expand-lg border-bottom"
      style={{ backgroundColor: "#fff" }}
    >
      <div className="container p-2">
        {/* Brand logo */}
        <Link className="navbar-logo" to="/">
          <img
            src="media/logo3.jpg"
            style={{ width: "10%" }}
            alt="Logo"
          />
          <span>YATRASETU</span>
        </Link>

        {/* Toggler button (hamburger) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarContent"
        >
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/search">
                SearchBuses
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/bookings">
                My Bookings
              </Link>
            </li>

            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Signup
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="btn btn-link nav-link"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;