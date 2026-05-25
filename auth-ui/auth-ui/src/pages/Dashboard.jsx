import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/api/welcome")
      .then((res) => setMessage(res.data))
      .catch(() => setMessage("Unauthorized"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="max-w-4xl mx-auto flex items-center justify-between py-6">
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        <button onClick={handleLogout} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Logout</button>
      </header>

      <main className="max-w-4xl mx-auto">
        <div className="card">
          <h2 className="text-lg font-medium text-gray-800">{message || 'Loading...'}</h2>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;