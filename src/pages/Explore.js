// src/pages/Explore.js
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchMe } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import {
  FaUtensils,
  FaCamera,
  FaGift,
  FaMapMarkerAlt,
  FaUsers,
} from "react-icons/fa";

export default function Explore() {
  const { token, user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (token && !user) {
          const res = await fetchMe(token);
          setUser(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token, user, setUser]);

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "50px", fontSize: "18px" }}>
        Loading...
      </p>
    );

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", color: "#333" }}>
      {/* ================= HERO SECTION ================= */}
      <section
        style={{
          position: "relative",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "#333", // Dark text instead of white
          background: "#fff", // 👈 White background
          overflow: "hidden",
          padding: "0 20px",
        }}
      >
        {/* Floating Wedding Icons (optional) */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
          alt="cake"
          className="floating-icon"
          style={{ top: "20%", left: "10%", width: "60px", opacity: 0.08 }}
        />
        <img
          src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png"
          alt="ring"
          className="floating-icon"
          style={{ top: "35%", right: "12%", width: "50px", opacity: 0.08 }}
        />
        <img
          src="https://cdn-icons-png.flaticon.com/512/2917/2917995.png"
          alt="flower"
          className="floating-icon"
          style={{ bottom: "20%", left: "30%", width: "70px", opacity: 0.08 }}
        />

        {/* Hero Content */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: "900px" }}>
          <h1
            style={{
              fontSize: "3.5rem",
              fontWeight: 700,
              lineHeight: "1.2",
              marginBottom: "20px",
            }}
          >
            Your Dream Wedding,{" "}
            <span style={{ color: "#ff4d4d" }}>Seamlessly Planned</span>
          </h1>
          <p
            style={{
              fontSize: "1.3rem",
              maxWidth: "650px",
              margin: "0 auto 40px",
              color: "#555",
            }}
          >
            Explore venues, caterers, decorators, and more — everything you need
            in one place.
          </p>

          {/* Search Bar */}
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "50px",
              display: "flex",
              alignItems: "center",
              padding: "12px 20px",
              maxWidth: "650px",
              margin: "0 auto 40px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
            }}
          >
            <FaMapMarkerAlt
              color="#ff4d4d"
              size={20}
              style={{ marginRight: "10px" }}
            />
            <input
              type="text"
              placeholder="Search for venues, vendors, services..."
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: "1rem",
                padding: "10px",
                background: "transparent",
              }}
            />
            <button
              style={{
                background: "#ff4d4d",
                border: "none",
                color: "#fff",
                padding: "10px 25px",
                borderRadius: "50px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Search
            </button>
          </div>

          {/* App Badges */}
          <div
            style={{ display: "flex", gap: "20px", justifyContent: "center" }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              style={{ height: "55px", cursor: "pointer" }}
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Available_on_the_App_Store_(black).png"
              alt="App Store"
              style={{ height: "55px", cursor: "pointer" }}
            />
          </div>
        </div>

        {/* CSS Animations */}
        <style>
          {`
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-12px); }
        100% { transform: translateY(0px); }
      }

      .floating-icon {
        position: absolute;
        animation: float 6s ease-in-out infinite;
        z-index: 0;
      }
    `}
        </style>
      </section>

      {/* ================= STATS SECTION ================= */}
      {/* (your other sections remain unchanged) */}
      <section
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          padding: "80px 20px",
          background: "#fff",
          textAlign: "center",
        }}
      >
        {[
          {
            number: "500+",
            label: "Vendors",
            icon: <FaUsers size={40} color="#ff4d4d" />,
          },
          {
            number: "50+",
            label: "Categories",
            icon: <FaUtensils size={40} color="#ff4d4d" />,
          },
          {
            number: "1000+",
            label: "Events",
            icon: <FaCamera size={40} color="#ff4d4d" />,
          },
        ].map((stat) => (
          <div key={stat.label} style={{ margin: "20px" }}>
            {stat.icon}
            <h2
              style={{
                fontSize: "2.5rem",
                color: "#ff4d4d",
                marginTop: "10px",
              }}
            >
              {stat.number}
            </h2>
            <p style={{ fontSize: "1.1rem", fontWeight: 500 }}>{stat.label}</p>
          </div>
        ))}
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section
        style={{
          padding: "80px 20px",
          textAlign: "center",
          background: "#fafafa",
        }}
      >
        <h2
          style={{ fontSize: "2.8rem", marginBottom: "50px", fontWeight: 600 }}
        >
          What you can do on{" "}
          <span style={{ color: "#ff4d4d" }}>BookMyShaadi</span>
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "30px",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {[
            {
              text: "Find Top Venues",
              icon: <FaMapMarkerAlt size={30} color="#ff4d4d" />,
            },
            {
              text: "Hire Caterers & Decorators",
              icon: <FaUtensils size={30} color="#ff4d4d" />,
            },
            {
              text: "Plan Your Budget",
              icon: <FaGift size={30} color="#ff4d4d" />,
            },
            {
              text: "Book Photographers",
              icon: <FaCamera size={30} color="#ff4d4d" />,
            },
            {
              text: "Schedule Events",
              icon: <FaUsers size={30} color="#ff4d4d" />,
            },
            {
              text: "Exclusive Offers",
              icon: <FaGift size={30} color="#ff4d4d" />,
            },
          ].map((feature) => (
            <div
              key={feature.text}
              style={{
                padding: "30px",
                borderRadius: "15px",
                backgroundColor: "#fff",
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                fontWeight: 500,
                transition: "all 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform =
                  "translateY(-8px) scale(1.03)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0) scale(1)")
              }
            >
              <div style={{ marginBottom: "15px" }}>{feature.icon}</div>
              {feature.text}
            </div>
          ))}
        </div>
      </section>

      {/* ================= APP PROMO SECTION ================= */}
      <section
        style={{
          padding: "100px 20px",
          background: "linear-gradient(135deg, #ff4d4d, #ff7676)",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "3rem", marginBottom: "20px", fontWeight: 600 }}>
          Get the App Now!
        </h2>
        <p
          style={{
            maxWidth: "550px",
            margin: "0 auto 40px auto",
            fontSize: "1.3rem",
            opacity: 0.95,
          }}
        >
          Book venues, hire vendors, and plan your big day — all from the palm
          of your hand.
        </p>
        <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Google Play"
            style={{ height: "60px", cursor: "pointer" }}
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Available_on_the_App_Store_(black).png"
            alt="App Store"
            style={{ height: "60px", cursor: "pointer" }}
          />
        </div>
      </section>
    </div>
  );
}
