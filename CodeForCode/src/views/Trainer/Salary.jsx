import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import trainerServices from "../../services/trainerServices";
import { DollarSign, Calendar, TrendingUp, Download, Users } from "lucide-react";
import Layout from "@/components/Layout";

const Salary = () => {
  const { trainer } = useAuth();
  const { theme } = useTheme();
  const [salaryData, setSalaryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalary = async () => {
      try {
        setLoading(true);
        const data = await trainerServices.getTrainerSalary();
        setSalaryData(data);
      } catch (error) {
        console.error("Error fetching salary:", error);
        setSalaryData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSalary();
  }, []);

  const cardClass = theme === "dark"
    ? "bg-teal-800 border-teal-700 text-white"
    : "bg-white border-teal-200 text-teal-900";

  const subText = theme === "dark" ? "text-teal-200" : "text-teal-600";

  if (loading) {
    return (
      <Layout>
        <div className={`min-h-screen p-6 ${theme === "dark" ? "bg-teal-900" : "bg-gradient-to-br from-teal-50 via-teal-100 to-teal-50"}`}>
          <div className="flex justify-center py-12">
            <div className="animate-spin h-12 w-12 border-b-2 border-teal-500 rounded-full"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={`min-h-screen p-6 ${theme === "dark" ? "bg-teal-900" : "bg-gradient-to-br from-teal-50 via-teal-100 to-teal-50"}`}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Salary Information</h1>

          {salaryData ? (
            <div className="space-y-6">
              {/* Current Salary Card */}
              <div className={`p-8 rounded-xl shadow-lg border ${cardClass}`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Current Salary</h2>
                  <DollarSign className="h-8 w-8 text-teal-500" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className={`text-sm ${subText} mb-1`}>Monthly Salary</p>
                    <p className="text-3xl font-bold text-teal-500">${salaryData.monthlySalary || 0}</p>
                  </div>
                  <div className="text-center">
                    <p className={`text-sm ${subText} mb-1`}>Hourly Rate</p>
                    <p className="text-3xl font-bold text-teal-500">${salaryData.hourlyRate || 0}</p>
                  </div>
                  <div className="text-center">
                    <p className={`text-sm ${subText} mb-1`}>This Month</p>
                    <p className="text-3xl font-bold text-teal-500">${salaryData.currentMonthEarnings || 0}</p>
                  </div>
                </div>
              </div>

              {/* Salary Breakdown */}
              <div className={`p-8 rounded-xl shadow-lg border ${cardClass}`}>
                <h2 className="text-2xl font-bold mb-6">Salary Breakdown</h2>

                <div className="space-y-4 flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
                  <div className="justify-between items-center p-4 rounded-lg bg-teal-50 dark:bg-teal-700">
                    <div className="items-center gap-3">
                      <Calendar className="h-5 w-5 text-teal-500" />
                      <span>Base Salary</span>
                    </div>
                    <span className="font-semibold">${salaryData.baseSalary || 0}</span>
                  </div>

                  <div className="justify-between items-center p-4 rounded-lg bg-teal-50 dark:bg-teal-700">
                    <div className="items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-teal-500" />
                      <span>Performance Bonus</span>
                    </div>
                    <span className="font-semibold">${salaryData.performanceBonus || 0}</span>
                  </div>

                  <div className="justify-between items-center p-4 rounded-lg bg-teal-50 dark:bg-teal-700">
                    <div className="items-center gap-3">
                      <Users className="h-5 w-5 text-teal-500" />
                      <span>Client Commissions</span>
                    </div>
                    <span className="font-semibold">${salaryData.clientCommissions || 0}</span>
                  </div>
                </div>
              </div>

              {/* Payment History */}
              {salaryData.paymentHistory && salaryData.paymentHistory.length > 0 && (
                <div className={`p-8 rounded-xl shadow-lg border ${cardClass}`}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Payment History</h2>
                    <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                      <Download size={16} />
                      Download
                    </button>
                  </div>

                  <div className="space-y-3">
                    {salaryData.paymentHistory.map((payment, index) => (
                      <div key={index} className={`flex justify-between items-center p-4 rounded-lg ${theme === "dark" ? "bg-teal-700" : "bg-gray-50"}`}>
                        <div>
                          <p className="font-medium">{payment.period}</p>
                          <p className={`text-sm ${subText}`}>{new Date(payment.date).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${payment.amount}</p>
                          <p className={`text-sm ${payment.status === "Paid" ? "text-green-600" : "text-yellow-600"}`}>
                            {payment.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className={`p-12 rounded-xl shadow-lg border text-center ${cardClass}`}>
              <DollarSign className="h-16 w-16 text-teal-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Salary Information Unavailable</h3>
              <p className={subText}>Unable to load salary data at this time. Please try again later.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Salary;
