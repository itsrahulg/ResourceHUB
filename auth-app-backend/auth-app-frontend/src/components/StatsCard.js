import React, { useEffect, useState } from "react";
import axios from "axios";

const StatsCard = ({ title, apiEndpoint, unit }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(apiEndpoint, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((response) => {
        setData(response.data.count);
        setLoading(false);
      })
      .catch((error) => {
        console.error(`Error fetching ${title}:`, error);
        setLoading(false);
      });
  }, [apiEndpoint, title, token]);

  return (
    <div style={styles.card}>
      <h4>{title}</h4>
      {loading ? (
        <div style={styles.spinner}></div>
      ) : (
        <p style={styles.count}>{data !== null ? `${data} ${unit || ""}` : "N/A"}</p>
      )}
    </div>
  );
};

// 🎨 **Single-line CSS Styles**
const styles = {
  card: { width: "300px", height: "250px", background: "#fff", boxShadow: "0px 4px 8px rgba(0,0,0,0.1)", borderRadius: "10px", textAlign: "center", padding: "20px", margin: "10px" },
  count: { fontSize: "24px", fontWeight: "bold", marginTop: "10px", color: "#007bff" },
  spinner: { width: "30px", height: "30px", border: "4px solid #ddd", borderTop: "4px solid #007bff", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "auto" },
  
};

export default StatsCard;
