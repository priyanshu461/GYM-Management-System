import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import trainerServices from "../../services/trainerServices";
import { Calendar, Clock, Users, MapPin, Plus, X } from "lucide-react";
import Layout from "@/components/Layout";

const MySchedules = () => {
  const { trainer } = useAuth();
  const { theme } = useTheme();
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  // Form state
  const [scheduleForm, setScheduleForm] = useState({
    title: '',
    date: '',
    time: '',
    capacity: 15,
    category: 'Strength',
    difficulty: 'Intermediate',
    location: ''
  });

  const [selectedMember, setSelectedMember] = useState('');
  const [availableMembers, setAvailableMembers] = useState([]);

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

  useEffect(() => {
    const fetchMembers = async () => {
      if (showCreateModal) {
        try {
          const members = await trainerServices.getTrainerClients();
          setAvailableMembers(members || []);
        } catch (error) {
          console.error("Error fetching members:", error);
          setAvailableMembers([]);
        }
      }
    };

    fetchMembers();
  }, [showCreateModal]);

  const submitSchedule = async () => {
    try {
      const scheduleData = {
        title: scheduleForm.title,
        date: scheduleForm.date,
        time: scheduleForm.time,
        capacity: scheduleForm.capacity,
        category: scheduleForm.category,
        difficulty: scheduleForm.difficulty,
        location: scheduleForm.location,
        memberId: selectedMember
      };

      const response = await trainerServices.createSchedule(scheduleData);
      if (response.message) {
        alert("Schedule created successfully!");
        setShowCreateModal(false);
        setScheduleForm({
          title: '',
          date: '',
          time: '',
          capacity: 15,
          category: 'Strength',
          difficulty: 'Intermediate',
          location: ''
        });
        setSelectedMember('');
        // Add new schedule to the list without reloading
        const newSchedule = {
          ...scheduleData,
          _id: response.scheduleId || Date.now().toString(), // Use response ID if available, otherwise generate temp ID
          enrolled: 0
        };
        setSchedules(prevSchedules => [newSchedule, ...prevSchedules]);
      } else {
        alert("Failed to create schedule");
      }
    } catch (error) {
      console.error("Error creating schedule:", error);
      alert("Error creating schedule");
    }
  };

  const cardClass = theme === "dark"
    ? "bg-teal-800 border-teal-700 text-white"
    : "bg-white border-teal-200 text-teal-900";

  const subText = theme === "dark" ? "text-teal-200" : "text-teal-600";

  return (
    <Layout>
      <div className={`min-h-screen p-6 ${theme === "dark" ? "bg-teal-900" : "bg-gradient-to-br from-teal-50 via-teal-100 to-teal-50"}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">My Schedules</h1>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus size={20} />
              Create Schedule
            </button>
          </div>

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

                  <button
                    onClick={() => {
                      setSelectedSchedule(schedule);
                      setShowDetailsModal(true);
                    }}
                    className="mt-4 w-full bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm"
                  >
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

      {/* Create Schedule Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg shadow-lg max-w-md w-full mx-4 ${theme === "dark" ? "bg-teal-800 text-white" : "bg-white text-teal-900"}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Create New Schedule</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Class Title</label>
                <input
                  type="text"
                  value={scheduleForm.title}
                  onChange={(e) => setScheduleForm({...scheduleForm, title: e.target.value})}
                  className={`w-full p-2 border rounded-lg ${theme === "dark" ? "bg-teal-700 border-teal-600 text-white" : "bg-white border-gray-300"}`}
                  placeholder="Enter class title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  value={scheduleForm.date}
                  onChange={(e) => setScheduleForm({...scheduleForm, date: e.target.value})}
                  className={`w-full p-2 border rounded-lg ${theme === "dark" ? "bg-teal-700 border-teal-600 text-white" : "bg-white border-gray-300"}`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Time</label>
                <input
                  type="time"
                  value={scheduleForm.time}
                  onChange={(e) => setScheduleForm({...scheduleForm, time: e.target.value})}
                  className={`w-full p-2 border rounded-lg ${theme === "dark" ? "bg-teal-700 border-teal-600 text-white" : "bg-white border-gray-300"}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Capacity</label>
                  <input
                    type="number"
                    value={scheduleForm.capacity}
                    onChange={(e) => setScheduleForm({...scheduleForm, capacity: parseInt(e.target.value)})}
                    className={`w-full p-2 border rounded-lg ${theme === "dark" ? "bg-teal-700 border-teal-600 text-white" : "bg-white border-gray-300"}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Difficulty</label>
                  <select
                    value={scheduleForm.difficulty}
                    onChange={(e) => setScheduleForm({...scheduleForm, difficulty: e.target.value})}
                    className={`w-full p-2 border rounded-lg ${theme === "dark" ? "bg-teal-700 border-teal-600 text-white" : "bg-white border-gray-300"}`}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  value={scheduleForm.category}
                  onChange={(e) => setScheduleForm({...scheduleForm, category: e.target.value})}
                  className={`w-full p-2 border rounded-lg ${theme === "dark" ? "bg-teal-700 border-teal-600 text-white" : "bg-white border-gray-300"}`}
                >
                  <option value="Strength">Strength</option>
                  <option value="Cardio">Cardio</option>
                  <option value="Yoga">Yoga</option>
                  <option value="HIIT">HIIT</option>
                  <option value="Pilates">Pilates</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  value={scheduleForm.location}
                  onChange={(e) => setScheduleForm({...scheduleForm, location: e.target.value})}
                  className={`w-full p-2 border rounded-lg ${theme === "dark" ? "bg-teal-700 border-teal-600 text-white" : "bg-white border-gray-300"}`}
                  placeholder="Enter location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Select Member</label>
                <select
                  value={selectedMember}
                  onChange={(e) => setSelectedMember(e.target.value)}
                  className={`w-full p-2 border rounded-lg ${theme === "dark" ? "bg-teal-700 border-teal-600 text-white" : "bg-white border-gray-300"}`}
                >
                  <option value="">Select a member</option>
                  {availableMembers.map((member) => (
                    <option key={member._id} value={member._id}>
                      {member.name} ({member.email})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={submitSchedule}
                className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg"
              >
                Create Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Details Modal */}
      {showDetailsModal && selectedSchedule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg shadow-lg max-w-lg w-full mx-4 ${theme === "dark" ? "bg-teal-800 text-white" : "bg-white text-teal-900"}`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Schedule Details</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-teal-500" />
                <div>
                  <p className="font-semibold">Title</p>
                  <p className={subText}>{selectedSchedule.title}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-teal-500" />
                <div>
                  <p className="font-semibold">Date & Time</p>
                  <p className={subText}>{selectedSchedule.date} at {selectedSchedule.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-teal-500" />
                <div>
                  <p className="font-semibold">Location</p>
                  <p className={subText}>{selectedSchedule.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-teal-500" />
                <div>
                  <p className="font-semibold">Capacity</p>
                  <p className={subText}>{selectedSchedule.enrolled}/{selectedSchedule.capacity} enrolled</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">Category</p>
                  <p className={subText}>{selectedSchedule.category}</p>
                </div>
                <div>
                  <p className="font-semibold">Difficulty</p>
                  <p className={subText}>{selectedSchedule.difficulty}</p>
                </div>
              </div>

              {selectedSchedule.memberId && (
                <div>
                  <p className="font-semibold">Assigned Member</p>
                  <p className={subText}>
                    {availableMembers.find(member => member._id === selectedSchedule.memberId)?.name || 'Member not found'}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default MySchedules;
