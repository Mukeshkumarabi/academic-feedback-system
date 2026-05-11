import { useEffect, useState, useCallback } from "react";import axios from "axios";

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
  }, []);

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
    await axios.delete(
      `http://localhost:5000/api/feedback/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Feedback deleted 🗑️");
    fetchMyFeedback();
  } catch (error) {
    console.log("Delete error:", error);
    alert(error.response?.data?.message || error.response?.data?.error || "Delete failed ❌");
  }
};

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>My Feedback</h2>

      {feedbacks.map((item) => (
        <div
          key={item._id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            margin: "10px auto",
            width: "420px",
            borderRadius: "10px",
          }}
        >
          <p>
            <strong>Message:</strong> {item.message}
          </p>

          <p>
            <strong>Created:</strong>{" "}
            {new Date(item.createdAt).toLocaleString()}
          </p>

          {editId === item._id ? (
            <>
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <br /><br />

              <button onClick={() => updateFeedback(item._id)}>
                Save
              </button>

              <button
                onClick={() => setEditId(null)}
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setEditId(item._id);
                  setNewMessage(item.message);
                }}
              >
                Edit
              </button>

              <button
                onClick={() => deleteFeedback(item._id)}
                style={{
                  marginLeft: "10px",
                  backgroundColor: "red",
                  color: "white",
                }}
              >
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default MyFeedback;