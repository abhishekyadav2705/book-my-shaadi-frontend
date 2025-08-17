import React, { useState, useContext } from "react";
import { login } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      setToken(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </form>
        <div className="google-login">
          <button onClick={() => alert("Google login coming soon!")}>
            Login with Google
          </button>
        </div>
      </div>

      <style jsx>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #ff6f61, #ff3b2e);
        }

        .login-box {
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
          width: 100%;
          max-width: 400px;
          text-align: center;
        }

        .login-box h2 {
          margin-bottom: 20px;
          color: #ff3b2e;
        }

        .login-box input {
          width: 100%;
          padding: 12px 15px;
          margin: 10px 0;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
        }

        .login-box button {
          width: 100%;
          padding: 12px;
          margin-top: 15px;
          border: none;
          border-radius: 8px;
          background: #ff3b2e;
          color: white;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s, transform 0.2s;
        }

        .login-box button:hover {
          background: #ff6f61;
          transform: translateY(-2px);
        }

        .error {
          color: red;
          margin-bottom: 10px;
        }

        .google-login button {
          width: 100%;
          padding: 12px;
          margin-top: 10px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background: white;
          color: #ff3b2e;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s, transform 0.2s;
        }

        .google-login button:hover {
          background: #ffe6e3;
          transform: translateY(-2px);
        }

        @media (max-width: 480px) {
          .login-box {
            padding: 30px 20px;
          }
        }
      `}</style>
    </div>
  );
}
