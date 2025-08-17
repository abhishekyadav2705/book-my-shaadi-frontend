// src/components/CategoryCard.js
import React from "react";

export default function CategoryCard({ title, image }) {
  return (
    <div
      style={{
        position: "relative",
        width: "220px",
        height: "140px",
        borderRadius: "12px",
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
      }}
    >
      <img
        src={image}
        alt={title}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          width: "100%",
          padding: "10px",
          background: "rgba(0,0,0,0.5)",
          color: "#fff",
          fontWeight: "bold",
          textAlign: "center",
          fontSize: "1rem",
        }}
      >
        {title}
      </div>
    </div>
  );
}
