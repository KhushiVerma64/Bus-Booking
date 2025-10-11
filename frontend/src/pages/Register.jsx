import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Register Data:", formData); // ✅ for debugging
    
     try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register` , formData);

      if (res.data.token) {
        // save token in localStorage
        localStorage.setItem("token", res.data.token);

        // alert("Registration Successful!");
        window.location.href = "/"; // redirect to homepage
      }
    } catch (err) {
      console.error("Registration Error:", err.response?.data || err.message);
      alert("Registration Failed. Please try again.");
    }
  };

  return (
    <div className="container login-form mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow" style={{background:"transparent"}}>
            <div className="card-body">
              <h3 className="text-center  mb-4">Create Account</h3>
              <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
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
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Confirm Password */}
                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Submit */}
                <button type="submit" className="btn btn-danger w-100">
                  Register
                </button>
              </form>
              <p className="mt-3 text-center" style={{color:"white"}}>
                Already have an account? <a href="/login">Login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
