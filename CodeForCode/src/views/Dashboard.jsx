import React from 'react'
import { motion } from "framer-motion";
import {Box, ShoppingCart, Users, BarChart } from "lucide-react";
import Layout from '../components/Layout';


const Dashboard = () => {
      const stats = [
        { id: 1, title: "Total Sales", value: "₹1,24,560", icon: ShoppingCart },
        { id: 2, title: "Orders", value: "1,240", icon: Box },
        { id: 3, title: "Customers", value: "3,420", icon: Users },
        { id: 4, title: "Traffic", value: "18,400", icon: BarChart },
      ];

      const topProducts = [
        { id: 1, title: "Leather Jacket", price: "₹4,499", sold: 140 },
        { id: 2, title: "Running Shoes", price: "₹2,299", sold: 120 },
        { id: 3, title: "Smart Watch", price: "₹6,999", sold: 95 },
        { id: 4, title: "Backpack", price: "₹1,299", sold: 88 },
      ];

      const orders = Array.from({ length: 6 }).map((_, i) => ({
        id: 1000 + i,
        customer: ["Asha", "Ravi", "Deepa", "Karan", "Maya", "Ishan"][i % 6],
        amount: [2599, 499, 1299, 7499, 899, 199][i % 6],
        status: ["Delivered", "Processing", "Returned", "Shipped", "Processing", "Delivered"][i % 6],
        date: ["2025-09-28", "2025-09-29", "2025-09-25", "2025-09-27", "2025-09-30", "2025-09-24"][i % 6]
      }));

  return (
    <div>
         <Layout>
             <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {stats.map((s) => (
              <motion.div key={s.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-2xl bg-teal-50 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs text-teal-900">{s.title}</div>
                  <div className="text-xl font-bold mt-1">{s.value}</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-teal-200 flex items-center justify-center">
                  <s.icon size={20} />
                </div>
              </motion.div>
            ))}
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sales Chart + Orders List */}
            <div className="lg:col-span-2 bg-teal-50 p-4 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Sales Overview</h3>
                <div className="text-xs text-slate-500">Last 30 days</div>
              </div>

              {/* Simple SVG chart (sparkline + bars) */}
              <div className="w-full h-40 mb-4">
                <svg className="w-full h-full" viewBox="0 0 600 160" preserveAspectRatio="none">
                  <polyline fill="none" stroke="#0ea5e9" strokeWidth="3" points="0,120 80,100 160,80 240,95 320,60 400,72 480,40 560,55 600,30" />
                </svg>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Recent Orders</h4>
                  <div className="space-y-2">
                    {orders.map((o) => (
                      <div key={o.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50">
                        <div>
                          <div className="text-sm font-medium">Order #{o.id}</div>
                          <div className="text-xs text-teal-900">{o.customer} • {o.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">₹{o.amount}</div>
                          <div className={`text-xs ${o.status === 'Delivered' ? 'text-teal-600' : o.status === 'Returned' ? 'text-rose-600' : 'text-amber-600'}`}>{o.status}</div>
                        </div>
                     </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Top Products</h4>
                  <ul className="space-y-2">
                    {topProducts.map((p) => (
                      <li key={p.id} className="p-3 rounded-lg hover:bg-slate-50 flex items-center justify-between">
                        <div>
                          <div className="font-medium">{p.title}</div>
                          <div className="text-xs text-slate-500">Sold: {p.sold}</div>
                        </div>
                        <div className="text-sm font-semibold">{p.price}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-teal-50 p-4 rounded-2xl shadow-sm">
              <h3 className="font-semibold mb-3">Quick Actions</h3>
              <div className="grid grid-cols-1 gap-3">
                <button className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18"/></svg>
                    <div>
                      <div className="text-sm font-medium">Add product</div>
                      <div className="text-xs text-slate-500">Create a new product listing</div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-400">Ctrl + P</div>
                </button>

                <button className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6M7 21h10"/></svg>
                    <div>
                      <div className="text-sm font-medium">View reports</div>
                      <div className="text-xs text-slate-500">Detailed sales & analytics</div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-400">Enter</div>
                </button>

                <button className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3"/></svg>
                    <div>
                      <div className="text-sm font-medium">Send promo</div>
                      <div className="text-xs text-slate-500">Email/SMS campaign</div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-400">/</div>
                </button>
              </div>
            </div>
          </section>

          {/* Orders Table */}
          <section className="mt-6 bg-teal-50 p-4 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">All Orders</h3>
              <div className="text-sm text-slate-500">Showing latest 50 orders</div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs text-slate-500 border-b">
                  <tr>
                    <th className="py-2">Order</th>
                    <th className="py-2">Customer</th>
                    <th className="py-2">Amount</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">Date</th>
                    <th className="py-2">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {orders.map(o => (
                    <tr key={o.id} className="hover:bg-slate-50">
                      <td className="py-3">#{o.id}</td>
                      <td className="py-3">{o.customer}</td>
                      <td className="py-3">₹{o.amount}</td>
                      <td className="py-3">{o.status}</td>
                      <td className="py-3">{o.date}</td>
                      <td className="py-3"><button className="text-sm px-3 py-1 rounded-md bg-slate-100 hover:bg-slate-200">View</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
         </Layout>
    </div>
  )
}

export default Dashboard;
