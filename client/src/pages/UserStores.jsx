import { useEffect, useState } from "react";
import api from "../services/api";

function UserStores() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRatings, setSelectedRatings] = useState({});

  async function loadStores() {
    try {
      const res = await api.get(`/stores?search=${search}`);
      setStores(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Stores load failed");
    }
  }

  useEffect(() => {
    loadStores();
  }, []);

  function handleRatingChange(storeId, value) {
    setSelectedRatings({
      ...selectedRatings,
      [storeId]: value,
    });
  }

  async function submitRating(storeId) {
    const rating = selectedRatings[storeId];

    if (!rating) {
      alert("Please select rating first");
      return;
    }

    try {
      const res = await api.post("/ratings", {
        storeId,
        rating: Number(rating),
      });

      alert(res.data.message);
      loadStores();
    } catch (err) {
      alert(err.response?.data?.message || "Rating failed");
    }
  }

  function logout() {
    localStorage.clear();
    window.location.href = "/";
  }

 const searchText = search.trim().toLowerCase();

const filteredStores = stores.filter((store) => {
  return (
    store.name?.toLowerCase().includes(searchText) ||
    store.address?.toLowerCase().includes(searchText)
  );
});

  return (
    <div className="dashboard">
      <div className="topbar">
        <div>
          <h1 className="main-title">Store Rating Platform</h1>

          <p className="subtitle">
            Discover top grocery, medical, fashion and cafe stores
          </p>
        </div>

        <button onClick={logout}>Logout</button>
      </div>

      <div className="search-box">
        <input
          placeholder="Search grocery, medical, clothing, cafe stores..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={loadStores}>Search</button>
      </div>

      <div className="store-grid">
        {filteredStores.map((store) => (
          <div className="store-card" key={store.id}>
            <img
              className="store-img"
              src={
                store.imageUrl ||
                "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800"
              }
              alt={store.name}
            />

            <div className="store-content">
              <h2>{store.name}</h2>

              <p className="store-address">{store.address}</p>

              <p>
                ⭐ Overall Rating:{" "}
                <b>{Number(store.averageRating || 0).toFixed(1)}</b>
              </p>

              <p>
                Your Rating:{" "}
                <b>{store.userRating || "Not rated yet"}</b>
              </p>

              <select
                value={selectedRatings[store.id] || ""}
                onChange={(e) =>
                  handleRatingChange(store.id, e.target.value)
                }
              >
                <option value="">Select Rating</option>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>

              <button
                className="rating-btn"
                onClick={() => submitRating(store.id)}
              >
                {store.userRating ? "Update Rating" : "Submit Rating"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserStores;