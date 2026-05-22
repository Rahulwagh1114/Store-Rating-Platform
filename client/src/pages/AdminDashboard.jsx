import { useEffect, useState } from "react";
import api from "../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);

  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    role: "user",
  });

  const [storeForm, setStoreForm] = useState({
    name: "",
    email: "",
    address: "",
    imageUrl: "",
    ownerId: "",
  });

  async function loadData() {
    try {
      const dashboardRes = await api.get("/admin/dashboard");
      const usersRes = await api.get("/admin/users");
      const storesRes = await api.get("/admin/stores");

      setStats(dashboardRes.data);
      setUsers(usersRes.data);
      setStores(storesRes.data);
    } catch (err) {
      alert(err.response?.data?.message || "Admin data load failed");
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function handleUserChange(e) {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  }

  function handleStoreChange(e) {
    setStoreForm({ ...storeForm, [e.target.name]: e.target.value });
  }

  async function addUser(e) {
    e.preventDefault();

    try {
      const res = await api.post("/admin/users", userForm);
      alert(res.data.message);

      setUserForm({
        name: "",
        email: "",
        address: "",
        password: "",
        role: "user",
      });

      loadData();
    } catch (err) {
      alert(err.response?.data?.message || "User add failed");
    }
  }

  async function addStore(e) {
    e.preventDefault();

    try {
      const res = await api.post("/admin/stores", storeForm);
      alert(res.data.message);

      setStoreForm({
        name: "",
        email: "",
        address: "",
        imageUrl: "",
        ownerId: "",
      });

      loadData();
    } catch (err) {
      alert(err.response?.data?.message || "Store add failed");
    }
  }

  function logout() {
    localStorage.clear();
    window.location.href = "/";
  }

  return (
    <div className="dashboard">
      <div className="topbar">
        <h1>Admin Dashboard</h1>
        <button onClick={logout}>Logout</button>
      </div>

      <div className="stats">
        <div>Total Users: {stats.totalUsers || 0}</div>
        <div>Total Stores: {stats.totalStores || 0}</div>
        <div>Total Ratings: {stats.totalRatings || 0}</div>
      </div>

      <div className="grid">
        <form className="card" onSubmit={addUser}>
          <h2>Add User</h2>

          <input
            name="name"
            placeholder="Name min 20 characters"
            value={userForm.name}
            onChange={handleUserChange}
          />

          <input
            name="email"
            placeholder="Email"
            value={userForm.email}
            onChange={handleUserChange}
          />

          <input
            name="address"
            placeholder="Address"
            value={userForm.address}
            onChange={handleUserChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password e.g. Rahul@123"
            value={userForm.password}
            onChange={handleUserChange}
          />

          <select
            name="role"
            value={userForm.role}
            onChange={handleUserChange}
          >
            <option value="user">Normal User</option>
            <option value="owner">Store Owner</option>
            <option value="admin">Admin</option>
          </select>

          <button>Add User</button>
        </form>

        <form className="card" onSubmit={addStore}>
          <h2>Add Store</h2>

          <input
            name="name"
            placeholder="Store Name"
            value={storeForm.name}
            onChange={handleStoreChange}
          />

          <input
            name="email"
            placeholder="Store Email"
            value={storeForm.email}
            onChange={handleStoreChange}
          />

          <input
            name="address"
            placeholder="Store Address"
            value={storeForm.address}
            onChange={handleStoreChange}
          />

          <input
            name="imageUrl"
            placeholder="Store Image URL"
            value={storeForm.imageUrl}
            onChange={handleStoreChange}
          />

          <input
            name="ownerId"
            placeholder="Owner User ID"
            value={storeForm.ownerId}
            onChange={handleStoreChange}
          />

          <button>Add Store</button>
        </form>
      </div>

      <div className="table-card">
        <h2>Users List</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.address}</td>
                <td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-card">
        <h2>Stores List</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Store</th>
              <th>Email</th>
              <th>Address</th>
              <th>Image</th>
              <th>Avg Rating</th>
            </tr>
          </thead>

          <tbody>
            {stores.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.address}</td>
                <td>
                  {s.imageUrl ? (
                    <img
                      src={s.imageUrl}
                      alt={s.name}
                      style={{
                        width: "70px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>{Number(s.averageRating || 0).toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;