import { useEffect, useState } from "react";
import axios from "axios";

function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  const token = localStorage.getItem("token");

  const fetchAllFeedback = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/feedback",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFeedbacks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllFeedback();
  }, []);

  return (
    <div className="panel">
      <h2>Admin Dashboard</h2>

      {feedbacks.map((item) => (
        <div key={item._id} className="feedback-card">

          <p>
            <strong>User:</strong> {item.userId?.name}
          </p>

          <p>
            <strong>Email:</strong> {item.userId?.email}
          </p>

          <p>
            <strong>Item:</strong> {item.item}
          </p>

          <p>
            <strong>Rating:</strong> ⭐ {item.rating}
          </p>

          <p>
            <strong>Feedback:</strong> {item.message}
          </p>

          <p>
            <strong>Created:</strong>{" "}
            {new Date(item.createdAt).toLocaleString()}
          </p>

        </div>
      ))}
    </div>
  );
}

export default AdminFeedback;