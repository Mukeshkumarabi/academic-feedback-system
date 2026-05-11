import Feedback from "./Feedback";
import MyFeedback from "./MyFeedback";

function UserDashboard() {
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>User Dashboard</h2>
      <Feedback />
      <MyFeedback />
    </div>
  );
}

export default UserDashboard;