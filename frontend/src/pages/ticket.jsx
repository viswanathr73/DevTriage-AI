// frontend/src/pages/ticket/TicketDetails.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, User, AlertCircle, CheckCircle2, Bot } from "lucide-react";

export default function TicketDetailsPage() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tickets/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setTicket(data.ticket || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTicket();
  }, [id]);

  if (loading) return <div className="text-center py-20 text-gray-500">Loading ticket...</div>;
  if (!ticket) return <div className="text-center py-20 text-red-500">Ticket not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-20">
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-indigo-600 hover:underline mb-6 text-sm">
          <ArrowLeft size={18} /> Back to Tickets
        </Link>

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          {/* Compact Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-cyan-600 p-5 text-white">
            <h1 className="text-2xl font-bold">{ticket.title}</h1>
            <div className="flex items-center gap-3 mt-2 text-xs opacity-90">
              <span className="px-2.5 py-1 bg-white/20 rounded-full">#{ticket._id.slice(-6)}</span>
              <span>Created {new Date(ticket.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="p-5 space-y-5">
            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Description</h2>
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap bg-gray-50 p-4 rounded-lg border border-gray-100">
                {ticket.description}
              </p>
            </div>

            {/* AI Notes */}
            {ticket.helpfulNotes && (
              <div className="bg-gradient-to-br from-indigo-50 to-cyan-50 border border-indigo-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-lg font-bold text-indigo-800">AI Notes</h3>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                  {ticket.helpfulNotes}
                </p>
              </div>
            )}

            {/* Metadata Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-500">Status</p>
                <p className="text-base font-semibold capitalize flex items-center gap-1 mt-1 text-sm">
                  {ticket.status === "resolved" ? <CheckCircle2 className="text-green-600 w-4 h-4" /> : <Clock className="text-amber-600 w-4 h-4" />}
                  {ticket.status || "open"}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-500">Priority</p>
                <p className="mt-1">
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                    ticket.priority === "high" ? "bg-red-100 text-red-700" :
                    ticket.priority === "medium" ? "bg-amber-100 text-amber-700" :
                    ticket.priority === "low" ? "bg-blue-100 text-blue-700" :
                    "bg-gray-100 text-gray-700"
                  }`}>
                    {ticket.priority || "Not set"}
                  </span>
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-500">Assigned Mentor</p>
                <p className="text-base font-semibold mt-1 flex items-center gap-1 text-sm">
                  <User className="w-4 h-4 text-gray-500" />
                  {ticket.assignedTo?.name || ticket.assignedTo?.email || "Pending"}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-500">Category</p>
                <p className="text-base font-semibold capitalize mt-1 text-sm">
                  {ticket.category || "Uncategorized"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}