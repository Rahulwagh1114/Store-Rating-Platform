import { useEffect, useState } from "react";
import api from "../services/api";

function OwnerDashboard() {
  const [data, setData] = useState(null);

  async function loadData() {
    try {
      const res = await api.get("/owner/dashboard");
      setData(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Owner dashboard failed");
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function logout() {
    localStorage.clear();
    window.location.href = "/";
  }

  if (!data) {
    return <h2 style={{ padding: "30px" }}>Loading...</h2>;
  }

  return (
    <div className="dashboard">
      <div className="topbar">
        <h1>Owner Dashboard</h1>
        <button onClick={logout}>Logout</button>
      </div>

      <div className="stats">
        <div>Store: {data.store.name}</div>
        <div>Average Rating: {Number(data.averageRating || 0).toFixed(1)}</div>
      </div>

      <div className="table-card">
        <h2>Users Who Rated Your Store</h2>

        <table>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Rating</th>
            </tr>
          </thead>

          <tbody>
            {data.ratings.map((r, index) => (
              <tr key={index}>
                <td>{r.userName}</td>
                <td>{r.userEmail}</td>
                <td>{r.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OwnerDashboard;