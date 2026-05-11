import { useState } from "react";
import axios from "axios";

function Feedback() {
  const [item, setItem] = useState("");
  const [rating, setRating] = useState("");
  const [message, setMessage] = useState("");

  const submitFeedback = async () => {
    const token = localStorage.getItem("token");

    if (!item || !rating || !message) {
      alert("Please select item, rating, and feedback");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/feedback",
        {
          item,
          rating: Number(rating),
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Feedback submitted successfully ✅");
      setItem("");
      setRating("");
      setMessage("");
      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.error || "Feedback submission failed ❌");
    }
  };

  return (
    <div className="panel">
      <h2>Submit Academic Feedback</h2>

      <select className="input" value={item} onChange={(e) => setItem(e.target.value)}>
        <option value="">Select Feedback Item</option>
        <option value="Course Content">Course Content</option>
        <option value="Faculty Teaching">Faculty Teaching</option>
        <option value="Lab Session">Lab Session</option>
        <option value="Exam Pattern">Exam Pattern</option>
        <option value="Classroom Facilities">Classroom Facilities</option>
      </select>

      <select className="input" value={rating} onChange={(e) => setRating(e.target.value)}>
        <option value="">Select Rating</option>
        <option value="5">5 - Excellent</option>
        <option value="4">4 - Very Good</option>
        <option value="3">3 - Good</option>
        <option value="2">2 - Average</option>
        <option value="1">1 - Poor</option>
      </select>

      <input
        className="input"
        type="text"
        placeholder="Enter your feedback"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button className="primary-btn" onClick={submitFeedback}>
        Submit Feedback
      </button>
    </div>
  );
}

export default Feedback;