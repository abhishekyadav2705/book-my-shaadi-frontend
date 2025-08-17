// src/components/VendorCard.js
import React from "react";

export default function VendorCard({ vendor }) {
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
        src={vendor.image}
        alt={vendor.name}
        style={{ width: "100%", height: "140px", objectFit: "cover" }}
      />
      <div style={{ padding: "12px" }}>
        <h3 style={{ margin: "0 0 5px 0", fontSize: "1.1rem" }}>
          {vendor.name}
        </h3>
        <p style={{ margin: 0, fontSize: "0.9rem", color: "#555" }}>
          {vendor.category || "Vendor"}
        </p>
        <button
          style={{
            marginTop: "10px",
            width: "100%",
            padding: "8px",
            background: "#4B79A1",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#283E51")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#4B79A1")}
        >
          View Vendor
        </button>
      </div>
    </div>
  );
}
