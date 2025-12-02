
import { useEffect, useState } from "react";
import { Search, Crown, Shield, User, Save, X, Mail } from "lucide-react";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ role: "", skills: "" });
  const [searchQuery, setSearchQuery] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(data);
        setFilteredUsers(data);
      }
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user.email);
    setFormData({
      role: user.role || "user",
      skills: user.skills?.join(", ") || "",
    });
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/auth/update-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email: editingUser,
            role: formData.role,
            skills: formData.skills
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          }),
        }
      );

      if (res.ok) {
        setEditingUser(null);
        setFormData({ role: "", skills: "" });
        fetchUsers();
      } else {
        const data = await res.json();
        alert(data.error || "Update failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredUsers(
      users.filter((user) => user.email.toLowerCase().includes(query))
    );
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case "admin":
        return <span className="px-2.5 py-0.5 text-xs font-medium bg-purple-100 text-purple-700 rounded-full flex items-center gap-1"><Crown size={12} /> Admin</span>;
      case "moderator":
        return <span className="px-2.5 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full flex items-center gap-1"><Shield size={12} /> Moderator</span>;
      default:
        return <span className="px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full flex items-center gap-1"><User size={12} /> User</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-20">
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <p className="text-gray-600 mt-1">Manage user roles and mentor skills</p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search users by email..."
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-sm"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        {/* Users Grid - Compact & Clean */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 py-12">
              {searchQuery ? "No users found" : "Loading users..."}
            </p>
          ) : (
            filteredUsers.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-lg border border-gray-200 p-5 hover:border-indigo-300 hover:shadow-md transition group"
              >
                {/* User Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {user.email[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{user.email.split("@")[0]}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  {getRoleBadge(user.role)}
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 font-medium">Skills</p>
                  <p className="text-sm text-gray-700 mt-1">
                    {user.skills?.length > 0 ? user.skills.join(", ") : "—"}
                  </p>
                </div>

                {/* Edit Mode */}
                {editingUser === user.email ? (
                  <div className="space-y-3">
                    <select
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-indigo-500 outline-none"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    >
                      <option value="user">User</option>
                      <option value="moderator">Moderator</option>
                      <option value="admin">Admin</option>
                    </select>

                    <input
                      type="text"
                      placeholder="e.g. React, Node.js, Python"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-indigo-500 outline-none"
                      value={formData.skills}
                      onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    />

                    <div className="flex gap-2">
                      <button
                        onClick={handleUpdate}
                        className="flex-1 py-2 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white text-xs font-medium rounded-lg hover:shadow-md transition flex items-center justify-center gap-1"
                      >
                        <Save size={14} /> Save
                      </button>
                      <button
                        onClick={() => setEditingUser(null)}
                        className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEditClick(user)}
                    className="w-full py-2 border border-indigo-200 text-indigo-600 text-sm font-medium rounded-lg hover:bg-indigo-50 transition"
                  >
                    Edit User
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}