import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchAllFeedback = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get("http://localhost:5000/api/feedback", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFeedbacks(res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Admin data fetch failed ❌");
    }
  };

  useEffect(() => {
    fetchAllFeedback();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Admin Dashboard</h2>
      <h3>All Feedback Submissions</h3>

      {feedbacks.map((item) => (
        <div
          key={item._id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            margin: "10px auto",
            width: "500px",
            borderRadius: "10px",
          }}
        >
          <p><strong>Feedback:</strong> {item.message}</p>
          <p><strong>User:</strong> {item.userId?.name}</p>
          <p><strong>Email:</strong> {item.userId?.email}</p>
          <p><strong>Created:</strong> {new Date(item.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;