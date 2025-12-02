// frontend/src/components/navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { LogOut, UserCircle, Shield, Crown, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const token = localStorage.getItem("token");
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  }
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">

          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-cyan-500 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-indigo-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                DevTriage
              </span>
              <span className="text-2xl font-extrabold text-gray-800"> AI</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {!token ? (
              /* Guest View */
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="px-6 py-2.5 text-gray-700 font-semibold hover:text-indigo-600 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="group relative px-8 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl overflow-hidden transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started Free
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </div>
            ) : (
              /* Logged In View */
              <div className="flex items-center gap-5">

                {/* Role Badge */}
                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-xl font-semibold text-sm hover:from-purple-200 hover:to-pink-200 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    <Crown size={18} />
                    <span>Admin Panel</span>
                  </Link>
                )}
                {user?.role === "moderator" && (
                  <Link
                    to="/moderator"
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-xl font-semibold text-sm hover:from-emerald-200 hover:to-teal-200 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    <Shield size={18} />
                    <span>Moderator</span>
                  </Link>
                )}

                {/* User Profile Section */}
                <div className="flex items-center gap-4 px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                  <div className="text-right">
                    <p className="text-xs text-gray-500 font-medium">Welcome back</p>
                    <p className="font-bold text-gray-800">{user?.name || user?.email}</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full blur opacity-25"></div>
                    <UserCircle size={40} className="relative text-indigo-600" />
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="group flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
                >
                  <LogOut size={18} className="group-hover:rotate-12 transition-transform duration-200" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-6 border-t border-gray-100">
            {!token ? (
              <div className="space-y-3">
                <Link
                  to="/login"
                  className="block w-full px-6 py-3 text-center text-gray-700 font-semibold hover:bg-gray-50 rounded-xl transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block w-full px-6 py-3 text-center bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started Free
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-purple-100 text-purple-700 rounded-xl font-semibold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Crown size={18} />
                    Admin Panel
                  </Link>
                )}
                {user?.role === "moderator" && (
                  <Link
                    to="/moderator"
                    className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-emerald-100 text-emerald-700 rounded-xl font-semibold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Shield size={18} />
                    Moderator
                  </Link>
                )}
                <div className="px-6 py-3 bg-gray-50 rounded-xl text-center">
                  <p className="text-sm text-gray-500">Welcome back</p>
                  <p className="font-bold text-gray-800">{user?.name || user?.email}</p>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-colors"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}