import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getAllEvents } from "../api/eventApi";
import { Link } from "react-router-dom";

export default function Events() {
  const { token } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getAllEvents(token);
        setEvents(res.data);
      } catch (err) {
        setError(err.response?.data || "Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [token]);

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        Loading events...
      </p>
    );
  if (error)
    return (
      <p style={{ color: "red", textAlign: "center", marginTop: "50px" }}>
        {error}
      </p>
    );

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <h2
        style={{ textAlign: "center", marginBottom: "30px", color: "#4B79A1" }}
      >
        Upcoming Events
      </h2>

      {events.length === 0 ? (
        <p style={{ textAlign: "center" }}>No events found</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {events.map((event) => (
            <div
              key={event.id}
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
                backgroundColor: "#fff",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
              }}
            >
              <div
                style={{ width: "100%", height: "150px", overflow: "hidden" }}
              >
                <img
                  src={
                    event.image ||
                    `https://source.unsplash.com/250x150/?${event.name}`
                  }
                  alt={event.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: "15px" }}>
                <h3 style={{ margin: "0 0 10px 0", color: "#283E51" }}>
                  {event.name}
                </h3>
                <p
                  style={{
                    margin: "0 0 10px 0",
                    fontWeight: "500",
                    color: "#555",
                  }}
                >
                  Date: {new Date(event.date).toLocaleDateString()}
                </p>
                <p style={{ margin: "0 0 15px 0", color: "#777" }}>
                  Location: {event.location || "N/A"}
                </p>
                <Link
                  to={`/events/${event.id}`}
                  style={{
                    display: "inline-block",
                    padding: "8px 15px",
                    borderRadius: "8px",
                    backgroundColor: "#4B79A1",
                    color: "#fff",
                    fontWeight: "bold",
                    textDecoration: "none",
                    transition: "background 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#283E51")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#4B79A1")
                  }
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
