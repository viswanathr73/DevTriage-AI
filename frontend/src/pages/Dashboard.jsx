
import Tickets from "./tickets.jsx"; // Existing Tickets page

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">My Dashboard</h1>
      <Tickets /> {/* Your existing Tickets component */}
    </div>
  );
}