import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchMe } from "../api/authApi";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      fetchMe(token)
        .then((res) => setUser(res.data))
        .catch(console.error);
    }
  }, [token]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="dashboard-container">
      <div className="welcome-banner">
        <h1>Welcome, {user.fullName}!</h1>
        <p>Role: {user.role}</p>
      </div>

      <div className="user-card">
        <h2>Profile Info</h2>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone || "N/A"}
        </p>
      </div>

      <div className="dashboard-links">
        <Link to="/events" className="card-link">
          My Events
        </Link>
        <Link to="/vendors" className="card-link">
          Vendors
        </Link>
        <Link to="/booking" className="card-link">
          Book Event
        </Link>
      </div>

      <style jsx>{`
        .dashboard-container {
          padding: 20px;
          max-width: 900px;
          margin: auto;
        }

        .welcome-banner {
          background: linear-gradient(135deg, #ff6f61, #ff3b2e);
          color: white;
          padding: 30px 20px;
          border-radius: 12px;
          text-align: center;
          margin-bottom: 20px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }

        .user-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 20px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        }

        .dashboard-links {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .card-link {
          flex: 1 1 200px;
          text-align: center;
          padding: 20px;
          background: #ff3b2e;
          color: white;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 600;
          transition: transform 0.2s, background 0.3s;
        }

        .card-link:hover {
          background: #ff6f61;
          transform: translateY(-3px);
        }

        @media (max-width: 600px) {
          .dashboard-links {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
