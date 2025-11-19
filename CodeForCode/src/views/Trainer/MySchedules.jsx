import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import trainerServices from "../../services/trainerServices";
import { Calendar, Clock, Users, MapPin } from "lucide-react";
import Layout from "@/components/Layout";

const MySchedules = () => {
  const { trainer } = useAuth();
  const { theme } = useTheme();
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setLoading(true);
        const data = await trainerServices.getTrainerSchedules();
        setSchedules(data || []);
      } catch (error) {
        console.error("Error fetching schedules:", error);
        setSchedules([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  const cardClass = theme === "dark"
    ? "bg-teal-800 border-teal-700 text-white"
    : "bg-white border-teal-200 text-teal-900";

  const subText = theme === "dark" ? "text-teal-200" : "text-teal-600";

  return (
    <Layout>
      <div className={`min-h-screen p-6 ${theme === "dark" ? "bg-teal-900" : "bg-gradient-to-br from-teal-50 via-teal-100 to-teal-50"}`}>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Schedules</h1>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin h-12 w-12 border-b-2 border-teal-500 rounded-full"></div>
            </div>
          ) : schedules.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {schedules.map((schedule) => (
                <div key={schedule._id} className={`p-6 rounded-xl shadow-lg border ${cardClass}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">{schedule.title}</h3>
                    <Calendar className="h-6 w-6 text-teal-500" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-teal-500" />
                      <span className={`text-sm ${subText}`}>
                        {schedule.date} at {schedule.time}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-teal-500" />
                      <span className={`text-sm ${subText}`}>{schedule.location}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-teal-500" />
                      <span className={`text-sm ${subText}`}>
                        {schedule.enrolled}/{schedule.capacity} enrolled
                      </span>
                    </div>
                  </div>

                  <button className="mt-4 w-full bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className={`p-12 rounded-xl shadow-lg border text-center ${cardClass}`}>
              <Calendar className="h-16 w-16 text-teal-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Schedules Found</h3>
              <p className={subText}>You don't have any scheduled classes at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MySchedules;
