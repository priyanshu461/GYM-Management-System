import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import trainerServices from "../../services/trainerServices";
import { Users, UserCheck, Mail, Phone, Calendar, TrendingUp } from "lucide-react";
import Layout from "@/components/Layout";

const MyClients = () => {
  const { trainer } = useAuth();
  const { theme } = useTheme();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const data = await trainerServices.getTrainerClients();
        setClients(data || []);
      } catch (error) {
        console.error("Error fetching clients:", error);
        setClients([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const cardClass = theme === "dark"
    ? "bg-teal-800 border-teal-700 text-white"
    : "bg-white border-teal-200 text-teal-900";

  const subText = theme === "dark" ? "text-teal-200" : "text-teal-600";

  const ClientCard = ({ client }) => (
    <div className={`p-6 rounded-xl shadow-lg border ${cardClass} cursor-pointer hover:shadow-xl transition-shadow`} onClick={() => setSelectedClient(client)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${client.membershipStatus === "Active" ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-600"}`}>
            <UserCheck size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{client.name}</h3>
            <p className={`text-sm ${subText}`}>{client.email}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">Progress</p>
          <p className="text-2xl font-bold text-teal-500">{client.progress || 0}%</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Phone size={14} className="text-teal-500" />
          <span>{client.phone || "N/A"}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-teal-500" />
          <span>Joined: {new Date(client.joinDate).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp size={14} className="text-teal-500" />
          <span className="text-sm">Last workout: {new Date(client.lastWorkout).toLocaleDateString()}</span>
        </div>
        <button className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded-lg text-sm">
          View Details
        </button>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className={`min-h-screen p-6 ${theme === "dark" ? "bg-teal-900" : "bg-gradient-to-br from-teal-50 via-teal-100 to-teal-50"}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">My Clients</h1>
            <div className="flex items-center gap-2 bg-teal-100 dark:bg-teal-700 px-4 py-2 rounded-lg">
              <Users size={20} className="text-teal-600 dark:text-teal-400" />
              <span className="font-semibold">{clients.length} Clients</span>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin h-12 w-12 border-b-2 border-teal-500 rounded-full"></div>
            </div>
          ) : clients.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clients.map((client) => (
                <ClientCard key={client._id} client={client} />
              ))}
            </div>
          ) : (
            <div className={`p-12 rounded-xl shadow-lg border text-center ${cardClass}`}>
              <Users className="h-16 w-16 text-teal-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Clients Assigned</h3>
              <p className={subText}>You don't have any clients assigned to you yet.</p>
            </div>
          )}

          {/* Client Details Modal */}
          {selectedClient && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className={`max-w-md w-full p-6 rounded-xl shadow-xl ${cardClass}`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">{selectedClient.name}</h2>
                  <button
                    onClick={() => setSelectedClient(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-teal-500" />
                    <span>{selectedClient.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-teal-500" />
                    <span>{selectedClient.phone || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar size={16} className="text-teal-500" />
                    <span>Joined: {new Date(selectedClient.joinDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrendingUp size={16} className="text-teal-500" />
                    <span>Progress: {selectedClient.progress || 0}%</span>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button className="flex-1 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg">
                    View Progress
                  </button>
                  <button className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">
                    Contact
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MyClients;
