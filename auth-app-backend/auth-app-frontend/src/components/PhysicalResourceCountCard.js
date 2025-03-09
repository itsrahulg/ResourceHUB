import React, { useState, useEffect } from "react";
import axios from "axios";

const PhysicalResourceCountCard = () => {
  const [count, setCount] = useState(0);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token"); // ✅ Get token from local storage

  useEffect(() => {
    if (!userId || !token) {
      console.error("❌ No userId or token found!");
      return;
    }

    axios
      .get(`http://localhost:5000/api/physicalresource/count/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }, // ✅ Include token in headers
      })
      .then((res) => {
        console.log("📊 Post Count:", res.data.count);
        setCount(res.data.count);
      })
      .catch((err) => console.error("❌ Error fetching post count:", err));
  }, [userId, token]);

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h5>My Posts</h5>
      <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>{count}</h1>
    </div>
  );
};

export default PhysicalResourceCountCard;
