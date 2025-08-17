import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { token, setToken } = useContext(AuthContext);
  const [location, setLocation] = useState("📍 Detecting...");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  // Mock vendor data (replace with API later)
  const vendors = [
    { id: 1, name: "Sharma Wedding Photographers", type: "📸 Photographer" },
    { id: 2, name: "Royal Palace Banquet Hall", type: "🏛 Venue" },
    { id: 3, name: "Elegant Decorators", type: "🎉 Decorator" },
    { id: 4, name: "Nagpur Catering Services", type: "🍽 Caterer" },
    { id: 5, name: "Golden Moments Photography", type: "📸 Photographer" },
  ];

  const handleLogout = () => {
    setToken(null);
  };

  // Detect user location + reverse geocoding (area-level, not just city)
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;

            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await res.json();

            if (data && data.address) {
              const {
                suburb,
                neighbourhood,
                city_district,
                city,
                town,
                village,
                state,
              } = data.address;
              setLocation(
                `📍 ${
                  suburb ||
                  neighbourhood ||
                  city_district ||
                  city ||
                  town ||
                  village ||
                  state
                }`
              );
            } else {
              setLocation(`📍 ${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
            }
          } catch (err) {
            setLocation("📍 Location unavailable");
          }
        },
        () => {
          setLocation("📍 Location blocked");
        }
      );
    } else {
      setLocation("📍 Location not supported");
    }
  }, []);

  // Search filter logic
  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
    } else {
      const filtered = vendors.filter((vendor) =>
        vendor.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    }
  }, [query]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(query)}`);
      setResults([]);
    }
  };

  return (
    <nav className="navbar">
      {/* Logo + Location */}
      <div className="navbar-left">
        <div className="navbar-logo">
          <Link to="/">BookMyShaadi</Link>
        </div>
        <div className="navbar-location">
          <span>{location}</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="navbar-search">
        <form
          onSubmit={handleSearchSubmit}
          style={{ position: "relative", width: "100%" }}
        >
          <input
            type="text"
            placeholder="Search for photographers, venues, caterers..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {/* Dropdown Suggestions */}
          {results.length > 0 && (
            <ul className="search-results">
              {results.map((vendor) => (
                <li
                  key={vendor.id}
                  onClick={() => {
                    navigate(`/vendor/${vendor.id}`);
                    setQuery("");
                    setResults([]);
                  }}
                >
                  <strong>{vendor.name}</strong>{" "}
                  <span className="type">{vendor.type}</span>
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>

      {/* Right Section */}
      <div className="navbar-right">
        {!token ? (
          <NavLink to="/login" className="btn login-btn">
            Login
          </NavLink>
        ) : (
          <button onClick={handleLogout} className="btn logout-btn">
            Logout
          </button>
        )}
        <Link to="/cart" className="btn cart-btn">
          🛒 Cart
        </Link>
      </div>

      <style jsx>{`
        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 25px;
          background: #fff;
          border-bottom: 1px solid #eee;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .navbar-left {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .navbar-logo a {
          color: #ff3b2e;
          font-size: 1.6rem;
          font-weight: 700;
          text-decoration: none;
        }

        .navbar-location {
          font-size: 0.9rem;
          color: #444;
          font-weight: 500;
        }

        .navbar-search {
          flex: 2;
          display: flex;
          justify-content: center;
          position: relative;
        }

        .navbar-search input {
          width: 100%;
          max-width: 450px;
          padding: 10px 15px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 0.95rem;
          outline: none;
          transition: all 0.2s ease;
        }

        .navbar-search input:focus {
          border-color: #ff3b2e;
          box-shadow: 0 0 6px rgba(255, 59, 46, 0.2);
        }

        .search-results {
          position: absolute;
          top: 110%;
          left: 0;
          width: 100%;
          max-width: 450px;
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
          list-style: none;
          padding: 0;
          margin: 5px 0 0 0;
          z-index: 2000;
          overflow: hidden;
        }

        .search-results li {
          padding: 10px 15px;
          cursor: pointer;
          font-size: 0.95rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background 0.2s;
          border-bottom: 1px solid #f5f5f5;
        }

        .search-results li:last-child {
          border-bottom: none;
        }

        .search-results li:hover {
          background: #fff5f5;
        }

        .search-results .type {
          color: #777;
          font-size: 0.85rem;
        }

        .navbar-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .btn {
          font-weight: 600;
          text-decoration: none;
          border: none;
          cursor: pointer;
          font-size: 0.95rem;
          padding: 8px 14px;
          border-radius: 6px;
          transition: all 0.3s;
        }

        .login-btn {
          background: #ff3b2e;
          color: #fff;
        }
        .logout-btn {
          background: #444;
          color: #fff;
        }
        .cart-btn {
          background: #ffeaea;
          color: #ff3b2e;
        }

        .login-btn:hover {
          background: #e22a1d;
        }
        .logout-btn:hover {
          background: #222;
        }
        .cart-btn:hover {
          background: #ff3b2e;
          color: #fff;
        }

        @media (max-width: 768px) {
          .navbar {
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
          }

          .navbar-left {
            gap: 15px;
          }

          .navbar-search {
            order: 3;
            flex: 1 1 100%;
          }

          .navbar-search input {
            max-width: 100%;
          }
        }
      `}</style>
    </nav>
  );
}
