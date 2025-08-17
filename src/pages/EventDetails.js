// src/pages/EventDetails.js
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../api/eventApi";
import { AuthContext } from "../context/AuthContext";

export default function EventDetails() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await getEventById(id, token);
        setEvent(res.data);
      } catch (err) {
        setError(err.response?.data || "Failed to fetch event");
      }
    };

    fetchEvent();
  }, [id, token]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!event) return <p>Loading event...</p>;

  return (
    <div className="container">
      <h2>{event.name}</h2>
      <p>
        <strong>Date:</strong> {event.date}
      </p>
      <p>
        <strong>Location:</strong> {event.location}
      </p>
      <p>
        <strong>Description:</strong> {event.description}
      </p>
      <p>
        <strong>Created by:</strong> {event.user.fullName} ({event.user.email})
      </p>
    </div>
  );
}
