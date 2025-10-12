import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api/axiosInstance";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // 👇 Get previous page path from state
  const from = location.state?.from || "/";

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      // "https://bus-booking-dn9k.onrender.com/api/auth/login",
      `${import.meta.env.VITE_API_URL}/auth/login`,
      { email, password }
    );

    // Save token in localStorage
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    alert("Login successful ✅");

    // Redirect back to where the user came from
    setTimeout(() => {
      navigate(from, { replace: true });
    }, 1000);

  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    alert("Login failed. Please check your credentials ❌");
  }
};


  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
  //       email,
  //       password,
  //     });

  //     //  Save token in localStorage
  //     localStorage.setItem("token", res.data.token);
  //     localStorage.setItem("user", JSON.stringify(res.data.user));

  //     alert("Login successful");

  //     // Redirect to the previous page or home
  //     setTimeout(() => {
  //       navigate(from, { replace: true });
  //     }, 1000);
  //     navigate("/"); // redirect after login

  //   } catch (error) {
  //     console.error("Login Error:", err.response?.data || err.message);
  //     alert("Login failed. Please check your credentials.");
  //   }
  // };

  return (
    <div className="container login-form mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow" style={{ background: "transparent" }}>
            <div className="card-body">
              <h3 className="text-center mb-4">Login</h3>
              <form onSubmit={handleLogin}>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Submit */}
                <button type="submit" className="btn btn-danger w-100">
                  Login
                </button>
              </form>
              <p className="mt-3 text-center" style={{ color: "white" }}>
                If you don't have an account? <a href="/register">Signup</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
