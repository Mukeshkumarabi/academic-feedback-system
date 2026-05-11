import { useEffect, useState, useCallback } from "react";
import axios from "axios";

function MyFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const token = localStorage.getItem("token");

  const fetchMyFeedback = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/feedback/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFeedbacks(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  useEffect(() => {
    fetchMyFeedback();
  }, [fetchMyFeedback]);

  const updateFeedback = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/feedback/${id}`,
        { message: newMessage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Feedback updated ✅");
      setEditId(null);
      setNewMessage("");
      fetchMyFeedback();
    } catch (error) {
      alert(error.response?.data?.message || "Update failed ❌");
    }
  };

  const deleteFeedback = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/feedback/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Feedback deleted 🗑️");
      fetchMyFeedback();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed ❌");
    }
  };

  return (
    <div className="panel">
      <h2>My Feedback</h2>

      {feedbacks.map((item) => (
        <div key={item._id} className="card">
          <p><strong>Item:</strong> {item.item}</p>
          <p><strong>Rating:</strong> ⭐ {item.rating}</p>
          <p><strong>Message:</strong> {item.message}</p>
          <p><strong>Created:</strong> {new Date(item.createdAt).toLocaleString()}</p>

          {editId === item._id ? (
            <>
              <input
                className="input"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button className="save-btn" onClick={() => updateFeedback(item._id)}>
                Save
              </button>
            </>
          ) : (
            <div className="card-buttons">
              <button
                className="edit-btn"
                onClick={() => {
                  setEditId(item._id);
                  setNewMessage(item.message);
                }}
              >
                Edit
              </button>

              <button className="delete-btn" onClick={() => deleteFeedback(item._id)}>
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default MyFeedback;