import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getVendorById } from "../api/vendorApi";
import { AuthContext } from "../context/AuthContext";

export default function VendorDetails() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const res = await getVendorById(id, token);
        setVendor(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch vendor");
      } finally {
        setLoading(false);
      }
    };
    fetchVendor();
  }, [id, token]);

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        Loading vendor...
      </p>
    );
  if (error)
    return (
      <p style={{ color: "red", textAlign: "center", marginTop: "50px" }}>
        {error}
      </p>
    );
  if (!vendor)
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>Vendor not found</p>
    );

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Vendor Image */}
      <div
        style={{
          width: "100%",
          height: "300px",
          borderRadius: "12px",
          overflow: "hidden",
          marginBottom: "20px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
        }}
      >
        <img
          src={
            vendor.image || "https://source.unsplash.com/900x300/?wedding,party"
          }
          alt={vendor.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Vendor Details Card */}
      <div
        style={{
          padding: "20px",
          borderRadius: "12px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginBottom: "10px", color: "#4B79A1" }}>
          {vendor.name}
        </h2>
        <p style={{ margin: "5px 0", fontWeight: "bold" }}>
          Category:{" "}
          <span style={{ fontWeight: "normal" }}>
            {vendor.category || "N/A"}
          </span>
        </p>
        <p style={{ margin: "5px 0" }}>Email: {vendor.email}</p>
        <p style={{ margin: "5px 0" }}>Phone: {vendor.phone || "N/A"}</p>
        <p style={{ margin: "15px 0", lineHeight: "1.6" }}>
          {vendor.description}
        </p>
        <button
          onClick={() => alert("Booking form coming soon!")}
          style={{
            padding: "12px 25px",
            background: "#FF6F61",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background 0.3s, transform 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#FF3B2E";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#FF6F61";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Book Event
        </button>
      </div>
    </div>
  );
}
