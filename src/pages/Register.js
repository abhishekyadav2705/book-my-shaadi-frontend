import React, { useState, useContext } from "react";
import { signup } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup({ email, password, fullName });
      setToken(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  const handleGoogleSignup = () => {
    alert("Dummy Google signup clicked!");
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1 className="register-title">BookMyShaadi</h1>
        <h2 className="register-subtitle">Create Your Account</h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-submit">
            Register
          </button>
        </form>

        <button className="btn-google" onClick={handleGoogleSignup}>
          Sign up with Google
        </button>

        <p className="login-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>Login</span>
        </p>
      </div>

      <style jsx>{`
        /* Container */
        .register-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(
            135deg,
            #f9f3f3,
            #fde2e2
          ); /* Soft pastel */
          padding: 20px;
        }

        /* Card */
        .register-card {
          background: white;
          padding: 50px 40px;
          border-radius: 16px;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.12);
          max-width: 450px;
          width: 100%;
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .register-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.18);
        }

        /* Title */
        .register-title {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 10px;
          color: #ff6f61;
          letter-spacing: 1px;
        }

        .register-subtitle {
          font-size: 1.3rem;
          color: #555;
          margin-bottom: 25px;
        }

        /* Inputs */
        .register-form input {
          width: 100%;
          padding: 15px 18px;
          margin: 12px 0;
          border-radius: 10px;
          border: 1px solid #ddd;
          font-size: 1rem;
          transition: border-color 0.3s;
        }

        .register-form input:focus {
          outline: none;
          border-color: #ff6f61;
        }

        /* Buttons */
        .btn-submit {
          width: 100%;
          padding: 15px 0;
          margin-top: 20px;
          border: none;
          border-radius: 10px;
          background: linear-gradient(90deg, #ff6f61, #ff3b2e);
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.2s ease;
        }

        .btn-submit:hover {
          background: linear-gradient(90deg, #ff3b2e, #ff6f61);
          transform: translateY(-2px);
        }

        .btn-google {
          width: 100%;
          padding: 12px 0;
          margin-top: 15px;
          border: 1px solid #ddd;
          border-radius: 10px;
          background: white;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          transition: background 0.3s ease, box-shadow 0.2s ease;
        }

        .btn-google:hover {
          background: #f1f1f1;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        /* Error */
        .error-message {
          color: #e74c3c;
          margin-bottom: 15px;
          font-size: 0.95rem;
        }

        /* Login link */
        .login-link {
          margin-top: 20px;
          font-size: 0.95rem;
          color: #555;
        }

        .login-link span {
          color: #ff6f61;
          cursor: pointer;
          font-weight: 600;
        }

        @media (max-width: 480px) {
          .register-card {
            padding: 35px 25px;
          }

          .register-title {
            font-size: 2rem;
          }

          .register-subtitle {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </div>
  );
}
