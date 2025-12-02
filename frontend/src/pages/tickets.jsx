// frontend/src/pages/tickets.jsx   ← keep exact same file, just replace content
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Clock, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

export default function Tickets() {
  const [form, setForm] = useState({ title: "", description: "" });
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const token = localStorage.getItem("token");

  const fetchTickets = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tickets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTickets(data.tickets || []);
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setForm({ title: "", description: "" });
        fetchTickets();
      } else {
        const data = await res.json();
        alert(data.message || "Failed to create ticket");
      }
    } catch (err) {
      alert("Error");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "open":        return <span className="px-2.5 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">Open</span>;
      case "in-progress": return <span className="px-2.5 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">In Progress</span>;
      case "resolved":    return <span className="px-2.5 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full">Resolved</span>;
      default:            return <span className="px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">Open</span>;
    }
  };

  const getPriorityBadge = (p) => {
    const priority = p?.toLowerCase();
    if (priority === "high")   return <span className="px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-700 rounded-full">High</span>;
    if (priority === "medium") return <span className="px-2.5 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">Medium</span>;
    if (priority === "low")   return <span className="px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">Low</span>;
    return <span className="px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">Normal</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-20">
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-5xl">

        {/* Header */}
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent mb-2">
          My Tickets
        </h1>
        <p className="text-gray-600 mb-8">Quickly create or view your support tickets</p>

        {/* Compact Create Ticket Box */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-indigo-600" />
            New Ticket
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title (e.g. Login fails on mobile)"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-sm"
              required
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the issue..."
              rows="3"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-sm resize-none"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-medium rounded-lg hover:shadow-md transition disabled:opacity-70 text-sm"
            >
              {loading ? "Submitting..." : "Submit Ticket"}
            </button>
          </form>
        </div>

        {/* Compact Ticket List */}
        <div className="space-y-3">
          {fetching ? (
            <p className="text-center text-gray-500 py-8">Loading tickets...</p>
          ) : tickets.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <p className="text-gray-500">No tickets yet</p>
            </div>
          ) : (
            tickets.map((ticket) => (
              <Link
                key={ticket._id}
                to={`/tickets/${ticket._id}`}
                className="block bg-white rounded-lg border border-gray-200 p-4 hover:border-indigo-300 hover:shadow-md transition group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition text-base">
                      {ticket.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {ticket.description || "No description"}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
                      {getStatusBadge(ticket.status)}
                      {getPriorityBadge(ticket.priority)}
                      <span className="text-gray-500">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition" />
                </div>
              </Link>
            ))
          )}
        </div>

      </div>
    </div>
  );
}