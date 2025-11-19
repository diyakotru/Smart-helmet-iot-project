import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import pages
import Homepage from "./pages/homepage.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Database from "./pages/database.jsx";

export default function App() {
  return (
    <Router>
      <Routes>

        {/* HOME PAGE */}
        <Route path="/" element={<Homepage />} />

        {/* DASHBOARD (your main IoT monitoring panel) */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* DATABASE PAGE */}
        <Route path="/database" element={<Database />} />

      </Routes>
    </Router>
  );
}
