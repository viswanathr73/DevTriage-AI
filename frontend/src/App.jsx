
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import CheckAuth from "./components/check-auth.jsx";

// Pages
import Home from "./pages/Home.jsx"; // NEW
import Dashboard from "./pages/Dashboard.jsx"; // NEW (wraps Tickets)
import TicketDetailsPage from "./pages/ticket.jsx"; // Existing
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import Admin from "./pages/admin.jsx";
// Add Profile, ModeratorDashboard if you have them

const ProtectedRoute = ({ children }) => (
  <CheckAuth protected={true}>{children}</CheckAuth>
);

const PublicRoute = ({ children }) => (
  <CheckAuth protected={false}>{children}</CheckAuth>
);

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/tickets/:id" element={<ProtectedRoute><TicketDetailsPage /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          {/* Add more: <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} /> */}

          <Route path="*" element={<div className="text-center py-20 text-2xl">404 - Page Not Found</div>} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}