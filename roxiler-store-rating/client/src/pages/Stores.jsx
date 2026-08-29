import { useEffect, useState } from "react";
import axios from "axios";
export default function Stores() {
  const [stores, setStores] = useState([]);
  const [rating, setRating] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/stores")
      .then((res) => setStores(res.data))
      .catch(() =>
        setStores([
          { id: 1, name: "Demo Store", address: "Pune", rating: 4.2 },
          { id: 2, name: "Roxiler Store", address: "Mumbai", rating: 4.8 },
        ]),
      );
  }, []);
  const rateStore = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/stores/${id}/rate`,
        { rating: rating[id] },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      alert("Rated!");
    } catch {
      alert("Please Login to rate");
    }
  };
  return (
    <div
      style={{
        padding: "20px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
        gap: "15px",
      }}
    >
      {stores.map((s) => (
        <div
          key={s.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            borderRadius: "10px",
          }}
        >
          <h3>{s.name}</h3>
          <p>{s.address}</p>
          <p>⭐ {s.rating || s.averageRating || "4.5"}</p>
          <input
            type="number"
            min="1"
            max="5"
            placeholder="Rate 1-5"
            onChange={(e) => setRating({ ...rating, [s.id]: e.target.value })}
            style={{ width: "70px", padding: "5px" }}
          />
          <button
            onClick={() => rateStore(s.id)}
            style={{
              marginLeft: "10px",
              padding: "5px 10px",
              background: "green",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Submit
          </button>
        </div>
      ))}
    </div>
  );
}
