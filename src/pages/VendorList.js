import React, { useEffect, useState, useContext } from "react";
import { getVendors } from "../api/vendorApi";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function VendorList() {
  const { token } = useContext(AuthContext);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await getVendors(token);
        setVendors(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch vendors");
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, [token]);

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        Loading vendors...
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
        Featured Vendors
      </h2>
      {vendors.length === 0 ? (
        <p style={{ textAlign: "center" }}>No vendors found</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {vendors.map((v) => (
            <div
              key={v.id}
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
                    v.image ||
                    `https://source.unsplash.com/220x150/?${
                      v.category || "event"
                    }`
                  }
                  alt={v.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: "15px" }}>
                <h3 style={{ margin: "0 0 10px 0", color: "#283E51" }}>
                  {v.name}
                </h3>
                <p
                  style={{
                    margin: "0 0 10px 0",
                    fontWeight: "500",
                    color: "#555",
                  }}
                >
                  Category: {v.category || "N/A"}
                </p>
                <Link
                  to={`/vendors/${v.id}`}
                  style={{
                    display: "inline-block",
                    padding: "8px 15px",
                    borderRadius: "8px",
                    backgroundColor: "#FF6F61",
                    color: "#fff",
                    fontWeight: "bold",
                    textDecoration: "none",
                    transition: "background 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#FF3B2E")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#FF6F61")
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
