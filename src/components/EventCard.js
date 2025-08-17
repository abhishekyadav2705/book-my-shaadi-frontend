// src/components/EventCard.js
import React from "react";

export default function EventCard({ event }) {
  return (
    <div
      style={{
        width: "220px",
        borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
      }}
    >
      <img
        src={event.image}
        alt={event.name}
        style={{ width: "100%", height: "140px", objectFit: "cover" }}
      />
      <div style={{ padding: "12px" }}>
        <h3 style={{ margin: "0 0 5px 0", fontSize: "1.1rem" }}>
          {event.name}
        </h3>
        <p style={{ margin: 0, fontSize: "0.9rem", color: "#555" }}>
          Date: {new Date(event.date).toLocaleDateString()}
        </p>
        <p style={{ margin: 0, fontSize: "0.9rem", color: "#555" }}>
          Location: {event.location}
        </p>
        <button
          style={{
            marginTop: "10px",
            width: "100%",
            padding: "8px",
            background: "#FF6F61",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#FF3B2E")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#FF6F61")}
        >
          View Event
        </button>
      </div>
    </div>
  );
}
