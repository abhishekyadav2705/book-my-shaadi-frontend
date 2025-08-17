import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import VendorList from "./pages/VendorList";
import VendorDetails from "./pages/VendorDetails";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import Explore from "./pages/Explore";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        {/* Home now shows Explore */}
        <Route path="/" element={<Explore />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vendors" element={<VendorList />} />
        <Route path="/vendors/:id" element={<VendorDetails />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
