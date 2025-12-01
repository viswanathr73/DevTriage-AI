import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function TicketDetailsPage() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/tickets/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();
        console.log("API DATA:", data); // 👀 Debug
        setTicket(data.ticket || null);
      } catch (err) {
        console.error("Error fetching ticket:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  if (loading) return <p className="p-6 text-gray-400">Loading ticket...</p>;
  if (!ticket) return <p className="p-6 text-red-500">⚠ Ticket not found</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-gray-200 rounded-md shadow">
      <Link to="/" className="text-blue-400 underline block mb-4">
        ← Back to Tickets
      </Link>

      <h1 className="text-2xl font-bold mb-3">{ticket.title}</h1>
      <p className="text-gray-700 mb-6">{ticket.description}</p>

      <div className="space-y-2 bg-gray-100 p-4 rounded">
        <p>
          <strong>Status:</strong> {ticket.status}
        </p>
        <p>
          <strong>Priority:</strong> {ticket.priority || "Not assigned"}
        </p>
        <p>
          <strong>Assigned To:</strong> {ticket.assignedTo?.email || "Pending"}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(ticket.createdAt).toLocaleString()}
        </p>
      </div>

      {ticket.helpfulNotes && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">AI Suggested Notes</h2>
          <pre className="bg-gray-200 p-3 rounded whitespace-pre-wrap">
            {ticket.helpfulNotes}
          </pre>
        </div>
      )}
    </div>
  );
}
